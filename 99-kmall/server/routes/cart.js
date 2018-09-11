const Router=require('express').Router;
const router=Router();
const userModel=require('../models/user.js');
const hmac=require('../util/hmac.js')
const productModel=require('../models/product.js')

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
			if(user.cart){
				let item=user.cart.cartList.forEach(item=>{
					return item.productId==body.productId
				})
				if(item){
					cartItem.count = cartItem.count + parseInt(body.count)
				}else{
					user.cart.cartList.push(body)
				}
			}
			else{ //如果没有user.cart，那么用户未添加过购物车，user.cart为空，需要初始化添加
				user.cart={
					cartList:[body],
				}
			}
			user.save()
			.then(newUser=>{
				res.json({
					code:0,
					message:'添加购物车成功'
					// data:result
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
})
router.get('/',(req,res)=>{
	userModel.findById(req.userInfo._id)
	.then(user=>{
		user.getCart()
		.then(cart=>{
			res.json({
				code:0,
				data:cart
			})
		})
		.catch(e=>{
			res.json({
				code:1,
				errMessage:'获取购物车商品失败'
			})
		})
	})
})
router.put('/selectOne',(req,res)=>{
	let body=req.body;
	userModel.findById(req.userInfo._id)
	.then(user=>{
		if(user){
			if(user.cart){
				let cartItem=user.cart.cartList.find(item=>{
					return item.productId==body.productId
				})
				if(cartItem){
					cartItem.checked=true
				}else{
					res.json({
						code:1,
						errMessage:'操作失败'
					})
				}
			}
			else{ //如果没有user.cart，那么用户未添加过购物车，user.cart为空，需要初始化添加
				user.cart={
					cartList:[body],
				}
			}
			user.save()//任一数据变化都会触发save函数
			.then(newUser=>{
				user.getCart()
				.then(cart=>{
					res.json({
						code:0,
						data:cart
					})
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
})
router.put('/unselectOne',(req,res)=>{
	let body=req.body;
	userModel.findById(req.userInfo._id)
	.then(user=>{
		if(user){
			if(user.cart){
				let cartItem=user.cart.cartList.find(item=>{
					return item.productId==body.productId
				})
				if(cartItem){
					cartItem.checked=false
				}else{
					res.json({
						code:1,
						errMessage:'购物车记录不存在'
					})
				}
			}
			else{ //如果没有user.cart，那么用户未添加过购物车，user.cart为空，需要初始化添加
				user.cart={
					cartList:[body],
				}
			}
			user.save()//任一数据变化都会触发save函数
			.then(newUser=>{
				user.getCart()
				.then(cart=>{
					res.json({
						code:0,
						data:cart
					})
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
})


module.exports=router;