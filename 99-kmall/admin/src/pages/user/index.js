import React,{ Component } from 'react'
import { getUserName } from 'util'
import Layout from 'common/Layout'
import { actionCreators } from './store'
import {connect} from 'react-redux';

import { Table } from 'antd'

class User extends Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){
		// this.props.getUsers();
	}
	render(){
		const columns = [{
		  title: '用户名',
		  dataIndex: 'username',
		  key: 'username',
		}, {
		  title: '管理员权限',
		  dataIndex: 'isAdmin',
		  key: 'isAdmin',
		  // render:()=>{ isAdmin?'是':'否'}
		  render:isAdmin=>(isAdmin?'是':'否')
		}]
		// const data=this.props.users
		// for(var i=1;i<=data.length;i++){
		// 	data[i].key=i
		// }
		const data=[];
		data.push({
			key:1,
			username:this.props.username,
			isAdmin:this.props.isAdmin
		})
		// console.log('data:',data)
		return(
			<div>
				<Layout>
					<Table 
					dataSource={data} 
					columns={columns}
					pagination ={//什么都不配置也可以,但那必定是前端分页，一次会请求所有数据，若数据过于庞大则不合适
						{
							defaultCurrent:1,
							pageSize:12,//默认是10
							total:500
						}
					}
					/>
				</Layout>
			</div>
		)
	}
}

const mapStateToProps=(state)=>{
	return{
		username:state.get('user').get('username'),
		isAdmin:state.get('user').get('isAdmin')
	}
}

const mapDispatchToProps=(dispatch)=>{
	return{
		getUsers:()=>{
			const action=actionCreators.getUsersAction();
			dispatch(action)
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(User)