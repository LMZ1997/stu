const mongoose=require('mongoose');

const roles=new mongoose.Schema({
		author:{
			type:String
		},
		title:String,
		content:String
	});

const BlogModel=mongoose.model('Blog',roles);//Blog会生成blogs集合

module.exports=BlogModel;