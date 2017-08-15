;
(function(Vue) {
	// 注册 头部组件
	Vue.component('my-header', {
		template: `<header class="mui-bar mui-bar-nav">
					<h1 class="mui-title">移动ERP</h1>
					<a class="mui-icon mui-icon-bars mui-pull-left" v-on:click="showMenu"></a>
					<a class="mui-icon mui-icon-email mui-pull-right"></a>
				   </header>`,
		data:{},
		props: {},
		methods: {
			showMenu: function() {
				console.log(this.$emit)
				this.$emit('show')
				console.log('asdfasdf')
			}
		}
	})
	//注册底部banner组件
	Vue.component('my-navbar', {
		template: `<nav class="mui-bar mui-bar-tab">
						<a class="mui-tab-item mui-active" href="#tabbar">
							<span class="mui-icon mui-icon-home"></span>
							<span class="mui-tab-label">主页</span>
						</a>
						<a class="mui-tab-item" href="#tabbar-with-contact">
							<span class="mui-icon mui-icon-plus"></span>
							<span class="mui-tab-label">更多</span>
						</a>
						<a class="mui-tab-item  mui-navigate">
							<span class="mui-icon mui-icon-contact"></span>
							<span class="mui-tab-label">我的</span>
						</a>
				   </nav>`,
		data: {},
		props: {},
		methods: {

		}
	})

})(Vue)