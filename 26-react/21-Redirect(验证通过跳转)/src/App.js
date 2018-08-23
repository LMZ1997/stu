import React,{ Component } from 'react';

import './App.css'
import ToDoList from './pages/toDoList/index.js'

import { 
	BrowserRouter as Router,
	// HashRouter as Router,
	Route,
	Link,
	Switch,
	Redirect
} from 'react-router-dom'




class App extends Component{
	constructor(props){
		super(props)
		this.state={//为了实验自己定义一个登录状态
			isLogin:false
		}
	}
	
	render(){
		/*  自定义插件ProtectedRouter
			...rest就是<LMZ 参数 />里除component以外的参数
			props在此处并没有从某个组件处传递过来(谁调用谁传)，值为空
		*/
		const ProtectedRouter=({component:Component,...rest})=>(
			<Route
				{...rest}
				render={(props)=>(
					this.state.isLogin
					?<Component {...props} />
					:<Redirect to='/login' />
				)}
			/>
		)
		return(
			<Router>
				<div>
					<ul>
						<li>
							<Link to='/todolist'>
								ToDoList(登录状态下才会跳转对应页面，否则跳转登录页面)
							</Link>
						</li>
						<li>
							<Link to='/login'>
								登录
							</Link>
						</li>
					</ul>
					<ProtectedRouter path='/todolist' component={ ToDoList } />
					<Route path='/login' render={()=>(<h1>登录框Login</h1>)} />
				</div>
			</Router>
		)
	}
}

export default App;