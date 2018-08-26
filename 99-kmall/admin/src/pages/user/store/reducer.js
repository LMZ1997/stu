

import {fromJS} from 'immutable'
import * as types from './actionTypes.js'

const defaultState=fromJS({
	/*
		userData:{
			username:'test',
			isAdmin:'false'
		}
	*/
	username:'test',
	isAdmin:'false'	
})
export default (state=defaultState,action)=>{
	if(action.types==types.SET_USER_DATA){
		return state.set('userData',action.payload)
	}
	return state
}