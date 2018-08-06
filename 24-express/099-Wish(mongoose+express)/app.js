const mongoose=require('mongoose');

const express=require('express');
const swig =require('swig');
const bodyParser=require('body-parser')






//1链接数据库
mongoose.connect('mongodb://localhost:27017/WISH',{useNewUrlParser:true});
const db=mongoose.connection;
db.on('error',()=>{
	throw error;
})
db.on('open',()=>{
	console.log('db is connected');
})



const app=express();




//2配置模板  默认找到views下的index
swig.setDefaults({//设置程序测试阶段不走缓存
  cache: false
})

app.engine('html',swig.renderFile);
app.set('views','./views');//第一参数必须是views
app.set('view engine','html');
// app.get('/',(req,res)=>{跟路由相关的写在route文件夹里
// 	res.render('index')
// })

//3配置静态资源
app.use(express.static('public'));



//4添加处理POST请求中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
// app.post('/add',(req,res)=>{跟路由相关的写在route文件夹里
// 	res.send(body);
// })





//5处理路由
app.use('/',require('./routes/index.js'));//负责显示首页

app.use('/wish',require('./routes/wish.js'))//负责添加，删除愿望
//      '/wish'需要搭配index.js使用，前端页面点击发送什么请求，这里就接受什么请求

app.listen(3000,()=>{
	console.log('server is running ...');
})