
				//crud->create read update delete
const fs=require('fs');
const uuid=require('uuid');//创建唯一的id


const MongoClient=require('mongodb').MongoClient;

const url ='mongodb://localhost:27017';

const dbName='WISH';

const colorArr=['red','green','blue','tomato','pink','grey','gold','yellow','orange','purple'];
let getRandom=(min,max)=>{
	return Math.round(min+(max-min)*Math.random());
}
let getDB=(callback)=>{
	MongoClient.connect(url, {useNewUrlParser: true}, function(err,client) {
		console.log('Connected successfully to server');

		const db =client.db(dbName);

		callback(db,client);
	})
}
let add = (options,callback)=>{
	getDB((db,client)=>{
		const col =db.collection('wish');
		options._id=uuid();
		options.color=colorArr[getRandom(0,colorArr.length-1)];
		col.insertOne(options,function(err,result){
			if(!err){
				callback(null,options)
			}
			else{
				callback(err);
			}
		})
		client.close();
	})
	
}
let get=(callback)=>{
	getDB((db,client)=>{
		const col =db.collection('wish');
		// console.log('col.find：：',col.find())
		col.find().toArray(function(err,docs){
			if(!err){
				// console.log('docs:::',docs)

				callback(null,docs)
			}
			else{
				callback(err);
			}
		})
		client.close();
	})
}
let remove=(id,callback)=>{
	getDB((db,client)=>{
		const col =db.collection('wish');
		col.deleteOne({_id:id},function(err,docs){
			if(!err){
				callback(null,docs)
			}
			else{
				callback(err);
			}
		})
		client.close();
	})
}


module.exports={//暴露方法
	get:get,
	add:add,
	remove:remove
}