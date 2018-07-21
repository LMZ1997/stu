console.log(arguments.callee +'');
//-js文件在node中是一个函数


//输出内容如下
/*
	function (exports, require, module, __filename, __dirname) { 
		console.log(arguments.callee +'');
		//-js文件在node中是一个函数

	}


*/
