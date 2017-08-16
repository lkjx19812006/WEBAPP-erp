/**
 * 公共的请求数据模块
 * */
(function(CryptoJS, window, mui, Vue) {
	mui.init();
	var common = {}
	common.KEY = window.localStorage.KEY || ''
	common.SID = window.localStorage.SID || ''
	common.commonUrl = 'http://192.168.1.142/front'
	common.version = 1
	common.difTime = window.localStorage.difTime || 0
	common.apiUrl = {
		login: '/account/erpLogin.do',
		code_login: '/account/verifiLogin.do',
		getDate: '/system/date.do',
		most: '/handle/control.do'
	}
	common.addSID = function addSID(url) {
		if(this.SID && this.SID !== undefined) {
			return url + ';jsessionid=' + this.SID
		} else {
			return url
		}
	}
	common.getDate = function getDate(cb) {
		this.commonGet(this.commonUrl + this.apiUrl.getDate, function(response) {
			var timestamp = Date.parse(new Date())
			common.setItem('difTime', response.biz_result.time - timestamp)
			common.difTime = response.biz_result.time - timestamp
			window.localStorage.difTime = response.biz_result.time - timestamp
			console.log(response.biz_result.time - timestamp)
			if(cb) cb()
		}, function(err) {
			mui.toast(err, {
				duration: 'long',
				type: 'div'
			})
		})
	}
	common.getSign = function getSign(str) {
		var _self = this;
		if(!_self.KEY) {
			_self.KEY = 'test'
		}
		if(!str) {
			str = 'test'
		}
		var signStr = CryptoJS.HmacSHA1(str, _self.KEY).toString(CryptoJS.enc.Base64)
		return signStr
	}
	common.commonPost = function(url, data, suc, err) {
		url = this.addSID(url);
		if(data || typeof data === 'object') {
			data.version = this.version
			var localTime = new Date().getTime();
			data.time = localTime - (-window.localStorage.difTime) || 0;
			data.sign = this.getSign('biz_module=' + data.biz_module + '&biz_method=' + data.biz_method + '&time=' + data.time)
		}
		console.log(JSON.stringify(data))
		console.log(JSON.stringify(url))
		mui.ajax(url, {
			data: data,
			crossDomain: true, //强制使用 5+跨域 基于 plus.net方法
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			},
			processData: true, //data 数据不转换 key=value&key=value形式,		
			success: function(data) {
				//服务器返回响应，根据响应结果，分析是否登录成功；
				suc(data)
				console.log(JSON.stringify(data))
			},
			error: function(xhr, type, errorThrown) {
				console.log(JSON.stringify(errorThrown))
				//异常处理；
				err(JSON.stringify(type))
			}
		});

	}
	common.commonGet = function commonGet(url, suc, err) {
		console.log(url)
		mui.ajax(url, {
			crossDomain: true, //强制使用 5+跨域 基于 plus.net方法
			dataType: 'json', //服务器返回json格式数据
			type: 'get', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			},
			processData: true, //data 数据不转换 key=value&key=value形式
			success: function(data) {
				//服务器返回响应，根据响应结果，分析是否登录成功；
				suc(data)
				console.log(JSON.stringify(data))
			},
			error: function(xhr, type, errorThrown) {
				mui.toast(errorThrown, {
					duration: 'short',
					type: 'div'
				})
				//异常处理；
				err(JSON.stringify(type))
			}
		});
	}

	//过滤掉数据请求对象为空的字段
	common.filterFormData = function(params) {
		if(params && typeof params == 'object') {
			var obj = {};
			for(var key in params){
				if(params[key] || params[key] === 0 || params[key] === false) obj[key] = params[key];
			}			
			return obj;
		} else {
			return params;
		}
	}

	/**
	 * 本地存儲 調用原生api
	 * 1.获取键值对总数
	 * */
	common.getLength = function() {
		return plus.storage.getLength();
	}

	/**
	 * 本地存儲 調用原生api
	 * 2.通过键(key)检索获取应用存储的值
	 * */
	common.getItem = function(key) {
		return plus.storage.getItem(key);
	}

	/**
	 * 本地存儲 調用原生api
	 * 3.修改或添加键值(key-value)对数据到应用数据存储中
	 * 注意点 如果传false 会不成功 所以最好穿字符创或者对象
	 * */
	common.setItem = function(key, value) {
		plus.storage.setItem(key, value);
	}

	/**
	 * 本地存儲 調用原生api
	 *4.修改或添加键值(key-value)对数据到应用数据存储中
	 * */
	common.removeItem = function(key) {
		plus.storage.removeItem(key);
	}
	/**
	 * 本地存儲 調用原生api
	 *5.清除应用所有的键值对存储数据
	 * */
	common.clear = function(key) {
		plus.storage.clear();
	}
	/**
	 * 本地存儲 調用原生api
	 *6.获取键值对中指定索引值的key值
	 * */
	common.key = function(key) {
		plus.storage.key(index);
	}

	/*
	 *打开菜单
	 * webViewId 窗口ID
	 * position 方向位置 left 或者 right
	 * width 盒子宽度 根据盒子设置的大小设置 否则会遮盖头部
	 * **/
	common.openWebViewById = function openWebViewById(webViewId, position) {
		var webView = plus.webview.getWebviewById(webViewId);
		if(position === 'right') {
			console.log(position)
			webView.setStyle({
				right: '-30%'
			});
			webView.show();
			webView.setStyle({
				right: 0,
				transition: {
					duration: 200
				}
			})
		} else {
			webView.setStyle({
				left: '-30%'
			});
			webView.show();
			webView.setStyle({
				left: 0,
				transition: {
					duration: 200
				}
			})
		}

	}
	/*
	 *关闭菜单
	 * webViewId 窗口ID
	 * position 方向位置 left 或者 right
	 * width 盒子宽度 根据盒子设置的大小设置 否则会遮盖头部
	 * **/
	common.closeWebViewById = function closeWebViewById(webViewId, position) {
		var webView = plus.webview.getWebviewById(webViewId);
		if(position === 'right') {
			webView.setStyle({
				right: '-85%',
				zindex: 9999,
				transition: {
					duration: 250
				}
			})
			setTimeout(function() {
				webView.close()
			}, 300)
		} else {
			webView.setStyle({
				left: '-70%',
				zindex: 9999,
				transition: {
					duration: 250
				}
			})
			setTimeout(function() {
				webView.close()
			}, 300)
		}

	}
	//登录状态校验
	common.validateLogin = function() {
		if(!common.getItem('KEY') || !common.getItem('SID')) {
			mui.openWindow({
				url: 'login.html',
				id: 'login',
				createNew: false, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
				waiting: {
					autoShow: false, //自动显示等待框，默认为true
					//					title: '正在加载...', //等待对话框上显示的提示内容
				}
			})
			return false;
		}
		return true;
	}

	//自定义指令 tap
	if(Vue) {
		//全局tap事件 doubletap
		Vue.directive('tap', {
			bind: function(el, binding) {
				var _self = this;
				el.addEventListener('tap', function(e) {
					if(typeof binding.value.func === 'function') {
						if(binding.value.params !== undefined) {
							binding.value.func.call(_self,binding.value.params,e);
						} else {
							binding.value.func.call(_self,e);
						}
					} else {
						return console.error('The param of directive "v-tap" must be a Object!');
					}
				}, false)
			}
		})
	}

	Vue.use(window.VueI18n)
	//国际化处理		
	var messages = {
		zh: window.zh,
		en: window.en
	};
	window.i18n = new window.VueI18n({
		locale: 'zh',
		messages:messages
	})

	//表单校验
	common.validate = function(params) {
		var flag = true;
		if(params && typeof params === 'object') {
			for(var i = 0; i < params.length; i++) {
				for(var key in params[i]) {
					if(params[i].required) {
						if(params[i].data === undefined || params[i].data === '') {
							mui.toast(params[i].msg, {
								duration: 'short',
								type: 'div'
							})
							flag = false;
							return flag;
						}
					}
					if(params[i].validate !== undefined && params[i].validate.Reg !== undefined && typeof params[i].validate.Reg === 'object') {
						if(!params[i].validate.Reg.test(params[i].data)) {
							mui.toast(params[i].validate.msg, {
								duration: 'short',
								type: 'div'
							})
							flag = false;
							return flag;
						}
					}
				}
				if(!flag) {
					break
				}
			}
		} else {
			return false;
		}
		return flag;
	}
	//常用验证规则
	common.ruls = {
		phone: function(data) {
			return {
				data: data,
				required: true,
				msg: window.i18n.t('message.enter_phone'),
				validate: {
					Reg: /^1[34578]\d{9}$/,
					msg: window.i18n.t('message.enter_phone')
				}
			}
		},
		no: function(data) {
			return {
				data: data,
				required: true,
				msg: window.i18n.t('message.empty_account'),
			}
		},
		password: function(data) {
			return {
				data: data,
				required: true,
				msg: window.i18n.t('message.empty_password')
			}
		}

	}
	window.common = common;

})(CryptoJS, window, mui, Vue)