import React,{Component,Fragment} from 'react';

import './App.css'

import { DatePicker,Input,Button,Row,Col} from 'antd';
 // import 'antd/dist/antd.css';//太消耗性能，所以尽量用按需加载

class App extends Component{
	render(){ 
		return (
			<div className='App'>
				<DatePicker/>
				<Row>
			      <Col span={18}><Input/></Col>
			      <Col span={6}><Button type="primary">添加</Button></Col>
			    </Row>
			</div>
			
		)
	}
};

export default App;