const mongoose=require('mongoose');

const roles=new mongoose.Schema({
		name:{
			type:String
		},
		order:{
			type:Number,
			default:0
		},
		pid:String,
	},{
		timestamps:true
	});

roles.statics.getPageCategories=function(req,query={}){//异步函数想要传递信息需要用promise或是回调函数
	return new Promise((resolve,reject)=>{
		let options={
			page:req.query.page,
			model:this,
			query:query,
			sort:{_id:1},
			projection:'_id name order pid',
		}
		page(options)
		.then((data)=>{
			resolve(data);
		})
	})
	
}
	
const CateModel=mongoose.model('Cate',roles);//Cate会数据库blog中生成cates集合

module.exports=CateModel;