;
(function(Vue, mui) {
	// 注册 头部组件
	Vue.component('my-header', {
		template: '<header class="mui-bar mui-bar-nav">' +
			'<h1 v-tap="{' + "func" + ':mysrolltop}" class="mui-title">{{title}}</h1>' +
			'<a v-tap="{func: showMenu}" class="mui-icon mui-action-menu mui-icon-bars mui-pull-left"></a>' +
			'<a class="mui-icon mui-icon-email mui-pull-right"></a>' +
			'</header>',
		data: function() {
			return {}
		},
		props: {
			title: {
				type: String,
				default: ''
			}
		},
		methods: {
			showMenu: function() {
				this.$emit('show')
			},
			mysrolltop: function() {
				this.$emit('mysrolltop')
			}
		}
	})
	//注册底部banner组件
	Vue.component('my-navbar', {
		template: '<nav class="mui-bar mui-bar-tab">' +
			'<a class="mui-tab-item mui-active" href="#tabbar">' +
			'<span class="mui-icon mui-icon-home"></span>' +
			'<span class="mui-tab-label">主页</span>' +
			'</a>' +
			'<a class="mui-tab-item" href="#tabbar-with-contact">' +
			'<span class="mui-icon mui-icon-plus"></span>' +
			'<span class="mui-tab-label">更多</span>' +
			'</a>' +
			'<a class="mui-tab-item  mui-navigate">' +
			'<span class="mui-icon mui-icon-contact"></span>' +
			'<span class="mui-tab-label">我的</span>' +
			'</a>' +
			'</nav>',
		data: function() {
			return {}
		},
		props: {},
		methods: {

		}
	})

	//注册弹出菜单组件内容
	Vue.component('my-menu', {
		template: '<ul class="mui-table-view">' +
			'<li class="mui-table-view-cell mui-collapse mui-active" style="border-bottom:1px solid #d0d0d0" v-for="item in menuList">' +
			'<a class="mui-navigate-right" href="#">{{item.title}}</a>' +
			'<div class="mui-collapse-content" v-for="subItem in item.list" v-tap="{func:openWindow, params:subItem}">' +
			'<p style="font-size:16px; padding: 5px;">{{subItem.title}}</p>' +
			'</div>' +
			'</li>' +
			'</ul>',
		data: function() {
			return {
				menuList: [{
					title: '订单管理',
					list: [{
						url: '../pages/orderMg/myOrder.html',
						id: 'myOrder',
						title: '我的订单'
					}, {
						url: '../pages/orderMg/departmentOrder.html',
						id: 'departmentOrder',
						title: '部门订单'
					}, {
						url: '../pages/orderMg/allOrder.html',
						id: 'allOrder',
						title: '全部订单'
					}, {
						url: '../pages/orderMg/myOrder.html',
						id: 'myOrder',
						title: '我的收付款'
					}, {
						url: '../pages/orderMg/myOrder.html',
						id: 'myOrder',
						title: '部门收付款'
					}, {
						url: '../pages/orderMg/myOrder.html',
						id: 'myOrder',
						title: '我的补充合同'
					}, {
						url: '../pages/orderMg/myOrder.html',
						id: 'myOrder',
						title: '部门补充合同'
					}, {
						url: '../pages/orderMg/myOrder.html',
						id: 'myOrder',
						title: '我的售后单'
					}, {
						url: '../pages/orderMg/myOrder.html',
						id: 'myOrder',
						title: '部门售后单'
					}, {
						url: '../pages/orderMg/myOrder.html',
						id: 'myOrder',
						title: '需要我采购'
					}]
				}]
			}
		},
		props: {},
		methods: {
			openWindow: function(params) {
				nowPage = mui.preload({
					url: params.url,
					id: params.id,
					createNew: false,
					styles: {
						"render": "always",
						"popGesture": "hide",
					}
				});
				setTimeout(function() {
					nowPage.show("slide-in-right", 300)
				}, 200)
			}
		}
	})

})(Vue, mui)