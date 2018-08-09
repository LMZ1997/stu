const mongoose=require('mongoose');

const roles=new mongoose.Schema({
		category:{//所属分类
			type:mongoose.Schema.Types.ObjectId,
			ref:'Cate'
		},
		intro:{
			type:String
		},
		user:{
			type:mongoose.Schema.Types.ObjectId,
			ref:'User'
		},
		title:{
			type:String
		},
		content:{
			type:String
		},
		click:{
			type:Number,
			default:0
		},
		createdAt:{
			type:Date,
			default:Date.now
		}


	});

	
const articleModel=mongoose.model('Article',roles);//Cate会数据库blog中生成cates集合

module.exports=articleModel;