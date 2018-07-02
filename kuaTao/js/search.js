;(function($){
	var cache={//缓存，页面刷新会清除缓存
		data:{},
		count:0,
		addData:function(key,val){
			this.data[key]=val;
			this.count++;
		},
		readData:function(key){
			return this.data[key]
		}
		// delData:function(key)
	};

	function Search($elem,options){
		this.$elem=$elem;
		this.options=options;
		this.$searchForm=this.$elem.find('#search-form');
		this.$searchInput=this.$elem.find('.search-input');
		this.$searchLayer=this.$elem.find('.search-layer');
		this.searchBtn=this.$elem.find('.search-btn');
		
		this.timer=null;
		this.isHaveHtml=false;
		this._init();

		if(this.options.autocomplete){
			this.auto();
		}
	}
	Search.prototype={
		constructor:Search,
		_init:function(){
			//绑定事件
			this.searchBtn.on('click',$.proxy(this.submit,this));
		},
		submit:function(){
			if(this.getInputVal()==''){
				return false;
			}
			this.$searchForm.trigger('submit');
		},
		getInputVal:function(){
			return $.trim(this.$searchInput.val());
		},
		auto:function(){
			this.$searchInput
			.on('input',function(){
				if(this.getInputVal()==''){
					this.hideLayer();
					return false;
				}

				if(this.options.getDataDelay){//优化每输入任意字母都会请求数据的弊端(如js)
					clearTimeout(this.timer)
					this.timer=setTimeout(function(){
						this.getData();
					}.bind(this),this.options.getDataDelay)
				}else{
					this.getData();
				}
			}.bind(this))
			.on('focus',function(){
				console.log('11');
				this.showLayer()
			}.bind(this))
			.on('click',function(ev){
				ev.stopPropagation();
			});
			$(document).on('click',$.proxy(this.hideLayer,this));
			this.$searchLayer.showHide(this.options);
		},
		getData:function(){//要使每个函数都单一的做一件事
			var self=this;
			
			if(cache.readData(self.getInputVal())){//若缓存中有对应key值的数据，则直接
												//从缓存中读取，然后不需再进行ajax请求代码
				self.$elem.trigger('getdata',[cache.readData(self.getInputVal()),self.$searchLayer]);
				return;
			}

			if(self.jqXHR){//有时因为网络原因，ajax请求可能会重叠，
						//此处是判断上一次请求是否已经完成，(若已完成
						//那么此处的this.jqXHR值为null,即判断条件为假)
						//若未完成，则会停止上次请求，然后根据最新条件
						//进行最新一次请求，这麽做可以提高效率
				self.jqXHR.abort();
			}
			self.jqXHR=$.ajax({
				url:self.options.url+self.getInputVal(),//拼接要请求的地址,q=后边加上输入的内容
				dataType:'jsonp',
				jsonp:'callback'
			})
			.done(function(data){//这里传递参数需要用[ ]包裹
				cache.addData(self.getInputVal(),data)
				self.$elem.trigger('getdata',[data,self.$searchLayer]);
			})
			.fail(function(err){
				self.$elem.trigger('getNoData',[self.$searchLayer]);
			})
			.always(function(){//执行到这，说明请求完成了，所以在此
							//函数里将self.jqXHR赋值为null
				console.log('always');
				self.jqXHR=null;
			})
		},
		showLayer:function(){
			if(!this.isHaveHtml) return;
			this.$searchLayer.showHide('show');		
		},
		hideLayer:function(){
			this.$searchLayer.showHide('hide');
		},
		appendLayer:function(html){
			this.$searchLayer.html(html);
			this.isHaveHtml=!!html;
		},
		setInputVal:function(val){
			$searchInput.val(removeHTMLTag($(this).html(val)));
			function removeHTMLTag(str){
				return str.replace(/<[^<|>]+>/g,'')
			}
		}
	}
	Search.DEFAULTS={
		autocomplete:false,
		css3:false,
		js:true,
		mode:'slideUpDown',
		getDataDelay:200,
		url:'https://suggest.taobao.com/sug?code=utf-8&_ksTS=1529744566102_802&k=1&area=c2c&bucketid=6&q='
	}
	$.fn.extend({
		search:function(options,valueOfHtml){
			return this.each(function(){
				var $this=$(this);
				var search=$this.data('.search');
				if(!search){
					options=$.extend(Search.DEFAULTS,options);
					search=new Search($(this),options);
					$this.data('search',search);
				}
				console.log('1::',options)
				if(typeof search[options]=='function'){
					console.log('in')
					search[options](valueOfHtml);
				}
			})
		}	
	})
})(jQuery)