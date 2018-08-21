
import { combineReducers } from 'redux'
import {reducer as todolistReducer} from '../pages/toDoList/store'

export default combineReducers({
	todolist:todolistReducer//这里影响着后边数据，value=state.todolist.value

})
