import React,{ Component } from 'react';

import './toDoList.css'

import {Input,Button,Row,Col,List} from 'antd';
import { connect } from 'react-redux'

import { actionCreator } from './store'

class ToDoList extends Component{
	componentDidMount(){
		this.props.loadInitData()
	}
	render(){ 
		return (
			<div className='toDoList'>
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
			      renderItem={(item,index) => (
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
const mapStateToProps=(state)=>{
	// console.log('333',state)
	return {
		value:state.todolist.value,//？为什么小写todolist
		list:state.todolist.list
	}
}

const mapDispatchToProps=(dispatch)=>{
	return {
		handleChange:(ev)=>{
			const action=actionCreator.changeValueAction(ev.target.value)
			dispatch(action);
		},
		handleAdd:()=>{
			const action=actionCreator.addItemAction();
			dispatch(action)
		},
		handleDelete:(index)=>{
			const action =actionCreator.deleteItemAction(index);
			dispatch(action)
		},
		loadInitData:()=>{
			const action=actionCreator.getInitDataAction();
			dispatch(action)
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(ToDoList);