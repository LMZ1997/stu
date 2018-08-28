import React,{ Component } from 'react'
import Layout from 'common/layout'
import {Link} from 'react-router-dom'

import {Button,Breadcrumb,Table,Divider,InputNumber } from 'antd'
import {connect} from 'react-redux'
import { actionCreators } from './store'

const columns = [
	{
	  title: 'ID',
	  dataIndex: 'ID',
	  key: 'ID',
	},
	{
	  title: '分类名',
	  dataIndex: 'name',
	  key: 'name',
	}, 
	{
	  title: '排序',
	  dataIndex: 'order',
	  key: 'order',
	    render:(order)=>{						//必须写在columns里，不能写在data里
	  	return <InputNumber defaultValue={order}  />
	  }
	},
	{
	  title: '操作',
	  key: 'action',
	  render: (text, record) => (//record是当前的一条数据记录!!!!!!!!!!!!很有用
	    <span>
	      <a href="javascript:;">更新分类名称</a>
	      {
	      	record.pid==0
	      	?(
	      		<span>
	      			<Divider type="vertical" />
	     			 <Link to={'/category/'+record.ID} >查看子分类</Link>
	      		</span>
	      		)
	      	:null
	      }
	      
	    </span>
	  ),
	}
]
class CategoryList extends Component{
	constructor(props){
		super(props)
		this.state={
			pid:this.props.match.params.pid||0
		}
	}
	componentDidMount(){
		this.props.getPages(this.state.pid,1);
	}
	componentDidUpdate(preProps,preState){//属性变化时根据属性变化渲染页面结束时触发的生命周期函数
		// console.log(this.props)
		let oldPath=preProps.location.pathname;
		let newPath=this.props.location.pathname;
		if(oldPath!=newPath){
			this.setState({
				pid:this.props.match.params.pid||0
			},()=>{
				this.props.getPages(this.state.pid,1);
			})
		}
	}
	render(){
		const pid =this.state.pid || 0;
		const data=this.props.list.map((category)=>{//immutable对象上的map方法
			return {
				key:category.get('_id'),
				ID:category.get('_id'),
				name:category.get('name'),
				order:category.get('order'),
				pid:category.get('pid')
			}
		}).toJS()
		return(
			<Layout>
				<Breadcrumb>
			    	<Breadcrumb.Item><i>分类管理</i></Breadcrumb.Item>
			    	<Breadcrumb.Item><i>分类列表</i></Breadcrumb.Item>
			 	</Breadcrumb>
				<div style={{ marginTop:'20px' }} className='clearfix'>
					<h3 style={{ float:'left' }}>父类ID: {pid}</h3>
					<Link to='/category/add' style={{ float:'right' }}>
						<Button type="primary">新增分类</Button>
					</Link>
				</div>
				<Table 
					dataSource={data} 
					columns={columns}
					pagination ={
						{
							current:this.props.current,
							defaultCurrent:1,
							pageSize:this.props.pageSize,
							total:this.props.total
						}
					}
					onChange={
						(pagination)=>{
							this.props.getPages(pid,pagination.current);
						}
					}
					loading={
						// true
						{
							spinning:this.props.isPageFetching,
							tip:'拼命加载中'
						}
					}
					/>
			</Layout>
		)
	}
}
const mapStateToProps=(state)=>{
	return{
		isPageFetching:state.get('category').get('isPageFetching'),
		current:state.get('category').get('current'),
		pageSize:state.get('category').get('pageSize'),
		total:state.get('category').get('total'),
		list:state.get('category').get('list')
	}
}
const mapDispatchToProps=(dispatch)=>{
	return{
		getPages:(pid,page)=>{
			const action=actionCreators.getPagesAction(pid,page);
			dispatch(action)
		}
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(CategoryList);