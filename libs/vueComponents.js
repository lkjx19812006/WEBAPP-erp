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
	//注册底部tabbar组件
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
	//注册全局select组件
	Vue.component('my-select', {
		template: '<div style="display: flex; flex-direction: column;justify-content: flex-start; position:relative; width: 100%; height: 100%;">' +
			'<input readonly :placeholder="placeholder" ref="input" v-on:change="change" v-on:focus="showList = true" v-on:blur="blur" type="text" style="flex:1;height: 100%; width: 100%; margin: 0; padding: 0 10px; padding-right:20px; margin-bottom: 5px;" />' +
			'<span style="position: absolute; right: 8px;top:50%; margin-top: -6px; height: 0; width: 0; border: 8px solid transparent; border-top-color: #666;"></span>' +
			'<div v-show="showList" style="position: absolute;top:100%; left: 0;z-index: 99;max-height:200px; box-shadow: 0 0 5px #333; border-radius:4px;overflow:hidden;overflow-y:auto; width: 100%; background-color: #e0e0e0; padding: 5px 0;">' +
			'<div v-tap="{func: selected, params:item}" style="padding:10px;background-color: #fff; color: #333;border-bottom: 1px solid #d0d0d0" v-for="item in options">' +
			'{{item.label}}' +
			'</div>' +
			'</div>' +
			'</div>',
		data: function() {
			return {
				showList: false,
				nowSelectData: {},
			}
		},
		props: {	
			placeholder: {
				type: String,
				default: '请选择！！！'
			},
			options: {
				type: Array,
				default: function() {
					return []
				}
			}
		},
		methods: {
			selected: function(params) {
				//选中项目
				this.nowSelectData = params;
				this.$refs.input.value = params.label;
				//双向绑定
				this.$emit('input', params.value);
				this.change();
			},
			change: function() {
				//change事件传值
				this.$emit('change', this.nowSelectData)
			},
			blur: function() {
				var _self = this;
				setTimeout(function() {
					_self.showList = false
				}, 100)
			}
		}
	})

})(Vue, mui)