const http=require('http');

const server=http.createServer((req,res)=>{
	//req 实现了可读流  继承了Readable
	//res 实现了可写流  继承了Writeable
	res.setHeader('Content-Type','text/html;charset=UTF-8')//此句必须写在前边
								//text/plain 文本格式
	res.write('hello 你好');
	res.end();//res.end表示服务的结束点，必须写
	// res.end('<h1> hello 你好</h1>')//只有一个res.write()时，可以合并为一句
})

// console.log(server);

server.listen(3000,'127.0.0.1',()=>{
	console.log('server is running at 127.0.0.1:3000')
})