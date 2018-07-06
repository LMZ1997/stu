;(function($){
	function Carousel($elem,options){
		this.$elem=$elem;
		this.options=options;
		this.$carouselItem=this.$elem.find('.carousel-item');
		this.itemsNum=this.$carouselItem.length;
		this.$btnsItem=this.$elem.find('.btns-item');
		this.$carouselControl=this.$elem.find('.control');
		this.now=this.options.activeIndex;
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
				this.$carouselItem.on('move moved',function(ev){
					var index=self.$carouselItem.index(this);
					if(ev.type=='move'){
						if(index==self.now){
							self.$elem.trigger('carousel-hide',[index,this])
						}else{
							self.$elem.trigger('carousel-show',[index,this])
						}
					}else if(ev.type=='moved'){
						if(index==self.now){//由于下边部分代码有延时器，
							//所以里边的this.now=index会执行异步操作，影响到了此处的if
							//判断，故将原顺序调换
							// self.$elem.trigger('carousel-hidden')
							self.$elem.trigger('carousel-shown',[index,this])
						}else{
							// self.$elem.trigger('carousel-shown')
							self.$elem.trigger('carousel-hidden',[index,this])
						}
					}
				})

				this.$elem.addClass('slide');		
				this.$itemWidth=this.$carouselItem.eq(this.now).width();
				this.$carouselItem.eq(this.now).css({left:0});
				this.transitionClass = this.$carouselItem.eq(this.now).hasClass('transition') ? 'transition' : '';
				this.$carouselItem.move(this.options)
				this.tab=this.slide;
			
				
			}
			else{
				this.$carouselItem.on('show shown hide hidden',function(ev){
					this.$elem.trigger('carousel-'+ev.type,[self.$carouselItems.index(this),this])
				}.bind(this));//这些事件由showhide.js而来

				this.$elem.addClass('fade');
				//初始化显示隐藏插件
				this.$carouselItem.showHide(this.options);
				this.$carouselItem.eq(this.now).show();
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
		fade:function(index){//index表示将要显示的索引
			this.$carouselItem.eq(this.now).showHide('hide');
			this.$btnsItem.eq(this.now).removeClass('active');
			this.$carouselItem.eq(index).showHide('show');
			this.$btnsItem.eq(index).addClass('active');
			this.now=index;
		},
		slide:function(index){
			if(index>this.now){
				this.$carouselItem.eq(index).removeClass(this.transitionClass).css({
					left:this.$itemWidth
				});
				setTimeout(function(){
					this.$carouselItem.eq(this.now).move('x',-this.$itemWidth);
					this.$carouselItem.eq(index).addClass(this.transitionClass).move('x',0);
					this.now=index;
				}.bind(this),20)
			 }	
			else{
				this.$carouselItem.eq(index).removeClass(this.transitionClass).css({
					left:-this.$itemWidth
				})
				setTimeout(function(){
					this.$carouselItem.eq(this.now).move('x',-this.$itemWidth);
					this.$carouselItem.eq(index).addClass(this.transitionClass).move('x',0);
					this.now=index;
				}.bind(this),20)
			}
			this.$btnsItem.eq(this.now).removeClass('active');
			this.$btnsItem.eq(index).addClass('active');
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
		css3:true,
		js:true,
		mode:'fade',
		activeIndex:0
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
				// console.log('1::',options)
				if(typeof carousel[options]=='function'){
					carousel[options]();
				}
			})
		}	
	})
})(jQuery)