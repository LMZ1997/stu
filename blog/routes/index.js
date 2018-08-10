const Router=require('express').Router;
const router=Router();
const CateModel=require('../models/category.js')
const articleModel=require('../models/article.js')
const page=require('../util/page.js')



router.get('/',(req,res)=>{
	CateModel.find({},'_id name order')
	.sort({order:1})
	.then((categories)=>{
		let options={
			page:req.query.page,
			model:articleModel,
			query:{},
			sort:{_id:-1},
			projection:'',
			populate:[{path:'category',select:'name'},{path:'user',select:'username'}]
		}
		page(options)
		.then((data)=>{
			// console.log('data',data)
			res.render('main/index',{//?????????????????????不用传userInfo
				articles:data.docs,
				page:data.page,
				lists:data.list,
				pages:data.pages,
				categories:categories
				// url:'/article'
			})
		})
	});
})

router.get('/articles',(req,res)=>{
	let options={
		page:req.query.page,
		model:articleModel,
		query:{},
		sort:{_id:-1},
		projection:'-__v',
		populate:[{path:'category',select:'name'},{path:'user',select:'username'}]
	}
	page(options)
	.then((data)=>{
		// console.log('result:::',data)
		
		// let data1=JSON.stringify(data);
		// res.end(data1)
		res.json({
			code:0,
			data:data
		})
	})
})
module.exports=router;