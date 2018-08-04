const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/LMZ', { useNewUrlParser: true });

const db=mongoose.connection;
db.on('error',(err)=>{
	// console.log('open data error ...',err);
	throw err;//错了就终止，做下边的也没有意义
})
db.on('open',()=>{

	const roles=new mongoose.Schema({
		name:String,//大写
		age:Number,
		sex:String
	});

	const UserModel=mongoose.model('User',roles);

	//Model.insertMany(),返回的也是promise
	/*
	UserModel.insertMany({name:'Tom',age:18,sex:'male'},(err,docs)=>{//插入单个
		if(!err){
			console.log(docs)
		}
		else{
			console.log('insert error:::',err);
		}
	})
	
	UserModel.insertMany([{name:'Tom',age:28,sex:'male'},{name:'Tom',age:38,sex:'male'}],(err,docs)=>{//插入多个
		if(!err){
			console.log(docs)
		}
		else{
			console.log('insert error:::',err);
		}
	})
	
	let promise=UserModel.insertMany({name:'Tom',age:48,sex:'male'});//回调函数
	promise
	.then((docs)=>{
		console.log(docs)
	})
	.catch((err)=>{
		console.log('insert error:::',err);
	})
	*/




	//Model.prototype.save()
	/*
	let user=new UserModel({name:'Tom',age:58,sex:'male'});//插入多个仍用数组包裹就可以
	user.save((err,docs)=>{
		if(!err){
			console.log(docs)
		}
		else{
			console.log('insert error:::',err);
		}
	})
	*/
	/*
	let user=new UserModel({name:'Tom',age:68,sex:'male'});
	let promise =user.save();
	promise
	.then((docs)=>{
		console.log(docs)
	})
	.catch((err)=>{
		console.log('insert error:::',err);
	})
	*/
	/*
	new UserModel({name:'Tom',age:78,sex:'male'})
	.save()
	.then((docs)=>{
		console.log(docs)
	})
	.catch((err)=>{
		console.log('insert error:::',err);
	})
	*/




	//Model.create()
	UserModel.create({name:'Tom',age:88,sex:'male'},(err,docs)=>{
		if(!err){
			console.log(docs)
		}
		else{
			console.log('insert error:::',err);
		}
	})

})