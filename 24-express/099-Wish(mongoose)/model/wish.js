const mongoose=require('mongoose');

const roles=new mongoose.Schema({
		text:{
			type:String
		},
		color:String,
	});

	
const WishModel=mongoose.model('Wish',roles);//Blog会生成blogs集合

module.exports=WishModel;