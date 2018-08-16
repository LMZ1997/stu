const path=require('path');

module.exports={

	mode:'development',
	//入口文件
	entry:'./src/index.js',
	
	output:{
		//导出文件命名
		filename:'bundle.js',
		//导出路径
		path:path.resolve(__dirname,'dist')
	}

}