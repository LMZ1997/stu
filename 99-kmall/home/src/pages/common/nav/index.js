require('./index.css')
var _user=require('service/user/index.js')

var nav={
	init:{
		this.bindEvent();
		this.loadUserInfo();
		this.loadCart();
	},
	bindEvent:function(){
		$('#logout').on('click',function(){

		})
	},
	loadUserInfo:function(){

	},
	loadCart:function(){

	}
}

module.exports=nav.init();