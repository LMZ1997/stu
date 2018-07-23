let {Writable}=require('stream');//let writable=require('stream').writable;

class MyWrite extends Writable{

	constructor(){
		super();
	}
	_write(chunk,encoding,callBack){//命名必须这样
		console.log(chunk);
		callBack();
	}
}

let writer=new MyWrite();

/*这些是直接在代码写入数据
writer.write('aa');//若chunk没有调用toString()方法,输出<Buffer 61 61>
writer.write('aa11','utf8',()=>{
	console.log('回调函数')
});
writer.on('finish',()=>{//必须有下边的end函数才能触发，end表示结束，结束才能finish
	console.log('finish....')
});
writer.end();
*/
//可读流
process.stdin.pipe(writer);//在控制台写入数据