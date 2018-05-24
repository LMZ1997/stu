var http=require('http');
var fs=require('fs');
// var hostname='127.0.0.1';
// var port=3000;
var server=http.createServer(function(req,res){
	// res.end('Hello nodejs');
	res.setHeader('Content-type','text/html;charset=UTF-8');
	// res.StatusCode=404;
	console.log(req.url);

	var File='./'+req.url;
	fs.readFile(File,function(err,data){
		if(err){
			// console.log('read file err:::'+err);
			res.StatusCode=404;
			res.end('read file err');
		}else{
			res.StatusCode=200;
			res.end(data);
		}
	})
});

server.listen(3000,'127.0.0.1',function(){
	console.log('server is running at http://127.0.0.1:3000');
});