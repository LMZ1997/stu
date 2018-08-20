


import { CHANGE_VALUE,ADD_ITEM,DELETE_ITEM,LOAD_DATA } from './actionTypes.js'

export const changeValueAction=(payload)=>{
	return {
		type:CHANGE_VALUE,
		// payload=payload
		payload
	}
}
export const addItemAction=()=>{
	return {
		type:ADD_ITEM,
	}
}
export const deleteItemAction=(index)=>{
	return {
		type:DELETE_ITEM,
		index
	}
}
export const loadDataAction=(payload)=>{
	return {
		type:LOAD_DATA,
		payload
	}
}