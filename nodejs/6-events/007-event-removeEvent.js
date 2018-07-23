const EventEmitter=require('events');
class MyEvent extends EventEmitter{

}
const myEvent=new MyEvent();
fn1=()=>{
	console.log('test1');
}
fn2=()=>{
	console.log('test2');
}
myEvent.on('test',fn1);
myEvent.on('test',fn2);
myEvent.removeListener('test',fn1)//移除test事件中的fn1,匿名函数无法选中,所以改为有名函数
// myEvent.removeAllListeners('test');//移除所有test
// myEvent.off('test',fn1);//新增方法，只在10.0以上node版本可用
myEvent.emit('test');
	
