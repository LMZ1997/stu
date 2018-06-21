var http=require('http');
var fs=require('fs');
var url=require('url');
var querystring=require('querystring');
var server=http.createServer(function(req,res){
	res.setHeader('Content-type','text/html;charset=UTF-8');
	var urlStr=req.url;
	console.log(urlStr);
	if(urlStr=='/favicon.ico'){
			res.StatusCode=404;
			res.end();
	}

	var prams=url.parse(urlStr,true).query;
	var callback=prams.callback;
	var obj='{"name":"Tom","age":18}';//实际是字符串
	console.log(prams.callback);
	var resStr=callback+'('+obj+")";///类似于执行 函数名(obj);
	// var pramStr=JSON.stringify(prams);
	// res.StatusCode=200;
	res.end(resStr);

});

server.listen(3000,'127.0.0.1',function(){
	console.log('server is running at http://127.0.0.1:3000');
});