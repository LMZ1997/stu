import axios from 'axios'
import { message } from 'antd';
import * as types from './actionTypes.js'
import { request } from 'util'//配置别名
import { GET_USER } from 'api'

export const getUsersAction=()=>{//values是ant-design封装的接收username和pwd的
	return (dispatch)=>{
          request({
          	url:GET_USER,
          })
          .then((data)=>{
          	console.log('user请求成功后返回到前端的数据：：',data)
          	if(data){
          		dispatch(setUsersDataAction(data))
          	}
          	else{
          		message.error(data.errMessage)
          	}
          })
          .catch(e=>{
          	message.error('网络错误，请稍后重试！');
          })
    }
}
export const setUsersDataAction=(payload)=>{
	const action={
		type:types.SET_USER_DATA,
		payload
	}
}