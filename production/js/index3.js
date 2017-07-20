var index = {
    navMenu:$('.nav_menu'),
    init:function(){
        this.tileStats(); 
        this.messageList();
       // console.log($('#sidebar-menu').find('a'))
        
    },
    render:function(){    
        
        //判断路径名 显示/隐藏当前页面左边子菜单的    
        // var pathName = location.pathname.split('/');
        // var pagename = pathName[pathName.length-1].split('.')[0];
        // switch(pagename){

        // }
        // console.log(pagename)
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
    //趋势图右边 设备信息列表
    messageList:function(){
        var that = this;
        $.ajax({
            url:"./json/stock.json",
           // cache: false,
            dataType: 'json',
            success:function(data){
                var data = data.data;
                that.messageCallback(data);
            },
            error:function(){
                console.log("message的获取数据后台错误");
            }
        })    
        
    },
    //设备信息列表 回调函数
    messageCallback:function(data){
        $('.message_list .list-unstyled').find('li.media .media-body').each(function(i){
            //内容
            var html = '<h4>'+data[i].number+' </h4>'
                        + '<p> <small>'+data[i].name+'</small></p>'
            $(this).html(html)         
            //console.log(data[i].number)
            //时间
            var year = data[i].time.split('-')[0];
            var month = zero(data[i].time.split('-')[1]);
            var week = data[i].time.split('-')[2];
            var timeLabel = '<a class="pull-left date">'
                            +'<p class="month">'+month+'月</p>'
                           + '<p class="day">'+week+'</p>'
                        +'</a>'
            $(this).parent('li.media.event').prepend(timeLabel) ;           
        })
    }
    
 
}


$(function(){
    index.init();
})
/*时间字符串 去零处理*/
function zero(string){
    string = string.replace(/^0/,'');
        return string;
}
