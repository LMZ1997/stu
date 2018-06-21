;(function($){
	var $searchForm=$('#search-form'),
		$searchInput=$('.search-input');
	$searchForm.on('submit',function(){
		if(getInputVal()==''){//若搜索栏内容是否为空或者空格，则不执行提交
			return false;
		}
	});


	function getInputVal(){
		return $.trim($searchInput.val());
	}
})(jQuery)