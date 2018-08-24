                            //公共功能
import axios from 'axios'

export const request=(options)=>{
	return new Promise((resolve,reject)=>{
		axios({
			method:options.method || 'get',
			url:options.url || 'http://127.0.0.1:3000/admin/login',
			data:options.data || null
		})
		.then((result)=>{
			const data=result.data;
			// if(data.code==10){
			// 	window.location.href='/login'
			// }
			// else if(data.code==0){
				resolve(data)
			// }
		})
		.catch(e=>{
			reject(e)
		})
	})
}

export const setUserName=(username)=>{
      	window.localStorage.setItem('username',username)
}
export const getUserName=()=>{
     return window.localStorage.getItem('username')
}
export const removeUserName=()=>{
     window.localStorage.removeItem('username')
}