;
(function(mui, window) {
	//思想传入啥 验证啥 传入验证规则等
	/**
	 * 如传入一个数组 数组中的每个成员是对象 {
	 * 	data: 要验证的数据，
	 * 	validate: 验证规则 复杂的验证规则单独验证 必须是正则 {Reg: //, msg: '}
	 * 	required: 验证是否为空
	 * 	msg: 验证失败返回的信息
	 * } 
	 * */
	var validate = function(params) {
		var flag = true;
		if(params && params.toString() === '[object Object]') {
			for(var i = 0; i < params.length; i++) {
				for(var key in params[i]) {
					if(params[i].required) {
						if(params[i].data === undefined || params[i].data === '') {
							mui.toast(params[i].msg, {
								duration: 'long',
								type: 'div'
							})
							flag = false;
							break;
						}
					}
					if(params[i].validate !== undefined && params[i].validate.Reg !== undefined && typeof params[i].validate.Reg === 'object' ) {
						if(!params[i].validate.Reg.test(params[i].data)) {
							mui.toast(params[i].validate.msg, {
								duration: 'long',
								type: 'div'
							})
							flag = false;
							break;
						}else {
							mui.toast('号码正确', {
								duration: 'long',
								type: 'div'
							})
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

	window.validate = validate;
})(mui, window)