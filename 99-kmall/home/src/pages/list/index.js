
// var $=require('jquery')需要npm install jquery --save,所以不建议使用


require('node_modules/font-awesome/css/font-awesome.min.css')
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('./index.css');


var _util=require('util')
var page={
	listParams:{
		keyword:_util.getParamsFromUrl('keyword')|| '' ,
		categoryId:_util.getParamsFromUrl('categoryId') || '',
		page:_util.getParamsFromUrl('page')|| 1,
	},
	init:function(){
		this.bindEvent();
		this.loadProduct();
	},
	bindEvent:function(){
		$('.sort-item').on('click',function(){
			var $this=$(this);
			if($this.hasClass('default')){
				if($this.hasClass('active')){
					return;
				}
				else{
					$this.addClass('active')
					.siblings('.sort-item')
					.removeClass('active')
				}
			}
			else if($this.hasClass('price')){
				if($this.hasClass('desc')){
					$this.addClass('asc')
					.removeClass('desc')
				}else{
					$this.addClass('desc')
					.removeClass('asc')
				}
			}
			
			
		})
	},
	loadProduct:function(){
		console.log(this.listParams)
	}

}



$(function(){
	page.init()
})