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
router.get('/',(req,res)=>{
	userModel.findById(req.userInfo._id)
	.then(user=>{
		user.getOrderProductlist()
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


module.exports=router;