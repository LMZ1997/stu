import React,{ Component } from 'react'
import { getUserName } from 'util'
import Layout from 'common/Layout'
 
import { Table } from 'antd'

class User extends Component{
	render(){
		const columns = [{
		  title: '用户名',
		  dataIndex: 'username',
		  key: 'username',
		}, {
		  title: '管理员权限',
		  dataIndex: 'isAdmin',
		  key: 'isAdmin',
		  //render:()=>{ isAdmin?'是':'否'}
		}]
		/*
		const dataSource = [{
		  key: '1',
		  username: 'admin',
		  isAdmin: true,
		}, {
		  key: '2',
		  username: 'test',
		  isAdmin: false,
		}]
		*/


		const data=[]
		for(var i=1;i<=500;i++){
			data.push({
				key:i,
		 		username: 'test'+i,
		  		isAdmin: false,
			})
		}
		return(
			<div>
				<Layout>
					<Table 
					dataSource={data} 
					columns={columns}
					pagination ={//什么都不配置也可以,但那必定是前端分页，一次会请求所有数据，若数据过于庞大则不合适
						defaultCurrent:1,
						pageSize:12,//默认是10
						total:500
					}
					/>
				</Layout>
			</div>
		)
	}
}


export default User