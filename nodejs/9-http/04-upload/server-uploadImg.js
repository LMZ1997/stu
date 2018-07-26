const http =require('http');

const querystring=require('querystring')

const url=require('url');

const formidable =require('formidable');
const util=require('util');
const path = require('path');
const fs=require('fs');


const server =http.createServer((req,res)=>{

	 if (req.method.toLowerCase() == 'post') {
	    // parse a file upload
	    var form = new formidable.IncomingForm();

	    form.keepExtensions = true;//保持文件原后缀名

	    form.uploadDir ="./upload";//__dirname绝对路径
	   
	    form.parse(req, function(err, fields, files) {
	      let houzhui=path.extname(files.img.name)
	      let oldPath= './'+files.img.path;//根据下边res.end返回的upload得知；
	      let newPath='./upload/' +(new Date()).getTime()+Math.random()+houzhui;
	      fs.rename(oldPath,newPath,(err)=>{
	      	if(!err){
	      		console.log('改名成功')
	      	}
	      })
	      res.writeHead(200, {'content-type': 'text/plain'});
	      res.write('received upload:\n\n');
	      res.end(util.inspect({fields: fields, files: files}));
	    });

	    return;
	  }

	  // // show a file upload form
	  // res.writeHead(200, {'content-type': 'text/html'});
	  // res.end(
	  //   '<form action="/upload" enctype="multipart/form-data" method="post">'+
	  //   '<input type="text" name="title"><br>'+
	  //   '<input type="file" name="upload" multiple="multiple"><br>'+
	  //   '<input type="submit" value="Upload">'+
	  //   '</form>'
	  // );
});

server.listen(3000,'127.0.0.1',()=>{
	console.log('server is running at 127.0.0.1:3000')
})