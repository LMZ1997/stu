const mongoose=require('mongoose');
const UserModel=require('./model/user.js')
const BlogModel=require('./model/blog.js')
const moment=require('moment');//时间模块
mongoose.connect('mongodb://localhost:27017/LMZ', { useNewUrlParser: true });

const db=mongoose.connection;

db.on('error',(err)=>{
	// console.log('open data error ...',err);
	throw err;//错了就终止，做下边的也没有意义
})
db.on('open',()=>{
	/*
	UserModel.insertMany({name:'Tom',sex:'male',locked:false,friends:['Amy','Leo'],data:Date()},(err,docs)=>{
		if(!err){
			console.log(docs)
		}
		else{
			console.log('insert error:::',err)
		}
	});
	*/
	/*
	UserModel.findById('5b62b07a6eed4f2d4c7625b4',(err,doc)=>{//输出创建某个id时的时间
		if(!err){
			// console.log(doc);
			//mongo存储的事件用的是格林尼治时间，即本地时间减去八小时
			//年：getFullYear()
			//月：getMonth()
			//日：getDate()
			//时：getHours()
			//分：getMinutes()
			//秒：getSeconds()
			let glnz=doc.date;
			console.log(moment(glnz).format('YYYY-MM-DD HH:mm:ss'))

		}
		else{
			console.log('find error:::',err)
		}
	})
	*/
	BlogModel.insertMany({author:'5b62b07a6eed4f2d4c7625b4',title:'我今天好开心',content:'因为我收到了一个礼物'},(err,docs)=>{
		if(!err){
			console.log(docs)
		}
		else{
			console.log('insert error:::',err)
		}
	})

})