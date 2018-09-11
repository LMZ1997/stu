var _util=require('util')

var _product={
	addCart:function(data,success,error){
		_util.request({
			method:"post",
			data:data,
			url:'/cart',
			success:success,
			error:error
		})
	},
	getCart:function(success,error){
		_util.request({
			url:'/cart',
			success:success,
			error:error
		})
	},
	selectOne:function(data,success,error){
		_util.request({
			method:"put",
			data:data,
			url:'/cart/selectOne',
			success:success,
			error:error
		})
	},
	unselectOne:function(data,success,error){
		_util.request({
			method:"put",
			data:data,
			url:'/cart/unselectOne',
			success:success,
			error:error
		})
	}
}

module.exports=_product