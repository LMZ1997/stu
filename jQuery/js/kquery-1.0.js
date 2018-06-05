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
			selector=kquery.trim(selector);
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
					
					dom.innerHTML=selector;//可以使HTML代码转换为DOM节点
					/*
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
					[].push.apply(this,aStr);
					return this;					
				}
			}
			else if(kquery.isArray(selector)){
				//将selector转化为真数组，解决下边兼容问题
				var selector=[].slice.call(selector);
				[].push.apply(this,selector);//有低版本兼任问题
				return this;
			}
			else{
				this[0]=selector;
				this.length=1;
				return this;
			}
		}
		selector:"",
		length:0,
		jquery:'1.0',
		push:[].push,
		sort:[].sort,
		splice:[].splice,
		toArray:function(){
			return [].slice.call(this)
		}
		get:function(num){
			//arguments.length==1说明传参了，这里不直接用num，
			//  是因为若传来的参数num=0；则判断条件为假,如下
			//if(num){
			if(arguments.length==1){
				if(num>=0){
					return this[num];
				}
				else{
					return this[this.length+num]
				}
			}else{
				return this.toArray();
			}
		},
		eq:function(){
			if(arguments.length==1){
				return kquery(this.get(num));
			}
			else{
				//返回一个空的jquery对象
				return new kquery();
			}
		},
		first:function(){
			return this.eq(0);
		},
		last:function(){
			return this.eq(-1);
		},
		each:function(fn){
			return kquery.each(this,fn)
		},
		map:function(fn){
			return kquery(kquery.map(this,fn))
		}
	}
	//静态方法-------对象实例方法-------调用函数,里边的this，谁调用就代表谁,
	kquery.extend=kquery.fn.extend=function(obj){
		for(key in obj){
			this[key]=obj[key];
		}
	}
	//kquery的静态方法
	kquery.extend({
		isString:function(str){
			return typeof str =='string';
		},
		isHTML:function(str){
			return str.charAt(0)=='<'&&str.charAt(str.length-1)=='>'&&str.length>=3
		},
		isArray:function(str){
			return typeof str=='object'&&length in str;
		},
		trim:function(str){
			if(kquery.isString(str)){
				//用正则去掉字符串首位的空格
				//return str.trim()//此方法只适用于高版本浏览器(支持trim);
				return str.replace(/^\s+|\s+$/,'');//此方法兼容性好
			}
			//不是字符串就是function,function无需改变
			else{
				return str;
			}
		},
		each:function(arr,fn){
			if(kquery.isArray(arr)){
				for (var i = 0; i < arr.length; i++) {
					var res=fn.call(arr[i],i,arr[i]);//改变了this
					if(res==true){
						continue;
					}
					else if(res==false){
						break;
					}
				}	
			}
			else{
				for(key in arr){
					var res=fn.call(arr[key],key,arr[key]);
					if(res==true){
						continue;
					}
					else if(res==false){
						break;
					}
				}
			}
			return arr;
		},
		map:function(arr,fn){
			var retArr=[];
			if(kquery.isArray(arr)){
				for (var i = 0; i < arr.length; i++) {
					var res=fn.call(arr[i],arr[i],i){
						if(res){
							return retArr.push(res)
						}
						else{
							return retArr;
						}
					}
				}
			}
			else{
				for(key in arr){
					var res=fn.call(arr[key],arr[key],key){
						if(res){
							return retArr.push(res)
						}
						else{
							return retArr;
						}
					}
				}
			}
			return retArr;
		}
	});





	//kquery.fn.init.prototype=kquery;
	kquery.fn.init.prototype=kquery.fn;

	window.kquery=window.$=kquery;
})(window)