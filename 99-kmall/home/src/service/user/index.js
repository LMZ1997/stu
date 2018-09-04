
var _util=require('util')

var _user={
	logout:function(success,error){//success和error函数是由调用logout的地方传进来的
		_util.request({
			url:'/user/loginout',
			success:success,
			error:error
		})
	}
}

module.exports=_user