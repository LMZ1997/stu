
// var $=require('jquery')需要npm install jquery --save,所以不建议使用


require('node_modules/font-awesome/css/font-awesome.min.css')
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('./index.css');

require('util/pagination');

var _util=require('util')
var _cart=require('service/cart')
var tpl=require('./index.tpl')

var page={
	init:function(){
		this.bindEvent();
		this.loadCart();
	},
	bindEvent:function(){
		var _this=this;
		$('.cart-box').on('click','.select-one',function(){
			var $this=$(this)
			let productId=$this.parents('.cart-item').data('product-id')
			// console.log($this.is(':checked'))点击后的状态
			if($this.is(':checked')){
				_cart.selectOne({
					productId:productId
				},function(cart){
					_this.loadCart();
				},function(){
					$('.cart-box').html('<p class="error">获取购物车失败，请重试!!!</p>')
				})
			}
			else{
				_cart.unselectOne({
					productId:productId
				},function(cart){
					console.log('cart',cart)

					_this.loadCart();
				},function(){
					$('.cart-box').html('<p class="error">获取购物车失败，请重试!!!</p>')
				})
			}
		})
	},
	loadCart:function(){
		var _this=this;
		_cart.getCart(function(cart){
			var html=_util.hoganRender(tpl,cart)
			$('.cart-box').html(html)
		},function(){
			$('.cart-box').html('<p class="error">获取购物车失败，请重试!!!</p>')
		})
		
	}
}



$(function(){
	page.init()
})