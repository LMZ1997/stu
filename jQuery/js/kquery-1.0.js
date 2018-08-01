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
		},
		selector:"",
		length:0,
		jquery:'1.0',
		push:[].push,
		sort:[].sort,
		splice:[].splice,
		//以下这些对象实例的方法比较常用，所以直接写在这
		toArray:function(){
			return [].slice.call(this)
		},
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
		eq:function(num){
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
		map:function(fn){//原型上的map方法返回的是jquery对象
			//kquery.map调用的是构造函数的静态方法(且返回的是一个数组)
			// , 为的是构建对象实例上的map方法
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
			//若是数组
			if(kquery.isArray(arr)){
				for (var i = 0; i < arr.length; i++) {
					var res=fn.call(arr[i],i,arr[i]);//改变了this
					//用res接收返回值，判断是否返回了true或false
					//  ,因为返回值会影响遍历结果，下边写了影响的效果
					if(res==true){
						continue;
					}
					else if(res==false){
						break;
					}
				}	
			}
			//若是对象
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
			//传什么进来返回出去什么
			return arr;
		},
		//原生jquery的map方法里的this没有处理，指的是window，所以这里也没有用fn.call改变this指向
		map:function(arr,fn){
			var retArr=[];
			if(kquery.isArray(arr)){
				for (var i = 0; i < arr.length; i++){
					var res=fn(arr[i],i)//map方法里的this代表window，所以无需改变this指向
					if(res){
							retArr.push(res)
					}
					/*
					else{
						return retArr;
					}
					*/
				}
			}
			else{
				for(key in arr){
					var res=fn(arr[key],key)
					if(res){
						retArr.push(res)
					}
					/*
					else{
						return retArr;
					}
					*/
				}
			}
			return retArr;
		},
		toWords:function(str){
			//  \w+ ：表示多个字符的单词
			return str.match(/\b\w+\b/g);
		},
		//addEvent是为了解决浏览器版本低兼容性问题而创建的(低版本没有addEventListener)
		addEvent:function(dom,eventName,fn){
			if(dom.addEventListener){
				dom.addEventListener(eventName,fn);
			}
			else{
				dom.attachEvent('on'+eventName,fn);
			}
		}
	});

	//kquery原型对象上的属性方法
	kquery.fn.extend({
		html:function(content){
			if(content){
				this.each(function(){
					this.innerHTML=content;
				});
				return this;
			}
			else{
				return this[0].innerHTML;
			}
		},
		text:function(content){
			if(content){
				this.each(function(){
					this.innerText=content;
				});
				return this;
			}
			else{
				var str='';
				this.each(function(){
					str+=this.innerText;
				});
				return str;
			}
		},
		attr:function(arg1,arg2){
			if(typeof arg1=='object'){
				//先遍历传来的对象参数
				dom=this;//
				kquery.each(arg1,function(attr,value){
					//再遍历所有元素，并设置相应属性值
					dom.each(function(){
						this.setAttribute(attr,value);
					})
				});
				// return this;
			}
			else{
				if(arguments.length==1){//传一个非对象参数的情况(获取属性)
					//只获取第一个元素的对应属性
					return this[0].getAttribute(arg1);
				}
				else if(arguments.length==2){//传2个参数的情况(设置属性)
					//设置所有元素的对应属性
					this.each(function(){
						this.setAttribute(arg1,arg2);
					})
				}
				// return this;
			}
			return this;
		},
		removeAttr:function(attr){
			if(attr){
				this.each(function(){
					this.removeAttribute(attr);					
				});
				return this;
			}
			/*什么都不做
			else{
				return this;
			}
			*/
		},
		val:function(val){
			if(val){
				this.each(function(){
					this.value=val;
				});
				return this;
			}
			else{
				return this[0].value;
			}	
		},
		css:function(arg1,arg2){
			if(kquery.isString(arg1)){
				if(arguments.length==1){
					if(this[0].currentStyle){//低版本浏览器兼容问题
						return this[0].currentStyle[arg1];
					}
					else{
						return getComputedStyle(this[0],false)[arg1];	
					}	
				}
				else if(arguments.length==2){
					this.each(function(){
						this.style[arg1]=arg2;
					});
					return this;
				}
			}
			else if(typeof arg1=='object'){
				this.each(function(){
					for(key in arg1){
						this.style[key]=arg1[key];
					};
				});
				return this;
			}
		},
		hasClass:function(str){
			var res=false;
			if(str){
				var reg=eval('/\\b'+str+'\\b/');//eval可以将其括号中的内容(字符串)当作HTML代码来用；
				this.each(function(){
					if(reg.test(this.className)){
						res=true;
						return false;//查找到一个就证明有此class,就可以退出了，提高效率
					}
				});	
			}
			return res;
		},
		addClass:function(str){
			//把str转化为数组,因为str不同单词间可能和有n个空格隔着
			// var classNames=str.split();//只适用于不同单词间有一个空格隔开的情况
			// var classNames=str.match(/\b\w+\b/g);
			var classNames=kquery.toWords(str);//解决参数中有多个class值的问题，不
							//能用字符串来判断，只能用数组循环数组中的值来判断
			if(str){
				this.each(function(){
					var $this=kquery(this);//把DOM转换为kquery对象
					for (var i = 0; i < classNames.length; i++) {
						if(!$this.hasClass(classNames[i])){
							this.className=this.className+' '+classNames[i];
						}	
					};	
				})
				// return this;
			}
			return this;
		},
		removeClass:function(str){
			if(str){
				var classNames=kquery.toWords(str);
				this.each(function(){
					for (var i = 0; i < classNames.length; i++) {
						var reg=eval('/\\b'+classNames[i]+'\\b/');
						if(reg.test(this.className)){
							this.className=this.className.replace(reg,'')
						}
					}
					
				});	
			}
			else{
				this.each(function(){
					this.className='';
				})
			}
			return this
		},
		toggleClass:function(str){		
			if(str){
				var res;
				var classNames=kquery.toWords(str);//用数组来做，是为了解决
				       //测试代码的str里的单词间隔着多个空格的问题
				this.each(function(){
					var $this=kquery(this);//把DOM转换为kquery对象
					for (var i = 0; i < classNames.length; i++) {
						var reg=eval('/\\b'+classNames[i]+'\\b/');
						if(reg.test(this.className)){
							$this.removeClass(classNames[i]);
						}
						else{
							$this.addClass(classNames[i]);
						}
					}
					
				});			
			}
			else{
				this.each(function(){
					if(this.className.length==0){					
					 	this.className=res;
					}
					else{
						res=this.className;
						this.className='';
					}	
				});			
			}
			return this;
		}
	});

	//kquery原型对象上的DOM操作方法
	kquery.fn.extend({
		empty:function(){
			this.each(function(){
				this.innerHTML=''
			});
			return this;
		},
		remove:function(selector){
			var doms=document.querySelectorAll(selector);
			this.each(function(){
				for (var i = 0; i < doms.length; i++) {
					if(doms[i]==this){
						var parentNode=this.parentNode;
						parentNode.removeChild(this);
					}
				}
			});
			return this;	
		},
		append:function(source){
			console.log(source);
			if(source){
				//传入的参数类型有jquery对象,DOM节点,HTML代码片段
				var $source=kquery(source);//将参数转换为jquery对象

				this.each(function(index,value){
					var parentNode=this;
					if(index==0){
						$source.each(function(){//$source可以是多个对象
							parentNode.appendChild(this);
							//appendChild工作原理是插入一个,再次运行时,删除上一个插入的节点
						});
					}
					else{
						$source.each(function(){
							var dom=this.cloneNode(true);//复制一份
							parentNode.appendChild(dom);//插入克隆的那一份
						})	
					}					
				})
			}
			return this;
		},
		prepend:function(source){
			if(source){
				//传入的参数类型有jquery对象,DOM节点,HTML代码片段
				var $source=kquery(source);//将参数转换为jquery对象
				this.each(function(index,value){
					var parentNode=this;
					if(index==0){
						$source.each(function(){//$source可以是多个对象
							parentNode.insertBefore(this,parentNode.firstChild);
							//appendChild工作原理是插入一个,再次运行时,删除上一个插入的节点
						})
					}
					else{
						$source.each(function(){
							var dom=this.cloneNode(true);
							parentNode.insertBefore(dom,parentNode.firstChild);	
						})
					}
				})
			}
			return this;
		}
	});
	//kquery原型对象上的事件方法
	kquery.fn.extend({
		on:function(eventName,fn){
			this.each(function(){
				if(!this.bucketEvent){
					this.bucketEvent={};
				}
				if(!this.bucketEvent[eventName]){//等同于!obj[key]
					this.bucketEvent[eventName]=[];//等同于obj[key]=[]
					this.bucketEvent[eventName].push(fn);//等同于obj[key].push(fn)					
					kquery.addEvent(this,eventName,function(){
						kquery.each(this.bucketEvent[eventName],function(){
							this();
						})
					})	
				}
				else{
					this.bucketEvent[eventName].push(fn);
				}
			});
			return this;
		},
		off:function(eventName,fnName){
			if(arguments.length==0){
				this.each(function(){
					this.bucketEvent={};//清空对象
				})
			}
			else if(arguments.length==1){
				this.each(function(){
					this.bucketEvent[eventName]=[];//清空数组
				})
			}
			else if(arguments.length==2){
				this.each(function(){
					var dom=this;
					if(this.bucketEvent&&this.bucketEvent[eventName]){
						kquery.each(this.bucketEvent[eventName],function(index,value){
							if(this==fnName){
								//从数组index的位置删除一个单位元素在返回出数组
								dom.bucketEvent[eventName].slice(index,1);
							}
						})
					}
				})
			};
		},
		clone:function(copyEvent){
			var res=[];
			this.each(function(){
				var dom=this;
				if(copyEvent&&this.bucketEvent){

					kquery.each(this.bucketEvent,function(eventName,fnArr){
						//被克隆的元素已经绑定完事件了，
						//再一次执行on方法，是给克隆出来的元素绑定事件，
						kquery.each(fnArr,function(){
							kquery(dom).on(eventName,this);
							// kquery.addEvent(dom,eventName,this);
						})
					})
				}
				else{
					var dom=this.cloneNode();
					res.push(dom);
				}
			});
			return kquery(res);
		}
	})





	//kquery.fn.init.prototype=kquery;
	kquery.fn.init.prototype=kquery.fn;

	window.kquery=window.$=kquery;
})(window)