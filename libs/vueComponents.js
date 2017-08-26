(function(Vue, mui, common) {
	// 注册 头部组件
	Vue.component('my-header', {
		template: '<header class="mui-bar mui-bar-nav">' +
			'<h1 v-tap="{' + "func" + ':mysrolltop}" class="mui-title">{{title}}</h1>' +
			'<a v-tap="{func: showMenu}" class="mui-icon mui-action-menu mui-icon-bars mui-pull-left"></a>' +
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
			'<input readonly :placeholder="placeholder" ref="inputLabel" v-on:change="change" v-on:focus="focus" v-on:blur="blur" type="text" style="flex:1;height: 100%; width: 100%; margin: 0; padding: 0 10px; padding-right:20px;" />' +
			'<input v-bind:value="value"  ref="input" style="display:none" />' +
			'<span style="position: absolute; right: 8px;top:50%; margin-top: -4px; height: 0; width: 0; border: 6px solid transparent; border-top-color: #aaa;"></span>' +
			'<div v-show="showList" style="position: absolute;top:100%; left: 0;z-index: 1;max-height:200px; box-shadow: 0 0 5px #333; border-radius:4px;overflow:hidden;overflow-y:auto; width: 100%; background-color: #e0e0e0; padding: 5px 0;margin-top: 5px;">' +
			'<div v-tap="{func: selected, params:item}" style="padding:10px;background-color: #fff; color: #333;border-bottom: 1px solid #d0d0d0;" v-for="item in options" :key="item.value">' +
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
		watch: {
			value: function(newVal, oldVal) {
				//只绑定了ID 构建一个对象 change的时候用 并实现label显示
				var obj = {}
				for(var i = 0; i < this.options.length; i++) {
					if(this.options[i].value === newVal) {
						obj.label = this.options[i].label;
						obj.value = this.options[i].value;
						break;
					}
				}
				this.nowSelectData = obj;
				if(obj.value !== undefined) {
					this.$refs.inputLabel.value = obj.label;
					this.$refs.input.value = obj.value;
					this.$emit('input', obj.value);

				} else {
					this.$refs.inputLabel.value = '';
					this.$refs.input.value = '';
					this.$emit('input', '');
				}
				this.change();
			}
		},
		props: {
			value: '',
			placeholder: {
				type: String,
				default: '请选择！'
			},
			desabled: {
				type: Boolean,
				default: false
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
				this.$refs.inputLabel.value = params.label;
				this.$refs.input.value = params.value;

				//双向绑定
				this.$emit('input', params.value);
				this.change();
				this.$refs.inputLabel.blur();
			},
			change: function() {
				//change事件传值
				this.$emit('change', this.nowSelectData)
			},
			focus: function() {
				this.showList = true && !this.desabled;
			},
			blur: function() {
				var _self = this;
				setTimeout(function() {
					_self.showList = false
				}, 50)
			}
		}
	})

	Vue.component('my-input', {
		template: '<input class="mui-input-numbox" type="number" ref="input" v-bind:value="value" v-on:input="updateValue($event.target.value)">',
		props: ['value'],
		methods: {
			// 不是直接更新值，而是使用此方法来对输入值进行格式化和位数限制
			updateValue: function(value) {
				var formattedValue = value
					// 删除两侧的空格符
					.trim()
					// 保留 2 小数位
					.slice(
						0,
						value.indexOf('.') === -1 ?
						value.length :
						value.indexOf('.') + 3
					)
				// 如果值不统一，手动覆盖以保持一致
				if(formattedValue !== value) {
					this.$refs.input.value = formattedValue
				}
				// 通过 input 事件发出数值
				this.$emit('input', Number(formattedValue))
			}
		}
	})

	//注册全局的图片上传
	Vue.component('my-updateimg', {
		template: '<div class="img_up" style="display: flex; flex-direction: row; justify-content: space-between; padding: 0;flex-wrap: wrap;">' +
			'<div v-for="item,index in imglist" :key="index" style="position: relative; margin: 5px; border:2px solid #d0d0d0;border-radius: 10px; padding:5px;display: flex;flex-direction: row; justify-content: center;align-items: center;height: 120px; width: 120px;">' +
			'<div class="img-wrap" style="flex: 0 0 auto;height: 100%; width: 100%; overflow: hidden;display: flex;flex-direction: row; justify-content: center;align-items: center;">' +
			'<img style="max-width: 100%;" :src="item" />' +
			'</div>' +
			'<span v-tap="{func:deleteImg, params:index}" class="mui-icon mui-icon-close" style="position: absolute; right: -10px; top:-10px; color: red; font-weight: 700;border-radius: 12px;"></span>' +
			'</div>' +
			'<button v-show="imglist.length < maxImgNum" style="margin: 5px;flex: 0 0 auto; height: 120px; width: 120px; border: 2px solid #d0d0d0; border-radius: 10px; background-color: #f0f0f0" v-tap="{func: getImgFile}">' +
			'<span class="mui-icon mui-icon-image"  style="font-size: 80px; color: #b0b0b0"></span>' +
			'</button>' +
			'</div>',
		data: function() {
			return {
				keyName: 'intention', //七牛图片地址
				token: '',
				url: ''
			}
		},
		props: {
			imglist: {
				type: Array,
				default: function() {
					return []
				}
			},
			maxImgNum: {
				type: Number,
				default: 4
			}
		},
		methods: {
			//获取图片文件路径
			getImgFile: function() {
				if(this.imglist.length >= this.maxImgNum) {
					return;
				}
				//获取token
				var _self = this;
				this.getToken(function() {
					//选取文件对象 事件回调里面的是文件的路径
					plus.gallery.pick(function(event) {
						_self.createUpload(event)
					})
				})

			},
			//删除图片
			deleteImg: function(index) {
				this.$emit('deleltimg', index);
			},
			//获取七牛token
			getToken: function(success) {
				//先从本地获取有没有七牛token 没有 再从服务器获取
//				if(common.getItem("qnToken") && common.getItem('qnImgUrl')) {
//					this.token = common.getItem("qnToken");
//					this.url = common.getItem('qnImgUrl');
//					if(typeof success === 'function') {
//						success()
//					}
//					return
//				};
				var url = common.commonUrl + common.apiUrl.most;
				var body = {
					biz_module: 'filesService',
					biz_method: 'getQiNiuToken',
					biz_param: {
						bucketName: this.keyName
					}
				};
				var _self = this;
				common.commonPost(url, body, function(suc) {
					_self.token = suc.biz_result.token;
					_self.url = suc.biz_result.url;
					common.setItem('qnToken', _self.token);
					common.setItem('qnImgUrl', _self.url);
					if(typeof success === 'function') {
						success()
					}
				}, function(err) {

				})
			},
			//创建上传任务
			createUpload: function(event) {
				// file:///storage/emulated/0/tencent/MicroMsg/1501133375877_0209ef0e.jpg 获取的地址类似于这样
				//从后往前找 截取文件名称
				var _self = this;
				var name = event.substr(event.lastIndexOf('/') + 1);

				var task = plus.uploader.createUpload("http://upload.qiniu.com", {
						method: "POST",
					},
					function(t, status) {
						//获取结果
						var result = JSON.parse(t.responseText);
						var url = _self.url + '/' + result.key;
						//成功后告诉应用页面 更新数据
						_self.$emit('getimgurl', url);
					}
				);
				//压缩图片
				var newUrl = '_doc/' + name;
				plus.zip.compressImage({
					src: event, //原图片路径
					dst: newUrl, //现图片路径
					overwrite: true, //覆盖生产新文件
					quality: 50, //压缩质量
				}, function(zip) {
					//添加文件
					task.addFile(zip.target, {
						key: "file"
					});

					//设置文件名
					var keyName = new Date().getTime() + Math.floor(Math.random() * 100000000000).toString() + '.' + name.split('.')[1];
					task.addData('key', keyName)

					//添加token
					task.addData("token", _self.token);

					task.start();
				}, function(zipe) {
					mui.toast('压缩失败！')
				});

			}

		}

	})

})(Vue, mui, common)