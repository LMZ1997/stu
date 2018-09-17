
// var $=require('jquery')需要npm install jquery --save,所以不建议使用


require('node_modules/font-awesome/css/font-awesome.min.css')
require('pages/common/nav')
require('pages/common/footer')
require('pages/common/search')
require('util/carousel')
require('./index.css');


var _util=require('util')
var categoryTpl=require('./categories.tpl')
var carouselTpl=require('./carousel.tpl')
var floorTpl=require('./floor.tpl')


var page={
	categories:[
		{
			item:[{name:'手机'},{name:'iphone'}]
		},
		{
			item:[{name:'女装'},{name:'连衣裙'}]
		},
		{
			item:[{name:'家电'},{name:'空调'}]
		},
		{
			item:[{name:'男装'},{name:'夹克'}]
		},
		{
			item:[{name:'母婴'},{name:'奶粉'}]
		},
		{
			item:[{name:'家具'},{name:'沙发'}]
		},
		{
			item:[{name:'酒水'},{name:'RIO'}]
		},
		{
			item:[{name:'美妆'},{name:'欧莱雅'}]
		},
		{
			item:[{name:'运动'},{name:'耐克'}]
		},
		{
			item:[{name:'汽车'},{name:'红旗'}]
		},
	],
	carousels:[ //图片的地址这样引用的原因是因为模板文件写在.tpl的文件中，webpack并不能对tpl中的jpg进行处理
		{
			categoryId:1111,img:require('images/carousel/320019.jpg')
		},
		{
			categoryId:2222,img:require('images/carousel/320020.jpg')
		},
		{
			categoryId:3333,img:require('images/carousel/320957.jpg')
		}
	],
	floors:[
		{
			title:'F1手机',
			floor:[
				{categoryId:'1111',text:'神州',img:require('images/floor/floor5-01.jpg')},
				{categoryId:'1111',text:'联想',img:require('images/floor/floor5-02.jpg')},
				{categoryId:'1111',text:'小米',img:require('images/floor/floor5-03.jpg')},
				{categoryId:'1111',text:'华为',img:require('images/floor/floor5-04.jpg')},
				{categoryId:'1111',text:'华硕',img:require('images/floor/floor5-05.jpg')},
			]
		},
		{
			title:'F2电脑',
			floor:[
				{categoryId:'1111',text:'苹果',img:require('images/floor/floor1-01.jpg')},
				{categoryId:'1111',text:'诺基亚',img:require('images/floor/floor1-02.jpg')},
				{categoryId:'1111',text:'摩托罗拉',img:require('images/floor/floor1-03.jpg')},
				{categoryId:'1111',text:'三星',img:require('images/floor/floor1-04.jpg')},
				{categoryId:'1111',text:'vivo',img:require('images/floor/floor1-05.jpg')},
			]
		},
		{
			title:'F3数码',
			floor:[
				{categoryId:'1111',text:'显示屏',img:require('images/floor/floor4-01.jpg')},
				{categoryId:'1111',text:'电音',img:require('images/floor/floor4-02.jpg')},
				{categoryId:'1111',text:'音响',img:require('images/floor/floor4-03.jpg')},
				{categoryId:'1111',text:'DJ',img:require('images/floor/floor4-04.jpg')},
				{categoryId:'1111',text:'耳机',img:require('images/floor/floor4-05.jpg')},
			]
		},
		
		{
			title:'F4家居',
			floor:[
				{categoryId:'1111',text:'神州',img:require('images/floor/floor2-01.jpg')},
				{categoryId:'1111',text:'联想',img:require('images/floor/floor2-02.jpg')},
				{categoryId:'1111',text:'小米',img:require('images/floor/floor2-03.jpg')},
				{categoryId:'1111',text:'华为',img:require('images/floor/floor2-04.jpg')},
				{categoryId:'1111',text:'华硕',img:require('images/floor/floor2-05.jpg')},
			]
		},
		{
			title:'F5服饰',
			floor:[
				{categoryId:'1111',text:'阿迪达斯',img:require('images/floor/floor3-01.jpg')},
				{categoryId:'1111',text:'耐克',img:require('images/floor/floor3-02.jpg')},
				{categoryId:'1111',text:'安踏',img:require('images/floor/floor3-03.jpg')},
				{categoryId:'1111',text:'花花公子',img:require('images/floor/floor3-04.jpg')},
				{categoryId:'1111',text:'乔丹',img:require('images/floor/floor3-05.jpg')},
			]
		}
	],
	init:function(){
		this.onload()
	},
	onload:function(){
		this.loadCategories();
		this.loadCarousel();
		this.loadFloors();
	},
	loadCategories:function(){
		var html=_util.hoganRender(categoryTpl,{
			categories:this.categories
		});
		$('.category').html(html)
	},
	loadCarousel:function(){
		$('.carousel').html('<div class="loading"></div>');
		var html=_util.hoganRender(carouselTpl,{
			carousels:this.carousels
		});
		$('.carousel').html(html);
		var result= $('.carousel').unslider({
		 	dots: true,
		 	keys: true,//支持键盘前后键切图

		 });
		 $('.arrow').on('click',function(){
		 	var direction=$(this).hasClass('next')?'next':'prev';
		 	result.data('unslider')[direction]();
		 })
	},
	loadFloors:function(){
		var html=_util.hoganRender(floorTpl,{
			floors:this.floors
		});
		$('.floor-wrap').html(html);
	}
	
}

$(function(){
	page.init()
})