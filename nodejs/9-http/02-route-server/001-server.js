const http=require('http');
const fs=require('fs');


const server=http.createServer((req,res)=>{
	
	let pathName=req.url;
	console.log(req.url);
	
	fs.readFile('.'+pathName,(err,data)=>{
		if(!err){
			if(pathName=='/index.html'){
				res.setHeader('Content-Type','text/html;charset=UTF-8');
				res.write(data);
				res.end();
			}
			else if(pathName=='/list.html'){
				res.setHeader('Content-Type','text/html;charset=UTF-8');
				res.end(data);
			}
			else if(pathName=='/index.css'){
				res.setHeader('Content-Type','text/css;charset=UTF-8');
				res.end(data);
			}
			else if(pathName=='/index.js'){
				res.setHeader('Content-Type','application/x-javascript;charset=UTF-8');
				res.end(data);
			}
			else if(pathName=='/4.png'){
				res.setHeader('Content-Type','image/jpeg;charset=UTF-8');
				res.end(data);
			}
			else{
				res.statusCode=404;
				res.end('<h1>请求出错了。。。。</h1>')
			}
		}
		else{
			res.end('<h1>请求出错了。。。。</h1>')
		}
		
	})
})

// console.log(server);

server.listen(3000,'127.0.0.1',()=>{
	console.log('server is running at 127.0.0.1:3000')
})