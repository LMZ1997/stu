<div class="panel">
	<h2 class="panel-header">
		订单详情
	</h2>
	<div class="panel-body">
		<ul class="product-title clearfix">
			<li class="product-info">
				<span>商品</span>
			</li>
			<li class="product-price">
				<span>单价</span>
			</li>
			<li class="product-count">
				<span class="product-countMenu-text">数量</span>
			</li>
			<li class="product-total-price">
				<span>小计</span>
			</li>

		</ul>
		{{#list}}
			{{#productList}}
				<ul class="product-item  clearfix">
					<li class="product-info">
						<a href="./detail.html?productId={{productId._id}}" class="product-info-link" target="_blank">
							<img src="{{image}}" alt=""/>
							<span class="product-info-text">{{name}}</span>
						</a>
					</li>
					<li class="product-price">
						<span>￥{{price}}</span>
					</li>
					<li class="product-count">
						<span>{{count}}</span>
					</li>
					<li class="product-total-price">
						<span>￥{{totalPrice}}</span>
					</li>
				</ul>
			{{/productList}}
		{{/list}}
	</div>
	
</div>