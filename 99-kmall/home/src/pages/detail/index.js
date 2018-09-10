
// var $=require('jquery')需要npm install jquery --save,所以不建议使用


require('node_modules/font-awesome/css/font-awesome.min.css')
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('./index.css');

require('util/pagination');

var _util=require('util')
var _product=require('service/product')
var tpl=require('./index.tpl')

var page={
	params:{
		productId:_util.getParamsFromUrl('productId') || '',
	},
	init:function(){
		this.bindEvent();
		this.loadProductDetail();
	},
	bindEvent:function(){
		

	},
	loadProductDetail:function(){
		_product.loadProductDetail({productId:this.params.productId},function(product){
			if(product){
				product.images=product.imagePath.split(',');
			}
			else{
				product.images=[require('images/product-default.jpg')]
			}
			product.imageFirst=product.images[0];

			var html=_util.hoganRender(tpl,product);
			$('.detail-box').html(html)
			
		},function(msg){
			_util.showErrMsg(msg)
		})

	}
}



$(function(){
	page.init()
})