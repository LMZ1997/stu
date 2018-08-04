// const express=require('express');
// const app=express();//Function express
const http=require('http');
//中间件原理，express内有一个数组，经过use，把每一个函数放进数组中，按照遍历顺序执行函数

function express(){
	let fns=[];

	//每一次请求都会执行该函数
	function app(req,res){
		let i=0;
		function next(){
			let fn=fns[i++];
			if(!fn){
				return;
			}
			fn(req,res,next);
		}
		next();
	}	
	app.use=function(fn){
		fns.push(fn);
	}
	return app;
}
/*
	初始化app.use函数后，fns数组push进去三个函数，执行express后返回的
	app，其实就是一个函数，把app写在http.createServer()里边，使得每一
	次请求进来时都会调用该函数，进而调用next函数，第一次调用时next时
	fn=fns[0],因为是i++,不是++i。i=0首先拿来执行了，而后执行fn函数，
	因为fn参数里传了next函数，所以会连续调用fns里边的三个函数，这时
	会输出before A B C,因为调用第一个fn函数而引发了调用后来的1个fn
	函数，所以在后来的fn函数未执行完之前，第一个fn函数一直在挂起状态
	，并且没有执行到console.log('afer A'),所以按照此模式执行，当最后一个
	fn的next函数执行完时(执行完的条件是if(!fn)),紧接着执行此函数的consol
	e.log('after C'),依次这样，所以最后输出‘after C B A’

*/
const app=express();

app.use((req,res,next)=>{
	console.log('before A....');//1
	next();							
	console.log('after A....')//6
})
app.use((req,res,next)=>{
	console.log('before B....');//2
	next();							
	console.log('after B....')//5
})
app.use((req,res,next)=>{
	console.log('before C....');//3
	next();							
	console.log('after C....')//4
})


const server=http.createServer(app);//使服务器接收所有请求时，都会调用app方法

server.listen(3000,()=>{
	console.log('server is running at 127.0.0.1:3000')
})