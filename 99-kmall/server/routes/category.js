const Router=require('express').Router;
const router=Router();
const CateModel=require('../models/category.js')
const page=require('../util/page.js')



router.use((req,res,next)=>{
	// console.log('1::',req.userInfo)
	if(req.userInfo.isAdmin){
		next()
	}
	else{
		res.send({
			code:10
		})
	}
})
router.post('/',(req,res)=>{//post请求
	let body=req.body;
	CateModel.findOne({name:body.name,pid:body.pid})//不仅需要判断name
	.then((cate)=>{
		if(cate){
			res.send({
				code:1,
				errMessage:'添加分类失败，分类已存在'
			})
		}
		else{
			new CateModel({
				name:body.name,
				pid:body.pid
			})
			.save()
			.then((newCate)=>{
				if(newCate){
					if(body.pid==0){//判断如果添加的是一级分类，那么要更新页面的分类列表，需要传回最新数据
						CateModel.find({pid:0},'name _id')
						.then((data)=>{
							if(data){
								res.json({
									code:0,
									data:data
								})
							}
							else{
								res.send({
									code:1,
									errMessage:'添加分类失败，数据库操作失败'
								})
							}
						})
					}
					else{
						res.json({
							code:0
						})
					}
				}
				else{
					res.send({
						code:1,
						errMessage:'添加分类失败，数据库操作失败'
					})
				}
			})
			.catch((e)=>{
				res.send(e);
			})
		}
	})
})
router.get('/',(req,res)=>{
	let pid=req.query.pid;
	let pageNum=req.query.page;
	if(pageNum){
		let options={
			page:pageNum,
			model:CateModel,
			query:{pid:pid},
			sort:{_id:-1},
			projection:'_id name order pid',
		}
		page(options)
		.then((data)=>{
			res.json({
				code:0,
				data:{
					current:data.current,
					pageSize:data.pageSize,
					total:data.total,
					list:data.list
				}
				
			})
		})
	}
	else{
		CateModel.find({pid:pid},'name _id')
		.then((data)=>{
			if(data){
				res.json({
					code:0,
					data:data
				})
			}
			else{
				res.send({
					code:1,
					errMessage:'添加分类失败，数据库操作失败'
				})
			}
		})
		.catch((e)=>{
			res.send(e);
		})
	}
	
})
















router.get('/',(req,res)=>{
	let options={
		page:req.query.page,
		model:CateModel,
		query:{},
		sort:{order:1},
		projection:'_id name order',
	}
	page(options)
	.then((data)=>{
		res.render('admin/category',{//?????????????????????不用传userInfo
			docs:data.docs,
			page:data.page,//注意page的类型是否是Number
			lists:data.list,
			pages:data.pages,//为了前端页面判断是否需要显示分页栏
			url:'/category'//为了把分页做成一个多次调用的页面->page.html
		})
	})
	
})

router.get('/add',(req,res)=>{//get请求

	res.render('admin/category_edit_add')//请求添加分类页面和请求编辑分类页面合为一个
									//区别在于一个向页面传递了一个category对象，一个没有
})




router.get('/edit/:id',(req,res)=>{//请求添加分类页面和请求编辑分类页面合为一个
	let id=req.params.id;      //区别在于一个向页面传递了一个category对象，一个没有
	CateModel.findOne({_id:id})
	.then((cate)=>{
		if(cate){
			res.render('admin/category_edit_add',{
				category:cate       
			})
		}
	})
	
})

router.post('/edit',(req,res)=>{
	let body =req.body;
	let id=body.id;
	console.log(body)
	/*
	CateModel.findOne({name:body.name})//修改的分类名在数据库中已存在
	.then((cate)=>{
		if(cate && cate.order==body.order){
			res.render('admin/error',{
				userInfo:req.userInfo,
				message:'分类名已存在，请重新编辑'
			})
		}
		else{//这里要想用id来作为条件查找，就必须用input的type="hidden"来从页面传递id
			CateModel.update({_id:id},{name:body.name,order:body.order},(err,rew)=>{
				if(!err){
					res.render('admin/success',{
						userInfo:req.userInfo,
						message:'编辑分类成功',
						url:'/category'
					})
				}
				else{
					res.render('admin/error',{
						userInfo:req.userInfo,
						message:'编辑分类失败',
					})
				}
			})
		}
	})
	*/
	CateModel.findById(id)
	.then((category)=>{
		if(category.name==body.name && category.order==body.order){
			res.render('admin/error',{
				userInfo:req.userInfo,
				message:'请修改后提交'
			})
		}
		else{//上边的条件至少有一个不等
			CateModel.find({name:body.name,_id:{$ne:bdoy.id}})//交集
			.then((newCategory)=>{
				if(newCategory){
					res.render('admin/error',{
						userInfo:req.userInfo,
						message:'分类名已存在，请重新编辑'
					})
				}
				else{
					res.render('admin/success',{
						userInfo:req.userInfo,
						message:'编辑分类成功',
						url:'/category'
					})
				}
			})
		}
	})
})

router.get('/delete/:id',(req,res)=>{
	let id =req.params.id;
	CateModel.remove({_id:id})
	.then((cate)=>{
		if(cate){
			res.render('admin/success',{
				userInfo:req.userInfo,
				message:'删除分类成功',
				url:'/category'//点击跳转
			})
		}
		else{
			res.render('admin/error',{
				userInfo:req.userInfo,
				message:'删除分类失败',
			})
		}
	})
})
module.exports=router;