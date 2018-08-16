import React from 'react';
import ReactDom from 'react-dom';

//要顺利实现ReactDom.render还要安装babel插件，再对webpack的loader添加一些配置
/*1::*/ ReactDom.render(<h1>say hello...<\/h1>,document.getElementById('foot'));
/*2::*/ ReactDom.render(<App<\/>,document.getElementById('foot'));
