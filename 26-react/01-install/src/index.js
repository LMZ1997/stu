import React from 'react';
import ReactDom from 'react-dom';

import App from './App'
//要顺利实现ReactDom.render还要安装babel插件，再对webpack的loader添加一些配置
// /*第一种方法*/ ReactDom.render(<h1>say hello...</h1>,document.getElementById('root'));
 ReactDom.render(<App/>,document.getElementById('root'));
