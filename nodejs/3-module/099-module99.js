var str2='hello';

var obj={name:'Tom',age:18};

var fn=()=>{
	console.log('fn....')
}


console.log('两者是否相等',module.exports==exports);

module.exports={
	obj:obj,
	fn:fn
}
console.log('两者是否相等',module.exports==exports);

