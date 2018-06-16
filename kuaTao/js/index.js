$(function(){//入口函数
	$('.dropdown').hover(function(){
		var $this=$(this);
		// console.log($this.data());data返回值是一个对象
		// {active:'menu'}
		var activeClass=$this.data('active')+'-active';
		$this.addClass(activeClass)
	},function(){
		var $this=$(this);
		var activeClass=$this.data('active')+'-active';
		$this.removeClass(activeClass)
	})
});