const Router=require('express').Router;
const router=Router();

const path=require('path');
const fs=require('fs');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/product-image/')           //上传的图片存储地址，属于静态资源
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+path.extname(file.originalname))
    // console.log(file.originalname)
     // cb(null, file.fieldname + '-' + Date.now())
  }
})
const upload = multer({ storage: storage })

const productModel=require('../models/product.js')




//权限控制，所以发送请求时必须带有withCredentials=true使cookie信息保存在req.userInfo中
router.use((req,res,next)=>{
	// console.log('1::',req.userInfo)
	if(req.userInfo.isAdmin){
		next()
	}
	else{
		res.send({
			code:10
		})
	}
})

router.post('/uploadImage', upload.single('file'),(req,res)=>{//填入file是因为前端页面发送请求的地方name(默认)="file"
	const filePath=req.file.filename
	res.send('http://127.0.0.1:3000/product-image/'+filePath); //返回一个图片的服务器地址，因为页面以后需要的是从服务器请求图片
})

router.post('/uploadDetailImage', upload.single('upload_'),(req,res)=>{//填入upload_是因为前端页面的 fileKey: 'upload_' 
	const filePath='http://127.0.0.1:3000/product-image/'+req.file.filename
	res.json({
		"success": true,
  		"msg": "上传成功",                //返回的图片的服务器地址会自动再次发送请求
 		"file_path":filePath
	})
})
















router.post('/',(req,res)=>{
	let body=req.body;
	new productModel({
		description:body.description,
		price:body.price,
		stock:body.stock,
		parentCategoryId:body.parentCategoryId,
		imagePath:body.imagePath,
		detailValue:body.detailValue
	})
	.save()
	.then((newCate)=>{
		if(newCate){
			res.json({
				code:0,
				data:data
			})
		}
		else{
			res.send({
				code:1,
				errMessage:'添加商品失败，数据库操作失败'
			})
		}
	})
	.catch((e)=>{
		res.send(e);
	})
		
	
})	
module.exports=router;