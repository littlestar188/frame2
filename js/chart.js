var chart = {
    init:function(){
        this.render();
        
    },
    render:function(){    
        this.trendChart(); 
        this.typeChart();

    },
    /*
    * echart表随随窗口大小自适应
    * @param charts 某表数组集合
    */
    watchEchart:function(charts){   
        var resizeChart;
        $(window).resize(function(){ 
            for(var key in charts){
                (function(i){                       
                    window.onresize = charts[i].resize();                   
                })(key)
            }
        })  
                     
    },
    /*
    *  创建bar echart
    *  @param elemId   标签id元素   
    */
    trendChart:function(){
        var that = this;
        
        $.ajax({
            url:"./resources/json/echartData/echratData-new.json",
            //url:'/manage/chart/stock/',
            //type:'post',
            cache: false,
            dataType: 'json',
            success:function(data){
                console.log(data)
                that.trendCallback('stock-chart',data);
            },
            error:function(){
                console.log('echart数据获取的后台出错')
            }
        });   
    },
    /*
    *  创建bar echart
    *  @param  elemId   标签id元素
    *  @param  data     
    */
    trendCallback:function(elemId,data){
        var trendChart = echarts.init(document.getElementById(elemId));
        var object = arrayItems(data,"bar");
        trendOption = {
            color: ['#1f77b4','#009fa8'],
            tooltip : {
                trigger: 'axis',
                axisPointer: {
                    type:'line'
                }
            },
             toolbox: {
                //itemSize:11,                
                feature: {
                    dataZoom:{show:true},
                    saveAsImage: {show:true},
                    magicType : {show: true, type: ['line','bar', 'stack','tiled']}
                },
                right:'4%'
             },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            legend: {
                data:object.legend
            },
            xAxis : [
                {
                    type : 'category',
                    data :data.xAxis
                }
            ],
            yAxis: [
                {
                    type: 'value'

                }
            ],
            series: object.series//[
                // {
                //     name:data.legend[0],
                //     type:'bar',
                //     markPoint : {
                //        data : [
                //            {type : 'max', name: '最大值'},
                //            {type : 'min', name: '最小值'}
                //        ]
                //     },
                //     label: {
                //         normal: {
                //             show: true,
                //             position: 'top'
                //         }
                //     },
                //     data:data.inStockAxis
                // },
                // {
                //      name:data.legend[1],
                //      type:'bar',
                //      markPoint : {
                //         data : [
                //             {type : 'max', name: '最大值'},
                //             {type : 'min', name: '最小值'}
                //         ]
                //      },
                //      label: {
                //         normal: {
                //             show: true,
                //             position: 'top'
                //         }
                //     },
                //     data:data.outStockAxis
                // }
            // ]
        };
        //console.log(arrayItems(data))
        console.log(trendOption)
        // 使用刚指定的配置项和数据显示图表。
        trendChart.setOption(trendOption);
         //resize
        this.watchEchart([trendChart])
    },
   
    typeChart:function(){
        var that = this;
         var pieOption = {
            chartData:[]
        }
        var typeChart = echarts.init(document.getElementById('type-chart'));
        
        var typeOption = {
                color:['#009fa8'],
                title: {
                    text: '设备型号库存',
                    x:'center'
                },
                tooltip: {
                    //trigger: 'item',
                    trigger: 'axis',
                    axisPointer: {
                        type:'line'
                    }
                    
                },
                toolbox: {
                         //itemSize:11,
                         feature: {
                             saveAsImage: {show:true},
                            myTool:{
                                show:true,
                                title:'转换为饼状图',
                                icon:'image://http://127.0.0.1:80/frame/self/resource/pie2.svg',//后缀只能是svg否则失真
                                //点击重绘成饼状图
                                onclick:function(){
                                    
                                    typeChart.clear();
                                    console.log(typeChart,typeOption,pieOption.chartData)     
                                    chart.redrawPie(typeChart,typeOption,pieOption.chartData);
                                    
                                }
                            },
                             magicType : {show: true, type: ['line', 'bar']}
                         },
                        right:'4%'
                     },
                legend: {
                    data:[]
                },
                xAxis : [
                    {
                        type : 'category',
                        data :[]
                    }
                ],
                yAxis: [
                    {
                        type: 'value'

                    }
                ],
                series: [
                    {
                        name:'设备类型',
                        type:'bar',
                       // barWidth: '30%',
                        markPoint : {
                           data : [
                               {type : 'max', name: '最大值'},
                               {type : 'min', name: '最小值'}
                           ]
                        },
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '20',
                                    fontWeight: 'bold'
                                }
                            }
                        }, 
                        data:[]
                        
                    }
                   
                ]
            };
               
              
        $.ajax({
            url:"./resources/json/echartData/echratData2-device-num.json",
            cache: false,
            dataType: 'json',
            success:function(data){
                console.log(data)

                for(var i in data){
                   var series = {"value":data[i],"name":i};
                   pieOption.chartData.push(series);
                }
                that.typeCallback(typeChart,typeOption,data);
                
            },
     
            error:function(){
                console.log('typechart的数据获取后台报错')
            }
        })
    },
    //typeChart callback
    typeCallback:function(chart,chartOption,data){
        for(var key in data){

           // var series = {"value":data[i],"name":i};
           // pieOption.chartData.push(series);

           chartOption.series[0].data.push(data[key]);
           chartOption.xAxis[0].data.push(key);
           chartOption.legend.data.push(key)
           
       }
       console.log( chartOption.xAxis[0].data,chartOption.series[0].data)
       chart.setOption(chartOption); 
    },
    /*
    * 转换成饼状图
    * @param  chart
    * @param  chartOption  
    * @param  data     
    */
    redrawPie:function(chart,chartOption,data){
        console.log(data)
        var option ={
            title:{
               text: '设备型号',
               x:'center'     
            },   
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            toolbox: {
                //itemSize:11,
                feature: {
                    saveAsImage: {show: true},
                    myTool: {
                        show: true,
                        title: '转换为饼状图',
                        icon: 'image://http://127.0.0.1:80/frame/self/resource/pie2.svg',//后缀只能是svg否则失真
                        //点击重绘成饼状图
                        onclick: function () {
                            console.log(data)
                            chart.redrawPie(chart,chartOption,data);
                            //console.log(option)
                        }
                    },
                    mytool2:{
                        show: true,
                        title: '转换为柱状图',
                        icon: 'image://http://127.0.0.1:80/frame/self/resource/bar.svg',//后缀只能是svg否则失真
                        //点击重绘成饼状图
                        onclick: function () {
                            chart.clear();
                            chart.typeChart();

                        }
                    }
                },
                right: '4%'
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data:[]
            },
            series: [
                {
                    name:'设备类型',
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '20',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:data
                }
            ]


        }

        for(var i in data){          
           option.legend.data.push(data[i].name);
        }

        chart.setOption(option/*,{
         notMerge:false
         }*/)
        console.log(option,option.series[0].data)

    }
    
 
}


