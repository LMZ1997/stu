// const express=require('express');
// const app=express();//Function express
const http=require('http');
//中间件原理，express内有一个数组，经过use，把每一个函数放进数组中，按照遍历顺序执行函数

function express(){
	let fns=[];
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


app.listen(3000,()=>{
	console.log('server is running at 127.0.0.1:3000')
})