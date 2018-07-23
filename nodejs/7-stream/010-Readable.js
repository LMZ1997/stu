
//做一个可读入12345的可读流程序

const {Readable}=require('stream');

class MyReadStream extends Readable{
	constructor(){
		super();
		this.index=0;
	}
	_read(){
		this.index++;
		if(this.index>5){
			this.push(null);//push进如null,会停止数据读入，触发end事件
		}
		else{
			let str=''+this.index;//将数字转化为字符串格式
			let buf=Buffer.from(str);//再将字符串转化为buffer;
			this.push(buf);
		}
	}
}
const myRead=new MyReadStream();
let body='';
myRead.on('data',(chunk)=>{
	// console.log(chunk.toString());//这样输出的是1，2，3，4，5  逗号换行
	body+=chunk     //这样输出的是12345
});
myRead.on('end',()=>{
	console.log(body)
	console.log('end....')
})

myRead.pipe(process.stdout)//可读流中的内容通过管道传到标准可写流中