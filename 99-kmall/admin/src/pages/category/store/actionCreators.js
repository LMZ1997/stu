import axios from 'axios'
import { message } from 'antd';
import * as types from './actionTypes.js'
import { request } from 'util'//配置别名
import { SET_CATEGORY,GET_CATEGORY } from 'api'


 const  add_start=()=>{
        return {
                type:types.CATEGORY_ADD
        }
}
 const add_done=()=>{
        return{
                type:types.CATEGORY_DONE
        }
}
 const set_categories=(payload)=>{
			return{
				type:types.SET_CATEGORIES,
				payload
			}
}

const  getPage_start=()=>{
     return {
          type:types.GETUSER_START
     }
}
 const getPage_done=()=>{
     return{
          type:types.GETUSER_DONE
     }
}
export const setPageAction=(payload)=>{
    return /*const action=*/{    //注意写法
          type:types.SET_PAGE,
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
        	withCredentials: true
        })
        .then((result)=>{
        	console.log('category请求成功后返回到前端的数据：：',result)
        	if(result.code==0){
        		if(result.data){
        			dispatch(set_categories(result.data))
        		}
        		message.success('添加分类成功')
        	}
        	else if(result.code==1){
        		message.error(result.errMessage)
        	}
          dispatch(add_done())
        })
        .catch(e=>{
        	message.error('网络错误，请稍后重试！');
          dispatch(add_done())
        })
    }
}

export const getCategoriesAction=(pid)=>{

	return (dispatch)=>{
        request({
        	url:GET_CATEGORY,
        	data:{
        		pid: pid|| 0
        	},
        	withCredentials: true//axios默认不会将session的userInfo存储到req上
        })
        .then((result)=>{
        	console.log('getCate请求成功后返回到前端的数据：：',result)
        	if(result.code==0){
        		dispatch(set_categories(result.data))
        	}
        	else if(result.code==1){
        		message.error(result.errMessage)
        	}
        })
        .catch(e=>{
        	message.error('网络错误，请稍后重试！');
        })
    }
}

export const getPagesAction=(pid,page)=>{
	return (dispatch)=>{
					console.log('pid:::',pid)
        request({
        	url:GET_CATEGORY,
        	data:{
        		pid: pid,
        		page:page
        	},
        	withCredentials: true//axios默认不会将session的userInfo存储到req上
        })
        .then((result)=>{
        	console.log('getCatePage请求成功后返回到前端的数据：：',result)
        	if(result.code==0){
        		dispatch(setPageAction(result.data))
        	}
        	else if(result.code==1){
        		message.error(result.errMessage)
        	}
        })
        .catch(e=>{
        	message.error('网络错误，请稍后重试！');
        })
    }
}