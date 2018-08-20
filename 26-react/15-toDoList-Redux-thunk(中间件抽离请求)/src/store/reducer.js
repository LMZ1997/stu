

import { CHANGE_VALUE,ADD_ITEM,DELETE_ITEM,LOAD_DATA } from './actionTypes.js'

const defaultState={
	value:'hello!!!',
	list:['aaa!!!','bbb!!!']
}

//reducer是一个函数，把函数暴露出去
export default (state=defaultState,action)=>{
	if(action.type==CHANGE_VALUE){
		//深copy
		const newState=JSON.parse(JSON.stringify(state));
		newState.value=action.payload;
		return newState;//函数里边return了就退出函数了
	}
	if(action.type==LOAD_DATA){
		const newState=JSON.parse(JSON.stringify(state));
		newState.list=action.payload;
		return newState;
	}
	if(action.type==ADD_ITEM){
		const newState=JSON.parse(JSON.stringify(state));
		newState.list.push(state.value);
		newState.value=''
		return newState;
	}
	if(action.type==DELETE_ITEM){
		const newState=JSON.parse(JSON.stringify(state));
		newState.list.splice(action.index,1);
		return newState;
	}
	return state
}