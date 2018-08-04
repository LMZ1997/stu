const express=require('express');
const app=express();//Function express
	

//中间件原理，express内有一个数组，经过use，把每一个函数放进数组中，按照遍历顺序执行函数


app.use((req,res,next)=>{
	console.log('before A....');//1
	next();								//执行这个next时，程序跳到2继续执行
	console.log('after A....')//6
})
app.use((req,res,next)=>{
	console.log('before B....');//2
	next();								//执行这个next时，程序跳到3继续执行
	console.log('after B....')//5
})
app.use((req,res,next)=>{
	console.log('before C....');//3
	next();								//执行这个next时，程序跳到app.get()继续执行
	console.log('after C....')//4
})

app.get('',(req,res)=>{
	res.send('看bash里返回字符的顺序')
})
app.listen(3000,()=>{
	console.log('server is running at 127.0.0.1:3000')
})