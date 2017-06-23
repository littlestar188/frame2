var device = Object.create(publicFun);
var device = $.extend(device,{
	init:function(){
		//this.render();
		
		console.log('init_publicFun') 
	},
	render:function(){
		
        
	}
})
$(function(){
    device.init();
    console.log(device)
    console.log('init_device')
})