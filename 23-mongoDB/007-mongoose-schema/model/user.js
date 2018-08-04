const mongoose=require('mongoose');

const roles=new mongoose.Schema({
		name:String,//大写
		age:{
			type:Number,
			default:99//默认值，如果添加信息时没写，便用默认的
		},
		sex:{
			type:String,
			enum:['male','female']//枚举，创建信息时sex只能是male或者female
		},
		locked:{
			type:false,
			default:false//默认值，如果添加信息时没写，便用默认的
		},
		friends:{
			type:Array
		},
		date:{
			type:Date,
			default:Date.now//默认值，如果添加信息时没写，便用默认的
		}
	});

const UserModel=mongoose.model('User',roles);

module.exports=UserModel;