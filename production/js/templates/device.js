var device = Object.create(index);
var device = $.extend(device,{
	init:function(){
		this.render();
	},
	render:function(){
		$('#footer').load('../../layout/footer.html',function(){});
        //实现下拉菜单
        $('#sidebar-menu').load('../../layout/side_menu3.html',function(){
            init_sidebar();
        })
        index.topNav(); 
	},
	 topNav:function(){
        var that = this;
      $('#navigation').load('../../layout/top_nav3.html',function(){
            index.leftChildnav();
            index.rightNav();
     });    
    }
})
$(function(){
    device.init();

})