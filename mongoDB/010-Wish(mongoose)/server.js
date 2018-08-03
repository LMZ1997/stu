const http=require('http');
const fs=require('fs');
const path =require('path');
const mime=require('./mime.json');
const url=require('url');
// const crud=require('./model/wish.js');
const querystring=require('querystring');

const swig=require('swig');//模板


//链接至数据库
const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/LMZ', { useNewUrlParser: true });
const db=mongoose.connection;
db.on('error',(err)=>{
	throw err;
})
db.on('open',()=>{
	console.log('DB connected。。。。。')
})




let server=http.createServer((req,res)=>{
	let fileName=req.url;
 	
 	let myurl=url.parse(req.url,true);
 	console.log('myurl',myurl)
 	let pathname=myurl.pathname;
 	// console.log('req.url::',req.url)
 	// console.log('myurl:::',myurl);
 	console.log('pathname:::',pathname)
 	
 	//约定  /static/为静态资源
 	//      请求时 /controller/action/arg1,arg2,...		

 	if(pathname.startsWith('/static/')){
	 	// let filePath=path.normalize(__dirname+'/static'+fileName);
	 	let filePath=path.normalize(__dirname+pathname);
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
 	else{//处理动态资源

 		let paths=pathname.split('/');//输出[ '', 'Wish', 'index' ]

 		let controller=paths[1] || 'wish';//或者做法是为了req.url只有一个根目录时也能跳转到Wish页面
 		let action=paths[2] || 'index';
 		let args=paths.slice(3);//从下标为3的开始截取
 		let model;
 		try{
 			model=require('./controller/'+controller);
 						//(.controller/wish.js) 没加.js是因为系统会自动寻找扩展名
 		}catch(err){//必须加 (err)
 			console.log(err);
 			res.setHeader('Content-Type','text/html;charset=UTF-8');
 			res.statusCode = 404;
 			res.end('页面走丢了...')
 			return;
 		}
 		if(model[action]){
 			model[action].apply(null,[req,res].concat(args));//concat(注意是括号)
 			//这里加apply主要是为了传入参数，需要改变的this指定为空
 		}
 	}


 	
	// res.end('ok')
});

server.listen(3000,'127.0.0.1',()=>{
	console.log('server is running at 127.0.0.1:3000')
})