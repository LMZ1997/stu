;(function($){
	function Tab($elem,options){
		this.$elem=$elem;
		this.options=options;
		this.$tabItems=this.$elem.find('.tab-item');
		this.itemsNum=this.$tabItems.length;
		this.$tabPanels=this.$elem.find('.tab-panel');
		this.now=this.getCorrectIndex(this.options.activeIndex);
		this._init();

	}
	Tab.prototype={
		constructor:Tab,
		_init:function(){
			var self=this;
			var timer=null;
			//初始化showhide插件
			this.$tabPanels.showHide(this.options);
			
			this.$tabPanels.on('show shown hide hidden',function(ev){
				self.$elem.trigger('tab-'+ev.type,[self.$tabPanels.index(this),this])
			});
			//初始化面板状态
			this.$tabItems.eq(this.now).addClass('tab-item-active');
			this.$tabPanels.eq(this.now).showHide('show');
			var eventName=this.options.eventName=='click'?'click':'mouseenter';
			
			this.$elem.on(eventName,'.tab-item',function(){
				var index=self.$tabItems.index(this);
				if(self.now == index) return;
				if(self.options.delay){
					clearTimeout(timer);
					timer=setTimeout(function(){
						self.toggle(index);
					},self.options.delay)
				}else{
					self.toggle(index);
				}
				
			});
			if(this.options.interval){//自动播放
				this.auto();
				this.$elem.hover(function(){
					self.paused();
				},function(){
					self.auto();
				})
			}
		},
		toggle:function(index){
			if(this.now == index) return;
			this.$tabItems.eq(this.now).removeClass('tab-item-active');
			this.$tabPanels.eq(this.now).showHide('hide');
			this.$tabItems.eq(index).addClass('tab-item-active');
			this.$tabPanels.eq(index).showHide('show');
			this.now=index;
		},
		auto:function(){
				this.timer=null;
				this.timer=setInterval(function(){
					this.toggle(this.getCorrectIndex(this.now+1));
				}.bind(this),this.options.interval);	
		},
		paused:function(){
			clearInterval(this.timer)
		},
		getCorrectIndex:function(index){
			if(index>=this.itemsNum){
				index=0;
			}
			else if(index<0){
				index=this.itemsNum-1;
			}
			return index;
		}
		
	}
	Tab.DEFAULTS={
		css3:false,
		js:false,
		mode:'fade',
		eventName:'mouseenter',
		delay:200,
		interval:0,
		activeIndex:0
	}
	$.fn.extend({
		tab:function(options){
			return this.each(function(){
				var $this=$(this);
				var tab=$this.data('.tab');
				if(!tab){    //传一个空对象{}，可以每次将Carousel.DEFAULTS重置，避免以前代码运行后对其进行改动
					options=$.extend({},Tab.DEFAULTS,options);
					tab=new Tab($(this),options);
					$this.data('tab',tab);
				}
				// console.log('1::',options)
				if(typeof tab[options]=='function'){
					tab[options]();
				}
			})
		}	
	})
})(jQuery)