//若require传递的文件名没有后缀。	按顺序
	//首先按照文件名查找，
	//找不到的话，系统自动将后缀加上.js查找
	//再找不到的话，系统自动把后缀换为.json查找
	//还找不到的话，系统自动把后缀换为.node查找
	//最后找不到的话，那就报错了
const m99=require('./099-module99');
console.log(m99);

const mm=require('fs');//核心模块,上边的文件模块必须加./根目录，就是为了与它区分
console.log(mm);

const mmm=require('C:\\Users\\liyuphp\\stu\\nodejs\\3-module\\099-module99.js');
const mmm=require('C:/Users/liyuphp/stu/nodejs/3-module/099-module99.js');

console.log(mmm);//绝对路径


