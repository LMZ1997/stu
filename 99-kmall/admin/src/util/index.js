                            //公共功能
import axios from 'axios'

export const request=(options)=>{
	return new Promise((resolve,reject)=>{
		axios({
			method:options.method || 'get',
			url:options.url || 'http://127.0.0.1:3000/admin/login',
			data:options.data || null,
			withCredentials: true//axios默认不会将session的userInfo存储到req上
		})
		.then((result)=>{
			const data=result.data;
			if(data.code==10){//返回10是因为未登录(另外也是为了防止直接在浏览器端设置localStorage进入首页，)
				removeUserName()
				// window.location.href='/login'
				reject(data.message);
			}
			else{
				resolve(data)
			}
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