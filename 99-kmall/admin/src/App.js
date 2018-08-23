import React,{ Component } from 'react';

import './App.css'

import { 
	BrowserRouter as Router,
	// HashRouter as Router,
	Route,
	Link,
	Switch,
	Redirect
} from 'react-router-dom'

import Login from './pages/login'


class App extends Component{
	render(){
		return(
			<Router>
				<div className='App'>
					<ul>
						<li>
							<Link to='login'>
								登录
							</Link>
						</li>
					</ul>
					<Route path='/login' component={ Login } />
				</div>
			</Router>
		)
	}
}

export default App;