import React,{Component,Fragment} from 'react';

import './App.css'

import { DatePicker } from 'antd';
 // import 'antd/dist/antd.css';//太消耗性能，所以尽量用按需加载

class App extends Component{




	render(){ 
		console.log('App render...')
		return (
			<div className='App'>
				<DatePicker/>
			</div>
			
		)
	}
};

export default App;