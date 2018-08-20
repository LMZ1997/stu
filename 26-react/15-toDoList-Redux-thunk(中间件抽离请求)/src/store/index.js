import { createStore,applyMiddleware  } from 'redux'
                     //中间件(作用如下)
import reducer from './reducer.js'

import thunk from 'redux-thunk';

//dispatch默认只接收对象类型的参数,运用了此中间件(applyMiddleware)后可以接收函数类型的参数
const store=createStore(reducer,applyMiddleware(thunk))

export default store;