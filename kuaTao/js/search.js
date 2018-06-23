;(function($){
	var $searchForm=$('#search-form'),
		$searchInput=$('.search-input'),
		$searchLayer=$('.search-layer');
	$searchForm.on('submit',function(){
		if(getInputVal()==''){//若搜索栏内容是否为空或者空格，则不执行提交
			return false;
		}
	});

	//当用户输入时动态获取提示数据
	var url='https://suggest.taobao.com/sug?code=utf-8&_ksTS=1529744566102_802&callback=jsonp803&k=1&area=c2c&bucketid=6&q='
	$searchInput.on('input',function(){
		$.ajax({
			url:url+getInputVal(),//拼接要请求的地址,q=后边加上输入的内容
			dataType:'jsonp',
			jsonp:'callback'
		})
		.done(function(data){
			if(data.result.length==0){
				$searchLayer.html('').hide();//若查询不到相应数据则不执行以下代码，提高效率
				return;
			}
			var html='';
			var dataNum=5;
			for(var i=0;i<data.result.length;i++){
				if(i>dataNum) break;//控制数据的数量
				html+='<li class="search-item">'+data.result[i][0]+'</li>'
			}
			$searchLayer.html(html).show();
		})
		.fail(function(err){
				$searchLayer.html('').hide();
		})
		.always(function(){
			console.log('always');
		})
	});

	$searchLayer.on('click','.search-item',function(){//事件委托
		$searchInput.val(removeHTMLTag($(this).html()));
		$searchForm.trigger('submit');
	});
	$(document).on('click',function(){
		$searchLayer.hide();
	});
	$searchInput.on('focus',function(){
		$searchLayer.show();
	})
	.on('click',function(ev){
		ev.stopPropagation()
	})


	function getInputVal(){
		return $.trim($searchInput.val());
	}
	function removeHTMLTag(str){
		return str.replace(/<[^<|>]+>/g,'')
	}
})(jQuery)