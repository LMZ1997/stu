

import * as types from './actionTypes.js'
import {fromJS} from 'immutable'


const defaultState=fromJS({//将state数据变为Map类型
	value:'默认数据hello!!!',
	list:['aaa!!!','bbb!!!']
})

export default (state=defaultState,action)=>{
	console.log('1::',state)
	if(action.type==types.CHANGE_VALUE){
		/*
		//深copy
		const newState=JSON.parse(JSON.stringify(state));
		newState.value=action.payload;
		return newState;//函数里边return了就退出函数了
		*/
		return state.set('value',action.payload)
	}
	if(action.type==types.LOAD_DATA){
		/*
		const newState=JSON.parse(JSON.stringify(state));
		newState.list=action.payload;
		return newState;
		*/
		return state.set('list',action.payload)
	}
	if(action.type==types.ADD_ITEM){
		const newList=[...state.get('list'),state.get('value')];
		return state.merge({//因为还要将value设置为空，所以用merge
			list:newList,
			value:''
		})
	}
	if(action.type==types.DELETE_ITEM){
		const newList=[...state.get('list')];
		newList.splice(action.index,1);
		return state.set('list',newList)
	}
	return state
}