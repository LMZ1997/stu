const EventEmitter=require('events');
class MyEvent extends EventEmitter{

}
const myEvent=new MyEvent();
myEvent.setMaxListeners(12);

myEvent.on('test',()=>{
	console.log('1::','test');
});
myEvent.on('test',()=>{
	console.log('2::','test');
});
myEvent.on('test',()=>{
	console.log('3::','test');
});
myEvent.on('test',()=>{
	console.log('4::','test');
});
myEvent.on('test',()=>{
	console.log('5::','test');
});
myEvent.on('test',()=>{
	console.log('6::','test');
});
myEvent.on('test',()=>{
	console.log('7::','test');
});
myEvent.on('test',()=>{
	console.log('8::','test');
});
myEvent.on('test',()=>{
	console.log('9::','test');
});
myEvent.on('test',()=>{
	console.log('10::','test');
});
myEvent.on('test',()=>{
	console.log('11::','test');
});
myEvent.on('test',()=>{
	console.log('12::','默认监听同一事件的最大值为10,如果监听同一事件大于10，会有一个警告信息,可以通过设置事件最大监听数解决');
});
myEvent.emit('test');
	
