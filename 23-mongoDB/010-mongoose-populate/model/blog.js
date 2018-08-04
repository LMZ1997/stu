const mongoose=require('mongoose');

const roles=new mongoose.Schema({
		author:{
			type:mongoose.Schema.Types.ObjectId,
			ref:'User'//指定需要关联的集合
		},
		title:String,
		content:String
	});

	/*
	roles.statics.findBlogs=function(query,callback){
		var result={};
		this.findOne(query,(err,blog)=>{
			if(!err){
				result=blog;
				this.model('User').findOne({_id:blog.author},(err,user)=>{
					result.author=user;
					callback(err,result)
				})
			}
			else{
				console.log('1')
			}
		})
	}
	*/
	/*
	roles.statics.findBlogs=function(query,callback){
		this.findOne(query)
		.populate('author')
		.then((docs)=>{
			console.log(docs)
		})
		.catch((err)=>{
			console.log(err);
		})
	}
	*/
	roles.statics.findBlogs=function(query){//	query:条件
		let promise=new Promise((resolve,reject)=>{//因为是自定函数，所以需要自己定义返回值
			this.findOne(query)
			.populate('author')
			.then((docs)=>{
				resolve(docs);
			})
			.catch((err)=>{
				reject(err)
			})
		})
		return promise;
		
	}
const BlogModel=mongoose.model('Blog',roles);//Blog会生成blogs集合

module.exports=BlogModel;