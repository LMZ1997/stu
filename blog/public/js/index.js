(function($){
	var $register=$('#register');
	var $login=$('#login');
	var $logined=$('#logined');


	var $subRegister=$('.sub-register');
	var $subLogin=$('.sub-login');

	var $goRegister=$('.go-register');
	var $goLogin=$('.go-login');
	$goRegister.on('click',function(){
		$login.hide();
		$register.show();
	})
	$goLogin.on('click',function(){
		$login.show();
		$register.hide();
	})

	var $errRegister=$register.find('.err');
	var $errLogin=$login.find('.err');

	var usernameReg=/^[a-z][a-z|0-9|_]{2,9}$/i;
	var passwordReg=/^\w{3,10}$/

	$subRegister.on('click',function(){
		var username=$register.find('[name="username"]').val();
		var password=$register.find('[name="password"]').val();
		var repassword=$register.find('[name="repassword"]').val();
		var errMsg='';
		if(!usernameReg.test(username)){
			errMsg='用户名以字母开头由字母数字下划线组成3-10个字符'
		}
		else if(!passwordReg.test(password)){
			errMsg='密码由字母数字下划线组成3-10个字符'
		}
		else if(password!=repassword){
			errMsg='两次密码不一致'
		}

		if(errMsg){
			$err.show().html(errMsg);
		}
		else{
			//验证成功发送ajax请求
			$.ajax({
				url:'/user/register',
				data:{
					username:username,
					password:password
				},
				type:'post',
				dataType:'json'
			})
			.done(function(result){
				if(result.code==0){
					$goLogin.trigger('click');
				}
				else{
					$errRegister.show().html(result.errMessage);
				}
			})
			.fail(function(err){
				console.log(err);
			})
		}
	})
	$subLogin.on('click',function(){
		var username=$login.find('[name="username"]').val();
		var password=$login.find('[name="password"]').val();
		var errMsg='';
		if(!usernameReg.test(username)){
			errMsg='用户名以字母开头由字母数字下划线组成3-10个字符'
		}
		else if(!passwordReg.test(password)){
			errMsg='密码由字母数字下划线组成3-10个字符'
		}
		if(errMsg){
			$err.show().html(errMsg);
		}
		else{
			//验证成功发送ajax请求
			$.ajax({
				url:'/user/login',
				data:{
					username:username,
					password:password
				},
				type:'post',
				dataType:'json'
			})
			.done(function(result){
				if(result.code==0){
					/*
					$login.hide();
					$logined.find('span').html(result.data.username);
					
					$logined.show();
					*/ //第一次进来时读取index.html根本没有$logined元素,想要显示必须重新发送请求进入index.html读取
					window.location.reload();//浏览器已存储cookie，刷新时重新请求index.html
					// $logined.show();
				}
				else{
					$errLogin.show().html(result.errMessage);
				}
			})
			.fail(function(err){
				console.log(err);
			})
		}
	})

	$('.login-out').on('click',function(){
		$.ajax({
			url:'/user/loginOut',
			dataType:'json',

		})
		.done((result)=>{
			if(result.code==0){
				window.location.reload();
			}
			
			// $logined.hide();
		})
		.fail((err)=>{
			console.log(err);
		})
	})


})(jQuery)