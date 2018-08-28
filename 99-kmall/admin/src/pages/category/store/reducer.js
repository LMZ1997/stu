

import {fromJS} from 'immutable'
import * as types from './actionTypes.js'

const defaultState=fromJS({
	isAddFetching:false,
	categories:[],
	isPageFetching:false,               
	current:1,
	defaultCurrent:1,
	pageSize:10,
	total:200,
	list:[]	
})
export default (state=defaultState,action)=>{
	if(action.type==types.CATEGORY_ADD){
		return state.set('isAddFetching',true)
	}
	if(action.type==types.CATEGORY_DONE){
		return state.set('isAddFetching',false)
	}
	if(action.type==types.SET_CATEGORIES){
		return state.set('categories',fromJS(action.payload))
	}

	if(action.type==types.GETPAGE_START){
		return state.set('isPageFetching',true)
	}
	if(action.type==types.GETPAGE_DONE){
		return state.set('isPageFetching',false)
	}
	if(action.type==types.SET_PAGE){
		return state.merge({
			current:action.payload.current,
			pageSize:action.payload.pageSize,
			total:action.payload.total,
			list:fromJS(action.payload.list)//将数组转换为immutable对象给list
		})
	}
	return state
}