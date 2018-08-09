const Router=require('express').Router;
const router=Router();
const CateModel=require('../models/category.js')
const page=require('../util/page.js')
const articleModel=require('../models/article.js')


router.get('/',(req,res)=>{
	res.render('admin/article')
})


router.get('/add',(req,res)=>{
	CateModel.find({},'_id name')
	.sort({order:1})
	.then((categories)=>{
		res.render('admin/article_add',{
			userInfo:req.userInfo,
			categories:categories,
		})
	})
	
})

router.post('/add',(req,res)=>{//post请求
	let body=req.body;
	
})
module.exports=router;