const http =require('http');

const server =http.createServer((req,res)=>{
	res.setHeader('Access-Control-Allow-Origin','*');// *任何请求都可以跨域请求
	let data=['learn React','learn Nodejs','自己写的']
	res.end(JSON.stringify(data));
})


server.listen(3000,'127.0.0.1',()=>{
	console.log('server is running at 127.0.0.1:3000')
})