const http=require('http');
const fs=require('fs');
const path =require('path');
const mime=require('./mime.json')

let server=http.createServer((req,res)=>{
	let fileName=req.url;
 	
 	if(fileName.lastIndexOf('.') == -1){//文件夹
 		fileName= fileName+'index.html';
 	}
 	console.log(fileName);
 	let filePath=path.normalize(__dirname+'/static'+fileName);
 	console.log(filePath);
 	 let houzhui=path.extname(filePath);//扩展名
 	fs.readFile(filePath,(err,data)=>{
 		if(!err){
 			res.setHeader('Content-Type',mime[houzhui]+';charset=UTF-8')
 			res.end(data);
 		}
 		else{
 			res.setHeader('Content-Type','text/html;charset=UTF-8')
 			res.end('<h1>页面走丢了。。。</h1>')
 		}
 	})
	// res.end('ok')
});

server.listen(3000,'127.0.0.1',()=>{
	console.log('server is running at 127.0.0.1:3000')
})