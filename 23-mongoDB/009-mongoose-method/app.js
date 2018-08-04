const mongoose=require('mongoose');
const UserModel=require('./model/user.js')
const BlogModel=require('./model/blog.js')
// const moment=require('moment');//时间模块
mongoose.connect('mongodb://localhost:27017/LMZ', { useNewUrlParser: true });

const db=mongoose.connection;

db.on('error',(err)=>{
	// console.log('open data error ...',err);
	throw err;//错了就终止，做下边的也没有意义
})
db.on('open',()=>{
	
	/*
	BlogModel.insertMany({author:'5b62b07a6eed4f2d4c7625b4',title:'我今天好难过',content:'因为礼物不见了'},(err,docs)=>{
		if(!err){
			console.log(docs)
		}
		else{
			console.log('insert error:::',err)
		}
	})
	
	BlogModel.insertMany({author:'5b62b07a6eed4f2d4c7625b4',title:'我今天好开心',content:'因为我收到了一个礼物'},(err,docs)=>{
		if(!err){
			console.log(docs)
		}
		else{
			console.log('insert error:::',err)
		}
	})
	*/
	/*
	UserModel.insertMany({name:'Tom',age:'150',phone:'13512321646',sex:'male',locked:false,friends:['Amy','Leo'],data:Date()},(err,docs)=>{
		if(!err){
			console.log(docs)
		}
		else{
			console.log('insert error:::',err.message)
		}
	});
	*/

	/*
	UserModel.findOne({name:'Tom'},(err,docs)=>{
		console.log('author::',docs)
		docs.findMyBlogs((err,docs)=>{//这里的err和docs，全都接收自uesr.js的findMyBlog方法
			if(!err){
				console.log(docs)
			}
			else{
				console.log('insert error:::',err)
			}
		})
	})*/

	UserModel.findByPhone('13512321646',(err,doc)=>{
		if(!err){
				console.log('findByPhone:::',doc)
		}
		else{
			console.log('insert error:::',err)
		}
	})

	

})