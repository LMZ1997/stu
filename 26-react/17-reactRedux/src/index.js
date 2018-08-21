import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux'//Provider是组件要大写

import App from './App'

import store from './store'//默认寻找文件夹里的index.js

//要顺利实现ReactDom.render还要安装babel插件，再对webpack的loader添加一些配置
 
 ReactDom.render(//store={store}所有子组件都有store了,不需要引入import store from './store'
 	<Provider store={store}>
 		<App/>
 	</Provider>
 	,
 	document.getElementById('root')
 );
