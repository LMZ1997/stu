/*   Node Package Manager
	NPM是一个工具,安装node时会自动安装
	NPM主要用来完成第三方模块的发布,安装和依赖

	"main": "index.js",表示此index.js为默认入口,不过index.js文件需自己创建
	
	搜索包 npm search 包名关键字
	npm -v
	npm init
	npm install -g jade --save//上线打包jade
	npm install jade --save-dev//不打包jade

	装完之后，package.json会存在对应包的类似地址的东西，所以只需把package.json
	复制给别人，别人再运用npm install就可以安装所有依赖的包了！！！！！！！
	
	npm uninstall -g jade --save(即安装时用什么参数，卸载就也用哪些参数)
	npm uninstall jade --save-dev



	如果带参数-g,表明全局安装,这样安装的包在/usr/local/lib/node_modules文件夹中，
	可以在命令行中使用,但不可以在项目中require,使用-g参数时没有--save
	
	如果不带参数-g表明本地安装,包文件安装在当前文件夹的node_modules文件夹中,只能在当
	前项目中使用require引入模块
	
	参数--save:把包的版本信息添加到package.json中dependencies 中,一般是需
	要最终需要打包到业务代码中的依赖,如果执行npm install就会安装 package.json中
	dependencies的依赖;

	参数--save-dev: 依赖会加在package.json的devDependencies中,一般是辅助
	开发的依赖,不会打包上线的
*/
const jade=require('jade');
console.log(jade);