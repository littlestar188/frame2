var index = {
	firstNav:$("#top_firstNav"),
	init:function(){
		this.leftChildnav();
		this.rightNav();
	},
	render:function(){

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
         	//console.log($('#sidebar-menu').find('.side-menu>li').not('[data-index="'+index+'"]'))
            
            console.log("firstNav.li---"+index)
        })
    },
    rightNav:function(){
    	var flag = true;
    	$('.right_col .sideRight_menu .tabs-left').on('click','li.nav-item',function(){
    		
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
    	})

    	$('.right_col .sideRight_menu .tabs-left').on('click','li.not(".nav-item")',function(){
    		$(this).siblings().has('.nav-item').removeClass('active')
    	})

    }
}

$(function(){
	index.init();
})