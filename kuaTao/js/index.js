;$(function(){
	/*公共函数*/
		function loadHtmlOnce($elem,callback){
			var loadUrl=$elem.data('load');//获取需要请求的地址
			var isLoaded=$elem.data('isLoaded');
			if(!loadUrl)  return;//判断是否取到loadurl，若没有取到，直接返回
			if(isLoaded)  return;//判断是否已执行过Ajax请求,若已加载过数据，就直接返回
			$.getJSON(loadUrl,function(data){
				callback($elem,data);
			})
		}
		//加载单张图片(中心轮播图部分)
		function loadImage(url,success,error){
			var image=new Image();
			image.onload=function(){
				if(typeof success=='function') success(url);
			};
			image.onerror=function(){
				if(typeof success=='function') error(url);
			}
			image.src=url
		}
		//加载多张图片(楼层部分)
		function loadImages($imgs,success,error){
			$imgs.each(function(){
				var $img = $(this);
				var imgUrl = $img.data('src');
				loadImage(imgUrl,function(imgUrl){
					// $img.attr('src',url); 
					success($img,imgUrl);
				},function(imgUrl){
					error($img,imgUrl);
				});
			})
		}
		function lazyLoad(options){
			var item = {},
		    totalItemNum =  options.totalItemNum,
			loadedItemNum = 0,
			loadFn = null,
			$elem = options.$elem,
			eventName = options.eventName,
			eventPrefix = options.eventPrefix;
		
			$elem.on(eventName,loadFn = function(ev,index,elem){//确定加载时机
				if(item[index] != 'loaded'){//具体加载
					$elem.trigger(eventPrefix+'-load',[index,elem,function(){
						item[index] = 'loaded';
						loadedItemNum++;
						if(loadedItemNum == totalItemNum){//整个加载结束
							$elem.trigger(eventPrefix+'-loaded')
						}
					}])
				}
			});
			$elem.on(eventPrefix+'-loaded',function(){
				$elem.off(eventName,loadFn)
			});
		}	
	/*公共函数*/
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
			// $Layer.html(html).showHide('show');
			$this.search('appendLayer',html); 
			if(html){
				$this.search('showLayer');
			}
			else{
				$this.search('hideLayer');//感觉此句代码无用是错觉，NO有用
			}
			
		})
		.on('getNoData',function($Layer){
			// $Layer.html('').showHide('hide');
			$search.search('appendLayer','').search('hideLayer');
		})
		.on('click','.search-item',function(){//事件委托,$(this)为点击的某一个serach-item
			// $searchInput.val(removeHTMLTag($(this).html()));
			// $searchForm.trigger('submit');
			$search.search('setInputVal',$(this).html());
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
			for(var i=0;i<data.length;i++){

				html+='<dl class="category-details"><dt class="category-details-title fl"><a href="#" class="category-details-title-link">'+data[i].title+'</a></dt><dd class="category-details-item fl">';
				
				for (var j = 0; j < data[i].items.length; j++){
					html+='<a href="#" class="link">'+data[i].items[j]+'</a>'
				} 
				html+='</dd></dl>';
			};
			setTimeout(function(){
				$elem.find('.dropdown-layer').html(html);
				console.log($elem.find('.dropdown-layer').height())
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
		//按需加载图片
			
		var $focusCarousel=$('.focus .carousel-container');
		// carouselLoadImages($focusCarousel,'carousel-show');
		lazyLoad({
			totalItemNum:$focusCarousel.find('.carousel-img').length,
			$elem:$focusCarousel,
			eventName:'carousel-show',
			eventPrefix:'focusCarousel'
		})
		$focusCarousel.on('focusCarousel-load',function(ev,index,elem,success){
			var $imgs = $(elem).find('.carousel-img');
			loadImages($imgs,function($img,url){
				$img.attr('src',url);
				success();
			},function($img,url){
				$img.attr('src','images/error.gif');
			})
		})
		$focusCarousel.carousel({
			css3:true,
			js:true,
			activeIndex:0,
			mode:'slide',
			interval:2000
		})
	/*轮播图结束*/
	/*今日热销轮播开始*/
		var $todaysCarousel=$('.todays .carousel-container');
		// carouselLoadImages($todaysCarousel,'carousel-show');
		lazyLoad({
			totalItemNum:$todaysCarousel.find('.carousel-img').length,
			$elem:$todaysCarousel,
			eventName:'carousel-show',
			eventPrefix:'todaysCarousel'
		})
		$todaysCarousel.on('todaysCarousel-load',function(ev,index,elem,success){
			var $imgs = $(elem).find('.carousel-img');
			loadImages($imgs,function($img,url){
				$img.attr('src',url);
				success();
			},function($img,url){
				$img.attr('src','images/error.gif');
			})
		})
		$todaysCarousel.carousel({
			css3:true,
			js:true,
			activeIndex:0,
			mode:'slide'
		})
	/*今日热销轮播结束*/
	/*楼层选项卡开始*/
		var $floors=$('.floor');
		var $win=$(window);
		var $doc=$(document);
		/*
		carouselLoadImages($floor,'tab-show');
		$floors.tab({
			activeIndex:0,
			interval:0
		})
		*/
		/*判断楼层是否位于可视区*/
		function isView($elem){
			return ($win.height() + $win.scrollTop() > $elem.offset().top) && ($win.scrollTop() < $elem.offset().top+$elem.height())
		}
		function timeToShow(){
			$floors.each(function(index){
				if(isView($(this))){
					$doc.trigger('floor-show',[index,this])
				}
			})
		}
		function getDataOnce($elem,dataUrl,callback){
			var data=$elem.data('url');
			if(!data){
				$.getJSON(dataUrl,function(resData){
					$elem.data('url',resData);
					callback(resData);
				})
			}else{
				callback(data);
			}
		}
		/*构建结构HTML*/
		function buildFloorHtml(oneOfData){
			var html='';
			html += '<div class="container">';
			/*头部(hd)部分*/
			html += '<div class="floor-hd">';
			html += '	<h2 class="floor-title fl">';
			html += '		<span class="floor-title-num">'+oneOfData.num+'F</span>';
			html += '		<span class="floor-title-text">'+oneOfData.text+'</span>';
			html += '	</h2>';
			html += '	<ul class="tab-item-wrap fr">';
			for(var i = 0;i<oneOfData.tabs.length;i++){
				html +=	'<li class="fl"> <a class="tab-item" href="javascript:;">'+oneOfData.tabs[i]+'</a></li>';
				if(i != oneOfData.tabs.length-1){//添加分割线部分
					html +=	 '<li class="fl tab-line"></li>';
				}
			}
			html += '	</ul>';
			html += '</div>';
			/*身体(bd)部分*/
			html += '<div class="floor-bd">';
			for(var i = 0;i<oneOfData.items.length;i++){
				html += '	<ul class="tab-panel clearfix">';
					for(var j = 0;j<oneOfData.items[i].length;j++){
						html += '<li class="floor-item fl">';
						html += '	<p class="floor-item-pic">';
						html += '		<a href="#">';
						html += '			<img src="images/floor/loading.gif" class="floor-img" data-src="images/floor/1/1/'+(j+1)+'.png" alt="">';
						html += '		</a>';
						html += '	</p>';
						html += '	<p class="floor-item-name">';
						html += '		<a class="link" href="#">'+oneOfData.items[i][j].name+ '</a>';
						html += '	</p>';
						html += '	<p class="floor-item-price">￥'+oneOfData.items[i][j].price+'</p>';
						html += '</li>';
					}																					
				html += '	</ul>';			
			}			
			html += '</div>';
			html += '</div>';
			return html;
		}
	
		/*根据构建的HTML进行按需加载开始*/
			/*自己写的构造HTML函数后来被优化替代
				function loadFloorHTML($elem){
					var 
					loadedImageNum=0,
					loaded={},

					totalImageNum=$elem.length;
					$doc.on('floor-show',loadFn=function(ev,index,elem){	
						if(loaded[index]!='loaded'){
							$doc.trigger('floor-load',[index,elem])	
						}	
					})
					$doc.on('floor-load',function(ev,index,elem){     //对应下边这个函数为固定回调，里边的传参可以读取到数据
						getDataOnce($doc,'data/floor/floorData.json',function(floorData){
							var html = buildFloorHtml(floorData[index]);//floorData[0]
							// clearTimeout($elem.timer);
							setTimeout(function(){
								$(elem).html(html);
								carouselLoadImages($floors,'tab-show');
								$floors.tab({
									activeIndex:0,
									interval:0
								})
							},500)
						});
						loaded[index] = 'loaded';
						loadedImageNum++;
						if(loadedImageNum == totalImageNum){
							$doc.trigger('floor-loaded')
						}
								
					})
					$doc.on('floor-loaded',function(){
						$doc.off('floor-show',loadFn);
					})
				}
			*/
		
		/*按需加载楼层的Html结束*/
		$floors.on('tab-load',function(ev,index,elem,success){
			var $imgs = $(elem).find('.floor-img');
			loadImages($imgs,function($img,url){
				$img.attr('src',url);
				success();
			},function($img,url){
				$img.attr('src','images/error.gif');
			})
		});
		$doc.on('floor-load',function(ev,index,elem,success){
			var $elem = $(elem);
			//请求数据
			getDataOnce($doc,'data/floor/floorData.json',function(floorData){
				var html = buildFloorHtml(floorData[index]);
				//模拟网络延时
				setTimeout(function(){
					$elem.html(html);
					//加载图片
					lazyLoad({//需配合下边的tab.js的初始化
						totalItemNum:$elem.find('.floor-img').length,
						$elem:$elem,
						eventName:'tab-show',//tab-show由tab.js触发
						eventPrefix:'tab'		
					});
					$elem.tab({//tab-show由tab.js触发
						css3:false,
						js:false,
						mode:'fade',
						eventName:'mouseenter',
						activeIndex:0,
						delay:200,
						interval:0
					});					
				},500)
			});
			success();
		});	
		$doc.on('floor-loaded',function(){
			$win.off('scroll resize',$floors.loadFn);	
		})	
		lazyLoad({
			totalItemNum:$floors.length,
			$elem:$doc,
			eventName:'floor-show',
			eventPrefix:'floor'	
		});
		$win.on('scroll resize load',$floors.loadFn=function(){
			clearTimeout($floors.floorTimer)
			$floors.floorTimer=setTimeout(function(){
				timeToShow()
			},200)
		});
		// loadFloorHTML($floors);//其实不需要传参
	/*楼层选项卡结束*/
	/*左边栏楼层选择器开始*/
		function whichFloor(){
			var num=-1;
			$floors.each(function(index,elem){
				num=index;//???????????????????????????????
				if($win.scrollTop()<$(elem).offset().top){
					num=index-1;
					return false;
				}
			})
			return num;
		}
		var $elevator=$('.elevator');
		var $items=$elevator.find('.elevator-item');
		function setElevator(){
			num=whichFloor();
			if(num==-1){
				$elevator.fadeOut();
			}
			else{
				$elevator.fadeIn();
				$items.removeClass('elevator-active');
				$items.eq(num).addClass('elevator-active');
			}
		}
		$win.on('scroll load',function(){
			setElevator()
		}) 
		$elevator.on('click','.elevator-item',function(){
			var index=$items.index(this);
			$('body,html').animate({
				scrollTop:$floors.eq(index).offset().top
			})
		}) 
	/*左边栏楼层选择器结束*/
	/*右边楼层回到顶部开始*/
		var $back=$('.tools .back')
		$back.on('click',function(){
			$('body,html').animate({
				scrollTop:0
			})
		})
	/*右边楼层回到顶部结束*/
})