const mongoose=require('mongoose');

const roles=new mongoose.Schema({
		username:{
			type:String
		},
		password:{
			type:String,
		},
		isAdmin:{
			type:String,
			default:false
		}
	});

	
const UserModel=mongoose.model('User',roles);//Blog会生成blogs集合

module.exports=UserModel;