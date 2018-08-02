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

	// 只是为了测试前插入一些数据
	/*
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


	
	/*
	UserModel.remove({},(err,result)=>{//默认所有
		if(!err){
			console.log(result)
		}
		else{
			console.log('insert error:::',err);
		}
	})
	*/
	// UserModel.remove({})
	// .setOptions({single:true})
	// .then((result)=>{
	// 	console
	// })
	/*
	UserModel.deleteOne({name:'Marial'},(err,result)=>{
		if(!err){
			console.log(result)
		}
		else{
			console.log('insert error:::',err);
		}
	})
	*/
	/*
	UserModel.deleteMany({age:{$gt:60}},(err,result)=>{
		if(!err){
			console.log(result)
		}
		else{
			console.log('insert error:::',err);
		}
	})
	*/
	UserModel.distinct('name',(err,result)=>{//去掉重复项，返回剩余的
		if(!err){
			console.log(result)
		}
		else{
			console.log('distinct error:::',err);
		}
	})

})