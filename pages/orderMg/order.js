;(function(window){
	var formData = {
		pn: 1,//页码
		pSize: 15,//页容量
		id: '',//订单ID 唯一
		no: '',//订单No 唯一
		type: 0,//订单类型 0/1 采购/销售
		pre: '',//是否预售 0/1 否/是
		orderStatus: '',//订单状态 0/10/20.../70
		sample: '',//是否样品订单 0/1 大货/样品
		mode: '',//业务模式 0/1/2 撮合/三方/自营
		validate: '',//审核状态 0/1/2/-2 待申请/已申请/审核通过/审核不通过
		sourceType: '',//来源类型 0/1/2/3/4/5/6 新建/意向/报价/样品申请/库存/待采购/采购单
		employee: '',//归属业务员
		org: '',//归属部门
		customer: '',//客户ID
		customerName: '',//客户名称 左匹配模糊查询
		customerPhone:'',//客户电话 左匹配模糊查询
		consignee: '',//收货人名称 左匹配模糊查询
		consigneePhone: '',//收货人电话 左匹配模糊查询
		country: '',//客户归属国
		province:'',//客户归属省
		startTime: '',//交易开始时间（包含）
		endTime: '',//交易结束时间
	};
	window.formData = formData;	
})(window)
