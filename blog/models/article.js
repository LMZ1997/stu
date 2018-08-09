const mongoose=require('mongoose');

const roles=new mongoose.Schema({
		category:{//所属分类
			type:mongoose.Schema.Types.ObjectId,
			// default:
		},
		user:{
			type:mongoose.Schema.Types.ObjectId,
			ref:'User'
		}
		title:{
			type:String
		},
		content:{
			type:String
		}


	});

	
const articleModel=mongoose.model('Article',roles);//Cate会数据库blog中生成cates集合

module.exports=articleModel;