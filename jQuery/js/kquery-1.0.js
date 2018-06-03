(function(window,undefined){
var
	kquery=function(){
		return new kquery.fn.init();
	};
	kquery.fn=kquery.prototype=function(){
		constructor:kquery,
		init:function(){
			
		}
	}
	window.kquery=window.$=kquery;
})(window)