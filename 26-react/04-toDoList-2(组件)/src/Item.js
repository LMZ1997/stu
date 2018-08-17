import React,{Component} from 'react'

class Item extends Component{
	handleRemove(){
		console.log(this)
		this.props.handleDelete(this.props.index)//通过传递过来的父组件的方法，执行它，改变父组件内的数据
	}
	render(){
		return ( //this.props由React提供，用来完成组件间信息传递
		 
			<li onClick={this.handleRemove.bind(this)}>
				{this.props.content}
		 	</li>
		)
	}
}

export default Item;