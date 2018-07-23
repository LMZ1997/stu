let EventMitter=require('events');
class LikeReadableStream extends EventMitter{
	constructor(data,offsetLength){
		super();
		this.data=data;
		this.offsetLength=offsetLength;
		this.on('newListener',(eventName)=>{
			console.log('1',this.listeners())
			if(eventName=='data'){
				setImmediate(()=>{//立即执行的异步操作(如果不异步执行，因为此事件是在new时就绑定
					//的，在有on函数绑定时触发,所以在下边绑定on函数之前这里的eventName已确定,
					//就会导致eventName是一个空的数组，永远等不了‘data’)
					this._dispach();
					console.log('2',this.listeners())
				})

			}

		})	
	}
	_dispach(){
		let totallLength=this.data.length;
		let resLength=totallLength;
		while(resLength>0){
			let start=totallLength-resLength;
			let end=start+this.offsetLength
			resLength=resLength-this.offsetLength;
			let buf=Buffer.from(this.data.slice(start,end));
			this.emit('data',buf);
		}
		this.emit('end')
	}
}
let data='aaaaaaaaaabbbbbbbbbb';

let readstream=new LikeReadableStream(data,10);
readstream.on('data',(chunk)=>{
	console.log(chunk);
})
readstream.on('end',()=>{
	console.log('edn....')
})