(function(window,undefined){
var
	kquery=function(selector){
		return new kquery.fn.init(selector);
	};

	//kquery.fn=kquery.prototype=function(){
	kquery.fn=kquery.prototype={
		constructor:kquery,
		//核心函数
		init:function(selector){
			//去掉selector首尾两端的空格，重新赋值selector
			selector=selector.trim();
			//逻辑值为假的返回空的jquery对象
			if(!selector){
				return this;
			}
			//如果是函数的话返回有document的jquery对象,当页面所有的DOM节点加载完毕后执行传入的函数
			else if(typeof selector =='function'){
				document.addEventListener('DOMContentLoaded',function(){
					selector();
				})
				this[0]='document';
				this.length=1;
				return this;
			}
			else if(kquery.isString(selector)){
				//处理HTML代码
				if(kquery.isHTML(selector)){
					var dom=document.createElement('div');
					/*
					dom.innerHTML=selector;//可以使HTML代码转换为DOM节点
					for (var i = 0; i < dom.children.length; i++) {
						this[i]=dom.children[i];
					}
					this.length=dom.children.length;
					return this;
					*/
					//解决代码复杂问题--调用真伪数组转换知识
					[].push.apply(this,dom.children);
					return this;
				}
				//处理选择器
				else{
					var aStr=document.querySelectorAll(selector);
					/*
					for (var i = 0; i < aStr.length; i++) {
						this[i]=aStr[i];
					}
					this.length=aStr.length;
					return this;
					*/
					[].push.apply(this,dom.children);
					return this;					
				}
			}
		}
	}

	//静态方法
	kquery.isString=function(str){
		return typeof str =='string';
	}
	kquery.isHTML=function(str){
		return str.charAt(0)=='<'&&str.charAt(str.length-1)=='>'&&str.length>=3
	}
	kquery.trim=function(str){
		if(kquery.isString(str)){
			//用正则去掉字符串首位的空格
			//return str.trim()//此方法只适用于高版本浏览器(支持trim);
			return str.replace(/^\s+|\s+$/,'');//此方法兼容性好
		}
		//不是字符串就是function,function无需改变
		else{
			return str;
		}
	}




	//kquery.fn.init.prototype=kquery;
	kquery.fn.init.prototype=kquery.fn;

	window.kquery=window.$=kquery;
})(window)