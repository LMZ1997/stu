const Router=require('express').Router;
const router=Router();
const userModel=require('../models/user.js');
const hmac=require('../util/hmac.js')
const productModel=require('../models/product.js')

//未登录也可以获取购物车信息


//权限控制
router.use((req,res,next)=>{
	if(req.userInfo._id){
		next()
	}
	else{
		res.send({
			code:10
		})
	}
})
router.post('/',(req,res)=>{
	let body=req.body;
	userModel.findById(req.userInfo._id)
	.then(user=>{
		if(user){
			user.shipping.push({
				name:body.name,
				phone:body.phone,
				province:body.province,
				city:body.city,
				address:body.address,
				zip:body.zip
			})
			user.save()
			.then(newUser=>{
				res.json({
					code:0,
					data:user.shipping
				})
			})
			
		}
		else{
			res.json({
				code:1,
				errMessage:'未找到相关用户信息'
			})
		}
	})
	.catch(e=>{
		res.json({
				code:1,
				errMessage:'获取订单地址时服务器发生错误'
			})
	})
})
//获取所以地址信息
router.get('/list',(req,res)=>{
	userModel.findById(req.userInfo._id)
	.then(user=>{
		if(user.shipping){
			res.json({
				code:0,
				data:user.shipping
			})
		}
		else{
			res.json({
				code:1
			})
		}
	})
	.catch(e=>{
		res.json({
				code:1,
				errMessage:'获取订单地址时服务器发生错误'
			})
	})
})
//获取对应id的地址信息
router.get('/',(req,res)=>{
	userModel.findById(req.userInfo._id)
	.then(user=>{
		let shipping=user.shipping.id(req.query.shippingId)
		res.json({
			code:0,
			data:shipping
		})
	})
	.catch(e=>{
		res.json({
				code:1,
				errMessage:'获取对应订单地址时服务器发生错误'
			})
	})
})
//删除对应id地址
router.put('/',(req,res)=>{
	let body=req.body;
	userModel.findById(req.userInfo._id)
	.then(user=>{
		if(user){
			let newShippings=user.shipping.filter(item=>{
				return item._id!=body.shippingId
			})
			user.shipping=newShippings;
			user.save()
			.then(newUser=>{
				res.json({
					code:0,
					data:user.shipping
				})
			})
			
		}
		else{
			res.json({
				code:1,
				errMessage:'未找到相关用户信息'
			})
		}
	})
	.catch(e=>{
		res.json({
				code:1,
				errMessage:'获取订单地址时服务器发生错误'
			})
	})
})


module.exports=router;