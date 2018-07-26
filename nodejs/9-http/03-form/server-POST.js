const http =require('http');

const querystring=require('querystring')

const url=require('url');


const server =http.createServer((req,res)=>{
	res.setHeader('Content-Type','text/html;charset=UTF-8')

	let body='';
	console.log('req.url:::',req.url)
	if(req.method=='POST'){
		req.on('data',(chunk)=>{
			body+=chunk;
		});
		req.on('end',()=>{
			// console.log(body);
			let query=querystring.parse(body);
			console.log('query:::',query);
		});
		res.end('ok');
	}
	
});

server.listen(3000,'127.0.0.1',()=>{
	console.log('server is running at 127.0.0.1:3000')
})