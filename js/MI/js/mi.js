
handleCart();
handleNav();
handleSearch();
lunBo();
handleCate();
handTimer();
handleElec();
function handleCart(){
	var oCartBox=document.querySelector('.cart_box');
	var oCart=document.querySelector('.cart');
	var oCartContent=document.querySelector('.cart_content');
	var oCartSpan=document.querySelector('.cart_content span');
	var oCartA=oCart.getElementsByTagName('a')[0];
	var oLoader=document.querySelector('.loader');
	oCartBox.onmouseenter=function(){
		oCart.style.background='white';
		oCartA.style.color='#ff6700';
		// oCartContent.style.height='100px';
		// oLoader.style.display='block';
		animation(oCartContent,{height:'100'},false,function(){
			oLoader.style.display='none';
			oCartSpan.style.display='block';
		});
		
		
	}
	oCartBox.onmouseleave=function(){
		oCart.style.background='#424242';
		oCartA.style.color='#b0b0b0';
		oCartSpan.style.display='none';
		animation(oCartContent,{height:'0'});
		
	}
}
function handleNav(){
	var aNavLi=document.querySelectorAll('.content .art_head a');
	var oNavContent=document.querySelector('.nav_content');
	var oNavUl=document.querySelector('.nav_content ul');
	var timer=null;
	var index=0;
	/*
	aNavLi[0].onmouseenter=function(){
		clearTimeout(timer);
		animation(oNavContent,{height:200});
		oNavContent.style.borderTop='1px solid #ccc';
	}
	aNavLi[0].onmouseleave=function(){
		timer=setTimeout(function(){
			animation(oNavContent,{height:0});
			oNavContent.style.borderTop='none';
		},300)			
	}
	oNavContent.onmouseenter=function(){
		clearTimeout(timer);
		oNavContent.style.height='200px'
		oNavContent.style.borderTop='1px solid #ccc';
		;
	}
	oNavContent.onmouseleave=function(){
		timer=setTimeout(function(){
			oNavContent.style.height='0px';
			oNavContent.style.borderTop='none';
		},300)	
	}
	*/	
	var aNavitems=[
		[
			{
				img:'images/shangou1.png',
				name:'小米MIX2',
				price:1599
			},
			{
				img:'images/shangou2.png',
				name:'小米MIX2',
				price:1599,
				tag:'热门'
			},
			{
				img:'images/shangou2.png',
				name:'小米MIX2',
				price:1599,
				tag:'热门'
			}
		],
		[
			{
				img:'images/shangou1.png',
				name:'小米MIX2',
				price:2599
			},
			{
				img:'images/shangou2.png',
				name:'小米MIX2',
				price:2599,
				tag:'热门'
			}
		],
		[
			{
				img:'images/shangou1.png',
				name:'小米MIX2',
				price:3599
			},
			{
				img:'images/shangou2.png',
				name:'小米MIX2',
				price:3599,
				tag:'热门'
			}
		],
		[
			{
				img:'images/shangou1.png',
				name:'小米MIX2',
				price:4599
			},
			{
				img:'images/shangou2.png',
				name:'小米MIX2',
				price:4599,
				tag:'热门'
			}
		],
		[
			{
				img:'images/shangou1.png',
				name:'小米MIX2',
				price:5599
			},
			{
				img:'images/shangou2.png',
				name:'小米MIX2',
				price:5599,
				tag:'热门'
			}
		],
		[
			{
				img:'images/shangou1.png',
				name:'小米MIX2',
				price:6599
			},
			{
				img:'images/shangou2.png',
				name:'小米MIX2',
				price:6599,
				tag:'热门'
			}
		],
		[
			{
				img:'images/shangou1.png',
				name:'小米MIX2',
				price:7599
			},
			{
				img:'images/shangou2.png',
				name:'小米MIX2',
				price:7599,
				tag:'热门'
			}
		],
		[
			{
				img:'images/shangou1.png',
				name:'小米MIX2',
				price:8599
			},
			{
				img:'images/shangou2.png',
				name:'小米MIX2',
				price:8599,
				tag:'热门'
			}
		],
	]
	for (var i = 0; i < aNavLi.length-2; i++) {
		aNavLi[i].index=i;
		aNavLi[i].onmouseenter=function(){	
			clearTimeout(timer);	
			loadData(this.index);
			animation(oNavContent,{height:200});
			oNavContent.style.borderTop='1px solid #ccc';
		}
		aNavLi[i].onmouseleave=function(){		
			timer=setTimeout(function(){
				oNavUl.innerHTML='';
				animation(oNavContent,{height:0});
				oNavContent.style.borderTop='1px solid #ccc';
			},300)	
		}
		oNavContent.onmouseenter=function(){
			clearTimeout(timer);
			oNavContent.style.height='200px'
			oNavContent.style.borderTop='1px solid #ccc';
		}
		oNavContent.onmouseleave=function(){
			timer=setTimeout(function(){
				oNavUl.innerHTML='';
				oNavContent.style.height='0px';
				oNavContent.style.borderTop='none';
			},300)	
		}
	}
	function loadData(index){
		oNavUl.innerHTML='';
		var aDatas=aNavitems[index];
		for(var i= 0;i<aDatas.length;i++){
			var oNavLi=document.createElement('li');
			var oDiv=document.createElement('div');
			var oImg=document.createElement('img');
			var oName=document.createElement('span');
			var oPrice=document.createElement('span');
			var oTag=document.createElement('span');
			oNavUl.appendChild(oNavLi);
			oNavLi.appendChild(oDiv);
			oNavLi.appendChild(oName);
			oNavLi.appendChild(oPrice);
			oDiv.appendChild(oImg);
			oImg.src=aDatas[i].img;
			oName.className='product_name';
			oName.innerHTML=aDatas[i].name;
			oPrice.innerHTML=aDatas[i].price+'元起';
			oPrice.className='product_price';
			oDiv.className='img_box'
			oTag.innerHTML=aDatas[i].tag;
		}
	}			
}
function handleSearch(){
	var oInput=document.getElementById('search');
	var oSearchI=document.querySelector('.search');
	var aSearchSpan=document.querySelectorAll('.content .art_head .search_all .hongmi,.content .art_head .search_all .mix')
	var oGoods=document.querySelector('.content .art_head .goods');
	var aGoodsLi=document.querySelectorAll('.goods li');
	oInput.onfocus=function(){
		oInput.style.border='1px solid #ff6700';
		oSearchI.style.border='1px solid #ff6700';
		oGoods.style.display='block';
		oGoods.children[0].style.border='1px solid #ff6700';
		aSearchSpan[0].style.display='none';
		aSearchSpan[1].style.display='none';
	}
	oInput.onblur=function(){
		oInput.style.border='1px solid #b0b0b0';
		oSearchI.style.border='1px solid #b0b0b0';
		oGoods.style.display='none';
		aSearchSpan[0].style.display='block';
		aSearchSpan[1].style.display='block';
	}
	for (var i = 0; i < aGoodsLi.length; i++) {
		aGoodsLi[i].onmouseover=function(){
			this.style.background='#ccc';
		}
		aGoodsLi[i].onmouseout=function(){
			this.style.background='white';
		}
	}
}
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
			this.oLeft=null;
			this.oRight=null;
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
			this.oLeft.className='oLeft';
			this.oRight.className='oRight';
			this.oLeft.innerHTML='&lt;';		
			this.oRight.innerHTML='&gt;';
			this.oBox.appendChild(this.oLeft);
			this.oBox.appendChild(this.oRight);	
			this.oBox.appendChild(this.botUl);
			this.oBox.appendChild(this.oUl);
	}
	Carousel.prototype.bindEvent=function(){
			this.oRight.onclick=function(){
				this.now++;
				this.Tab();
			}.bind(this);
			this.oLeft.onclick=function(){
				this.now--;
				this.Tab();
			}.bind(this);
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
		id:'div1',
		aImg:['images/lunbo1.jpg','images/lunbo2.jpg','images/lunbo3.jpg','images/lunbo4.jpg','images/lunbo5.jpg'],
		width:1300,
		height:500,
		playDuration:2000
	});	
}
function handleCate(){
	var oCate=document.querySelector('.art_art_top .cate');
	var oCateUl=oCate.getElementsByTagName('ul')[0];
	var aCateLi=document.querySelectorAll('.art_art .art_art_top_left ul li');
	var oBox=document.querySelector('.art_art .art_art_top_left');
	var timer=null;
	for (var i = 0; i < aCateLi.length; i++) {
		aCateLi[i].index=i;	
		aCateLi[i].onmouseover=function(){
			oCate.children[0].innerHTML='';
			for (var j = 0; j < aCateLi.length; j++) {
				aCateLi[j].style.background=''
			}
			this.style.background='#ff6700';
			oCate.style.display='block';
			loadData(this.index);
		}
	}
	oBox.onmouseleave=function(){
		timer=setTimeout(function(){
			for (var j = 0; j < aCateLi.length; j++) {
				aCateLi[j].style.background=''
			}
			oCate.style.display='none';
		},300)		
	}
	oCate.onmouseover=function(){
		clearTimeout(timer);
		oCate.style.display='block';
	}
	oCate.onmouseleave=function(){
		for (var j = 0; j < aCateLi.length; j++) {
				aCateLi[j].style.background=''
		}
		oCate.style.display='none';
	}
	function loadData(index){
		var datas=aCateItems[index];
		if(!datas){
			return;
		}
		for (var i = 0; i < datas.length; i++) {
			 var oLi=document.createElement('li');
			 var oImg=document.createElement('img');
			 var oA=document.createElement('a');
			 oA.innerHTML=datas[i].name;
			 oImg.src=datas[i].img;
			 oCateUl.appendChild(oLi);
			 oLi.appendChild(oImg);
			 oLi.appendChild(oA);
		}
	}
	var aCateItems=[
		[
			{
				img:'images/shangou2.png',
				name:'小米MIX2S'
			},
			{
				img:'images/shangou2.png',
				name:'小米MIX2S'
			},
			{
				img:'images/shangou2.png',
				name:'小米MIX2S'
			},
			{
				img:'images/shangou2.png',
				name:'小米MIX2S'
			}
			,{
				img:'images/shangou2.png',
				name:'小米MIX2S'
			}
			,{
				img:'images/shangou2.png',
				name:'小米MIX2S'
			}
			,{
				img:'images/shangou2.png',
				name:'小米MIX2S'
			},
			{
				img:'images/shangou2.png',
				name:'小米MIX2S'
			},
			{
				img:'images/shangou2.png',
				name:'小米MIX2S'
			},
			{
				img:'images/shangou2.png',
				name:'小米MIX2S'
			},
			{
				img:'images/shangou2.png',
				name:'小米MIX2S'
			}
			,{
				img:'images/shangou2.png',
				name:'小米MIX2S'
			}
			,{
				img:'images/shangou2.png',
				name:'小米MIX2S'
			}
			,{
				img:'images/shangou2.png',
				name:'小米MIX2S'
			}

		],
		[
			{
				img:'images/shangou2.png',
				name:'小米MIX2S'
			},
			{
				img:'images/shangou2.png',
				name:'小米MIX2S'
			},
			{
				img:'images/shangou2.png',
				name:'小米MIX2S'
			},
			{
				img:'images/shangou2.png',
				name:'小米MIX2S'
			}
			,{
				img:'images/shangou2.png',
				name:'小米MIX2S'
			}
			,{
				img:'images/shangou2.png',
				name:'小米MIX2S'
			}
			,{
				img:'images/shangou2.png',
				name:'小米MIX2S'
			},
			{
				img:'images/shangou2.png',
				name:'小米MIX2S'
			},
			{
				img:'images/shangou2.png',
				name:'小米MIX2S'
			},
			{
				img:'images/shangou2.png',
				name:'小米MIX2S'
			},
			{
				img:'images/shangou2.png',
				name:'小米MIX2S'
			}
			,{
				img:'images/shangou2.png',
				name:'小米MIX2S'
			}
			,{
				img:'images/shangou2.png',
				name:'小米MIX2S'
			}
			,{
				img:'images/shangou2.png',
				name:'小米MIX2S'
			}

		]
	]
}
function handTimer(){
	var aTimer=document.querySelectorAll('.shangou .shangou_art .timer');
	var nextTimer=new Date('2018/9/18 15:20:00');
	function toStr(num){
		if(num<10){
			return '0'+num
		}else{
			return ''+num
		}
	}
	timer=setInterval(time,500)
	function time(){
		var now=new Date();
		var time=nextTimer.getTime()-now.getTime();
		if(time<0){
			time=0;
			clearInterval(timer);
		}
		var timeLast=parseInt(time/1000);
		var h=parseInt(timeLast/3600);
		var m=parseInt((timeLast%3600)/60);
		var s=(timeLast%3600)%60;
		aTimer[0].innerHTML=toStr(h);
		aTimer[1].innerHTML=toStr(m);
		aTimer[2].innerHTML=toStr(s);
	}
	time();	
}
function handleElec(){
	var aLi=document.querySelectorAll('.jiadian_list li');
	var aElecUl=document.querySelectorAll('.shouji_right');
	var oElecUl=aElecUl[1];
	var ElecItems=[
		[
			{
				img:"images/hot2.jpg",
				name:'小米6 4GB+64GB',
				tag:'变焦双摄,4轴防抖,晓龙835处理器',
				price:2299,
				delPrice:2299
			},
			{
				img:"images/hot2.jpg",
				name:'小米6 4GB+64GB',
				tag:'变焦双摄,4轴防抖,晓龙835处理器',
				price:2299,
				delPrice:2299
			},
			{
				img:"images/hot2.jpg",
				name:'小米6 4GB+64GB',
				tag:'变焦双摄,4轴防抖,晓龙835处理器',
				price:2299,
				delPrice:2299
			},
			{
				img:"images/hot2.jpg",
				name:'小米6 4GB+64GB',
				tag:'变焦双摄,4轴防抖,晓龙835处理器',
				price:2299,
				delPrice:2299
			},
			{
				img:"images/hot2.jpg",
				name:'小米6 4GB+64GB',
				tag:'变焦双摄,4轴防抖,晓龙835处理器',
				price:2299,
				delPrice:2299
			},
			{
				img:"images/hot2.jpg",
				name:'小米6 4GB+64GB',
				tag:'变焦双摄,4轴防抖,晓龙835处理器',
				price:2299,
				delPrice:2299
			},
			{
				img:"images/hot2.jpg",
				name:'小米6 4GB+64GB',
				tag:'变焦双摄,4轴防抖,晓龙835处理器',
				price:2299,
				delPrice:2299
			},
			{
				img:"images/xiaobai.jpg",
				name:'小白摄像机',
				price:399			
			},
			{
				name:'浏览更多',
				price:'热门',
				classNameI:'fas fa-arrow-right'		
			}
		],
		[
			{
				img:"images/hot1.jpg",
				name:'小米6 4GB+64GB',
				tag:'变焦双摄,4轴防抖,晓龙835处理器',
				price:2199,
				delPrice:2299
			},
			{
				img:"images/hot1.jpg",
				name:'小米6 4GB+64GB',
				tag:'变焦双摄,4轴防抖,晓龙835处理器',
				price:2199,
				delPrice:2299
			},
			{
				img:"images/hot1.jpg",
				name:'小米6 4GB+64GB',
				tag:'变焦双摄,4轴防抖,晓龙835处理器',
				price:2199,
				delPrice:2299
			},
			{
				img:"images/hot1.jpg",
				name:'小米6 4GB+64GB',
				tag:'变焦双摄,4轴防抖,晓龙835处理器',
				price:2199,
				delPrice:2299
			}
		]
	]
	loadData(0);	
	for (var i = 0; i < aLi.length; i++) {
		aLi[i].index=i;
		aLi[i].onmouseover=function(){
			oElecUl.innerHTML='';
			for(var j = 0;j<aLi.length; j++){
				aLi[j].className='';
			}
			this.className='active';
			loadData(this.index);
		}		
	}
	function loadData(index){
		var adataE=ElecItems[index];
		if(!adataE){
			return;
		}
		for (var i = 0; i < adataE.length-2; i++) {
			var oLi=document.createElement('li');
			var oImg=document.createElement('img');
			oImg.src=adataE[i].img;
			var oSpanName=document.createElement('span');
			oSpanName.innerHTML=adataE[i].name;
			var oSpanTag=document.createElement('span');
			oSpanTag.innerHTML=adataE[i].tag;
			var oSpanPrice=document.createElement('span');
			oSpanPrice.innerHTML=adataE[i].price;
			var oDelPrice=document.createElement('del');
			oDelPrice.innerHTML=adataE[i].delPrice;
			oElecUl.appendChild(oLi);

			oLi.appendChild(oImg);
			oLi.appendChild(oSpanName);
			oLi.appendChild(oSpanTag);
			oLi.appendChild(oSpanPrice);		
			oSpanPrice.appendChild(oDelPrice);
		}
		var oLiUl=document.createElement('li');
		oElecUl.appendChild(oLiUl);
		var oUl=document.createElement('ul');
		var oLi1=document.createElement('li');
		var oDiv1=document.createElement('div');
		oDiv1.innerHTML=adataE[7].name;
		var oSpan1=document.createElement('span');
		oSpan1.innerHTML=adataE[7].price+'元';
		var oImg1=document.createElement('img');
		oImg1.src=adataE[7].img;
		oLi1.appendChild(oDiv1);
		oLi1.appendChild(oSpan1);
		oLi1.appendChild(oImg1);
		var oLi2=document.createElement('li');
		var oDiv2=document.createElement('div');
		oDiv2.innerHTML=adataE[8].name;
		var oSpan2=document.createElement('span');
		oSpan2.innerHTML=adataE[8].price;
		var oI=document.createElement('i');
		oI.className=adataE[8].classNameI;
		oLi2.appendChild(oDiv2);
		oLi2.appendChild(oSpan2);
		oLi2.appendChild(oI);
		oUl.appendChild(oLi1);
		oUl.appendChild(oLi2);
		oUl.className='xiaobai';
		oLiUl.appendChild(oUl);
	}	
}

