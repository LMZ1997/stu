;$(function(){
	/*下拉菜单分类导航公共函数*/
		function loadHtmlOnce($elem,callback){
			var loadUrl=$elem.data('load');//获取需要请求的地址
			var isLoaded=$elem.data('isLoaded');
			if(!loadUrl)  return;//判断是否取到loadurl，若没有取到，直接返回
			if(isLoaded)  return;//判断是否已执行过Ajax请求,若已加载过数据，就直接返回
			$.getJSON(loadUrl,function(data){
				callback($elem,data);
			})
		}
	/*下拉菜单分类导航公共函数*/
	/*下拉菜单*/
		var $menu=$('.nav-header .dropdown');
		/*
		$dropdown.on('dropdown-show dropdown-shown dropdown-hide dropdown-hidden',function(ev){
			console.log(ev.type)
		});
		*/
		$menu.on('dropdown-show',function(ev){
			loadHtmlOnce($(this),buildMenuItem)
		});
		function buildMenuItem($elem,data){
			var html='';
			console.log(data.length)
			for(var i=0;i<data.length;i++){
				html+='<li><a href="'+data[i].url+'" class="menu-item link">'+data[i].name+'</a></li>'
				// console.log(data[i].name);
			}
			setTimeout(function(){
				console.log('aa')
				$elem.find('.dropdown-layer').html(html);
				$elem.data('isLoaded',true)
			},1000);
		}
		//模拟网络延时，在crome浏览器测试需要先启动一个server服务			
		$menu.dropdown({
			css3:true,
			js:false,
			mode:'slideUpDown',
			// eventName:'click',
			 delay:200   // 划过元素时不会立即出发下拉效果
		});
	/*下拉菜单*/
	/*搜索框*/
		var $search=$('.search');
		$search
		.search({
			autocomplete:true,
		})
		.on('getdata',function(ev,data,$Layer){
			var $this=$(this);//this为.search那个DOM节点
			var html=createSearchLayer(data,5);
			$Layer.html(html).showHide('show');
			// $this.search('appendLayer',html); ????????????????????????????????????
			// if(html){
			// 	$this.search('showLayer');
			// }
			// else{
			// 	$this.search('hideLayer');//感觉此句代码无用是错觉，NO有用
			// }
			
		})
		.on('getNoData',function($Layer){
			$Layer.html('').showHide('hide');
		})
		.on('click','.search-item',function(){//事件委托
			// $searchInput.val(removeHTMLTag($(this).html()));
			// $searchForm.trigger('submit');
			$search.search('setInputVal',$(this).html());//?/????????????????????????????????
			$search.search('submit');
		});

		function createSearchLayer(data,maxNum){
			if(data.result.length==0){
				return;
			}
			var html='';
			for(var i=0;i<data.result.length;i++){
				if(i>maxNum) break;//控制数据的数量
				html+='<li class="search-item">'+data.result[i][0]+'</li>'
			}
			return html;
		};	
	/*搜索框*/
	/*分类导航开始*/
		var $category=$('.category .dropdown');
		$category.on('dropdown-show',function(ev){
			loadHtmlOnce($(this),buildCategoryItem);
		});
		function buildCategoryItem($elem,data){
			var html='';
			console.log(data)
			for(var i=0;i<data.length;i++){

				html+='<dl class="category-details"><dt class="category-details-title fl"><a href="#" class="category-details-title-link">'+data[i].title+'</a></dt><dd class="category-details-item fl">';
				
				for (var j = 0; j < data[i].items.length.length; j++){
					html+='<a href="#" class="link">'+data[i].items[j]+'</a>'
				} 
				html+='</dd></dl>';
			};
			setTimeout(function(){
				$elem.find('.dropdown-layer').html(html);
				$elem.data('isLoaded',true);
			},1000);
		}
		$category.dropdown({
			css3:false,
			js:true,
			mode:'slideLeftRight'
		})
	/*分类导航结束*/
	/*轮播图开始*/
		var $carousel=$('.carousel-container');
		$carousel.carousel({

		})
	/*轮播图结束*/
})