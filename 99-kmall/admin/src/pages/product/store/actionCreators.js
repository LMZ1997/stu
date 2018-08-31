import axios from 'axios'
import { message } from 'antd';
import * as types from './actionTypes.js'
import { request } from 'util'//配置别名
import { SET_PRODUCT,GET_PRODUCT,UPDATE_CATEGORY,UPDATE_CATEGORY_ORDER } from 'api'


export const getSetCategoryId=(parentCategoryId,categoryId)=>({
    type:types.SET_CATEGORY_ID,
    payload:{
        parentCategoryId,
        categoryId
    }
})
export const getSetImages=(filePath)=>({
    type:types.SET_IMAGE,
    payload:filePath
})
export const getSetEditorValue=(value)=>({
    type:types.SET_EDITOR_VALUE,
    payload:value
})





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


const  getPage_start=()=>{
     return {
          type:types.GETPAGE_START
     }
}
const getPage_done=()=>{
     return{
          type:types.GETPAGE_DONE
     }
}
const setPageAction=(payload)=>{
    return /*const action=*/{    //注意写法
          type:types.SET_PAGE,
          payload
     }
}
const setCategoryId_error=()=>{
    return {   
          type:types.SET_CATEGORYID_ERROR,
     }
}



export const addProductAction=(err,values)=>{
	return (dispatch,getState)=>{
        const state=getState().get('product')
        const categoryId=state.get('categoryId')

        if(!categoryId){
            dispatch(setCategoryId_error())
            return;
        }
        if(err){
            return;
        }
        dispatch(add_start())
        request({
        	method:'post',
        	data:{
                ...values,           //values从antd封装函数发送过来，只有这里需要的部分参数
                parentCategoryId:state.get('parentCategoryId'),
                categoryId:categoryId,
                imagePath:state.get('imagePath'),
                detailValue:state.get('detailValue')
            },
        	// url:SET_PRODUCT,
        	withCredentials: true
        })
        .then((result)=>{
        	console.log('addProduct请求成功后返回到前端的数据：：',result)
        	if(result.code==0){
        		// if(result.data){
        			
        		// }
        		message.success('添加商品成功')
        	}
        	else if(result.code==1){
        		message.error(result.errMessage)
        	}
          dispatch(add_done())
        })
        .catch(e=>{
        	message.error('添加商品失败,网络错误，请稍后重试！');
          dispatch(add_done())
        })
    }
}


export const getProductsAction=(pid,page)=>{
	return (dispatch)=>{
		// console.log('pid:::',pid)
        dispatch(getPage_start())
        request({
        	url:GET_PRODUCT,
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
            dispatch(getPage_done())
        })
        .catch(e=>{
          dispatch(getPage_done())
        	message.error('网络错误，请稍后重试！');
        })
    }
}



export const update_start=()=>{
    return {
        type:types.UPDATE_START
    }
}
export const update_done=()=>{
    return {
        type:types.UPDATE_DONE
    }
}

export const updateInputOrderAction=(pid,id,newOrder)=>{
    return (dispatch,getState)=>{          
    		const state=getState().get('category')
        dispatch(update_start())
        request({
            method:'put',              
            url:UPDATE_CATEGORY_ORDER,
            data:{
                id:id,
                pid: pid,
                newOrder:newOrder,
                page:state.get('current')
            },
            withCredentials: true
        })
        .then((result)=>{
            console.log('updateOrder请求成功后返回到前端的数据：：',result)
            if(result.code==0){
                dispatch(setPageAction(result.data))
            }
            else if(result.code==1){
                message.error(result.errMessage)
            }
            dispatch(update_done())
        })
        .catch(e=>{
            dispatch(update_done())
            message.error('网络错误，请稍后重试！');
        })
    }
}