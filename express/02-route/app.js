const express=require('express');
const app=express();//Function express
	
app.get('/abc',(req,res,ext)=>{//地址栏输入127.0.0.1：3000/abc
	console.log('home page')
	next();
},(req,res)=>{
	console.log('home page enxt')
	res.send('get data abc..~.')
})

app.all('/',(req,res,next)=>{//接受所有请求，如果传参有next，那么必须执行next(),否则程序就卡在这不走了
	res.send('all。。。');
	next();
})


app.post('/',(req,res)=>{
	res.send('post data...')
})
app.get('/',(req,res)=>{
	res.send('get data..~.')
})
app.put('/',(req,res)=>{
	res.send('put data...')
})
app.delete('/',(req,res)=>{
	res.send('delete data...')
})

//如果public内html文件命名为index.html,那么这句代码要放在请求后边(不然会拦截请求，系统默认访问路径下的index.html)
app.use(express.static('public'));//托管静态文件,在地址栏输入文件路径便可以访问文件(路径要相对于public输入)


app.listen(3000,()=>{
	console.log('server is running at 127.0.0.1:3000')
})