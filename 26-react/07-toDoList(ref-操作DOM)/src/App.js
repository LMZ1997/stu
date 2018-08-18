import React,{Component,Fragment} from 'react';

import './App.css'
import Item from './Item'


class App extends Component{
	constructor(props){
		super(props);

		this.state={
			value:'',
			list:['点添加看console','点我可删除']
		}
		this.handleChange=this.handleChange.bind(this)
		this.handleAdd=this.handleAdd.bind(this)
		this.handleDelete=this.handleDelete.bind(this)
	}
	handleAdd(){
		this.setState((preState)=>(//异步方法
			{
				list:[...preState.list,preState.value],
				value:''
			}
		),()=>{//写在回调函数里才能获取到刚Add添加进去的li
			console.log(this.ul.querySelectorAll('li'))
		})

	}
	handleChange(ev){

		// const value=ev.target.value;
		const value=this.input.value
		this.setState(()=>(
			{
				value
			}
		))
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
		return (
			<div className='box'>
				<input 
					onChange={this.handleChange} 
					value={this.state.value} 
					ref={(input)=>{
						// console.log(input)
						this.input=input;//把input的Dom节点绑定到this对象上
					}}
				/>
				<button onClick={this.handleAdd}>添加</button>
				<ul ref={(ul)=>{this.ul=ul}}>
						{  
							this.getItems()
						}
				</ul>
				
			</div>
			
		)
	}
};

export default App;