import React,{Component,Fragment} from 'react';

import './App.css'
import Item from './Item'


class App extends Component{
	constructor(props){
		super(props);

		this.state={
			value:'',
			list:['输入内容点添加','点我可删除']
		}
		this.handleChange=this.handleChange.bind(this)
		this.handleAdd=this.handleAdd.bind(this)
		this.handleDelete=this.handleDelete.bind(this)
	}
	handleAdd(){
		this.setState((preState)=>(
			{
				list:[...preState.list,preState.value],
				value:''
			}
		))

	}
	handleChange(ev){

		const value=ev.target.value;
		this.setState(()=>({
			value
		}))
	}
	handleDelete(index){
		console.log('1::',this)
		this.setState((preState)=>{
			const list=[...preState.list];
			list.splice(index,1);
			return {
				// list:list
				list
			}
		})
	}
	getItems(){
		// console.log(this)
		return this.state.list.map((item,index)=>{
			 return (
			 	<Item
			 	 key={index}
			 	 content={item} 
			 	 index={index} 
			 	 handleDelete={this.handleDelete}
			 	/>
			 )
			
		})
	}
	render(){ 
		console.log('App render..页面刷新或者state或者props发生变化，父组件render会执行')
		return (
			<div className='box'>
				<input onChange={this.handleChange} value={this.state.value}/>
				<button onClick={this.handleAdd}>添加</button>
				<ul>
						{  
							this.getItems()
						}
				</ul>
				
			</div>
			
		)
	}
};

export default App;