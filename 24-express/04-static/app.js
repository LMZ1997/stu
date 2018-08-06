const express=require('express');
const app=express();//Function express
const userModel=require('./router/user.js')
const blogModel=require('./router/blog.js')

//如果public内html文件命名为index.html,那么这句代码要放在请求后边(不然会拦截请求，系统默认访问路径下的index.html)
// app.use(express.static('public'));//托管静态文件,在地址栏输入文件路径便可以访问文件(路径要相对于public输入)

app.use('/static',express.static('public'));//虚拟路径,要想返回index.html，必须在地址栏加上(/static)


app.get('/',(req,res)=>{
	console.log('get data ...')
})

app.listen(3000,()=>{
	console.log('server is running at 127.0.0.1:3000')
})