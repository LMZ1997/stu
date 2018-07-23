const EventEmitter=require('events');
class MyEvent extends EventEmitter{

}
const myEvent=new MyEvent();
/*
	原生js触发事件传参
	myEvent.on('test',function(ev,arg1,arg2)=>{
		console.log('test',arg1,arg2);
	});
	myEvent.trigger('test',[argument1,argument2]);
*/
myEvent.once('test',(arg1,arg2)=>{//nodeJs中触发事件，传参不需要数组样式，接收参数时也不需要ev
	console.log('test',arg1,arg2);
});
/*
myEvent.addListener('test',(arg1,arg2)=>{//同上
	console.log('test',arg1,arg2);
});
*/
myEvent.emit('test','参数一','参数二');
myEvent.emit('test',...['参数一','参数二']);//由于监听用了once，所以二次触发无效
	
