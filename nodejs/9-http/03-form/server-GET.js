const http =require('http');

// const query=require('queryString')

const url=require('url');


const server =http.createServer((req,res)=>{
	res.setHeader('Content-Type','text/html;charset=UTF-8')

	// const myUrl=new url.parse(req.url);
	   const myUrl=new url.parse(req.url,true);//传入true,就直接调用了queryString模块的parse，将键值对类型的字符串转化为对象
	console.log(myUrl.query);																  //name:'Tom'

	res.end('ok');
});

server.listen(3000,'127.0.0.1',()=>{
	console.log('server is running at 127.0.0.1:3000')
})