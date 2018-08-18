import React,{Component} from 'react'

class Item extends Component{
	constructor(props){
		super(props);
		this.handleRemove = this.handleRemove.bind(this)
	}

	handleRemove(){
		console.log('2::',this)
		// this.props.handleDelete(this.props.index)被替代
		const { handleDelete,index } = this.props;
		handleDelete(index)     //通过传递过来的父组件的方法，执行它，改变父组件内的数据
	}
	render(){
		
		const { content } = this.props;

		return ( //this.props由React提供，用来完成组件间信息传递
			<li onClick={this.handleRemove}>
				{/*this.props.*/content}
		 	</li>
		)
	}
}

export default Item;