import React,{Component,Fragment} from 'react';

import './App.css'
import Item from './Item'

//必须继承React.Component首字母大写
class App extends Component{
	constructor(props){
		super(props);

		this.state={
			value:'',
			list:['输入内容点添加','点我可删除']
		}
		

	}
	handleAdd(){
		// console.log(this);
		this.setState({
			list:[...this.state.list,this.state.value],
			value:''
		})

	}
	handleChange(ev){
		// console.log(ev.target)
		// console.log(ev.target.value)
		this.setState({//setState是React提供的方法
			value:ev.target.value,
		})
	}
	handleDelete(index){//index由bind传递进来
		const list=[...this.state.list];
		list.splice(index,1);
		// console.log(list)//list是经过截取后剩下的值
		this.setState({
			list:list
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
				<input onChange={this.handleChange.bind(this)} value={this.state.value}/>
				<button onClick={this.handleAdd.bind(this)}>添加</button>
				<ul>
						{  this.state.list.map((item,index)=>{
								 return (
								 	 //(content)属性名自己定义,在Item组件中呼应
								 	<Item
								 	 key={index} //无实质作用，只为解决warning问题
								 	 content={item} 
								 	 index={index} 
								 	 handleDelete={this.handleDelete.bind(this)}
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