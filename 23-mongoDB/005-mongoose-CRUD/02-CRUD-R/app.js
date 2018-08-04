const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/LMZ', { useNewUrlParser: true });

const db=mongoose.connection;




let getRandom=(min,max)=>{
	return Math.round(min+(max-min)*Math.random());
}
let getSex=()=>{
	if(Math.random()>0.5){
		return 'male'
	}
	else{
		return 'female'
	}
}
names=['Tom','Amy','Rose','Jack','Mike','Leo','Marial','jane','Cndy']

let getName=()=>{
	return names[getRandom(0,names.length-1)];
}


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

	/*只是为了测试提前插入一些数据
	var arr=[];
	for(var i=0;i<10;i++){
		arr.push({name:getName(),age:getRandom(18,99),sex:getSex()})
	}
	UserModel.insertMany(arr,(err,docs)=>{//插入单个
		if(!err){
			console.log(docs)
		}
		else{
			console.log('insert error:::',err);
		}
	})
	*/




	/*(查找条件，需要显示或隐藏的属性，游标方法，回调函数)
	UserModel.find({},(err,docs)=>{//不加条件查找所有
		if(!err){
			console.log(docs)
		}
		else{
			console.log('find error:::',err);
		}
	})
	*/
	/*
	UserModel.find({age:{$gt:50}},{name: 1,_id:0},(err,docs)=>{
		if(!err){
			console.log(docs)
		}
		else{
			console.log('find error:::',err);
		}
	})
	*/
	/*
	UserModel.find({age:{$gt:50}},'name -_id',(err,docs)=>{//显示隐藏等同于上个
		if(!err){
			console.log(docs)
		}
		else{
			console.log('find error:::',err);
		}
	})
	*/
	/*
	UserModel.find({age:{$gt:50}},null,{skip:1},(err,docs)=>{
		//若显示隐藏不需要设置，但要使用第三个参数-游标方法，那么第二个参数还需设置为null
		if(!err){
			console.log(docs)
		}
		else{
			console.log('find error:::',err);
		}
	})
	*/
	/*
	UserModel.findById('5b626cf77526b237683ff2cd',(err,docs)=>{
		if(!err){
			console.log(docs)
		}
		else{
			console.log('find error:::',err);
		}
	})
	*/
	UserModel.findOne({age:72},(err,docs)=>{
		if(!err){
			console.log(docs)
		}
		else{
			console.log('find error:::',err);
		}
	})
})