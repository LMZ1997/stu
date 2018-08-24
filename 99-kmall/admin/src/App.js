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

import Login from 'pages/login'
import Home from 'pages/home'
import { getUserName } from 'util'



class App extends Component{
	render(){//自定义的放在render里，return外边
		const HomeRouter=({component:Component,...rest})=>(
				<Route
					{...rest}
					render={(props)=>(
						getUserName()
						?<Component {...props} />
						:<Redirect to='/login' />//没有获取到登陆信息则跳转登录页面
					)}
				/>
			)
		const LoginRouter=({component:Component,...rest})=>(
			<Route
				{...rest}
				render={(props)=>(
					getUserName()
					?<Redirect to='/' />
					:<Component {...props} />
				)}
			/>
		)
		return(
			<Router>
				<div className='App'>
					<HomeRouter exact path='/' component={ Home }  />
					<LoginRouter path='/login' component={ Login } />
				</div>
			</Router>
		)
	}
}

export default App;