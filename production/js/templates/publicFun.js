var publicFun = {
	 navMenu:$('.nav_menu'),
	 pathName:window.location.pathname,
	 navUrl:'../../layout/top_nav3.html',
	 footerUrl:'../../layout/footer.html',
	 sidebarUrl:'../../layout/side_menu3.html',
	init:function(){
		this.render();
		
	},
	render:function(){
		var that = this;
		//加载头部导航
		this.topNav();
		//加载页脚
        $('#footer').load(this.footerUrl,function(){});
        //实现下拉菜单
        $('#sidebar-menu').load(this.sidebarUrl,function(){
        	//当前页面不是index 则修改链接属性
        	 if(that.pathName.indexOf("index") == -1){
	    		var $secondNav = $(this).find('.menu_section>.side-menu>li>a');
	    		
	    		$secondNav.each(function(){

    				var oldHref = $(this).attr('href');
    				var reg1 = new RegExp(/^(\.)/,'g');
    				var reg2 = new RegExp(/templates\//,'g');
    				var newHref = oldHref.replace(reg1,'..');
    				newHref = newHref.replace(reg2,'');
    				$(this).attr('href',newHref)
    				//console.log(oldHref,newHref)
	    		})
	    		console.log($(this),$secondNav)
	    	} 
            init_sidebar();
        })
	},
	// 头部第一级导航
	topNav:function(){
	    var that = this; 
	    $('#navigation').load(this.navUrl,function(){
	    	//当前页面不是index 则修改首页的链接href属性
	    	if(that.pathName.indexOf("index") == -1){
	    		var $indexLink = $(this).find('#top_firstNav>li:first()>a');
	    		$indexLink.attr('href','../../index3.html');
	    	} 
	        that.leftChildnav();
	        that.rightNav();
		});
		   
	},
	//显示当前页面对应的二、三级导航
	currentLeftChildnav:function(){

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
	    

	}
}

$(function(){
	publicFun.init();
})
function replaceAll(str,old,now){
	var reg = new RegExp(old,'g');
	return str.replace(reg,now);
	console.log(reg)
}