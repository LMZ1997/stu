var _user={
	$.ajax({
		url:'/user/logout',
		success:function(result){
			console.log(result)
		},
		error:function(e){
			console.log(e)
		}
	})
}

module.exports=_user