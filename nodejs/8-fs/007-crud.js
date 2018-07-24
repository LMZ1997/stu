
				//crud->create read update delete
const fs=require('fs');
const uuid=require('uuid');//创建唯一的id

let filePath='./data.json';
/*
let add = (name,callback)=>{
	fs.readFile(filePath,(err,data)=>{
		if(!err){
			let obj =JSON.parse(data);//data数据为buffer格式，必须转化为对象才能用push方法
			
			obj.push({
				id:uuid(),
				name:name
			})
			let str=JSON.stringify(obj);//想要写入的数据必须是字符串格式
			fs.writeFile(filePath,str,(err)=>{
				if(!err){
					// console.log('write success')
					callback(null,str);
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
add('Leo',(err,data)=>{
	if(!err){
		console.log(data)
	}
	else{
		console.log('error')
	}
});
*/

/*
let get=(id,callback)=>{
	fs.readFile(filePath,(err,data)=>{
		if(!err){
			let obj=JSON.parse(data);
			let result=null;
			for(key in obj){
				if(obj[key]['id']==id){
					result=obj[key];
					break;//id是唯一的，找到就可以退出循环了
				}
			}
			callback(null,result);
		}
		else{
			console.log('read error')
		}
	})
}
get('001',(err,data)=>{
	if(!err){
		console.log(data)
	}else{
		console.log('err');
	}
});
*/

/*
let update=(id,name,callback)=>{
	fs.readFile(filePath,(err,data)=>{
		if(!err){
			let obj=JSON.parse(data);
			for(key in obj){
				if(obj[key]['id']==id){
					obj[key]['name']=name;
					break;
				}
			}
			let str=JSON.stringify(obj);
			fs.writeFile(filePath,str,(err,data)=>{
				if(!err){
					callback(null,obj)
				}
				else{
					callback(err);
				}
			})
		}	
		else{
			callback('err')
		}
	})
}
update('001','Amy',(err,data)=>{
	if(!err){
		console.log(data)
	}
	else{
		console.log(err)
	}
})	
*/

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
remove('001',(err,data)=>{
	if(!err){
		console.log(data)
	}
	else{
		console.log(err);
	}
})