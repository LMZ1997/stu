const Router=require('express').Router;
const router=Router();
const userModel=require('../models/user.js');
const hmac=require('../util/hmac.js')
console.log('hmac',hmac)

router.post('/register',(req,res)=>{
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
				password:hmac(body.password)
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
router.post('/login',(req,res)=>{
	let body=req.body;
	console.log(body);
	var result={
		code:0,
		errMessage:''
	}
	userModel
	.findOne({username:body.username,password:hmac(body.password)})
	.then((user)=>{
		if(user){
			console.log(body.password)
			console.log('pwd',hmac(body.password))
			result.data={
				_id:user._id,
				username:user.username,
				isAdmin:user.isAdmin
			}
			req.cookies.set('userInfo',JSON.stringify(result.data))
			res.json(result);
		}
		else{
			console.log(body.username)
			console.log(body.password)
			console.log('pwd',hmac(body.password))
			result.code=10;
			result.errMessage='用户名或密码错误';
			res.json(result);
		}
	})
})
router.get('/loginOut',(req,res)=>{
	var result={
		code:0,
		errMessage:''
	}
	req.cookies.set('userInfo',null);
	res.json(result);
})

module.exports=router;