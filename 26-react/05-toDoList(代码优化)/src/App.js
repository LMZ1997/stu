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
		/*
		this.setState({
			list:[...this.state.list,this.state.value],
			value:''
		})
		*/
		//演化第一步
		/*
		this.setState(()=>{
			return(
				{
					list:[...this.state.list,this.state.value],
					value:''
				}
			)
		})
		*/
		//演化第二步 因为需要ruturn的只有一句话，所以可以去掉{}和return
		/*
		this.setState(()=>(
			{
				list:[...this.state.list,this.state.value],
				value:''
			}
		))
		*/
		//演化第三步  preState是set操作state之前的数据 preState==this.state
		this.setState((preState)=>(
			{
				list:[...preState.list,preState.value],
				value:''
			}
		))

	}
	handleChange(ev){
		
		// this.setState({
		// 	value:ev.target.value
		// })
		
		const value=ev.target.value;
		this.setState(()=>(
			// value:ev.target.value  回调函数里ev不可用，所以把value先定义在外边
			// value:value赋值与被赋值命名相同可简写
			value
		))
	}
	handleDelete(index){//index由bind传递进来
		
		
		// const list=[...this.state.list];
		// list.splice(index,1);
		// // console.log(list)//list是经过截取后剩下的值
		// this.setState({
		// 	list:list
		// })

		
		this.setState((preState)=>{
			const list=[...preState.list];
			list.splice(index,1);
			return (
				// list:list
				list
			)
		})
	}
	//必须有一个render(){}
	render(){ //return只能返回一个标签
		return (
			/*	
			<Fragment>此标签在前端并不会显示
				<input/>
				<button>添加</button>
			</Fragment>
			*/

			/*加样式类需要写className*/
			<div className='box'>
				<input onChange={this.handleChange} value={this.state.value}/>
				<button onClick={this.handleAdd}>添加</button>
				<ul>
						{  this.state.list.map((item,index)=>{
								 return (
								 	 //(content)属性名自己定义,在Item组件中呼应
								 	<Item
								 	 key={index} //无实质作用，只为解决warning问题
								 	 content={item} 
								 	 index={index} 
								 	 handleDelete={this.handleDelete}
								 	/>
								 )
								
							})
						}
				</ul>
				
			</div>
			
		)
	}
};

export default App;