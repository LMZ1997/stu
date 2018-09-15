var _util=require('util')

var _order={
	getOrderProductList:function(success,error){//订单确认页
		_util.request({
			url:'/order/orderProductList',
			success:success,
			error:error
		})
	},
	createOrder:function(data,success,error){
		_util.request({
			url:'/order',
			method:'post',
			data:data,
			success:success,
			error:error
		})
	},
	getOrders:function(data,success,error){//data->分页信息
		_util.request({
			url:'/order',
			data:data,
			success:success,
			error:error
		})
	},
	getOrderDetail:function(data,success,error){//data->订单编号
		_util.request({
			url:'/order/detail',
			data:data,
			success:success,
			error:error
		})
	},
	
}

module.exports=_order