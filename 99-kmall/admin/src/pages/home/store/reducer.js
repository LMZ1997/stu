

import {fromJS} from 'immutable'
import * as types from './actionTypes.js'

const defaultState=fromJS({
	usernum:200,
	ordernum:201,
	productnum:202
})
export default (state=defaultState,action)=>{
	if(action.type==types.SET_COUNT){
		return state.merge({
			usernum:action.payload.usernum,
			ordernum:action.payload.ordernum,
			productnum:action.payload.productnum
		})
	}
	return state
}