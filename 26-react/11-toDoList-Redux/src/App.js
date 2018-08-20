import React,{Component,Fragment} from 'react';

import './App.css'

import {Input,Button,Row,Col,List} from 'antd';
 // import 'antd/dist/antd.css';//太消耗性能，所以尽量用按需加载

import store from './store'//默认寻找文件夹里的index.js

class App extends Component{
	constructor(props){
		super(props)
		this.handleAdd=this.handleAdd.bind(this);
		this.handleChange=this.handleChange.bind(this)
		/*
		this.state={
			value:'hello',
			list:['aaa','bbb']
		}
		*/
		console.log(store)
		this.state=store.getState()

		//subcsribe实时监测store里的state，当store里的state发生改变,执行里边的函数
		// 为什么用subscribe这个函数呢，因为要实时根据数据改变页面
		store.subscribe(()=>{
			this.setState(store.getState())//setstate可以立即根据数据改变页面
			// this.state=store.getState()
		})

	}
	handleChange(ev){
		//在这里直接改变state是不可以的，只能通过store改变reducer里的state数据才可以
		const action={
			type:'change_value',
			payload:ev.target.value
		}
		store.dispatch(action)
	}
	handleAdd(){
		const action={
			type:'add_item',
			// payload:this.state.value不需要传值，因为state到处都有且值一样
		}
		store.dispatch(action)
	}
	handleDelete(index){
		const action={
			type:'delete_item',
			index:index
		}
		store.dispatch(action)
	}
	render(){ 
		return (
			<div className='App'>
				
				<Row className='Row'>
			      <Col span={18}>
			      	<Input 
			      		value={this.state.value}
			      		onChange={this.handleChange}
			      	/>
			      </Col>
			      <Col span={6}>
			      	<Button type="primary" onClick={this.handleAdd}>添加</Button>
			      </Col>
			    </Row>
			    <List
			      bordered
			      dataSource={this.state.list}
			      renderItem={(item,index) => (//系统提供的方法带有index
			      		<List.Item onClick={this.handleDelete.bind(this,index)}>
			      			{item}
			      		</List.Item>
			      )}
			    />
			</div>
			
		)
	}
};

export default App;