
handleCart();
handleNav();
handleSearch();
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
		oLoader.style.display='block';
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
			this.style.background='#b0b0b0';
		}
	}
}

