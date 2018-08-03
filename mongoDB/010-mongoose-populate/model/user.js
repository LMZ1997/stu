const mongoose=require('mongoose');

const roles=new mongoose.Schema({
		name:{
			type:String,
			required:[true,'用户名必须输入'],
			maxLength:[10,'用户名最多10个字符'],
			minLength:[2,'用户名最少2个字符'],
		},
		age:{
			type:Number,
			default:99,
			min:[1,'最小值为1'],
			max:[150,'最大值为150']
		},
		sex:{
			type:String,
			enum:['male','female']
		},
		phone:{
			type:Number,
			validate:{//自定义规范
				validator:function(val){
					return /1[358]\d{9}/.test(val);
				},
				message:'{VALUE} 不是合法电话号码'
			}
		},
		locked:{
			type:false,
			default:false
		},
		friends:{
			type:Array
		},
		date:{
			type:Date,
			default:Date.now
		}
	});


	roles.methods.findMyBlogs=function(callback){//不能用箭头函数，因为涉及到this问题
		this.model('Blog').find({author:this._id},(err,docs)=>{//对象实例上的方法
			callback(err,docs);
		})
	}
	roles.statics.findByPhone=function(phone,callback){//类的静态方法
		//这里的this=this.model('User');
		this.findOne({phone:phone},(err,doc)=>{
			callback(err,doc)
		})
	}
const UserModel=mongoose.model('User',roles);

module.exports=UserModel;