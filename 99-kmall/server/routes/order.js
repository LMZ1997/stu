const Router=require('express').Router;
const router=Router();
const userModel=require('../models/user.js');
const hmac=require('../util/hmac.js')
const orderModel=require('../models/order.js')

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
router.get('/orderProductList',(req,res)=>{
	userModel.findById(req.userInfo._id)
	.then(user=>{
		user.getOrderProductList()
		.then(cart=>{
			res.json({
				code:0,
				data:cart
			})
		})
		.catch(e=>{
			res.json({
				code:1,
				errMessage:'获取订单商品失败'
			})
		})
	})
})

router.post('/',(req,res)=>{//创建订单
	userModel.findById(req.userInfo._id)
	.then(user=>{
		let order={}
		user.getOrderProductList()//此处过滤掉了所有checked==false的商品
		.then(result=>{
			// console.log('1:::',result)
			order.payment=result.totalPrice;
			//订单的商品
			let productList=[];
			result.cartList.forEach(item=>{
				productList.push({
					productId:item.productId._id,
					count:item.count,
					totalPrice:item.price,
					price:item.productId.price,
					images:item.productId.imagePath,
					name:item.productId.name
				})
			})
			order.productList=productList;
			//订单的地址
			let shipping=user.shipping.id(req.body.shippingId)
			order.shipping={
				shippingId:shipping._id,
				name:shipping.name,
				phone:shipping.phone,
				province:shipping.province,
				city:shipping.city,
				address:shipping.address,
				zip:shipping.zip
			}

			//订单号
			order.orderNo=Date.now().toString()+parseInt((Math.random()*10000))
			
			//赋值用户ID
			order.user=user._id;
              //创建时间本地化
              // order.createdTime=new Date(order.createdAt).tolocalTime()

			new orderModel(order)
			.save()
			.then(newOrder=>{
				res.json({
					code:0,
					data:newOrder
				})
			})
		})
		.catch(e=>{
			res.json({
				code:1,
				errMessage:'获取订单商品失败'
			})
		})
	})
})

router.get('/',(req,res)=>{
	let page=req.query.page;
	orderModel.getPageOrders(page)
	.then(result=>{
		res.json({
			code:0,
			data:{
				current:result.current,
				pageSize:result.pageSize,
				total:result.total,
				list:result.list
			}
		})
	})
	.catch(e=>{
		res.send(e);
	})
})
router.get('/detail',(req,res)=>{
	orderModel.findOne({orderNo:req.query.orderNo})
	.then(order=>{
		if(order){
			res.json({
				code:0,
				data:order
			})
		}
		else{
			res.json({
				code:1,
				errMessage:'获取订单详情失败'
			})
		}
		
	})
	.catch(e=>{
		res.json({
			code:1,
			errMessage:'您的订单去火星了'
		})
	})
})


module.exports=router;