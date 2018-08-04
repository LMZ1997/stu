const mongoose=require('mongoose');
const UserModel=require('./model/user.js')
const BlogModel=require('./model/blog.js')

mongoose.connect('mongodb://localhost:27017/LMZ', { useNewUrlParser: true });

const db=mongoose.connection;

db.on('error',(err)=>{
	// console.log('open data error ...',err);
	throw err;//错了就终止，做下边的也没有意义
})
db.on('open',()=>{
	// const roles=new mongoose.Schema({
	// 	name:String,//大写
	// 	age:Number,
	// 	sex:String
	// });

	// const UserModel=mongoose.model('User',roles);

	UserModel.distinct('name',(err,result)=>{//去掉重复项，返回剩余的name
		if(!err){
			console.log(result)
		}
		else{
			console.log('distinct error:::',err);
		}
	})

})