(function(win,doc){
	//获取根元素
	var iRoot=document.getElementsByTagName('html')[0];
	function refreshFontSize(){
		//获取当前设备宽度
		var iWidth=doc.body.clientWidth||doc.documentElement.clientWidth;
		//确定设备宽度与字体大小的关系
		var iFont=iWidth/10;
		//设置根元素下的fontsize大小
		iRoot.style.fontSize=iFont+'px';
	}
	
	win.addEventListener('resize',refreshFontSize,false);
	// win.addEventListener('load',refreshFontSize);//需要等到全部元素加载完毕才触发
	doc.addEventListener('DOMContentLoaded',refreshFontSize,false);//DOM要大写
})(window,document);