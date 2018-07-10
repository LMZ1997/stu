;(function($){
	function init($elem,hiddenCallBack){
		if($elem.is(':hidden')){
			$elem.data('status','hidden');
			if(typeof hiddenCallBack=='function'){
				hiddenCallBack();
			}			
		}
		else{
			$elem.data('status','shown')
		}
	};
	function show($elem,callBack){
		if($elem.data('status')=='shown') return;
		if($elem.data('status')=='show') return;

		$elem.data('status','show').trigger('show');
		callBack();
	};
	function hide($elem,callBack){
		if($elem.data('status')=='hidden') return;
		if($elem.data('status')=='hide') return;
		$elem.data('status','hide').trigger('hide');
		callBack();
	}

	var slient={
		init:function($elem){
			init($elem);
		},
		show:function($elem){
			show($elem,function(){
				$elem.show();
				$elem.trigger('shown');
				$elem.data('status','shown');
			})						
		},
		hide:function($elem){
			hide($elem,function(){
				$elem.hide();
				$elem.trigger('hidden');
				$elem.data('status','hidden');
			});
		}
	}

	var css3={
		fade:{//淡入淡出
			init:function($elem){
				css3._init($elem,'fadeOut');	
			},
			show:function($elem){
				css3._show($elem,'fadeOut');		
			},
			hide:function($elem){
				css3._hide($elem,'fadeOut');
			}
		},
		//上下卷入卷出
		slideUpDown:{
			init:function($elem){
				$elem.height($elem.height());
				css3._init($elem,'slideUpDownCollapse');	
			},
			show:function($elem){
				css3._show($elem,'slideUpDownCollapse')		
			},
			hide:function($elem){
				css3._hide($elem,'slideUpDownCollapse')
			}
		},
		//左右卷入卷出
		slideLeftRight:{
			init:function($elem){
				$elem.width($elem.width());
				css3._init($elem,'slideLeftRightCollapse');	
			},
			show:function($elem){
				css3._show($elem,'slideLeftRightCollapse')		
			},
			hide:function($elem){
				css3._hide($elem,'slideLeftRightCollapse')
			}
		},
		//淡入淡出上下卷入卷出
		fadeSlideUpDown:{
			init:function($elem){
				$elem.height($elem.height());
				css3._init($elem,'fadeOut slideUpDownCollapse');	
			},
			show:function($elem){
				css3._show($elem,'fadeOut slideUpDownCollapse')
			},
			hide:function($elem){
				css3._hide($elem,'fadeOut slideUpDownCollapse')
			}
		},
		//淡入淡出左右卷入卷出
		fadeSlideLeftRight:{
			init:function($elem){
				$elem.width($elem.width());
				css3._init($elem,'fadeOut slideLeftRightCollapse');	
			},
			show:function($elem){
				css3._show($elem,'fadeOut slideLeftRightCollapse')
			},
			hide:function($elem){
				css3._hide($elem,'fadeOut slideLeftRightCollapse')
			}
		}
	}
	css3._init=function($elem,className){
			$elem.addClass('transition');
			init($elem,function(){
			$elem.addClass(className);
		});	
	}
	css3._show=function($elem,className){
		show($elem,function(){
			$elem.show();
			$elem
			.off(kuazhu.transition.end)//kuazhu.transition.end是指过渡结束的事件名
			.one(kuazhu.transition.end,function(){
				$elem.trigger('shown').data('status','shown');
			});
			setTimeout(function(){
				$elem.removeClass(className);//
			},20);
		});
	}
	css3._hide=function($elem,className){
		hide($elem,function(){
			$elem
			.off(kuazhu.transition.end)
			.one(kuazhu.transition.end,function(){
				$elem.hide();
				$elem.trigger('hidden').data('status','hidden');
			});
			$elem.addClass(className);
		});	
	}

	var js={
		fade:{
			init:function($elem){
				js._init($elem);
			},
			show:function($elem){
				js._show($elem,'fadeIn')
			},
			hide:function($elem){
				js._hide($elem,'fadeOut')
			}
		},
		slideUpDown:{
			init:function($elem){
				js._init($elem);
			},
			show:function($elem){
				js._show($elem,'slideDown');
			},
			hide:function($elem){
				js._hide($elem,'slideUp');
			}
		},
		slideLeftRight:{
			init:function($elem){
				js._customInit($elem,{
					width:'0px',
					paddingLeft:'0px',
					paddingBotom:'0px',
				})
			},
			show:function($elem){
				js._customShow($elem);
			},
			hide:function($elem){
				js._customHide($elem,{
					width:'0px',
					paddingLeft:'0px',
					paddingRight:'0px',
				})
			}
		},
		fadeSlideUpDown:{
			init:function($elem){
				js._customInit($elem,{
					height:'0px',
					paddingTop:'0px',
					paddingBotom:'0px',
					opacity:0
				})
			},
			show:function(){
				js._customShow($elem);
			},
			hide:function($elem){
				js._customHide($elem,{
					height:'0px',
					paddingTop:'0px',
					paddingBotom:'0px',
					opacity:0
				})
			}
		},
		fadeSlideLeftRight:{
			init:function($elem){
				js._customInit($elem,{
					width:'0px',
					paddingLeft:'0px',
					paddingRight:'0px',
					opacity:0
				})
			},
			show:function(){
				js._customShow($elem);
			},
			hide:function($elem){
				js._customHide($elem,{
					width:'0px',
					paddingLeft:'0px',
					paddingRight:'0px',
					opacity:0
				})
			}
		}
	}
	js._init=function($elem){
		$elem.removeClass('transition');
		init($elem);
	}
	js._show=function($elem,mode){
		show($elem,function(){
			$elem.stop()[mode](function(){
				$elem.trigger('shown').data('status','shown');
			})
		})
	}
	js._hide=function($elem,mode){
		hide($elem,function(){
			$elem.stop()[mode](function(){
				$elem.trigger('hidden').data('status','hidden');
			})
		})
	}
	js._customInit=function($elem,options){
		$elem.removeClass('transition');
		var styles={};
		for(key in options){
			styles[key]=$elem.css(key);
		}
		$elem.data('styles',styles);
		
		init($elem,function(){
			$elem.css(options);
		});
	}
	js._customShow=function($elem){
		var styles=$elem.data('styles');
		show($elem,function(){
			$elem.show();
			$elem.stop().animate(styles,function(){
				$elem.trigger('shown').data('status','shown');
			})
		})
	}
	js._customHide=function($elem,options){
		hide($elem,function(){
			$elem.stop().animate(options	
			,function(){
				$elem.hide();
				$elem.trigger('hidden').data('status','hidden');
			});
		})	
	}
	
	function showHide($elem,options){//静态函数
		/*  两个都为fasle的话，显示和隐藏默认调用slient方法
				css3:false,
				js:false,
				mode:'slideUpDown'
			*/
			var showHideFn=null;
			if(options.css3&&kuazhu.transition.isSupport){//css3并且判断是否支持css3
				showHideFn=css3[options.mode]
			}
			else if(options.js){//js
				showHideFn=js[options.mode]
			}
			else{//slient
				showHideFn=slient;
			}

			showHideFn.init($elem);//直接初始化
			return {//将方法返回出去
				show:showHideFn.show,
				hide:showHideFn.hide
			}
	}
	$.fn.extend({//调用extend方法,使外部对象也可以调用此showHide方法
		showHide:function(options){//使所有jquery对象都有一个showHide方法
			
			var defaults={//默认参数，防止用户没有设置参数
				css3:false,
				js:false,
				mode:'fade'
			}
			this.each(function(){
				var $elem=$(this);
				var mode=$elem.data('mode');//第一次调用showHide进来时(是初始化),元素$elem上没有mode
				if(!mode){//第一次调用showHide进来时(是初始化),元素$elem上没有mode
					options=$.extend(defaults,options);
					mode=showHide($elem,options);//这个showHide是调用静态函数showHide,将返回的方法存在mode中
					$elem.data('mode',mode)//元素data属性上设置mode属性，第二次调用赋值给mode
				}//第二次调用showHide进来时(是调用显示隐藏代码)有mode，所以直接执行下边函数
				
				if(typeof mode[options]=='function'){
					mode[options]($elem);
				}
				
			});
			return this;
		}
	})	
})(jQuery)