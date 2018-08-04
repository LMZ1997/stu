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

	/*只是为了测试前插入一些数据
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
	UserModel.update({},{age:99},(err,result)=>{//默认修改一个
		//这里的update不同于软件端测试的一点是：不加$set:{元素}也不会使集合里的所有文档被一个{元素}替代
		if(!err){
			console.log(result)
		}
		else{
			console.log('update error:::',err);
		}
	})
	*/
	/*
	UserModel.updateMany({age:{$lt:50}},{age:99},(err,result)=>{
		if(!err){
			console.log(result)
		}
		else{
			console.log('update error:::',err);
		}
	})
	*/
	UserModel.update({},{age:99},{multi:true},(err,result)=>{//默认multi是false
		if(!err){
			console.log(result)
		}
		else{
			console.log('update error:::',err);
		}
	})

})