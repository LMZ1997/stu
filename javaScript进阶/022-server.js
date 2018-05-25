var http=require('http');
var fs=require('fs');
var url=require('url');
var querystring=require('querystring');

// var hostname='127.0.0.1';
// var port=3000;
var server=http.createServer(function(req,res){
	// res.end('Hello nodejs');
	res.setHeader('Content-type','text/html;charset=UTF-8');
	// res.StatusCode=404;
	var urlStr=req.url;
	console.log("req.url:::",urlStr);
	if(urlStr=='/favicon.ico'){
			res.StatusCode=404;
			res.end();
	}
	console.log(req.method);
	if(req.method=='POST'){//POST请求
		var body='';
		req.on('data',function(chunk){
			body+=chunk;
		});
		req.on('end',function(){
			var bodyObj=querystring.parse(body);
			var	bodyStr=JSON.stringify(bodyObj);
			res.StatusCode=200;
			res.end(bodyStr);
		})
	}else{//GET请求
		if(urlStr.search(/\?/) != -1){
			var pram=url.parse(urlStr,true).query;
			var pramStr=JSON.stringify(pram);
			res.StatusCode=200;
			res.end(pramStr);
		}
		else{
			var File='./'+urlStr;
			console.log(urlStr);
			fs.readFile(File,function(err,data){
				if(err){
					console.log('read file err:::'+err);
					res.StatusCode=404;
					res.end('read file err');
				}else{
					res.StatusCode=200;
					res.end(data);
				}
			})
		}		
	}


});

server.listen(3000,'127.0.0.1',function(){
	console.log('server is running at http://127.0.0.1:3000');
});