

import * as types from './actionTypes.js'

const defaultState={
	value:'默认数据hello!!!',
	list:['aaa!!!','bbb!!!']
}

export default (state=defaultState,action)=>{
	if(action.type==types.CHANGE_VALUE){
		//深copy
		const newState=JSON.parse(JSON.stringify(state));
		newState.value=action.payload;
		return newState;//函数里边return了就退出函数了
	}
	if(action.type==types.LOAD_DATA){
		const newState=JSON.parse(JSON.stringify(state));
		newState.list=action.payload;
		return newState;
	}
	if(action.type==types.ADD_ITEM){
		const newState=JSON.parse(JSON.stringify(state));
		newState.list.push(state.value);
		newState.value=''
		return newState;
	}
	if(action.type==types.DELETE_ITEM){
		const newState=JSON.parse(JSON.stringify(state));
		newState.list.splice(action.index,1);
		return newState;
	}
	return state
}