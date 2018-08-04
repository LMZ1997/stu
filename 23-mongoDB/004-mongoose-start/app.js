const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/LMZ');

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

	const User=mongoose.model('User',roles);

	
	//	插入
	const user=new User({name:'Tom',age:19,sex:'male'});
	// const user=new User({name:'Siral',age:999,sex:'NotMale'});
	user.save((err,user)=>{
		if(!err){
			console.log(user);
		}
		else{
			console.log('save error :::',err);
		}
	})
	
	
	/*
	User.find({name:'Tom'},(err,docs)=>{
		if(!err){
			console.log(docs);
		}
		else{
			console.log('find error :::',err);
		}
	})
	*/


	/*
    //更新updataMany
	User.update({name:'Tom'},{$set:{age:99}},(err,result)=>{
		if(!err){
			console.log(result);
		}
		else{
			console.log('update error :::',err);
		}
	})
	*/


	/*
	User.remove({name:'Tom'},(err,result)=>{
		if(!err){
			console.log(result);
		}
		else{
			console.log('remove error :::',err);
		}
	})
	*/



})