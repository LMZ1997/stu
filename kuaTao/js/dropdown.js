;$(function(){
	$.fn.extend({
		//后面还要加很多内容，这样不利于维护，所以改造为面向对象方法
		/*
		dropdown:function(){
			 return this.each(function(){
			 	var $this=$(this);
			 	var activeClass=$this.data('active')+'-active';
			 	var $dropdownLayer=$this.find('.dropdown-layer');
			 	$dropdownLayer.showHide({//必须先初始化
			 		css3:true,
			 		js:true,
			 		mode:'slideUpDown'
			 	})
			 	$this.hover(function(){
			 		$dropdownLayer.showHide('show');
			 		$this.addClass(activeClass)
			 	},function(){
			 		$dropdownLayer.showHide('hide');
			 		$this.removeClass(activeClass)
			 	})
			});
		}
		*/
	});
	
	function DropDown($elem,options){//this——>DropDown对象
		this.$elem=$elem;
		this.options=options;
		this.activeClass=this.$elem.data('active')+'-active';
		this.$dropdownLayer=this.$elem.find('.dropdown-layer');
		
		this._init();
	};
	DropDown.prototype={
		constructor:DropDown,
		_init:function(){
			//初始化显示隐藏模块
			this.$dropdownLayer.showHide(this.options);
			//绑定事件
			if(this.options.eventName=='click'){
				this.$elem.on('click',function(ev){
					ev.stopPropagation();
					this.show();
				}.bind(this));
				$(document).on('click',function(){
					this.hide();
				}.bind(this));
			}
			else{
				// this.$elem.hover($.proxy(this.show,this),$.proxy(this.hide,this),);代理this
				this.$elem.hover(this.show.bind(this),this.hide.bind(this));
				/*this.$elem.hover(function(){
					console.log('bind之后，this就是DropDown对象了',this)
					this.show;//调用对象实例上的show方法，(下边)
				}.bind(this),function(){
					this.hide;//调用对象实例上的hide方法，(下边)
				}.bind(this))*/
			}
			this.$dropdownLayer.on('show shown hide hidden',function(ev){
				this.$elem.trigger('dropdown-'+ev.type);//拼接字符串,触发拼接后的事件名
				//this.$elem是调用dropdown事件的对象，也就是$('.dropdown')
			}.bind(this))
		},
		show:function(){
			if(this.options.delay){//避免用户快速划过触发不必要的事件，影响性能
				this.Timer=setTimeout(function(){
					this.$dropdownLayer.showHide('show');
			 		this.$elem.addClass(this.activeClass)
				}.bind(this),this.options.delay);
			}
			else{
				this.$dropdownLayer.showHide('show');
			 	this.$elem.addClass(this.activeClass)
			}	
		},
		hide:function(){
			if(this.options.delay){
				clearTimeout(this.Timer)
			}
			this.$dropdownLayer.showHide('hide');
			this.$elem.removeClass(this.activeClass)
		}
	}
	DropDown.DEFAULTS={//大写字母多为js中的常量
		css3:true,
		js:false,
		mode:'slideUpDown',
		eventName:'hover'
	}
	$.fn.extend({
		dropdown:function(options){
			return this.each(function(){
				var $this=$(this);
				var dropdown=$this.data('dropdown');
				if(!dropdown){
					options=$.extend(DropDown.DEFAULTS,options)//解决用户不传参的问题
					dropdown=new DropDown($this,options);
					$this.data('dropdown',dropdown);
				}
				if(typeof dropdown[options]=='function'){
					dropdown[options]();
				}
				
			})
		}
	})
})
