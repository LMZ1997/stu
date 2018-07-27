(function($){
	function getRandom(min,max){
		return Math.round(min+(max-min)*Math.random());
	}
	

	$wish=$('.wish');
	$wall=$('.wall');

	var wallWidth=parseInt($wall.css('width'));
	var wallHeight=parseInt($wall.css('height'));
	var wishWidth=parseInt($wish.css('width'));
	var wishHeight=parseInt($wish.css('height'));

	function handleWish($elem){
		$elem.pep({constrainTo:'.wall'});//拖拽插件
		$elem.each(function(){//不能用箭头函数
			$(this).css({
			// transform:'matrix(1,0,0,1,97,32)'
				transform:'matrix(1,0,0,1,'+getRandom(0,wallWidth-wishWidth)+','+getRandom(0,wallHeight-wishHeight)+')'
			})
		})
		$elem.hover(function(){//不能用箭头函数
			$(this).css({
				zIndex:99
			})
		},function(){
			$(this).css({
				zIndex:0
			})
		})
	}
	handleWish($wish);

	$('.wish').on('click','.close',function(){
		var self=this;
		$.ajax({
			url:'/del',
			dataType:'json',
			data:'id='+$(this).data('id')
		})
		.done((data)=>{//由后台返回数据
			if(data.status==0){
				$(self.parentNode).remove();
			}
		})
	});

	$('.toWish').on('click',function(){
		let val=$('.text').val();
		// if(val!=''){
			//提高性能
		// }
		$.ajax({
			url:'/add',
			dataType:'json',
			// data:val,
			data:{text:val},
			type:'POST'
		})
		.done(function(data){
			console.log(data);
			if(data.status==0){
				let $dom=$(`<div class="wish" style="background:${data.data.color}">
							<a href="#" class="close" data-id="${data.data.id}">
								${data.data.text}
							</a>
						  </div>`);
				$('.text').val('');
				$wall.append($dom);
				handleWish($dom);	
			}
			
		})
	})
})(jQuery);
