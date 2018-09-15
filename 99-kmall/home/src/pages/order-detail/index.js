
// var $=require('jquery')需要npm install jquery --save,所以不建议使用

require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('./index.css');

var _side=require('pages/common/side')
var tpl=require('./index.tpl')
var _util=require('util')
var _order=require('service/order')

var page={
	params:{
		orderNo:_util.getParamsFromUrl('orderNo')|| 1,
	},
	init:function(){
		this.onload();
		this.initPagination();
		this.render()
	},
	onload:function(){
		_side.render('order-list')//使侧边栏订单列表一项为选中状态
	},
	render:function(){
		_order.getOrderDetail({orderNo:this.params.orderNo},function(order){
			var productList=[];
			orders.list.map(item=>{
				item.productList.forEach(product=>{
					if(product.images.length){
						product.image=product.images.split(',')[0]
					}else{
						product.image=require("images/product-default.jpg")
					}
				 	productList.push(product)
				 })
			})	
			console.log(productList)
			var html=_util.hoganRender(tpl,{
				list:orders.list,
				productList:productList
			})
			$('.order-detail-box').html(html);
		},function(msg){
			$('.order-detail-box').html('<p class="error">获取订单详情失败</p>')
		})
		
	}
}

$(function(){
	page.init()
})