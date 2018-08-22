import React,{Component} from 'react'
import PropTypes from 'prop-types'


class Item extends Component{
	constructor(props){

		super(props);
		this.handleRemove = this.handleRemove.bind(this)
	}

	shouldComponentUpdate(nextProps, nextState){//只有父组件的content发生改变才让其运行，避免一味的父组件render,子组件也render
		console.log('Item shouldComponentUpdate...1',nextProps, nextState);
		console.log('Item shouldComponentUpdate...2',this.props)
		if(nextProps.content!=this.props.content){
			return true
		}
		else{
			return false
		}
		
	}
	handleRemove(){
		const { handleDelete,index } = this.props;
		handleDelete(index)
	} 
	render(){
		console.log('Item render...')
		const { content } = this.props

		return ( 
			<li onClick={this.handleRemove}>
				{this.props.test+'——'}{content}
		 	</li>
		)
	}
}

Item.propTypes={//注意小写
	index:PropTypes.number,
	content:PropTypes.string.isRequired,
	handleDelete:PropTypes.func.isRequired,//func为function的简写
	test:PropTypes.string
}
Item.defaultProps={//默认参数，如果没有传递，则调用默认
	test:'test'
}


export default Item;