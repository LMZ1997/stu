const mongoose=require('mongoose');

const roles=new mongoose.Schema({
		name:String,//大写
		age:Number,
		sex:String
	});

const UserModel=mongoose.model('User',roles);

module.exports=UserModel;