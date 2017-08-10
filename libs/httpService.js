/**
 * 公共的请求数据模块
 * */
(function(CryptoJS, window, mui) {
	mui.init();
	var common = {}
	common.KEY = window.localStorage.KEY || 'sadfasasdf_fasdfas-_fadsfasdf-asdfasd'
	common.SID = window.localStorage.SID || 'sadfasasdf_fasdfas-_fadsfasdf-asdfasd'
	common.commonUrl = 'http://192.168.1.103:8080/front'
	common.version = 1
	common.difTime = 0
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
		var _self = this
		if(_self.difTime && cb) {
			return cb()
		} else if(_self.difTime) {
			return
		} else {
			this.commonGet(this.urlCommon + this.apiUrl.getDate).then(function(response) {
				if(response.code === '1c01') {
					var timestamp = Date.parse(new Date())
					window.localStorage.difTime = response.biz_result.time - timestamp;
					_self.difTime = response.biz_result.time - timestamp;
					if(cb) cb()
				} else {

				}
			}, function(err) {

			});
		}
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
	common.commonPost = function(url, data) {
		url = this.addSID(url);
		if(data || typeof data === 'object') {
			data.version = this.version
			var localTime = new Date().getTime();
			data.time = localTime + this.difTime
			data.sign = this.getSign('biz_module=' + data.biz_module + '&biz_method=' + data.biz_method + '&time=' + data.time)
		}
		return new Promise((resolve, reject) => {
			mui.ajax('http://192.168.1.103:8080/front/account/erpLogin.do', {
				data: data,
				crossDomain: true, //强制使用 5+跨域 基于 plus.net方法
				dataType: 'json', //服务器返回json格式数据
				type: 'post', //HTTP请求类型
				timeout: 10000, //超时时间设置为10秒；
				headers: {
					'Content-Type': 'application/json'
				},
				processData: true, //data 数据不转换 key=value&key=value形式
				success: function(data) {
					//服务器返回响应，根据响应结果，分析是否登录成功；
					resolve(data)
				},
				error: function(xhr, type, errorThrown) {
					//异常处理；
					reject()
				}
			});
		})

	}
	common.commonGet = function commonGet(url) {
		var req = new Request(url, {
			method: "GET",
			cache: 'reload'
		})
		return new Promise((resolve, reject) => {
			fetch(req).then(response => {
				if(response.ok) {
					response.json().then((data) => {
						resolve(data)
					})
				} else {
					console.log('请求失败，状态码为', response.status);
				}
			}, error => {
				reject(error)
			})
		});
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
	common.openWebViewById = function openWebViewById(webViewId, position, width) {
		var webView = plus.webview.getWebviewById(webViewId);
		if(!width) width = '70%';
		if(position === 'right') {
			webView.setStyle({
				right: '-' + width
			});
			webView.show();
			webView.setStyle({
				right: 0,
				transition: {
					duration: 150
				}
			})
		} else {
			webView.setStyle({
				left: '-' + width
			});
			webView.show();
			webView.setStyle({
				left: 0,
				transition: {
					duration: 150
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
	common.closeWebViewById = function closeWebViewById(webViewId, position, width) {
		var webView = plus.webview.getWebviewById(webViewId);
		if(!width) width = '70%';
		if(position === 'right') {
			webView.setStyle({
				right: '-' + width,
				transition: {
					duration: 150
				}
			})
		} else {
			webView.setStyle({
				left: '-' + width,
				transition: {
					duration: 150
				}
			})
		}
		setTimeout(function() {
			webView.hide()
		}, 200)
	}

	window.common = common;
})(CryptoJS, window, mui)