var _util=require('util')

var _shipping={
	addCart:function(data,success,error){
		_util.request({
			method:"post",
			data:data,
			url:'/cart',
			success:success,
			error:error
		})
	}
}

module.exports=_shipping