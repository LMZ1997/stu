const m2=require('./003-module2.js');//返回值是对应文件的module.exports,而不是exports

console.log(m2);

console.log(m2.obj);

m2.fn();
