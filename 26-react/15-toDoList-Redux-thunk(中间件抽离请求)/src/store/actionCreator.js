

import { CHANGE_VALUE,ADD_ITEM,DELETE_ITEM,LOAD_DATA } from './actionTypes.js'
import axios from 'axios'


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
export const getInitDataAction=()=>{
	return ()=>{
		axios.get('http://127.0.0.1:3000')
		.then((data)=>{
			const action=loadDataAction(data.data)
			// store.dispatch(action)
			dispatch(action);
			/*	diapatch是因为App.js里执行getInitDataAction,
				其中运行了store.dispatch(action)，而那里的action正是此处
				return的函数，所以系统有默认功能，将store对象上的dispath方法
				默认传递进参数action里,即此函数里，所以在此函数里可直接调
				用dispatch方法
			*/
		})
		.catch(e=>{
			console.log(e)
		})
	}
}