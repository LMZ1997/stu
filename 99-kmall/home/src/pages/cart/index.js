
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
		$('.cart-box').on('click','.select-one',function(){//单个商品选中或取消
			var $this=$(this)
			let productId=$this.parents('.cart-item').data('product-id')
			// console.log($this.is(':checked'))点击后的状态
			if($this.is(':checked')){
				_cart.selectOne({
					productId:productId
				},function(cart){
					_this.loadCart();
				},function(){
					_this.showErrPage()
				})
			}
			else{
				_cart.unselectOne({
					productId:productId
				},function(cart){
					_this.loadCart();
				},function(){
					_this.showErrPage()
				})
			}
		})

		$('.cart-box').on('click','.select-all',function(){//全部商品选中或取消
			var $this=$(this)
			if($this.is(':checked')){
				_cart.selectAll(function(cart){
					_this.loadCart();
				},function(){
					_this.showErrPage()
				})
			}
			else{
				console.log('222')
				_cart.unselectAll(function(cart){
					_this.loadCart();
				},function(){
					_this.showErrPage()
				})
			}
		})

		$('.cart-box').on('click','.delete-one',function(){//单个商品选中或取消
			var $this=$(this)
			let productId=$this.parents('.cart-item').data('product-id')
			_cart.deleteOne({
				productId:productId
			},function(cart){
				_this.loadCart();
			},function(){
				_this.showErrPage()
			})
		})
		$('.cart-box').on('click','.plus',function(){//单个商品选中或取消
			var $this=$(this)
			let productId=$this.parents('.cart-item').data('product-id')
			_cart.addCount({
				productId:productId
			},function(cart){
				_this.loadCart();
			},function(){
				_this.showErrPage()
			})
		})
		$('.cart-box').on('click','.minus',function(){//单个商品选中或取消
			var $this=$(this)
			let productId=$this.parents('.cart-item').data('product-id')
			_cart.reduceCount({
				productId:productId
			},function(cart){
				_this.loadCart();
			},function(){
				_this.showErrPage()
			})
		})

	},
	loadCart:function(){
		var _this=this;
		this.renderCart()
	},
	renderCart:function(){
		var _this=this;
		_cart.getCart(function(cart){
			if(cart.cartList.length){
				cart.cartList.forEach(item=>{
					if(item.productId.imagePath){
						item.productId.image=item.productId.imagePath.split(',')[0]
					}
					else{
						item.productId.image=require('images/product-default.jpg')
					}
				})
				var html=_util.hoganRender(tpl,cart)
				$('.cart-box').html(html)
			}else{
				$('.cart-box').html('<p class="error">您的购物车中没有商品，快去选购吧<a href="/" class="btn goHome-btn">去选购</a></p>')
			}
			
		},function(){
			_this.showErrPage()
		})
	},
	showErrPage:function(){
		$('.cart-box').html('<p class="error">获取购物车失败，请重试!!!</p>')
	}
}



$(function(){
	page.init()
})