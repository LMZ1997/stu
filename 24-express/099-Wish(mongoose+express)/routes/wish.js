const 	Router=require('express').Router;
const WishModel=require('../model/wish.js')
const router=Router();
const colorArr=['red','green','blue','tomato','pink','grey','gold','yellow','orange','purple'];
let getRandom=(min,max)=>{
	return Math.round(min+(max-min)*Math.random());
}


router.post('/',(req,res)=>{//增加愿望(根据index.js中的url:'wish'会走到这里)
	let obj=req.body;
	obj.color=colorArr[getRandom(0,colorArr.length-1)]
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
});

router.delete('/:id',(req,res)=>{//删除愿望
	let id=req.params.id;
	console.log(id);
	WishModel.remove({_id:id},(err,data)=>{//mongoose方法
 			if(!err){
 				let result='';
 				result={
 					status:0
 				}
 				let resultString=JSON.stringify(result);
 				res.end(resultString);
 			}
 		})
})








module.exports=router;