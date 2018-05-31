function animation(obj,opation,isLinear,fnEnd){
	clearInterval(obj.timer);
	var iSpeed=0;		
		obj.timer=setInterval(function(){
			var isStopAll=true;
			//上边一行写在for循环外且定时器内
			for(attr in opation){
				var isStop=false;
				var curr=parseFloat(getComputedStyle(obj,false)[attr]);
				if(attr=='opacity'){
					curr=curr*100;
				}
				if(isLinear){
					if(curr>opation[attr]){
						iSpeed=-10;
					}else{
						iSpeed=10;
					}
					if(Math.abs(opation[attr]-curr)<=Math.abs(iSpeed)){
						isStop=true;
					}else{
						isStopAll=false;
					}
				}
				else{
					curr=Math.round(curr);
					iSpeed=(opation[attr]-curr)/4;
					iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
					if(!iSpeed){
						isStop=true;
					}else{
						isStopAll=false;
					}
				}							
				if(isStop){
					
					if(isLinear){
						if(attr=='opacity'){
							obj.style[attr]=opation[attr]/100;
						}
						else{
							obj.style[attr]=opation[attr]+'px';
						}
					}
	//!!!!!!!!!!!!!!!!!!!传递的函数参数写在此次函数执行要结束的地方
					// if(fnEnd){
					// 	fnEnd();
					// }
				}
				else{
					if(attr=='opacity'){
						obj.style[attr]=(curr+iSpeed)/100;
					}
					else{
						obj.style[attr]=curr+iSpeed+'px';
					}
				}
			}
			if(isStopAll){
				clearInterval(obj.timer);
				if(fnEnd){
						fnEnd();
					}
			}
		},30)			
}