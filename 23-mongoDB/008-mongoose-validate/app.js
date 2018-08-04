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
	
	UserModel.insertMany({name:'Tom',age:'150',phone:'1951232146',sex:'male',locked:false,friends:['Amy','Leo'],data:Date()},(err,docs)=>{
		if(!err){
			console.log(docs)
		}
		else{
			console.log('insert error:::',err.message)
		}
	});

	

})