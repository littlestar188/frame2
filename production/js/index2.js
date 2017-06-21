var index = {
    navMenu:$('.nav_menu'),
    init:function(){
        this.render();
       // console.log($('#sidebar-menu').find('a'))
        
    },
    render:function(){
        //加载页脚
        $('#footer').load('./layout/footer.html',function(){});
        //实现下拉菜单
        $('#sidebar-menu').load('./layout/side_menu.html',function(){
            init_sidebar();
        })    
        
        this.topNav();
        this.tileStats(); 
        this.lineChart(); 
        this.typeChart();
        //this.messageList()
        //判断路径名 显示/隐藏当前页面左边子菜单的    
        var pathName = location.pathname.split('/');
        var pagename = pathName[pathName.length-1].split('.')[0];
        switch(pagename){

        }
        console.log(pagename)
    },
    // 头部第一级导航
    topNav:function(){
        var that = this;
      $('#navigation').load('./layout/top_nav.html',function(){
            that.leftChildnav();
            that.rightNav();
     });    
    },
    // 左边第二、三级导航
    leftChildnav:function(){
        var that = this;
        var firstNav = this.navMenu.find('#top_firstNav') ;
        var liLength = firstNav.find('li').length;  
        //console.log(firstNav)
        //当主菜单被点击   
        firstNav.on('click','li',function(event){
            event = event || window.event;
            event.stopPropagation();
            //获取当前li下标            
            
           // console.log('firstNav.length---'+liLength);
           
            var index = $(this).index();
            $('#sidebar-menu').find('.side-menu>li[data-index="'+index+'"]').each(function(){
                $(this).removeClass('hide');
                //console.log($(this))
            })
            $('#sidebar-menu').find('.side-menu>li').not('[data-index="'+index+'"]').addClass('hide')
            //that.secondNav.eq(index).siblings().addClass('hide');
            console.log($('#sidebar-menu').find('.side-menu>li[data-index="'+index+'"]'))
            //console.log($('#sidebar-menu').find('.side-menu>li').not('[data-index="'+index+'"]'))
            
            console.log("firstNav.li---"+index)
        })


        // })
    },
    // 右边内容区 选项卡的导航
    rightNav:function(){
        //模拟上下拉菜单
        var flag = true;
        //$('.right_col .sideRight_menu .tabs-left li.nav-item>a').css({'background-color':'#b9bbba','color':'#fff'})
        $('.right_col .sideRight_menu .tabs-left').on('click','li.nav-item',function(){
            //判断是否存在子导航         
            if($(this).next().is('.item-wrapper')){ //true          
                if(flag){
                    console.log($(this))                
                    $(this).find('span.fa').removeClass('fa-chevron-up').addClass('fa-chevron-down');
                    $(this).next().removeClass('hide')
                    flag = false
                }
                else{   
                            
                    $(this).find('span.fa').removeClass('fa-chevron-down').addClass('fa-chevron-up');
                    $(this).next().addClass('hide')
                    flag = true
                    
                }
                console.log(flag)
            }else{
                //点击主导航 子导航active消失
                $('li.item-wrapper li.active').removeClass('active');

                                
            }
            

        })
        //点击子导航 主导航active消失
        $('.right_col .sideRight_menu .tabs-left').on('click','li.item-wrapper li',function(){
            //console.log($(this))
            //console.log($(this).parents('.item-wrapper').siblings())
            var navItem_active = $(this).parents('.item-wrapper').siblings().filter('li.nav-item.active');
            $(navItem_active).removeClass('active');
                        
        })
        

    },
    //动态创建 数据显示砖块
    tileStats:function(){
        var str = "";
        $.ajax({
            url:"./json/tileList.json",
           // cache: false,
            dataType: 'json',
            success:function(data){
                console.log(data)
                var data = data.data;
                var length = data.length;
                var count =  12/length;
                console.log(count)
                for(var key = 0;key<length;key++){
                  (function(i){       
                    str =  '<div class="animated flipInY col-lg-'+count+' col-md-'+count+' col-sm-6 col-xs-12">'
                        +'<div class="tile-stats">'
                          // +'<div class="icon"><i class="fa fa-caret-square-o-right"></i></div>'//icon
                          +'<div class="count">'+data[i].number+'</div>'
                          +'<h3 class="tile-name">'+data[i].name+'</h3>'
                        +'</div>'
                      +'</div>';
                    })(key) 
                    $('.right_col .top_tiles').append(str) 
                }
                //length>4 改变字体大小
                if(length>4){
                    $('.top_tiles .tile-stats .tile-name').css({'font-size':'16px'});
                }

            },
            error:function(){
                console.log('tile数据获取的后台出错')    
            }
        })
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
    *  创建echart
    *  @param elem   标签id元素
    *  @param height 图标高度    
    */
    lineChart:function(){
        var that = this;

        $.ajax({
            url:"./json/echartData/echratData.json",
            //url:'/manage/chart/stock/',
            //type:'post',
            cache: false,
            dataType: 'json',
            //data:type
            success:function(data){
                console.log(data)
                // 基于准备好的dom，初始化echarts实例                
                var stockChart = echarts.init(document.getElementById('stock-chart'));
                // var revenueChart = echarts.init(document.getElementById('revenue-chart'));
                option = {
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
                        data:['入库','出库']
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
                    series: [
                        {
                            name:'入库',
                            type:'bar',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            data:data.inStockAxis
                        },
                        {
                             name:'出库',
                             type:'bar',
                             label: {
                                    normal: {
                                        show: true,
                                        position: 'top'
                                    }
                                },
                             data:data.outStockAxis
                        }
                    ]
                };
                console.log(option)
                // 使用刚指定的配置项和数据显示图表。
                // stockChart.setOption(option);
                stockChart.setOption(option);
                 //resize
                that.watchEchart([stockChart])

            },
            error:function(){
                console.log('echart数据获取的后台出错')
            }
        });   
    },
    typeChart:function(){
        var pieOption = {
            chartData:[]
        }
        var typeChart = echarts.init(document.getElementById('type-chart'));
        
        var typeOption = {
                color:[],
                title: {
                    text: '设备型号',
                    x:'center'
                },
                tooltip: {
                    trigger: 'item'
                    //,formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                toolbox: {
                         //itemSize:11,
                         feature: {
                             saveAsImage: {show:true},
                            myTool:{
                                show:true,
                                title:'转换为饼状图',
                                icon:'image://http://192.168.0.40:80/frame/self/resource/pie2.svg',//后缀只能是svg否则失真
                                //点击重绘成饼状图
                                onclick:function(){
                                    
                                    typeChart.clear()
                                     
                                    index.redrawPie(typeChart,option,pieOption.chartData);
                                    
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
                        data :['cc','xx','zz']
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
                        // markPoint : {
                        //    data : [
                        //        {type : 'max', name: '最大值'},
                        //        {type : 'min', name: '最小值'}
                        //    ]
                        // },
                        // label: {
                        //     normal: {
                        //         show: false,
                        //         position: 'center'
                        //     },
                        //     emphasis: {
                        //         show: true,
                        //         textStyle: {
                        //             fontSize: '20',
                        //             fontWeight: 'bold'
                        //         }
                        //     }
                        // }, 
                        data:[1,2,3]
                        // data:[1,2,3,4,5,6,7,8,9]
                    }
                   
                ]
            };
               
              
        $.ajax({
            url:"./json/echartData/echratData2-device-num.json",
            cache: false,
            dataType: 'json',
            //data:type
            success:function(data){
                console.log(data)
        
                for(var i in data){
                   // var test = JSON.parse('{"value:"'+data[i]+',"name":'+i+'}');
                   // console.log(test)

                   var series = {"value":data[i],"name":i};
                   pieOption.chartData.push(series);

                  // typeOption.series[0].data.push(data[i]);
                   //typeOption.xAxis[0].data.push(i);
                   typeOption.legend.data.push(i)
               }
               console.log( typeOption.xAxis[0].data,typeOption.series[0].data)
               typeChart.setOption(typeOption); 
            },
     
            error:function(){
                console.log('typechart的数据获取后台报错')
            }
        })
    },
    //typeChart callback
    typeCallback:function(){
       
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
                        icon: 'image://http://192.168.0.40:80/frame/self/resource/pie2.svg',//后缀只能是svg否则失真
                        //点击重绘成饼状图
                        onclick: function () {
                            console.log(data)
                            index.redrawPie(chart,chartOption,data);
                            //console.log(option)
                        }
                    },
                    mytool2:{
                        show: true,
                        title: '转换为柱状图',
                        icon: 'image://http://192.168.0.40:80/frame/self/resource/bar.svg',//后缀只能是svg否则失真
                        //点击重绘成饼状图
                        onclick: function () {
                            chart.clear();
                            index.typeChart();

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

    },
    //趋势图右边 设备信息列表
    messageList:function(){
        var that = this;
        $.ajax({
            url:"./json/tileList.json",
           // cache: false,
            dataType: 'json',
            success:function(data){
                var data = data.data;
                that.messageCallback(data);
            },
            error:function(){
                console.log("message的获取数据后台错误")
            }
        })    
        
    },
    //设备信息列表 回调函数
    messageCallback:function(data){
        $('.message_list .list-unstyled').find('li.media .media-body').each(function(i){
            var html =  '<h4>'+data[i].number+' </h4>'
                        + '<p> <small>'+data[i].name+'</small></p>'
             $(this).html(html)         
            //console.log($(this).html(html))

        })
    }
}

$(function(){
    index.init();
})