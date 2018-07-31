const MongoClient=require('mongodb').MongoClient;

const url ='mongodb://localhost:3000';

const dbName='LMZ';

MongoClient.connect(url, {useNewUrlParser: true}, function(err,client) {
	// assert.equal(null,err);
	console.log('Connected successfully to server');

	const db =client.db(dbName);

	// client.close();

	

	const jihe =db.collection('wish');

	//插入
	/*
	jihe.insertMany([{content:'rr'},{del:'need del'},{color:'red'}],function(err,result){
		if(!err){
			console.log(result);
		}
		else{
			console.log('insert error::',err);
		}
		client.close();
	})
	*/

	/*
	//查找
	jihe.find({content:'rr'},function(err,docs){
		if(!err){
			console.log(docs);
		}
		else{
			console.log('find error::',err);
		}
		client.close();
	})
	*/

	/*
	//更新
	jihe.updateOne({color:'red'},{$set:{name:'target'}},function(err,docs){
		if(!err){
			console.log(docs);
		}
		else{
			console.log('update error::',err);
		}
		client.close();
	})
	*/

	//删除
    //'_id':'ObjectId("5b5fde2e4c00ad1524910f55")'
	jihe.deleteOne({content:'rr'},function(err,docs){
		if(!err){
			console.log(docs);
		}
		else{
			console.log('del error::',err);
		}
		client.close();
	})

});