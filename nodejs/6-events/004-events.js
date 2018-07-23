const EventEmitter=require('events');
class MyEvent extends EventEmitter{

}
const myEvent=new MyEvent();
myEvent.on('test',()=>{
	console.log('test');
});
myEvent.emit('test');
	
