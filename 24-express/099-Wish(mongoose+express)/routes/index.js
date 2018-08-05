const Router=require('express').Router;
const router=Router();

const WishModel=require('../model/wish.js')



router.get('/',(req,res)=>{
	WishModel.find({},(err,data)=>{//mongoose方法
			if(!err){
				/*
				let template=swig.compileFile(__dirname+'/../view/wish/index.html')//哪个文件需要模板代替
				let html=template({//向前端的html模板部分传输动态数据
					data:data,
				//自定义data:参数data
				})
				res.setHeader('Content-type','text/html;charset=UTF-8')
			    res.end(html)
			    */
			    //data是一个数组，里边的id不带ObjectId('id')
			    res.render('index',{
			    	data:data
			    })
			}
			else{
				console.log(err);
			}
		})
})

module.exports=router;