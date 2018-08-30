   
                      //所有路由统一管理

const SERVER='http://127.0.0.1:3000'
export const SERVER_LOGIN = SERVER +'/admin/login'
export const ADMIN_COUNT = SERVER +'/admin/count'
export const USER_LOGOUT = SERVER +'/user/logout'
export const GET_USER = SERVER +'/admin/users'
export const SET_CATEGORY = SERVER +'/category'//这个时Post请求
export const GET_CATEGORY = SERVER +'/category'//这个是get请求
export const UPDATE_CATEGORY = SERVER +'/category/edit'
export const UPDATE_CATEGORY_ORDER =SERVER +'/category/editOrder'