var http=require('http');
var fs=require('fs');
var url=require('url');

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
	if(urlStr.search(/\?/) != -1){
		var pram=url.parse(urlStr,true).query;
		var pramStr=JSON.stringify(pram);
		res.StatusCode=200;
		res.end(pramStr);
	}
	else{
		var File='./'+urlStr;
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

});

server.listen(3000,'127.0.0.1',function(){
	console.log('server is running at http://127.0.0.1:3000');
});