import React,{ Component } from 'react';

import './App.css'
import ToDoList from './pages/toDoList/index.js'

import { 
	BrowserRouter as Router,//页面路由方式->浏览器地址栏有正确路由时刷新会显示异常(想要解决这种情况可以在配置webpack处加一个配置)
	// HashRouter as Router,//hash路由方式(#)->浏览器地址栏有正确路由时刷新也显示正常
	Route,
	Link,
	Switch
} from 'react-router-dom'


class A extends Component{
	render(){
		return (
			/*
				exact:路由必须全等；
				Switch组件，只要匹配的一个，下边的就不会再匹配；
				this.props.match.params.id等于匹配到的那个id值；
				在switch组件中的render函数中传递的router参数==this.props
			*/
			<div>
				Component A(第二次匹配到)
				<Switch>
					<Route exact path='/a' render={()=>(<h2>--no params.id</h2>)} />
					<Route path='/a/test' render={()=>(<h2>不带参数的Route要写在带参数如id的Route前边,不然id可以匹配到所有/a/后带的路由如test</h2>)} />
					<Route path='/a/:id' render={(router)=>(<h2>--params.id=={router.match.params.id}</h2>)} />
					<Route path='/a/test' render={()=>(<h2>不带参数的Route要写在带参数如id的Route前边,不然id可以匹配到所有/a/后带的路由如test</h2>)} />
				</Switch>
			</div>
		)
	}
}

class App extends Component{
	render(){
		return(
			/*首先<Router>包裹所有与路由相关的，其次必须用一个标签如<div>包裹，Router内只能有一个子元素，*/
			<Router>
				<div>
					<ul>
						<li>
							<Link to='/todolist'>
								ToDoList
							</Link>
						</li>
						<li>
							<Link to='/a'>
								test-A
							</Link>
						</li>
						<li>
							<Link to='/b'>
								test-B
							</Link>
						</li>
						<li>
							<Link to='/a/123'>
								test-A-ID
							</Link>
						</li>
						<li>
							<Link to='/a/test'>
								test-A-test
							</Link>
						</li>
					</ul>
					<Route path='/todolist' component={ ToDoList } />
					<Route path='/a' component={ A } />
					<Route path='/a/:id' render={()=>(<h1>路由带有id(第一次匹配)</h1>)} />
					<Route path='/b' render={()=>(<h1>render方法渲染组件</h1>)} />
				</div>
			</Router>
		)
	}
}

export default App;