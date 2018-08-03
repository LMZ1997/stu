
const path=require('path');
const swig = require('swig');
const querystring=require('querystring')
const WishModel=require('./../model/wish.js');

const colorArr=['red','green','blue','tomato','pink','grey','gold','yellow','orange','purple'];
let getRandom=(min,max)=>{
	return Math.round(min+(max-min)*Math.random());
}

class Wish{

	index(req,res,...args){
		/*mongodb原生方法
		crud.get((err,data)=>{
			if(!err){
				let template=swig.compileFile(__dirname+'/../view/wish/index.html')//哪个文件需要模板代替
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
		*/

		WishModel.find({},(err,data)=>{//mongoose方法
			if(!err){
				let template=swig.compileFile(__dirname+'/../view/wish/index.html')//哪个文件需要模板代替
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

	add(req,res,...args){//req,res,...args参数由后台传入
		let body='';
 		req.on('data',(chunk)=>{
 			body+=chunk;
 		});
 		req.on('end',()=>{
 			let obj=querystring.parse(body);
 			obj.color=colorArr[getRandom(0,colorArr.length-1)]
 			/*mongodb原生方法
 			crud.add(obj,(err,data)=>{
 				console.log('data::::::',data)
 				let result={};
 				if(!err){
 					
 					result={
 						status:0,//约定0为成功的标志
 						data:data
 					};
 					
 				}else{
 					result={
 						status:10,//约定10为失败的标志
 					};
 				}
 				let resultString=JSON.stringify(result);
 				res.end(resultString);
 			})
 			*/
 			WishModel.insertMany(obj,(err,docs)=>{//mongoose方法
 				let result={};
 				if(!err){
 					
 					result={
 						status:0,//约定0为成功的标志
 						data:docs[0]
 					};
 					
 				}else{
 					result={
 						status:10,//约定10为失败的标志
 					};
 				}
 				let resultString=JSON.stringify(result);
 				res.end(resultString);
 			})

 		})
	}

	del(req,res,...args){
		// console.log('args',args)
		let id=args[0];
		/*mongodb原生方法
 		crud.remove(id,(err)=>{
 			if(!err){
 				let result='';
 				result={
 					status:0
 				}
 				let resultString=JSON.stringify(result);
 				res.end(resultString);
 			}
 		})
 		*/
 		WishModel.remove({id:args[0]},(err,data)=>{//mongoose方法
 			if(!err){
 				let result='';
 				result={
 					status:0
 				}
 				let resultString=JSON.stringify(result);
 				res.end(resultString);
 			}
 		})
	}

}

module.exports=new Wish();//方法在一个类中（Wish)，可以用new方法
							//方法直接在外边定义的，可用module.exports={
													// add:add,
								//                 }