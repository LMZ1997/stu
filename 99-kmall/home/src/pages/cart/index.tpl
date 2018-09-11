<ul class="cart-title clearfix">
	<li class="select-all">
		{{#allChecked}}
		<input type="checkbox" checked class="select-all">
		{{/allChecked}}
		{{^allChecked}}
		<input type="checkbox" class="select-all">
		{{/allChecked}}
		<span>全选</span>
	</li>
	<li class="product-info">
		<span>商品</span>
	</li>
	<li class="product-price">
		<span>单价</span>
	</li>
	<li class="product-count">
		<span>数量</span>
	</li>
	<li class="product-total-price">
		<span>小计</span>
	</li>
	<li class="product-opreation">
		<span>操作</span>
	</li>
</ul>
{{#cartList}}
<ul class="cart-item clearfix" data-product-id="{{productId._id}}">
	<li class="select-all">
		{{#checked}}
		<input type="checkbox" checked class="select-one" />
		{{/checked}}
		{{^checked}}
		<input type="checkbox" class="select-one" />
		{{/checked}}
	</li>
	<li class="product-info">
		<a href="./detail.html?productId=111">
			<img src="http://127.0.0.1:3000/product-image/1536627149757.jpg" alt=""/>
			<span class="product-info-text">{{productId.name}}</span>
		</a>
	</li>
	<li class="product-price">
		<span>￥{{productId.price}}</span>
	</li>
	<li class="product-count">
		<span>{{count}}</span>
	</li>
	<li class="product-total-price">
		<span>￥{{price}}</span>
	</li>
	<li class="product-opreation">
		<span>
			<i class="fa fa-trash-o"></i>删除
		</span>
	</li>
</ul>
{{/cartList}}
<ul class="cart-footer">
	<li class="select-all">
		{{#allChecked}}
		<input type="checkbox" checked class="select-all">
		{{/allChecked}}
		{{^allChecked}}
		<input type="checkbox" class="select-all">
		{{/allChecked}}
		<span>全选</span>
	</li>
	<li class="remove-select">
		删除选中的商品
	</li>
	<li class="moveToFollow">移到我的关注</li>
	<li class="remove-all">清理购物车</li>
	<li class="total-price">
		<span class="total-price-text">总价:</span>
		<span class="money">￥{{totalPrice}}</span>
	</li>
	<li class="toPay btn btn-submit">
		去结算
	</li>
</ul>