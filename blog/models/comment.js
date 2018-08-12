const mongoose=require('mongoose');
const page =require('../util/page.js');

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
roles.statics.getPageComments=function(req,query={}){//异步函数想要传递信息需要用promise或是回调函数
	return new Promise((resolve,reject)=>{
		let options={
			page:req.query.page,
			model:this,
			query:query,
			sort:{_id:-1},
			projection:'-__v',
			limit:6,
			populate:{path:'user',select:'username'}
		}
		page(options)
		.then((data)=>{
			resolve(data);
		})
	})
	
}

	
const commentModel=mongoose.model('Comment',roles);

module.exports=commentModel;