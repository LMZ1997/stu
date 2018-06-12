/*判断当前浏览器是否支持transition过渡*/
;(function(w){
	// console.log(document.body.style.transition);//返回为一个空值即表明支持transition
	var transitionEventName={
		transition:"transitionend",
		MozTransition:'transitionend',//火狐浏览器特有
		WebkitTransition:'WebkitTransitionEnd',
		OTransition:'OTransitionEnd'//欧朋浏览器特有
	}
	var transition={
		end:'',
		isSupport:false
	};
	for(key in transitionEventName){
		if(document.body.style[key] !==undefined){//说明当前浏览器支持transition
			transition.end=transitionEventName[key];
			transition.isSupport=true;
			break;//查找到就退出，提高效率
		}
	}
	w.kuazhu=w.kuazhu||{};//把属性暴露出去(到window上),并不是直接暴露到window上，利于管理
	w.kuazhu.transition=transition;
})(window)