const mongoose=require('mongoose');

const roles=new mongoose.Schema({
		author:{
			type:mongoose.Schema.Types.ObjectId//保证唯一性
		},
		title:String,
		content:String
	});

const BlogModel=mongoose.model('Blog',roles);//Blog会生成blogs集合

module.exports=BlogModel;