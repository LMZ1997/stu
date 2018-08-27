import axios from 'axios'
import { message } from 'antd';
import * as types from './actionTypes.js'
import { request } from 'util'//配置别名
import { SET_CATEGORY,GET_CATEGORY } from 'api'


export const  add_start=()=>{
        return {
                type:types.CATEGORY_ADD
        }
}
export const add_done=()=>{
        return{
                type:types.CATEGORY_DONE
        }
}
export const set_cateName=(payload)=>{
			return{
				type:types.SET_CATEGORY_NAME,
				payload
			}
}
export const addCategoryAction=(values)=>{
		return (dispatch)=>{
        dispatch(add_start())
        request({
        	method:'post',
        	data:values,
        	url:SET_CATEGORY,
        	withCredentials: true//axios默认不会将session的userInfo存储到req上
        })
        .then((data)=>{
        	console.log('category请求成功后返回到前端的数据：：',data)
        	if(data.code==0){
        		
        	}
        	else if(data.code==1){
        		message.error(data.errMessage)
        	}
          dispatch(add_done())
        })
        .catch(e=>{
        	message.error('网络错误，请稍后重试！');
          dispatch(add_done())
        })
    }
}

export const getCateNameAction=()=>{
	return (dispatch)=>{
        request({
        	url:GET_CATEGORY,
        	withCredentials: true//axios默认不会将session的userInfo存储到req上
        })
        .then((result)=>{
        	console.log('getCateName请求成功后返回到前端的数据：：',result)
        	if(result.code==0){
        		dispatch(set_cateName(result.data))
        	}
        	else if(data.code==1){
        		message.error(data.errMessage)
        	}
        })
        .catch(e=>{
        	message.error('网络错误，请稍后重试！');
        })
    }
}