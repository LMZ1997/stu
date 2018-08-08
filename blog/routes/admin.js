const Router=require('express').Router;
const router=Router();
const userModel=require('../models/user.js');

router.use((req,res,next)=>{//防止直接在地址栏请求/admin后登陆到管理员界面
	if(req.userInfo.isAdmin){
		next()
	}
	else{
		res.send('请用管理员身份登录')
	}
})
router.get('/',(req,res)=>{//请求管理元首页
	// res.send('ok')
	res.render('admin/index',{
		userInfo:req.userInfo
	})
})

router.get('/loginOut',(req,res)=>{//管理员退出
	var result={
		code:0,
		errMessage:''
	}
	// req.cookies.set('userInfo',null);
	req.session.destroy();
	res.json(result);
})

router.get('/users',(req,res)=>{//请求用户列表
	let page = req.query.page || 1;//第一次请求默认page=1,且page的类型为Number;
								//当其他次请求来时，page接收自req.query.page,此时page类型为string
	// console.log('type::',typeof page)
	if(page<=0){
		page=1
	}

	let limit=2;
	
	userModel.estimatedDocumentCount({})
	.then((count)=>{
		let pages=Math.ceil(count/limit);      ///向上取整
		if(page>pages){
			page=pages;
		}
		let skip=(page-1)*limit;//skip赋值必须放在page验证后的里边，否则会先用
								//page给skip赋值,那样跳过的值会不正确(会大于拥有的值)
		let list=[];
		for(var i=1;i<=pages;i++){
			list.push(i);
		}
		userModel.find({},'_id username isAdmin')
		.skip(skip)
		.limit(limit)
		.then((users)=>{
			res.render('admin/users_list',{
				userInfo:req.userInfo,
				users:users,
				page:page*1,    //转换为number类型
				lists:list
			})
		})
	})



	

	

	
})
module.exports=router;