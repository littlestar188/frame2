var device = Object.create(publicFun);
var device = $.extend(device,{
	init:function(){
		//this.render();
		
		console.log('init_publicFun') 
	}//,
	// render:function(){
	// 	$('#footer').load('../../production/layout/footer.html',function(){});
 //        //实现下拉菜单
 //        // $('#sidebar-menu').load('../../layout/side_menu3.html',function(){
 //        //     init_sidebar();
 //        // })
 //        //publicFun.topNav(); 
	// },
	//  topNav:function(){
 //        var that = this;
 //      $('#navigation').load('../../production/layout/top_nav3.html',function(){
 //            publicFun.leftChildnav();
 //            publicFun.rightNav();
 //     });    
 //    }
})
$(function(){
    device.init();
    console.log(device)
    console.log('init_device')
})