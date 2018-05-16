
handleCart();
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
	var oNavContent=document.querySelector('.nav_content')

	aNavLi[0].onmouseenter=function(){
		oNavContent.style.height='200px';
		oNavContent.style.borderTop='1px solid #000';
	}
}

