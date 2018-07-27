const http=require('http');
const fs=require('fs');
const path =require('path');
const mime=require('./mime.json');
const url=require('url');
const dataHtml=require('./data.json');
const crud=require('./crud.js');
const querystring=require('querystring');

let server=http.createServer((req,res)=>{
	let fileName=req.url;
 	
 	let myurl=url.parse(req.url,true);
 	console.log('req.url::',req.url)
 	console.log('myurl:::',myurl);
 	if(myurl.pathname=='/index.html'||myurl.pathname=='/'){///?index.html
 		  crud.get(dataHtml,(err,data)=>{
 		  	console.log(data);
 		  	if(!err){
 		  	    let html=`<!DOCTYPE html>
					<html lang="en">
					<head>
						<meta charset="UTF-8">
						<title>许愿墙</title>
						<link rel="stylesheet" href="index.css">
					</head>
					<body>
						<div class="background">
							<div class="menu">
								<textarea name="word"  cols="30" rows="25" class="text" method="GET">
									
								</textarea>
								<p>
									<a href="#"  class="toWish">许愿</a>
								</p>
							</div>
						</div>
						<div class="wall">
						`
						data.forEach((val)=>{
							html+=	` 	
									<div class="wish" style="background: ${val.color}">
										<a href="#" class="close" data-id="${val.id}">
											${val.text}
										</a>
									</div>`
						})
						
						html+=		`
								</div>
							</body>
							<script src="jquery-1.12.4.js"></script>
							<script src="jquery.pep.js"></script>
							<script src="index.js"></script>
							</html>
							`
			    res.end(html)
 		  	}
 		  })
 		
 	}
 	else if(myurl.pathname=='/add'&&req.method.toUpperCase()=='POST'){
 		let body='';
 		req.on('data',(chunk)=>{
 			body+=chunk;
 		});
 		req.on('end',()=>{
 			let obj=querystring.parse(body);
 			crud.add(obj,(err,data)=>{
 				console.log('data::::::',data)
 				if(!err){
 					let result={};
 					result={
 						status:0,//约定0为成功的标志
 						data:data
 					};
 					let resultString=JSON.stringify(result);
 					res.end(resultString);
 				}
 			})

 		})
 	}
 	else if(myurl.pathname=='/del'){
 		// console.log('req.url',req.url)
 		let id=myurl.query.id;
 		crud.remove(id,(err)=>{
 			if(!err){
 				let result='';
 				result={
 					status:0
 				}
 				let resultString=JSON.stringify(result);
 				res.end(resultString);
 			}
 		})
 	}
 	else{
 		if(fileName.lastIndexOf('.') == -1){//文件夹
	 		fileName= fileName+'index.html';
	 	}
	 	// console.log('修正后的fileName::'fileName);
	 	let filePath=path.normalize(__dirname+fileName);
	 	// console.log(filePath);
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
 	}


 	
	// res.end('ok')
});

server.listen(3000,'127.0.0.1',()=>{
	console.log('server is running at 127.0.0.1:3000')
})