
var publicFun = {
	 $navMenu:$('.nav_menu'),
	 navData:{},
	 pathName:window.location.pathname,
	 navUrl:'./resources/layout/top_nav3.html',
	 footerUrl:'./resources/layout/footer.html',
	 sidebarUrl:'./resources/layout/side_menu3.html',
	init:function(){
		
	},
	render:function(){
		var that = this;
		//$('head').load('./resources/layout/head.html',function(){})
		//加载一级导航
		$('#navigation').load(this.navUrl,function(){
	    	//加载导航内容
	    	that.topNavContent();
	    	//当前页面不是index 则修改首页的链接href属性
	    	if(that.pathName.indexOf("index") == -1){
	    		var $indexLink = $(this).find('#top_firstNav>li:first()>a');
	    		$indexLink.attr('href','./index3.html');
	    		//console.log($indexLink)
	    		
	    	} 
	        that.leftChildnav();
	        that.rightNav();
		});  
		//加载页脚
		//console.log(this.pathName.split('/'))
        $('#footer').load(this.footerUrl,function(){});
        //实现下拉菜单
        $('#sidebar-menu').load(this.sidebarUrl,function(){
        	//当前页面不是index 则修改链接属性
        	var pageName = that.currentPageName();
        	console.log(pageName)

        	var $secondNavs = $(this).find('.menu_section>.side-menu>li[data-index]>a');
	    	$secondNavs.each(function(){
	    		
	    		var index = $(this).parent().attr('data-index');
	    		var href1 = $(this).attr("href");
	    		//console.log(href1)
	    		if(href1.indexOf(pageName) !== -1){
	    		
	    			$(this).parents('li[data-index='+index+']').removeClass('hide');
    				$('li[data-index=0]').addClass('hide');
    				$('.nav_menu').find('li').eq(index).addClass('active');

	    		}else{
	    			//console.log($('#sidebar-menu').find('.menu_section>.side-menu>li[data-index='+index+']>.child_menu').length)
	    			if($('#sidebar-menu').find('.menu_section>.side-menu>li[data-index='+index+']>.child_menu').length != 0){
		    			$thirdNavs = $('#sidebar-menu').find('.menu_section>.side-menu>li[data-index='+index+']>.child_menu>li>a');
		    			//console.log($thirdNavs)
		    			$thirdNavs.each(function(){
		    				var href2 = $(this).attr("href");
		    				if(href2.indexOf(pageName) !== -1 ){
		    					$(this).parents('li[data-index='+index+']').removeClass('hide').addClass('active');
	  							$(this).parents('li[data-index='+index+']>ul.child_menu').css({"display":"block"});
	    						$('.nav_menu').find('li').eq(index).addClass('active');

		    				}
		    			})
	    			}	    			

	    		}
	    			            
	         })
	    	init_sidebar();
        })
	},
	//获取当前页面名
	currentPageName:function(){
				
		var lastPathName = this.pathName.split('/');
		
		lastPathName = lastPathName[lastPathName.length-1];
		//console.log(lastPathName)
		var pageName = lastPathName.split('.');
		//console.log(pageName)
		pageName = pageName[0].split('_')[0];

		return pageName;		
	},
	// 左边第二、三级导航
	leftChildnav:function(){
	    var that = this;
	    var firstNav = this.$navMenu.find('#top_firstNav') ;
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
	//根据后台数据 加载头部导航内容
	topNavContent:function(){	
		var that = this;
		$.ajax({
			url:'./resources/json/listMenu.json',
			stype:"get",
			//url:'/manage/menu/leftTree',
			//type:'post',
			cache:true,
			dataType:"json",
			async : false,
			success:function(data){
				console.log('初始化导航-----')
				console.log(data);
				var data = data.data;
				//将获取到的数据定义成全局 减少在加载side_menu的内容时的http再次请求
				that.navData = data;

				var str = "";
				for(var key=0;key<data.length;key++){
					(function(i){
						str= '<li class="col-lg-2 col-md-3 col-sm-3 col-xs-3">'
						      +'<a href="javascript:;" class="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">'
						       + data[i].name+'&nbsp;<span class=" fa fa-angle-down"></span>'
						      +'</a>'
						   +'</li>';
						// that.sideBar_content(i,data[i])
					})(key);
					//console.log(str)
					$('#top_firstNav').append(str)
					//内容加载
        			
				}
				
			},
			error:function(){
				console.log('导航获取数据---后台出错');
			}
		})
		

	},
	
	// 左边第二、三级导航
	sideBar:function(){
	    var that = this;
	    var firstNav = this.$navMenu.find('#top_firstNav') ;
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
	//有bug
	sideBar_content:function(i,data){
		//listMenu.json缓存的数据 this.navData
	
		var a = $('#sidebar-menu').find('.side-menu');
		var str = "";
		
		if(data.sub_menu !== null){					
			for(var key2=0;key2<data.sub_menu.length;key2++){
				(function(j){
					str= '<li class="hide" data-index="'+(i+1)+'">'
						+'<a href="./templates/device/device.html">'
							+data.sub_menu[j].name
						+'</a>'
					 +' </li>'
				
				})(key2);
			}
			
		}
		console.log(str)	    

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
	        
	        var navItem_active = $(this).parents('.item-wrapper').siblings().filter('li.nav-item.active');
	        $(navItem_active).removeClass('active');
	                    
	    })
	    

	},
	backTo:function(){
		$(window).scroll(function(){
		   var sc = $(window).scrollTop();
		   //console.log(sc)
		  
		   if(sc>100){
		      $("#back_top").css({'display':'block'}).removeClass("flipOutX").addClass('flipInX');
		 
		   }else{
		      $("#back_top").removeClass('flipInX').addClass("flipOutX");
		   }

		 })

		 $("#back_top").click(function(){
		   var sc=$(window).scrollTop();
		   $('body,html').animate({scrollTop:0},500);
		 })
	}
}
$(function(){
	publicFun.render();
	publicFun.backTo();

})
function replaceAll(str,old,now){
	var reg = new RegExp(old,'g');
	return str.replace(reg,now);
	console.log(reg)
}