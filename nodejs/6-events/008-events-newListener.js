const EventEmitter=require('events');
class MyEvent extends EventEmitter{

}
const myEvent=new MyEvent();

myEvent.on('newListener',(eventName,fn)=>{//系统自定，只要有用on绑定的事件(例如下边的test),就会触发
	console.log('newListener','事件名:',eventName,'对应函数:',fn);
});
myEvent.on('test',()=>{
	console.log('test');
});
// myEvent.emit('test');
	
