const Router=require('express').Router;
const router=Router();

const commentModel=require('../models/comment.js');
const page=require('../util/page.js');
const getCommontData=require('../util/getCommontData.js')

router.post('/add',(req,res)=>{
	let body=req.body;
	// data:{
	// 	content:commentContent,
	// 	articleId:id
	// }
	new commentModel({
		article:body.articleId,
		content:body.content,
		user:req.userInfo._id
	})
	.save()
	.then((newComment)=>{
		if(newComment){
			res.json({
				code:0,
				comment:newComment
			})
			
		}
		else{
			res.json({
				code:10
			})
		}
	})
	.catch(e=>{
		console.log(e);
	})
})



module.exports=router;