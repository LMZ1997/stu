const Router=require('express').Router;
const router=Router();
const CateModel=require('../models/category.js')

router.get('/',(req,res)=>{
	res.render('admin/category')
})

router.get('/add',(req,res)=>{//get请求
	res.render('admin/newCate')
})


router.post('/add',(req,res)=>{//post请求
	let body=req.body;
	var result={
		code:0,
		errMessage:''
	}
	CateModel.findOne({name:body.name})
	.then((cate)=>{
		if(cate){
			result.code=10,
			result.errMessage='用户名已存在';
			res.json(result);
		}
		else{
			new CateModel({
				name:body.name,
				order:body.order
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
			// .then((newCate)=>{
			// 	res.send('ok')
			// })
			// .catch((e)=>{
			// 	res.send(e);
			// })
		}
	})
	// .catch(()=>{？？？？？？？？？？？？？？？？？？？？？？？
		
	// })
})
module.exports=router;