
const path=require('path');
const crud=require('../model/wish.js');
// const crud =require(path.normalize(__dirname+'/../model/wish.js'))
const swig = require('swig');
const querystring=require('querystring')

class turnToWish{

	index(req,res,...args){//args是从pathname.splice(3)开始截取的
		crud.get((err,data)=>{
			if(!err){
				let template=swig.compileFile(__dirname+'/../view/turnToWish/index.html')//哪个文件需要模板代替
				let html=template({//向前端的html模板部分传输动态数据
					data:data,
				//自定义data:参数data
				})
				res.setHeader('Content-type','text/html;charset=UTF-8')
			    res.end(html)
			}
			else{
				console.log(err);
			}
		})
	}

}

module.exports=new  turnToWish();