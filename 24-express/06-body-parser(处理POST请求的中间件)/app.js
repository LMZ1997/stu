const express=require('express');
const app=express();


const bodyParser=require('body-parser'); 


app.use(bodyParser.urlencoded({ extended: false }))//false代表string和arr类型数据
app.use(bodyParser.json());



app.use(express.static('public'));
app.post('/',(req,res)=>{
	/*引用中间件代替繁琐代码
	let body='';
	req.on('data',(chunk)=>{
		body+=chunk;
	})
	req.on('end',()=>{
		res.send(body);
	})
	*/
	res.send('看bash里返回的数据')
	console.log(req.body)

})
app.listen(3000,()=>{
	console.log('server is running at 127.0.0.1:3000')
})