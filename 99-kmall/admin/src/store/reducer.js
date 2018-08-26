
// import { combineReducers } from 'redux'
/*
	引用redux-immutable的combineReducers可以将store中的state
	转化为immutable对象，直接影响到index.js中对value:和list:
	的赋值
*/
import { combineReducers } from 'redux-immutable'
import {reducer as loginReducer} from 'pages/login/store'
import {reducer as homeReducer} from 'pages/home/store'
import {reducer as userReducer} from 'pages/user/store'

export default combineReducers({
	login:loginReducer,//这里影响着后边数据，value=state.todolist.value
	home:homeReducer,
	user:userReducer
})
