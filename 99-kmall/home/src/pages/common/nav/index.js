require('./index.css')
var _user=require('service/user/index.js')
var _util=require('util')
var nav={
	init:function(){
		this.bindEvent();
		this.loadUserInfo();
		this.loadCartInfo();
		return this;
	},
	bindEvent:function(){
		$('#logout').on('click',function(){
			_user.logout(function(){           //->成功，传递success函数
				window.location.reload()
			},function(){                      //->失败，传递error函数
				_util.toLogin()
			});
		})
	},
	loadUserInfo:function(){

	},
	loadCartInfo:function(){

	}
}

module.exports=nav.init();