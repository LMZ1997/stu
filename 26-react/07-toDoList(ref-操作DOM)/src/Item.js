import React,{Component} from 'react'
import PropTypes from 'prop-types'


class Item extends Component{
	constructor(props){

		super(props);
		this.handleRemove = this.handleRemove.bind(this)
	}

	handleRemove(){
		const { handleDelete,index } = this.props;
		handleDelete(index)
	} 
	render(){
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