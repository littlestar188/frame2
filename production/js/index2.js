var index = {
    navMenu:$('.nav_menu'),
    init:function(){
        this.render();
       // console.log($('#sidebar-menu').find('a'))
        
    },
    render:function(){
        $('#footer').load('./layout/footer.html',function(){

        });
        this.topNav();
        this.tileStats();  
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
        console.log(firstNav)
        //当主菜单被点击   
        firstNav.on('click','li',function(event){
            // alert(1)
            console.log($('#sidebar-menu').find('a'))
            $('#sidebar-menu').find('a').on('click',function(){
                // console.log($(this));
                init_sidebar();
            })

            event = event || window.event;
            event.stopPropagation();
            //获取当前li下标            
            //console.log(that.firstNav);
            console.log('firstNav.length---'+liLength);
           
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
    tileStats:function(){
        var str = "";
        $.ajax({
            url:"./json/tileList.json",
            type:'get',
           // cache: false,
            dataType: 'json',
            success:function(data){
                console.log(data)
               
                for(var i=0;i<data.length;i++){
                    str =  '<div class="animated flipInY col-lg-3 col-md-3 col-sm-6 col-xs-12">'
                        +'<div class="tile-stats">'
                          +'<div class="icon"><i class="fa fa-caret-square-o-right"></i></div>'
                          +'<div class="count">'+data[i].number+'</div>'
                          +'<h3>'+data[i].name+'</h3>'
                        +'</div>'
                      +'</div>';
                      console.log('tiles---'+str)
                }
                
                $('.right_col .top_tiles').append(str)
                

            },
            error:function(){

            }
        })
    }
}

$(function(){
    index.init();
})