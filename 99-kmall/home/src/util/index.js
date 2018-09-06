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
					// _this.toLogin()
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
	},
	validate:function(value,type){
		if(type=='require'){
			return !!value
		}
		if(type=='username'){
			return /^[a-zA-Z0-9]{3,10}$/.test(value)
		}
		if(type=='password'){
			return /^[a-zA-Z0-9]{3,10}$/.test(value)
		}
		if(type=='phone'){
			return /^1[3568]\d{9}$/.test(value)
		}
		if(type=='email'){
			return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value)
		}
	}
}
module.exports=_util