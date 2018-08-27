

import {fromJS} from 'immutable'
import * as types from './actionTypes.js'

const defaultState=fromJS({
	isAddFetching:false,
	name:[]
})
export default (state=defaultState,action)=>{
	if(action.type==types.CATEGORY_ADD){
		return state.set('isFetching',true)
	}
	if(action.type==types.CATEGORY_DONE){
		return state.set('isFetching',false)
	}
	if(action.type==types.SET_CATEGORY_NAME){
		return state.set('name',action.payload)
	}
	return state
}