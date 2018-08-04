const express =require('express');
const swig =require('swig');

const app=express();

swig.setDefaults({//请求不先找缓存，应用在测试阶段
	cache:false
})

app.engine('html',swig.renderFile);
app.set('views','./views');//设置模板存放目录
app.set('view engine','html');
app.get('/test',(req,res)=>{
	res.render('test',{
		title:'跨猪网',
		content:'欢迎光临跨猪网',
		name:'Tom',
		name1:'Amy',
		obj:{
			name:'Tom',
			age:10
		},
		arr:['red','blue','green','yellow','pink','grey']
	})
})
app.get('/',(req,res)=>{
	res.render('index')
})
app.get('/list',(req,res)=>{
	res.render('list')
})

/*
	{% extends './layout.html' %}-------extends !!!
	{% block title %}首页{% endblock %}----endblock
	{% block content %}首页的内容{% endblock %}

*/



app.listen(3000,()=>{
	console.log('server is running ....')
})