$(function(){
    chart.init();
})

/*时间字符串 去零处理*/
function zero(string){
    string = string.replace(/^0/,'');
        return string;
}
/*  
* 创建趋势图的series
*/
function CreateSeriesItem(name,type,data){
    this.name = name;
    this.type = type;
    this.data = data;
    this.label = {
            normal: {
                show: true,
                position: 'top'
            }
    };
    this.markPoint = {
            data : [
                {type : 'max', name: '最大值'},
                {type : 'min', name: '最小值'}
            ]
     };
}
function SeriesItem(){
    CreateSeriesItem.apply(this,arguments);
}
SeriesItem.prototype = new CreateSeriesItem();
SeriesItem.prototype.constructor = SeriesItem;

/*
*  @param data 后台数据
*  @param type 图表类型 line/bar
*/
function arrayItems(data,type){
     var series = [],
         legend = [];

     //模拟后台数据 data
    //  var data = {
    //     "xAxis": ["2017-06-01 13:00:00","2017-06-02"],
    //     "inStock": {
    //         "name":"入库",
    //         "data":[ "10","12"]
    //     },
    //     "outStock": {
    //         "name":"出库",
    //         "data":[ "11","2"]   
    //     }
    // }
    type = type.indexOf("line") !=-1 ? "line":"bar";
    console.log(type)

    for(var key in data){
        if(key !== "xAxis"){
            var item = new SeriesItem(data[key].name,type,data[key].data);
            series.push(item);
            legend.push(data[key].name);
        }
        
    }
    var obj = {
        series:series,
        legend:legend
    }
    return obj;
}



