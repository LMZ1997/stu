var _util=require('util')

var _shipping={
	addShipping:function(data,success,error){
		_util.request({
			method:"post",
			data:data,
			url:'/shipping',
			success:success,
			error:error
		})
	},
	getShippings:function(success,error){
		_util.request({
			url:'/shipping/list',
			success:success,
			error:error
		})
	},
	getShipping:function(data,success,error){
		_util.request({
			data:data,
			url:'/shipping',
			success:success,
			error:error
		})
	},
	deleteShipping:function(data,success,error){
		_util.request({
			data:data,
			method:'put',
			url:'/shipping',
			success:success,
			error:error
		})
	},
}

module.exports=_shipping