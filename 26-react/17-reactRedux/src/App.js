import React,{ Component } from 'react';

import './App.css'

import {Input,Button,Row,Col,List} from 'antd';
 // import 'antd/dist/antd.css';//太消耗性能，所以尽量用按需加载
import { connect } from 'react-redux'

import { changeValueAction,addItemAction,deleteItemAction,getInitDataAction } from './store/actionCreator.js'

class App extends Component{
	componentDidMount(){
		this.props.loadInitData()
	}
	render(){ 
		return (
			<div className='App'>
				<Row className='Row'>
			      <Col span={18}>
			      	<Input 
			      		value={this.props.value}
			      		onChange={this.props.handleChange}
			      	/>
			      </Col>
			      <Col span={6}>
			      	<Button type="primary" onClick={this.props.handleAdd}>添加</Button>
			      </Col>
			    </Row>
			    <List
			      bordered
			      dataSource={this.props.list}
			      renderItem={(item,index) => (//系统提供的方法带有index
			      		<List.Item onClick={
			      			()=>{
			      				this.props.handleDelete(index)
			      			}
			      		}>
			      			{item}
			      		</List.Item>
			      )}
			    />
			</div>
		)
	}
};


/*
	在引用react-redux的基础上，仍需要引用redux,运用react-redux，只是简化了
	部分代码，如不需要在用到的组件中都要引入store,且不需要创建监听函数store.subscribe函数
	，如果有state数据改变,系统自己会监听并且重新赋值store.state,从而改变页面，另一个优势
	在于代码统一管理，条理清晰
*/
//将store里的state映射到组件的props上
const mapStateToProps=(state)=>{//state-->store.state
	console.log(state)
	return {
		value:state.value,
		list:state.list
	}
}
//将派发action的方法映射到组件的props上
const mapDispatchToProps=(dispatch)=>{//dispatch-->store.dispatch
	return {
		handleChange:(ev)=>{
			const action=changeValueAction(ev.target.value)
			dispatch(action);
		},
		handleAdd:()=>{
			const action=addItemAction();
			dispatch(action)
		},
		handleDelete:(index)=>{
			const action =deleteItemAction(index);
			dispatch(action)
		},
		loadInitData:()=>{
			const action=getInitDataAction();
			dispatch(action)
		}
	}
}
//connect方法让其中指定的组件与store连接
export default connect(mapStateToProps,mapDispatchToProps)(App);