const mongoose=require('mongoose');

const roles=new mongoose.Schema({
		author:String,//大写
		title:String,
		content:String
	});

const BlogModel=mongoose.model('Blog',roles);

module.exports=BlogModel;