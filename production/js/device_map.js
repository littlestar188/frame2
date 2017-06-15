var map = {
	init:function(){
		this.render();
	},
	render:function(){
		this.createMap();
		$('#distpicker').distpicker({});
	},
	createMap:function(){

        var mp = new BMap.Map('map');
        console.log(mp)
          //var myBMapExt = new BMapExtension($('#map-chart')[0], BMap, echarts);
         // var mp = myBMapExt.getMap();
            var startPoint = {
                x:121.491,
				y:31.233
			}

            mp.centerAndZoom(new BMap.Point(startPoint.x, startPoint.y), 11);
            mp.enableScrollWheelZoom();//支持鼠标放大缩小
            //var mapChart = echarts.init(document.getElementById('map-chart'));

			//配置option
			var option = {
				title:"设备状态地理分布"
			}
            // var container = BMapExt.getEchartsContainer();
            // var myChart = BMapExt.initECharts(container);
            // BMapExt.setOption(option);
		 var mp2 = new BMap.Map('map2')

            mp2.centerAndZoom(new BMap.Point(startPoint.x, startPoint.y), 11);
            mp2.enableScrollWheelZoom();//支持鼠标放大缩小
            //var mapChart = echarts.init(document.getElementById('map-chart'));

			//配置option
			var option = {
				title:"设备状态地理分布"
			}
	}
}

$(function(){
	map.init();
})