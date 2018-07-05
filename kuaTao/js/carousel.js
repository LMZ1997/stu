;(function($){
	function Carousel($elem,options){
		this.$elem=$elem;
		this.options=options;
		this.$carouselItem=this.$elem.find('.carousel-item');
		this.itemsNum=this.$carouselItem.length;
		this.$btnsItem=this.$elem.find('.btns-item');
		this.$carouselControl=this.$elem.find('.control');
		this.now=0;
		this._init();

	}
	Carousel.prototype={
		constructor:Carousel,
		_init:function(){
			//绑定事件
			var self=this;
			this.$carouselItem.eq(this.now).show();
			this.$btnsItem.eq(this.now).addClass('active');
			if(this.options.mode=='slide'){
				this.tab=this.slide;
			}
			else{
				//初始化显示隐藏插件
				this.$carouselItem.showHide(this.options);
				this.tab=this.fade;
			}
			this.$elem
			.hover(function(){
				self.$carouselControl.show();
			},function(){
				self.$carouselControl.hide();
			})
			.on('click','.control-right',function(){
				self.tab(self.getCorrectIndex(self.now+1));
			})
			.on('click','.control-left',function(){
				self.tab(self.getCorrectIndex(self.now-1))
			})
			.on('click','.btns-item',function(){
				self.tab(self.$btnsItem.index($(this)))
			})
		},
		fade:function(index){
			this.$carouselItem.eq(this.now).showHide('hide');
			this.$btnsItem.eq(this.now).removeClass('active');
			this.$carouselItem.eq(index).showHide('show');
			this.$btnsItem.eq(index).addClass('active');
			this.now=index;
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
	Carousel.DEFAULTS={
		css3:false,
		js:true,
		mode:'fade'
	}
	$.fn.extend({
		carousel:function(options){
			return this.each(function(){
				var $this=$(this);
				var carousel=$this.data('.carousel');
				if(!carousel){
					options=$.extend(Carousel.DEFAULTS,options);
					carousel=new Carousel($(this),options);
					$this.data('carousel',carousel);
				}
				console.log('1::',options)
				if(typeof carousel[options]=='function'){
					carousel[options]();
				}
			})
		}	
	})
})(jQuery)