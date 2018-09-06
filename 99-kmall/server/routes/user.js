const Router=require('express').Router;
const router=Router();
const userModel=require('../models/user.js');
const hmac=require('../util/hmac.js')


// router.get('/init',(req,res)=>{
// 	const users={
// 		username:'test',
// 		password:hmac('test')
// 	};
	
// 	userModel.create(users)
// 	.then((data)=>{
// 		res.send('ok')
// 	})
// })










router.post('/register',(req,res)=>{//点击注册发送了注册请求
	let body=req.body;
	var result={
		code:0,
		errMessage:''
	}
	userModel
	.findOne({username:body.username})
	.then((user)=>{
		if(user){
			result.code=10,
			result.errMessage='用户名已存在';
			res.json(result);
		}
		else{
			new userModel({
				username:body.username,
				password:hmac(body.password),
				// isAdmin:true
			})
			.save((err,newUser)=>{
				if(!err){
					res.send(result);
				}
				else{
					result.code=10;
					result.errMessage='注册失败';
					res.send(result);
				}
			})
		}
	})
})
router.post('/login',(req,res)=>{//点击登录发送了登录请求
	let body=req.body;
	var result={
		code:0,
		errMessage:''
	}
	userModel
	.findOne({username:body.username,password:hmac(body.password),isAdmin:false})
	.then((user)=>{
		if(user){
			req.session.userInfo={
				_id:user._id,
				username:user.username,
				isAdmin:user.isAdmin
			}
			res.json(result);
		}
		else{
			result.code=1;
			result.errMessage='用户名或密码错误';
			res.json(result);
		}
	})
})

// router.use((req,res,next)=>{
// 	if(req.userInfo.isAdmin){
// 		next()
// 	}
// 	else{
// 		res.send({
// 			code:10
// 		})
// 	}
// })
router.get('/userInfo',(req,res)=>{
	if(req.userInfo._id){
		res.json({
			code:0,
			data:req.userInfo
		})
	}
	else{
		res.send({
			code:1,
		})
	}
})
router.get('/loginOut',(req,res)=>{//点击退出发送了退出请求
	var result={
		code:0,
		errMessage:''
	}
	// req.cookies.set('userInfo',null);
	req.session.destroy();
	res.json(result);
})
router.get('/checkUsername',(req,res)=>{//点击注册发送了注册请求
	console.log(req.query)
	let username=req.query.username;
	var result={
		code:0,
		errMessage:''
	}
	userModel
	.findOne({username:username})
	.then((user)=>{
		if(user){
			result.code=1,
			result.errMessage='用户名已存在';
		}
		res.json(result);
	})
})


module.exports=router;