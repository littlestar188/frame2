/**
 * Created by admin on 2017/6/1.
 */

var index = {
    //sidebar:$('#sidebar-menu').find('.side-menu:first'),
    sidebar:$('#sideMenu').find('.nav.side-menu'),
    init:function(){
        var that = this;
        console.log(this.sidebar)
        $('#top_nav').load('../production/layout/top_nav.html',function(){
          $MENU_TOGGLE =$('#top_nav').find('#sidebar-toggle')
          console.log( $MENU_TOGGLE )
          that.render();
        })
        $('#footer').load('../production/layout/footer.html',function(){

        })
        /*$('#sideMenu').load('../production/sideMenu.html',function(){
            that.renderLeftNav();
        })*/

    },
    render:function(){
      // this.leftNav();
       this.tileList();
    },
    tileList:function(){
        $.ajax({
            url:'../production/json/tileList.json',
            type:'get',
            dataType:'json',
            success:function(res){
               // console.log(res.data)
                var data = res.data;
                var str = "";
                for(var i=0;i<data.length;i++){
                    str +=  '<div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count">'
                    +'<span class="count_top">&nbsp;&nbsp;'+data[i].name+'</span>'
                        +'<div class="count">'+data[i].number+'</div>'
                        +'</div>';
                }
                console.log(str)
                $('.tile_count').append(str);
            },
            error:function(){

            }
        })
    },
    leftChildnav:function(){
        $("#top_firstNav").on('click','li',function(event){
            event = event || window.event;
            event.stopPropagation();
            //获取当前li下标
            var index = $(this).eq();
            console.log(index)
        })
    },
    leftNav:function(){
        var that = this;
        $('#sidebar-menu').on('click','li',function(){
           // console.log($(this))
           //console.log($(this).parent())
        })
        $.ajax({
            url: '../production/json/menuTest.json',
            stype: 'get',
            //url:'/manage/menu/leftTree',
            //type:'post',
            dataType: 'json',
            //async : false,
            success: function (res) {
                console.log('初始化菜单-----')
                console.log(res);
                var data = res.data;
                var first = "";//一级导航
                var sencond = "";//二级导航
                var third = "";//三级导航
                var rightIcon = "";
                that.navData = data;

                for (var key = 0; key < data.length; key++) {
                    (function (i) {
                        //定义第一级导航id

                        //var li = $('<li class="first" data-id="' + i + '"></li>');
                        //判断是否有二级菜单
                        if (data[i].sub_menu !== null) {
                            //只存在一级导航时
                            var perFirst = data[i].permission;
                            console.log(perFirst);
                            ///perFirst = publicFun.replaceAll(perFirst.toString(), ',', '');
                            first = '<li data-id="' + i + '">'
                                +'<a><i class="fa fa-circle-o"></i> '+data[i].name+' <span class="fa fa-chevron-down"></span></a>'
                                  +' <ul class="nav child_menu">'
                                     + ' <li><a href="#level1_1">Level One</a>'
                                      +' <li><a>Level One<span class="fa fa-chevron-down"></span></a>'
                                        + '<ul class="nav child_menu">'
                                         + ' <li class="sub_menu"><a href="level2.html">Level Two</a>'
                                           +'</li>'
                                           +'<li><a href="#level2_1">Level Two</a>'
                                           +'</li>'
                                          + '<li><a href="#level2_2">Level Two</a>'
                                          + '</li>'
                                       + ' </ul>'
                                       +'</li>'
                                      + '<li><a href="#level1_2">Level One</a>'
                                     + '</li>'
                                  + '</ul>'
                                +'</li>'
                            // first = '<a href="' + data[i].link + '#' + perFirst + '">'
                            //     + '<i class="fa ' + data[i].icon + '"></i>'
                            //     + '<span class="nav-name">' + data[i].name + '</span>'
                            //     + '</a>'
                           //li.append(first);
                           
                          //that.sidebar.append(first);
                            console.log(first)
                            console.log(that.sidebar)

                        } else {

                            first = '<li><a href="#level1_1">'+data[i].name+'</a></li>'

                            //li.append(first);
                           // this.sidebar.append(li);
                            //console.log(that.sidebar)
                            //动态生成二级
                           // this.secondNav(li, i, data[i]);
                        }

                    })(key);

                }

            },
            error: function () {
                console.log('左侧导航------后台出错');
            }
        })
    }
}

$(function(){
    index.init();
})
/*
 <li>
    <a>
        <i class="fa fa-sitemap"></i> Multilevel Menu 
        <span class="fa fa-chevron-down"></span>
    </a>
    <ul class="nav child_menu">
         <li><a href="#level1_1">Level One</a>
         <li><a>Level One<span class="fa fa-chevron-down"></span></a>
            <ul class="nav child_menu">
                <li class="sub_menu"><a href="level2.html">Level Two</a></li>
                <li><a href="#level2_1">Level Two</a></li>
                <li><a href="#level2_2">Level Two</a></li>
            </ul>
         </li>
        <li><a href="#level1_2">Level One</a></li>
    </ul>
 </li>
* */