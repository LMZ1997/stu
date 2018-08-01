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

	$('.wall').on('click','.close',function(){//用wall代理而不用wish，因为动态生成的wish会没有绑定此事件
		var self=this;
		$.ajax({
			url:'/wish/del/'+$(this).data('id'),//这里时GET方法，所以可以通过url传递id
			dataType:'json',
			// data:'id='+$(this).data('id')
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
			url:'/wish/add',//这里是POST方法，不能通过url传递数据data
			dataType:'json',
			// data:val,
			data:{text:val},
			type:'POST'
		})
		.done(function(data){
			console.log(data);
			if(data.status==0){
				let $dom=$(`<div class="wish" style="background:${data.data.color}">
							<a href="#" class="close" data-id="${data.data._id}">
								${data.data.text}
							</a>
						  </div>`);
				$('.text').val('');

				$wall.append($dom);

				handleWish($dom);
					
			}
			else{
				alert('许愿失败了')
			}
			
		})
	})
})(jQuery);
