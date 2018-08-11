const mongoose=require('mongoose');

const roles=new mongoose.Schema({
	article:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'Article'
	},
	user:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'User'
	},
	content:{
		type:String
	},
	createdAt:{
		type:Date,
		default:Date.now
	}
});

	
const commentModel=mongoose.model('Comment',roles);

module.exports=commentModel;