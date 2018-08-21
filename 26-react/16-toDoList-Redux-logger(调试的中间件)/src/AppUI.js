
import React,{ Component } from 'react';
import {Input,Button,Row,Col,List} from 'antd';


/*只有一个render方法的组件是无状态组件，无状态组件可简化，详情如下

class AppUI extends Component{
	render(){
		return(
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
}
*/
	


const AppUI=(props)=>{//无状态组件可简化写法,注意传参props
	return(
		<div className='App'>
			<Row className='Row'>
		      <Col span={18}>
		      	<Input 
		      		value={props.value}
		      		onChange={props.handleChange}
		      	/>
		      </Col>
		      <Col span={6}>
		      	<Button type="primary" onClick={props.handleAdd}>添加</Button>
		      </Col>
		    </Row>
		    <List
		      bordered
		      dataSource={props.list}
		      renderItem={(item,index) => (//系统提供的方法带有index
		      		<List.Item onClick={//因为需要传递参数index,click里写了一个函数
		      			()=>{
		      				props.handleDelete(index)
		      			}
		      		}>
		      			{item}
		      		</List.Item>
		      )}
		    />
		</div>
	)
}

export default AppUI;