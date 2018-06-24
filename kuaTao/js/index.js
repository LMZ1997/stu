;$(function(){
	/*下拉菜单*/
		var $dropdown=$('.dropdown');
		/*
		$dropdown.on('dropdown-show dropdown-shown dropdown-hide dropdown-hidden',function(ev){
			console.log(ev.type)
		});
		*/
		$dropdown.on('dropdown-show',function(ev){
			var $this=$(this);
			var loadUrl=$this.data('load');//获取需要请求的地址
			var isLoaded=$this.data('isLoaded');

			if(!loadUrl)  return;//判断是否取到loadurl，若没有取到，直接返回
			if(isLoaded)  return;//判断是否已执行过Ajax请求,若已加载过数据，就直接返回

			$.getJSON(loadUrl,function(data){
				var html='';
				for(var i=0;i<=data.length;i++){
					html+='<li ><a href="'+data[i].url+'" class="menu-item link">'+data[i].name+'</a></li>'
				}
				//模拟网络延时，在crome浏览器测试需要先启动一个server服务
				
				setTimeout(function(){
					$this.find('.dropdown-layer').html(html);
					$this.data('isLoaded',true)
				},1000);
			})
		});

		$dropdown.dropdown({
			css3:true,
			js:false,
			mode:'slideUpDown',
			// eventName:'click',
			 delay:200   // 划过元素时不会立即出发下拉效果
		});
		/*html文件里的button已删掉，这个是留着给另一个index.html做测试*/
		$('button').eq(0).click(function(){
			console.log(this)
			$dropdown.dropdown('show');//运行此行代码需先将dropdown暴露出去，具体见dropdown.js
		})
		$('button').eq(1).click(function(){
			$dropdown.dropdown('hide');//运行此行代码需先将dropdown暴露出去，具体见dropdown.js
		})
	/*下拉菜单*/
	/*搜索框*/
		var $search=$('.search');
		$search.search({
			autocomplete:true,
			css3:true,
			js:true,
			mode:'fade',
			url:'https://suggest.taobao.com/sug?code=utf-8&_ksTS=1529744566102_802&k=1&area=c2c&bucketid=6&q='
		});
		$search.on('getdata',function(ev,data,$Layer){
			if(data.result.length==0){
				$Layer.html('').hide();//若查询不到相应数据则不执行以下代码，提高效率
				return;
			}
			var html='';
			var dataNum=5;
			for(var i=0;i<data.result.length;i++){
				if(i>dataNum) break;//控制数据的数量
				html+='<li class="search-item">'+data.result[i][0]+'</li>'
			}
			$Layer.html(html).showHide('show');
		});
		$search.on('getNoData',function($Layer){
			$Layer.html('').showHide('hide');
		})
	/*搜索框*/
	
})