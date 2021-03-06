;
(function(window, Vue) {
	var filters = {}
	//订单状态
	filters.filterOrder = function(typeNum, intentionType) {
		var str = '';
		switch(typeNum) {
			case 10:
				str = '待审核';
				break;
			case 20:
				if(intentionType === 1) {
					str = '待支付尾款';
				} else {
					str = '待支付';
				};
				break;
			case 30:
				str = '待发货';
				break;
			case 40:
				str = '待发货';
				break;
			case 50:
				str = '已发货';
				break;
			case 60:
				str = '已完成';
				break;
			case 66:
				str = '待支付定金';
				break;
			case 70:
				str = '已完成';
				break;
			default:
				str = '未知状态';
				break;
		}
		return str;
	}
	//用户端设备过滤
	filters.formatClientType = function(type) {
		var client = '';
		switch(type) {
			case 0:
				client = 'ios';
				break;
			case 1:
				client = 'android';
				break;
			default:
				client = '未知';
				break;
		}
		return client;
	}
	//性别过滤
	filters.sex = function(val) {
		switch(val) {
			case 1:
				val = '男';
				break;
			case 0:
				val = '女';
				break;
		}
		return val;
	}
	//id转换为单位
	filters.idToUnit = function(val) {
		switch(val) {
			case 1:
				val = '斤';
				break;
			case 3:
				val = '克(G)';
				break;
			case 63:
				val = '公斤(KG)';
				break;
			case 64:
				val = '棵(tree)';
				break;
			case 66:
				val = '份';
				break;
			case 69:
				val = '朵(flower)';
				break;
			case 70:
				val = '瓶(bottle)';
				break;
			case 71:
				val = '吨(T)';
				break;
			case 72:
				val = '株(plant)';
				break;
			case 73:
				val = '只(only)';
				break;
			case 74:
				val = '盒(box)';
				break;
			case 110:
				val = '升(Liter)';
				break;
			case 112:
				val = '20尺柜(20GP)';
				break;
			case 113:
				val = '40尺柜(40GP)';
				break;
			case 114:
				val = '40高柜(40HQ)';
				break;
		}
		return val;
	}

	//过滤获取一批商品总价 array待过滤数组 params总价字段为字符串
	filters.priceTotal = function(array, params) {
		var total = 0;
		if(array !== undefined && params !== undefined && array instanceof Array) {
			for(var i = 0; i < array.length; i++) {
				total = total - (-array[i][params]);
			}
		}
		return total
	}

	//过滤文字长度
	filters.filterTxt = function(txt, num) {
		if(txt && txt.length > num && num && num != 0) {
			return txt.substring(0, num) + '...';
		} else {
			return txt
		}
	}

	//过滤订单类型
	filters.orderType = function(type) {
		var str = '';
		switch(type) {
			case 0:
				str = '采购订单';
				break;
			case 1:
				str = '销售订单';
				break;
			default:
				str = '未知订单';
				break;
		}
		return str;
	}
	//审核类型审核状态 0/1/2/-2 待申请/已申请/审核通过/审核不通过
	filters.validateType = function(type) {
		var str = '';
		switch(type) {
			case 0:
				str = '未审核'
				break;
			case 1:
				str = '审核中'
				break;
			case 2:
				str = '审核通过'
				break;
			case -2:
				str = '审核不通过'
				break;
			case 3:
				str = '审核不通过'
				break;
			default:
				str = '未知状态'
				break;
		}
		return str;
	}

	//时间过滤
	filters.getYMD = function(time, type) {
		if(time === undefined || time === '' || time === 0) {
			return '1970-01-01 00:00:00';
		} else {
			//兼容IOS时间显示问题
			if(typeof time !== 'number') {
				time = time.replace(/\-/g, "/").split('.')[0];
			}
			var date = new Date(time);
			var y = date.getFullYear();
			var M = date.getMonth() + 1;
			var d = date.getDate();
			var h = date.getHours();
			var m = date.getMinutes();
			var s = date.getSeconds();
			M = M < 10 ? '0' + M : M;
			d = d < 10 ? '0' + d : d;
			h = h < 10 ? '0' + h : h;
			m = m < 10 ? '0' + m : m;
			s = s < 10 ? '0' + s : s;
			switch(type) {
				case 'YYYY': //返回年
					return y + '-' + M + '-' + d;
					break;
				case 'MM': //返回 月
					return M;
					break;
				case 'DD': //返回 日
					return d;
					break;
				case 'YYYY-MM': //返回年 月
					return y + '-' + M;
					break;
				case 'YYYY-MM-DD': //返回年 月 日
					return y + '-' + M + '-' + d;
					break;
				default:
					return y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s;
					break;
			}

		}
	}
	//	初始	0	申请上架	1	上架	2	上架失败 -2  申请下架	3	下架	4	不通过继续上架 2
	filters.onsell = function(params) {
		var str = ''
		switch(params) {
			case 0:
				str = '初始';
				break;
			case 1:
				str = '申请上架';
				break;
			case 2:
				str = '已上架';
				break;
			case -2:
				str = '上架失败';
				break;
			case 3:
				str = '申请下架';
				break;
			case 4:
				str = '已下架';
				break;
			default:
				str = '未知状态'
				break;
		}
		return str
	}
	//注册过滤器
	for(var key in filters) {
		Vue.filter(key, filters[key])
	}
	window.filters = filters;
})(window, Vue)