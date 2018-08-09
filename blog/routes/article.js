const Router=require('express').Router;
const router=Router();
const CateModel=require('../models/category.js')
const page=require('../util/page.js')
const articleModel=require('../models/article.js')

// console.log('aaa')
router.get('/',(req,res)=>{
	console.log('aaa')
	res.render('admin/article')
})


router.get('/add',(req,res)=>{
	res.render('admin/article')
})
module.exports=router;