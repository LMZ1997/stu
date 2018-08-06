const express=require('express');
const swig=require('swig');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const Cookies=require('cookies');
//链接数据库
mongoose.connect('mongodb://localhost:27017/blog',{useNewUrlParser:true});
const db=mongoose.connection;
db.on('error',()=>{
	throw error;
})
db.on('open',()=>{
	console.log('DB is connected');
})

const app=express();

//配置模板
// swig.setDefaults({
//   cache: false
// })
app.engine('html',swig.renderFile);
app.set('views','./views');
app.set('view engine','html');

//配置静态资源
app.use(express.static('public'));



//设置cookie的中间件
app.use((req,res,next)=>{
	req.cookies = new Cookies(req,res);
	req.userInfo = {};//自定义req上的一个属性，用于传递数据，并且与其他数据分隔开
	let userInfo = req.cookies.get('userInfo');
	// console.log(userInfo)
	if(userInfo){//第一次启动服务不存在userInfo
		try{//try catch主要为了避免JSON.Parse编译出现问题(小概率)

			req.userInfo = JSON.parse(userInfo)

		}catch(e){
			console.log(e);
		}

	}
	next();
})



//添加处理POST请求的中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



//处理路由
app.use('/',require('./routes/index.js'))
app.use('/user',require('./routes/user.js'))

app.listen(3000,()=>{
	console.log('server is running at 127.0.0.1:3000')
})