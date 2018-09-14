

require('node_modules/font-awesome/css/font-awesome.min.css')
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('./index.css');



var _util=require('util')
var _modal=require('./modal.js')
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
		var $shippingBox=$('.shipping-box')
		//添加地址
		$shippingBox.on('click','.shipping-add',function(){
			_modal.show({
				success:function(shippings){
					_this.renderShippingList(shippings)
				}
			});
		})
		//编辑地址
		$shippingBox.on('click','.shipping-edit',function(){
			var shippingId=$(this).parents('.shipping-item').data('shipping-id');
			_shipping.getShipping({
				shippingId:shippingId
			},function(shipping){
				_modal.show({
					success:function(shippings){
						_this.renderShippingList(shippings)
					},
					data:shipping
				});
			},function(){

			})
			
		})
		//删除地址
		$shippingBox.on('click','.shipping-delete',function(){
			var shippingId=$(this).parents('.shipping-item').data('shipping-id');
			if(_util.confirm('确定要删除该条地址信息吗')){
				_shipping.deleteShipping({
					shippingId:shippingId
				},function(shippings){
					_this.renderShippingList(shippings)
				},function(msg){
					_util.showErrMsg(msg)
				})
				
			}
			
		})
		//选择收货地址
		$shippingBox.on('click','.shipping-item',function(){
			
			$(this).addClass('active')
			.siblings('.shipping-item')
			.removeClass('active')
		})
		//关闭modal
		$('.modal-box').on('click','.close-icon',function(){
			_modal.hide();
		})
		$('.modal-box').on('click',function(){
			_modal.hide();
		})
		$('.modal-box').on('click','.modal-container',function(ev){
			ev.stopPropagation()
		})
	},
	loadShippingList:function(){
		var _this=this;
		_shipping.getShippings(function(shippings){
			_this.renderShippingList(shippings);
		},function(){
			$('.modal-box').html('<p class="error">获取收货地址失败</p>')
		});
	},
	renderShippingList:function(shippings){
		var _this=this;
		var html=_util.hoganRender(shippingTpl,{
			shippings:shippings
		});
		$('.shipping-box').html(html)
	},
	loadProductList:function(){
		var _this=this;
		_order.getOrderProductList(function(cart){
			_this.cart=cart;//保存购物车信息，用来去结算时的验证
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