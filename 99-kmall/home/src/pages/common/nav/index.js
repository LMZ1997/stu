require('./index.css')
var _user=require('service/user/index.js')
var _util=require('util')
var nav={
	init:function(){
		this.bindEvent();
		this.loadUsername();
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
	loadUsername:function(){
		_user.getUsername(function(user){
			$('.no-login').hide();
			$('.login').show();
			$('.username').text(user.username)
		})
	},
	loadCartInfo:function(){

	}
}

module.exports=nav.init();