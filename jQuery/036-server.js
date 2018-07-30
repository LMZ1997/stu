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

	console.log(req.method);

	if(req.method=='POST'){//POST请求
		var body='';
		req.on('data',function(chunk){
			body+=chunk;
		});
		req.on('end',function(){
			var bodyObj=querystring.parse(body);//将键值对样式的字符串转换为对象(name$Tom)
			var	bodyStr=JSON.stringify(bodyObj);//奖对象转换为可以传递的字符串('name:Tom')
			res.StatusCode=200;
			res.end(bodyStr);
		})
	}else{//GET请求
		if(urlStr.search(/\?/) != -1){//说明传递了data，要将该数据再返回出去
			var pram=url.parse(urlStr,true).query;
			var pramStr=JSON.stringify(pram);
			res.StatusCode=200;
			res.end(pramStr);
		}
		else{//说明没有传递任何data,需要打开某个文件，将文件内容返回出去
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