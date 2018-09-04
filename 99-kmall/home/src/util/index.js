var _util={
	request:function(params){
		var _this=this;
		$.ajax({
			url:params.url||'',
			method:params.method||'get',
			dataType:params.dataType||'json',
			data:params.data||'',
			success:function(result){
				//请求成功
				if(result.code==0){
					params.success&&params.success(result.data)
				}
				//没有登录
				else if(result.code==10){
					_this.toLogin()
				}
				//请求数据错误
				else  if(result.code==1){
					params.error&&params.error(result.errMessage)
				}
			},
			error:function(err){
				params.error&&params.error(err.statusText)
			}

		})
	},
	toLogin:function(){
		window.location.href='./user-login.html'
	}
}
module.exports=_util