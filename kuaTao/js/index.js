;$(function(){
	/*下拉菜单*/
		var $menu=$('.nav-header .dropdown');
		var htmlMenu='';
		/*
		for(var i=0;i<=data.length;i++){
			htmlMenu+='<li ><a href="'+data[i].url+'" class="menu-item link">'+data[i].name+'</a></li>'
		}
		*/
		var optionsMenu={
			css3:true,
			js:false,
			mode:'slideUpDown',
			// eventName:'click',
			 delay:200   // 划过元素时不会立即出发下拉效果
		}
		createDropdownLayer($menu,htmlMenu,optionsMenu)
		/*
		$dropdown.on('dropdown-show dropdown-shown dropdown-hide dropdown-hidden',function(ev){
			console.log(ev.type)
		});
		*/
		function createDropdownLayer($elem,html,options){
			$elem.on('dropdown-show',function(ev){
				var $this=$(this);
				var loadUrl=$this.data('load');//获取需要请求的地址
				var isLoaded=$this.data('isLoaded');

				if(!loadUrl)  return;//判断是否取到loadurl，若没有取到，直接返回
				if(isLoaded)  return;//判断是否已执行过Ajax请求,若已加载过数据，就直接返回

				$.getJSON(loadUrl,function(data){
					//模拟网络延时，在crome浏览器测试需要先启动一个server服务			
					setTimeout(function(){
						console.log('aa')
						$this.find('.dropdown-layer').html(html);
						$this.data('isLoaded',true)
					},1000);
				})
			});
			$elem.dropdown(options);
		}
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
		var htmlCategory='';
		/*
		for(var i=0;i<=data.length;i++){
			htmlCategory+='<dl class="category-details"><dt class="category-details-title fl"><a href="#" class="category-details-title-link">'+data[i].title+'</a></dt><dd class="category-details-item fl">';
			for (var j = 0; j < data[i].items.length.length; j++) {
				htmlCategory+='<a href="#" class="link">'+data[i].items[j]+'</a>'
			} 
			htmlCategory+='</dd></dl>';
		}
		*/
		var optionsCategory={
			css3:false,
			js:true,
			mode:'slideLeftRight'
		}
		createDropdownLayer($category,htmlCategory,optionsCategory)
	/*分类导航结束*/
	/*轮播图开始*/
		lunBo();
		function lunBo(){
			function Carousel(option){
					this.oBox=document.getElementById(option.id);
					this.oUl=null;
					this.now=0;
					this.aImg=option.aImg;
					this.width=option.width;
					this.height=option.height;
					this.oBox.zIndex=9;
					// this.oLi=null;
					// this.oImg=null;
					// this.oLeft=null;
					// this.oRight=null;
					this.init();//此处要放在最后，所有声明属性的后边
					this.bindEvent();
					this.playDuration=option.playDuration;
					if(option.playDuration){
						this.move();
					}
			}
			Carousel.prototype.init=function(){
					this.oBox.style.width=this.width+'px';
					this.oBox.style.height=this.height+'px';
					this.oBox.style.position='relative';
					this.oUl=document.createElement('ul');
					this.botUl=document.createElement('ul');
					this.botUl.className='botUl';
					for (var i = 0; i < this.aImg.length; i++) {
						var oLi=document.createElement('li');
						var botLi=document.createElement('li');
						var oImg=document.createElement('img');
						oLi.style.position='absolute';
						if(i==0){
							oLi.style.opacity=1;
							oLi.style.zIndex=50;
							botLi.className='active';
						}else{
							oLi.style.opacity=0.5;
							oLi.style.zIndex=0;
							botLi.className='';
						}			
						oImg.src=this.aImg[i];
						oImg.style.width=this.width+'px';
						oImg.style.height=this.height+'px';			
						this.oUl.appendChild(oLi);
						oLi.appendChild(oImg);				
						this.botUl.appendChild(botLi);			
					}

					this.oLeft=document.createElement('span');
					this.oRight=document.createElement('span');
					// this.oLeft.className='oLeft';
					// this.oRight.className='oRight';
					// this.oLeft.innerHTML='&lt;';		
					// this.oRight.innerHTML='&gt;';
					// this.oBox.appendChild(this.oLeft);
					// this.oBox.appendChild(this.oRight);	
					this.oBox.appendChild(this.botUl);
					this.oBox.appendChild(this.oUl);
			}
			Carousel.prototype.bindEvent=function(){
					// this.oRight.onclick=function(){
					// 	this.now++;
					// 	this.Tab();
					// }.bind(this);
					// this.oLeft.onclick=function(){
					// 	this.now--;
					// 	this.Tab();
					// }.bind(this);
					this.botUl.addEventListener('click',function(ev){
							var oEvent=ev||event;
							// this.botUl.children.className='';
							for(var j=0;j<this.botUl.children.length;j++){
								this.botUl.children[j].className='';
							}
							oEvent.target.className='active';
							for(k=0;k<this.botUl.children.length;k++){
								if(this.botUl.children[k].className=='active'){
									this.now=k;
									console.log(this.now)
								}
							}
							this.Tab();
					}.bind(this),false)
			}
			Carousel.prototype.Tab=function(){
					for (var i = 0; i < this.oUl.children.length; i++) {
							this.oUl.children[i].style.zIndex=0;
							this.oUl.children[i].style.opacity=0;
							this.botUl.children[i].className='';
						}
						if(this.now>=this.oUl.children.length){
							this.now=0;
						}else if(this.now<0){
							this.now=this.oUl.children.length-1;
						}
						this.oUl.children[this.now].style.zIndex=50;
						// this.oUl.children[this.now].style.opacity=1;
						animation(this.oUl.children[this.now],{opacity:100});
						this.botUl.children[this.now].className='active';
			}
			Carousel.prototype.move=function(){
					var Timer=null;
					// Timer=setInterval(function(){
					// 	this.now++;
					// 	if(this.now>=this.oUl.children.length){
					// 		this.now=0;
					// 	}
					// 	console.log(this);
					// 	this.Tab();
					// }.bind(this),1000)

					//等同于
					Timer=setInterval(this.oRight.onclick,this.playDuration);
					this.oBox.onmouseover=function(){
						clearInterval(Timer);
					}
					this.oBox.onmouseout=function(){
						Timer=setInterval(this.oRight.onclick,this.playDuration);
					}.bind(this);
			}
			new Carousel({
				id:'carousel',
				aImg:['images/lunbo1.jpg','images/lunbo2.jpg','images/lunbo3.jpg','images/lunbo4.jpg'],
				width:728,
				height:504,
				playDuration:2000
			});	
		}
	/*轮播图结束*/
})