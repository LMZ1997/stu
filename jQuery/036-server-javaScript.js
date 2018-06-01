var http=require('http');
var fs=require('fs');
var url=require('url');
var querystring=require('querystring');
var server=http.createServer(function(req,res){
	res.setHeader('Content-type','text/html;charset=UTF-8');
	res.setHeader('Access-Control-Allow-Origin','http://127.0.0.1:3000');
	//表示：允许127.0.0.1：3000对localhost:3000进行跨域请求
	var urlStr=req.url;
	console.log("req.url:::",urlStr);
	if(urlStr=='/favicon.ico'){
			res.StatusCode=404;
			res.end();
	}
	var File='./'+urlStr;
	if(urlStr.search(/\?/) != -1){
		File="./"+urlStr.slice(0,urlStr.search(/\?/));
		//urlStr.search(/\?/)会返回有问号的位置
		console.log('位置：：',urlStr.search(/\?/));
	}
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

});

server.listen(3000,'127.0.0.1',function(){
	console.log('server is running at http://127.0.0.1:3000');
});