var role = Object.create(publicFun);
var role = $.extend(role,{
	init:function(){
		
		this.showRolelist();
		console.log('init_publicFun') 
	},
	render:function(){
		
        
	},
	showRolelist:function(){
		$("#role_table").bootstrapTable({
	         url:'http://127.0.0.1:80/frame2/production/json/role/listRoles.json',
	         dataType: 'json',
	         sidePagination:'server',
	         cache: false,//设置False禁用AJAX请求的缓存
	         height: '',
	         //queryParams: role.queryParams,
	         striped: true,//使表格带有条纹
	         pagination: true,//设置True在表格底部显示分页工具栏
	         pageSize: 10,
	         pageList: [10, 25, 50, 100],
	         toolbar:'#custom-toolbar',
	         columns: [
	                   {field: 'state',checkbox: true,formatter:function(row,value,index){
	                   	//return role.disableDel(row,value,index);}
	                   }},                  	   
	                   {field: 'roleName',title: '角色名称',align: 'center',valign: 'middle'},
	                   {field: 'id',title: '操作',align: 'center',valign: 'middle',formatter:function(value){
	                   	//console.log(value)id                     	
	                   //return "<span><a href='javascript:void(0)' class='btn btn-success btn-xs' id='btn-watch' data-id="+value+">详情</a>&nbsp;&nbsp;<a href='javascript:void(0)' class='btn btn-info btn-xs' data-id="+value+" id='btn-edit'>修改</a>&nbsp;&nbsp;<a href='javascript:void(0)' class='btn btn-danger btn-xs' data-id="+value+" id='btn-del'>删除</a>&nbsp;&nbsp;</span>"
	                   	return role.optShow(value);}
	                   }
	   				]
     	})
     	//增
     	//this.addRole();
		//查询
		//this.searchRole();
		//改 查 删 功能实现
		this.btnPer();
		// 批量删除
		//this.batchDel();
	},

	/*
		根据菜单权限显示/隐藏按键
		@param  id		
	*/
	optShow:function(id){
		//获取hash值
		var hash = location.hash;
		var pathname = location.pathname;

		hash = hash.substring(1,hash.length);

		//创建功能按键
		var htmlwrap = $('<span></span>');
		var html = "<a href='javascript:void(0)' class='btn btn-success btn-xs' id='btn-watch' data-id="+id+">详情</a>&nbsp;&nbsp;";
		
		//增 查按键
		var addBtn = $('.box-body .addBtn').parent();
		var searchBtn = $('.box-body .searchBtn');

		//增
		if(hash.indexOf("1")!= -1 ){
			addBtn.show();
		}else{
			addBtn.hide();
		}
		//删
		if(hash.indexOf("2")!= -1 ){
			html += '<a href="javascript:void(0)" class="btn btn-danger btn-xs" id="btn-del" data-id="'+id+'">删除</a>&nbsp;&nbsp;';
		}
		//改
		if(hash.indexOf("3")!= -1 && pathname.indexOf("userManage") == -1){
			console.log(hash.indexOf("3"),hash.indexOf("userManage"))
			html += '<a href="javascript:void(0)" class="btn btn-info btn-xs" id="btn-edit" data-id="'+id+'">修改</a>&nbsp;&nbsp;'
				// +'<a href="javascript:void(0)" class="btn btn-info btn-xs" id="btn-edit2" data-id="'+id+'">修改2</a>&nbsp;&nbsp;';
			
		}
		//如果在userManage页面 改的权限与重置密码关联
		if(hash.indexOf("3")!= -1 && pathname.indexOf("userManage")!= -1 ){
			console.log(hash.indexOf("3"),hash.indexOf("userManage"))
			html += '<a href="javascript:void(0)" class="btn btn-info btn-xs" id="btn-edit" data-id="'+id+'">修改</a>&nbsp;&nbsp;'
				+'<a href="javascript:void(0)" class="btn btn-success btn-xs" id="btn-watch" data-id="'+id+'">重置密码</a>&nbsp;&nbsp;'
		}

		//查
		if(hash.indexOf("4")!= -1 ){
			searchBtn.show();
		}else{
			searchBtn.hide();
		}
		
		html = htmlwrap.append(html)[0].outerHTML;
		//console.log(htmlwrap.append(html)[0].outerHTML)-->span+a
		return html;
	},
	/*
		按键的对应功能实现
	*/
	btnPer:function(){
		var that = this;
		//监视option 实现某个option功能
		var roleId="";
		var modalCon = "";
		
		$('#device_table').on('click','.btn.btn-xs',function(event){
			//阻止冒泡
			window.event? window.event.cancelBubble = true : event.stopPropagation();

			console.log($(this))
			//console.log($(this).attr('data-id'))

			//判断是否为【详情】
			if($(this).is('#btn-watch')){

				roleId = $(this).attr('data-id');
				console.log($(this))
				modalCon = $(document).find('.list_person .table tbody tr').remove();
				//console.log(modalCon,modalCon.length)
				//判断是否存在个人信息内容 不存在则渲染
				//if(modalCon.length == 0){
					modalCon.html('');
					that.oneRole(roleId);
				//}
				that.watchRole();
			}

			//判断是否为【修改】
			if($(this).is('#btn-edit')){

				roleId = $(this).attr('data-id');
				modalCon = $(document).find('.list_edit li').remove();
				//初始化选项显示					
				that.oneMenu(roleId);
				that.editRole();

				//修改后
				setTimeout(that.checkEditRole('/manage/role/updateCheck',roleId),1000);
				var tableLis = '#list_table .list_edit li';
				//解绑click事件
				$('#btn-edit-save').off('click');				 
		 		$('#btn-edit-save').click(function(event){			 			
		 			event.stopPropagation();
		 			that.saveClick(tableLis,'/manage/role/updateRole',roleId);
		 		})

				
			}
			//判断是否是ztree版修改
			if($(this).is('#btn-edit2')){

				that.EditRoleTree();
			}

			//判断是否为【删除】
			if($(this).is('#btn-del')){
				console.log("del")
				roleId = $(this).attr('data-id');
				//console.log(roleId)
				that.delRole(roleId);	
			}

		})
	},
	//获取某角色的信息
	oneRole:function(roleId){
		var that = this;
		var data = "";
		var strTable = "";
		var strMenu = "";
		console.log(roleId)
		$.ajax({
			url:'/manage/role/getOneRole',
			type:'get',
			//url:"../../self/json/getOneRole.json",
			cache: "false",
			data:{
				"roleId":roleId	
			},
			success:function(res){
				console.log('点击【详情】获取对应roleId个人信息--------')
				console.log(res)					
				data = res.data;
				console.log(data.menus);					
				strTable = '<tr>'
                        +'<td>角色ID</td>'
                        +'<td>'+data.id+'</td>'
                      +'</tr>'
                      +'<tr>'
                        +'<td>角色名</td>'
                        +'<td>'+data.roleName+'</td>'
                      +'</tr>'
                      +'<tr>'
                        +'<td>菜单权限</td>'
                        +'<td class="menu_permission"></td>'
                      +'</tr>'
                     +'<tr>'
                        +'<td>创建时间</td>'
                        +'<td>'+data.createTime+'</td>'
                      +'</tr>';            
                $('.list_person .table>tbody').prepend(strTable);

                //处理菜单权限 
                for(var i = 0;i<data.menus.length;i++){	                	
                	//替换 1 2 3 4 ->增删改查
                	var strPer = data.menus[i].permission.toString();
                	//console.log(strPer)
                	var a = that.replaceAll(strPer,',',' ');
                	console.log('replace')
                	var b = that.replaceAll(a,'1','新增');
                	var c = that.replaceAll(b,'2','删除');
                	var d = that.replaceAll(c,'3','修改');
                	strPer= that.replaceAll(d,'4','查看');
                	console.log(strPer)
                	strMenu ='<tr>'
                			   +'<td>'+data.menus[i].name+'&nbsp;&nbsp;&nbsp;&nbsp;</td>'
                			   +'<td>'+strPer+'&nbsp;</td>'
                	         +'</tr>'
                	$('.menu_permission').append(strMenu);
                	

                }

             },
             error:function(){
             	console.log('getOneRole----后台报错');
             }

		})			
	},
	//查看功能
	watchRole:function(){
		var that = this;
		//初始化				
		$("#roleModalLabel").html("查看");
		$('#search-wrap').hide();
		$('#list_table .list_choice').hide();
		$('#list_table .list_edit').hide();
		$('#list_table .list_person').show();

		$('#roleModal').modal({show:true});


	}
})
$(function(){
    role.init();
    console.log(role)
    console.log('init_role')
})