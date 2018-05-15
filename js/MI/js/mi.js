window.onload=function(){
	var oCartBox=document.querySelector('.cart_box');
	var oCart=document.querySelector('.cart');
	var oCartA=oCart.getElementsByTagName('a')[0];
	oCartBox.onmouseenter=function(){
		oCart.style.background='white';
		oCartA.style.color='#ff6700';
	}
	oCartBox.onmouseleave=function(){
		oCart.style.background='#424242';
		oCartA.style.color='green';
	}
}