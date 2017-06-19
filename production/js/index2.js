var index = {
	firstNav:$("#top_firstNav"),
	init:function(){
        this.topNav();
		this.leftChildnav();
		this.rightNav();
	},
	render:function(){

	},
    topNav:function(){
       // $('.nav_menu>nav').load('./layout/top_nav.html',function(){

       //  });
       
        
    },
	leftChildnav:function(){
		var that = this;
		var liLength = this.firstNav.find('li').length;	
		//当主菜单被点击 	
        this.firstNav.on('click','li',function(event){
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
    rightNav:function(){
    	//模拟上下拉菜单
    	var flag = true;
    	//$('.right_col .sideRight_menu .tabs-left li.nav-item>a').css({'background-color':'#b9bbba','color':'#fff'})
    	$('.right_col .sideRight_menu .tabs-left').on('click','li.nav-item',function(){
    		//判断是否存在子导航  		
    		if($(this).next().is('.item-wrapper')){	//true    		
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
	index.init();
})