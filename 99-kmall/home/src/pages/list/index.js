
// var $=require('jquery')需要npm install jquery --save,所以不建议使用


require('node_modules/font-awesome/css/font-awesome.min.css')
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('./index.css');


var _util=require('util')
var _product=require('service/product')


var page={
	listParams:{
		keyword:_util.getParamsFromUrl('keyword')|| '' ,
		categoryId:_util.getParamsFromUrl('categoryId') || '',
		page:_util.getParamsFromUrl('page')|| 1,
		orderBy:'default'
	},
	init:function(){
		this.bindEvent();
		this.loadProduct();
	},
	bindEvent:function(){
		var _this=this;
		$('.sort-item').on('click',function(){
			var $this=$(this);
			if($this.hasClass('default')){
				if($this.hasClass('active')){
					return;
				}
				$this.addClass('active')
				.siblings('.sort-item')
				.removeClass('active');
				_this.listParams.orderBy='default';
			}
			else if($this.hasClass('price')){
				$this.addClass('active')
				.siblings('.sort-item')
				.removeClass('active');

				if($this.hasClass('desc')){
					$this.addClass('asc')
					.removeClass('desc');
					_this.listParams.orderBy='price_asc';
				}else{
					$this.addClass('desc')
					.removeClass('asc');
					_this.listParams.orderBy='price_desc';
				}
			}
			_this.loadProduct();
		})

	},
	loadProduct:function(){
		this.listParams.keyword //delete 用法
		?(delete this.listParams.categoryId)
		:(delete this.listParams.keyword)
		_product.loadProduct(this.listParams,function(result){
			console.log(result)
		},function(result){

		})
	}

}



$(function(){
	page.init()
})