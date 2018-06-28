;(function($){
	function Search($elem,options){
		this.$elem=$elem;
		this.options=options;
		this.$searchForm=this.$elem.find('#search-form');
		this.$searchInput=this.$elem.find('.search-input');
		this.$searchLayer=this.$elem.find('.search-layer');
		this.searchBtn=this.$elem.find('.search-btn');
		
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
			.on('input',$.proxy(this.getData,this))
			.on('focus',$.proxy(this.showLayer,this))
			.on('click',function(ev){
				ev.stopPropagation();
			});
			$(document).on('click',$.proxy(this.hideLayer,this));
			this.$searchLayer.showHide(this.options);
		},
		getData:function(){//要使每个函数都单一的做一件事
			var self=this;
				$.ajax({
					url:self.options.url+self.getInputVal(),//拼接要请求的地址,q=后边加上输入的内容
					dataType:'jsonp',
					jsonp:'callback'
				})
				.done(function(data){//这里传递参数需要用[ ]包裹
					console.log('aa')
					self.$elem.trigger('getdata',[data,self.$searchLayer]);
				})
				.fail(function(err){
					self.$elem.trigger('getNoData',[self.$searchLayer]);
				})
				.always(function(){
					console.log('always');
				})
		},
		showLayer:function(){
			if($.trim(this.$searchLayer.html())=='') return;
			this.$searchLayer.showHide('show');		
		},
		hideLayer:function(){
			this.$searchLayer.showHide('hide');
		},
		appendLayer:function(html){
			this.$searchLayer.html(html);
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
	// var $searchForm=$('#search-form'),
	// 	$searchInput=$('.search-input'),
	// 	$searchLayer=$('.search-layer');
	// $searchForm.on('submit',function(){
	// 	if(getInputVal()==''){//若搜索栏内容是否为空或者空格，则不执行提交
	// 		return false;
	// 	}
	// });

	// //当用户输入时动态获取提示数据
	// var url='https://suggest.taobao.com/sug?code=utf-8&_ksTS=1529744566102_802&callback=jsonp803&k=1&area=c2c&bucketid=6&q='
	// $searchInput.on('input',function(){
	// 	$.ajax({
	// 		url:url+getInputVal(),//拼接要请求的地址,q=后边加上输入的内容
	// 		dataType:'jsonp',
	// 		jsonp:'callback'
	// 	})
	// 	.done(function(data){
	// 		if(data.result.length==0){
	// 			$searchLayer.html('').hide();//若查询不到相应数据则不执行以下代码，提高效率
	// 			return;
	// 		}
	// 		var html='';
	// 		var dataNum=5;
	// 		for(var i=0;i<data.result.length;i++){
	// 			if(i>dataNum) break;//控制数据的数量
	// 			html+='<li class="search-item">'+data.result[i][0]+'</li>'
	// 		}
	// 		$searchLayer.html(html).show();
	// 	})
	// 	.fail(function(err){
	// 			$searchLayer.html('').hide();
	// 	})
	// 	.always(function(){
	// 		console.log('always');
	// 	})
	// });

	// $searchLayer.on('click','.search-item',function(){//事件委托
	// 	$searchInput.val(removeHTMLTag($(this).html()));
	// 	$searchForm.trigger('submit');
	// });
	// $(document).on('click',function(){
	// 	$searchLayer.hide();
	// });
	// $searchInput.on('focus',function(){
	// 	if($.trim($searchLayer.html())==''){
	// 		// return false;
	// 		$searchLayer.hide();
	// 	}
	// 	else{
	// 		$searchLayer.show();
	// 	}
		
	// })
	// .on('click',function(ev){
	// 	ev.stopPropagation()
	// })


	// function getInputVal(){
	// 	return $.trim($searchInput.val());
	// }
	// function removeHTMLTag(str){
	// 	return str.replace(/<[^<|>]+>/g,'')
	// }
})(jQuery)