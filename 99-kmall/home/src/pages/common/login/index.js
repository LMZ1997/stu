require('./index.css')
var _util=require('util')

var login={
	init:function(){
		this.bindEvent()
	},
	bindEvent:function(){
		$('#btn-submit').on('click',function(){
			//获取数据
			var validate={
				username:$.trim($('[name="username"]').val()),
				password:$.trim($('[name="password"]').val())
			}
			var result=_util.validate(validate.username,'require')

			//验证数据
			if(result){
				
			}
			else{

			}
			//发送请求
		})
	}
}

$(function(){
	login.init()
})
// module.exports=login.init()