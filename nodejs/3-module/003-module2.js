var str2='hello';

var obj={name:'Tom',age:18};

var fn=()=>{
	console.log('fn....')
}


/*
module.exports.str2=str2;
module.exports.obj=obj;
module.exports.fn=fn;
等同于
exports.str2=str2;
exports.obj=obj;
exports.fn=fn;
*/


// console.log(module.exports);
// console.log(exports);
console.log('两者是否相等',module.exports==exports);
//没有将多属性对象赋值给module.exports或者exports前，两者是完全相等的，所
//以，两者任何一个添加的属性，测试文件中的require函数都会返回出来

module.exports={//将包含多个属性的对象赋值给module.exports或者exports,将会
				//导致exports不再等同于module.exports
	str2:str2,
	obj:obj,
	fn:fn
}
console.log('两者是否相等',module.exports==exports);
/*
exports={//由于require返回的是module.exports的内容，所以exports
			//赋值多属性对象并不能暴露这些属性
	str2:str2,
	obj:obj,
	fn:fn
}
*/