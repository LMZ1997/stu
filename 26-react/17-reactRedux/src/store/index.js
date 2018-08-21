import { createStore,applyMiddleware  } from 'redux'
                     //中间件(作用如下)
import { createLogger } from 'redux-logger'

import thunk from 'redux-thunk';//dispatch默认只接收对象类型的参数,运用了此中间件(thunk)后可以接收函数类型的参数

import reducer from './reducer.js'

const logger = createLogger({});//不传任何参数，即使用默认配置，等同于直接import logger from 'redux-logger'

const middleWare=[thunk]
if(process.env.NODE_ENV != 'production'){//线上环境
	middleWare.push(logger);
}
const store=createStore(reducer,applyMiddleware(...middleWare))

export default store;