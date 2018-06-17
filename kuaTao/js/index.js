;$(function(){
	var $dropdown=$('.dropdown');
	$dropdown.dropdown({
		css3:true,
		js:false,
		mode:'slideUpDown',
		 delay:200   // 划过元素时不会立即出发下拉效果
	});
	$dropdown.on('dropdown-show dropdown-shown dropdown-hide dropdown-hidden',function(ev){
		console.log(ev.type)
	})
})