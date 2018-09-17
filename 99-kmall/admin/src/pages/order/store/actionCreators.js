import axios from 'axios'
import { message } from 'antd';
import * as types from './actionTypes.js'
import { request } from 'util'//配置别名
import { 
    SET_PRODUCT,
    GET_ORDER,
    UPDATE_PRODUCT_ORDER,
    UPDATE_PRODUCT_STATUS,
    PRODUCT_DETAIL,
    SEARCH_PRODUCT
} from 'api'


const  getPage_start=()=>{
     return {
          type:types.GET_PAGE_START
     }
}
const getPage_done=()=>{
     return{
          type:types.GET_PAGE_DONE
     }
}
const setPageAction=(payload)=>{
    return /*const action=*/{    //注意写法
          type:types.SET_PAGE,
          payload
     }
}

export const getPagesAction=(page)=>{
	return (dispatch)=>{
        dispatch(getPage_start())
        request({
        	url:GET_ORDER,
        	data:{
        		page:page
        	},
        	withCredentials: true//axios默认不会将session的userInfo存储到req上
        })
        .then((result)=>{
        	console.log('getOrderPage请求成功后返回到前端的数据：：',result)
        	if(result.code==0){
        		dispatch(setPageAction(result.data))
        	}
        	else if(result.code==1){
        		message.error(result.errMessage)
        	}
            dispatch(getPage_done())
        })
        .catch(e=>{
          dispatch(getPage_done())
        	message.error('网络错误，请稍后重试！');
        })
    }
}

const setProductDetailAction=(payload)=>{
    return {
        type:types.SET_PRODUCT_DETAIL,
        payload
    }
}
export const getProductDetail=(productId)=>{
    return (dispatch)=>{          
        request({
            method:'get',              
            url:PRODUCT_DETAIL,
            data:{
                id:productId,
            },
            withCredentials: true
        })
        .then((result)=>{
            console.log('ProductDetail请求成功后返回到前端的数据：：',result)
            if(result.code==0){
                 dispatch(setProductDetailAction(result.data))
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
export const searchProductAction=(keyword,page=1)=>{
    return (dispatch)=>{          
        request({
            method:'get',              
            url:SEARCH_PRODUCT,
            data:{
                keyword,
                page
            },
            withCredentials: true
        })
        .then((result)=>{
            console.log('searchProduct请求成功后返回到前端的数据：：',result)
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