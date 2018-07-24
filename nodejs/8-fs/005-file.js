
						//005插件实现了以上001-004的所有内容

const fs=require('fs');


// fs.writeFileSync('./001.txt','aaaaa',{flag:'w'});//验证需要看内容是否写入对应文件
								//默认值为{flag:'w'}


// let data=fs.readFileSync('./001.txt');//同步的data会返回出去
// console.log(data);

// fs.writeFile('./001.txt','bbbbb',{flag:'a'},(err)=>{//验证需要看内容是否写入对应文件
// 	if(!err){
// 		console.log('write success...')
// 	}
// 	else{
// 		console.log('write error...',err)
// 	}
// });

fs.readFile('./001.txt',{flag:'r'},(err,data)=>{//异步的data传递在回调函数里
	if(!err){
		console.log('read success')
		console.log(data)
	}
	else{
		console.log('read error',err)
	}
})