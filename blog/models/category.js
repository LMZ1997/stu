const mongoose=require('mongoose');

const roles=new mongoose.Schema({
		name:{
			type:String
		},
		order:{
			type:Number,
			default:0
		},
	});

	
const CateModel=mongoose.model('Cate',roles);//Blog会生成blogs集合

module.exports=CateModel;