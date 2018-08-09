const Router=require('express').Router;
const router=Router();
const CateModel=require('../models/category.js')

router.get('/',(req,res)=>{
	CateModel.find({},'_id name order')
	.sort({order:1})
	.then((categories)=>{
		res.render('main/index',{
			userInfo:req.userInfo,
			categories:categories
		})
	})
	
})

module.exports=router;