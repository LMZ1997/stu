;(function($){
		function init($elem){
			this.$elem=$elem;
			this.currentX=parseFloat(this.$elem.css('left'));
			this.currentY=parseFloat(this.$elem.css('top'));
		}
		function to(x,y,callback){
			x= (typeof x=='number')?x:this.currentX
			y= (typeof x=='number')?y:this.currentY
			if(this.currentY==y&&this.currentX==x) return;
			this.$elem.trigger('move');
			if(typeof callback=='function') callback();
			this.currentX=x;
			this.currentY=y;
		}

		function Slient($elem){
			init.call(this,$elem);
			this.$elem.removeClass('transition');
		}
		Slient.prototype={
			constructor:Slient,
			to:function(x,y){
				var self=this;
				to.call(this,x,y,function(){
					self.$elem.css({
						left:x,
						top:y
					});
					self.$elem.trigger('moved')
				})
			},
			x:function(x){
				this.to(x);
			},
			y:function(y){
				this.to(y)
			}
		}
		function Css3($elem){
			init.call(this,$elem)
			this.$elem.addClass('transition');
			this.$elem.css({//css3过渡初始化时，需要有left和top值，否则无法实现过渡，此处避免用户忘记设置
				left:this.currentX,
				top:this.currentY
			})
		}
		Css3.prototype={
			constructor:Css3,
			to:function(x,y){
				var self=this;
				to.call(this,x,y,function(){
					self.$elem.css({
						left:x,
						top:y
					});
					self.$elem
					.off(kuazhu.transition.end)
					.one(kuazhu.transition.end,function(){
						self.$elem.trigger('moved');
					});
				})
			},
			x:function(x){
				this.to(x);
			},
			y:function(y){
				this.to(y)
			}
		}
		function Js($elem){
			init.call(this,$elem);
			this.$elem.removeClass('transition');
		}
		Js.prototype={
			constructor:Js,
			to:function(x,y){
				var self=this;
				to.call(this,x,y,function(){
					self.$elem
					.stop()
					.animate({
						left:x,
						top:y
					},function(){
						self.$elem.trigger('moved')
					})
				})
			},
			x:function(x){
				this.to(x);
			},
			y:function(y){
				this.to(y)
			}
		}
		var mode=null;
		function move($elem,options){
			if(options.css3&&kuazhu.transition.isSupport){
				mode=new Css3($elem);
			}
			else if(options.js){
				mode=new Js($elem);
			}
			else{
				mode=new Slient($elem);
			}
			//return mode 返回的mode对象包含函数太多，很多并没有用
			return {
				to:mode.to.bind(mode),//改变mode中的this指向
				x:mode.x.bind(mode),
				y:mode.y.bind(mode)
			}
		}

		var DEFAULTS={
			css3:true,
			js:true
		};

	$.fn.extend({
		move:function(options,x,y){
			return this.each(function(){
				var $this=$(this);
				var moveMode=$this.data('moveMode');
				if(!moveMode){
					options=$.extend(DEFAULTS,options);
					moveMode=move($this,options);
					$this.data('moveMode',moveMode);
				}
				if(typeof moveMode[options]=='function'){
					moveMode[options](x,y);
				}
			})
		}	
	})
})(jQuery)