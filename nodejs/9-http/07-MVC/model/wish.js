
				//crud->create read update delete
const fs=require('fs');
const uuid=require('uuid');//创建唯一的id
const path=require('path');

let filePath=path.normalize(__dirname+'/../data/wish.json');

const colorArr=['red','green','blue','tomato','pink','grey','gold','yellow','orange','purple'];
let getRandom=(min,max)=>{
	return Math.round(min+(max-min)*Math.random());
}
let add = (options,callback)=>{
	fs.readFile(filePath,(err,data)=>{
		if(!err){
			let obj =JSON.parse(data);//data数据为buffer格式，必须转化为对象才能用push方法
			// obj.push({
			// 	id:uuid(),
			// 	text:options.content
			// })
			options.id=uuid();
			options.color=colorArr[getRandom(0,colorArr.length-1)];
			obj.push(options);
			let str=JSON.stringify(obj);//想要写入的数据必须是字符串格式
			fs.writeFile(filePath,str,(err)=>{
				if(!err){
					// console.log('write success')
					callback(null,options);
				}
				else{
					// console.log('write error')
					callback(err);
				}
			})

		}	
		else{
			// console.log('read file error')
			callback(err);
		}
	})
}




let get=(callback)=>{
	fs.readFile(filePath,(err,data)=>{
		if(!err){
			let obj=JSON.parse(data);
		
			callback(null,obj);
		}
		else{
			console.log('read error')
		}
	})
}



let remove=(id,callback)=>{
	fs.readFile(filePath,(err,data)=>{
		if(!err){
			let obj=JSON.parse(data);
			let newObj=obj.filter((val)=>{
				return val['id']!=id
			});
			let str=JSON.stringify(newObj);
			fs.writeFile(filePath,str,(err)=>{
				if(!err){
					callback(null,newObj)
				}
				else{
					callback(err);
				}
			})
		}
		else{
			callback(err);
		}
	})
}


module.exports={//暴露方法
	get:get,
	add:add,
	remove:remove
}