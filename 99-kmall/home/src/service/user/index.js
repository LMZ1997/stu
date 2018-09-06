
var _util=require('util')

var _user={
	logout:function(success,error){//success和error函数是由调用logout的地方传进来的
		_util.request({
			url:'/user/loginout',
			success:success,
			error:error
		})
	},
	login:function(data,success,error){//success和error函数是由调用logout的地方传进来的
		_util.request({
			method:"post",
			data:data,
			url:'/user/login',
			success:success,
			error:error
		})
	},
	getUserInfo:function(success,error){
		_util.request({
			url:'/user/userInfo',
			success:success,
			error:error
		})
	},
	register:function(data,success,error){
		_util.request({
			method:"post",
			data:data,
			url:'/user/register',
			success:success,
			error:error
		})
	},
	checkUsername:function(username,success,error){
		_util.request({
			url:'/user/checkUsername?username='+username,
			success:success,
			error:error
		})
	}
}

module.exports=_user