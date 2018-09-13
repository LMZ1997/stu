

require('node_modules/font-awesome/css/font-awesome.min.css')
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('./index.css');


var _util=require('util')
var _order=require('service/order')
var _shipping=require('service/shipping')
var shippingTpl=require('./shipping.tpl')
var productTpl=require('./product.tpl')

var page={
	init:function(){
		this.bindEvent();
		this.loadShippingList();
		this.loadProductList();
	},
	bindEvent:function(){
		var _this=this;
	},
	loadShippingList:function(){
		var _this=this;
		this.renderShippingList()
	},
	renderShippingList:function(){
		var _this=this;
		var html=_util.hoganRender(shippingTpl);
		$('.shipping-box').html(html)
	},
	loadProductList:function(){
		var _this=this;
		console.log(111)
		_order.getOrderProductList(function(cart){
			_this.cart=cart;//保存购物车信息，用来去结算时的验证
			console.log(cart)
			if(cart.cartList.length){
				cart.cartList.forEach(item=>{
					if(item.checked){//给选中的商品项加一个背景色区别出来
						item.selected='selected'
					}
					if(item.productId.imagePath){
						item.productId.image=item.productId.imagePath.split(',')[0]
					}
					else{
						item.productId.image=require('images/product-default.jpg')
					}
				})
				var html=_util.hoganRender(productTpl,cart);
				$('.product-box').html(html)
			}else{
				$('.product-box').html('<p class="error">没有选择需要购买的商品<a href="/" class="btn goCart-btn">去选择</a></p>')
			}
		},function(){
			$('.product-box').html('<p class="error">未获取到相关商品信息</p>')
		})
	}
}



$(function(){
	page.init()
})