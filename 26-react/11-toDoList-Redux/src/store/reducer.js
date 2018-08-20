
const defaultState={
	value:'hello!!!',
	list:['aaa!!!','bbb!!!']
}

//reducer是一个函数，把函数暴露出去
export default (state=defaultState,action)=>{
	if(action.type=='change_value'){
		//深copy
		const newState=JSON.parse(JSON.stringify(state));
		newState.value=action.payload;
		return newState;//函数里边return了就退出函数了
	}
	if(action.type=='add_item'){
		const newState=JSON.parse(JSON.stringify(state));
		newState.list.push(state.value);
		return newState;
	}
	if(action.type=='delete_item'){
		const newState=JSON.parse(JSON.stringify(state));
		console.log(action.index)
		newState.list.splice(action.index,1);
		return newState;
	}
	return state
}