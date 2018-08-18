import React,{Component} from 'react'
import PropTypes from 'prop-types'


class Item extends Component{
	constructor(props){

		super(props);
		this.handleRemove = this.handleRemove.bind(this)
	}
	static getDerivedStateFromProps(nextProps, prevState){
		console.log('Item getDerivedStateFromProps...',nextProps, prevState);
		
	}
	shouldComponentUpdate(nextProps, nextState){
		console.log('Item shouldComponentUpdate...',nextProps, nextState);
		// return false;
		return true
	}
	getSnapshotBeforeUpdate(prevProps, prevState){//尽量与componentDidUpdate配套使用
		console.log('Item getSnapshotBeforeUpdate...',prevProps, prevState);
		return 'LMZ--snapshot';
	}
	componentDidUpdate(prevProps, prevState,snapshot){
		console.log('Item componentDidUpdate...',prevProps, prevState,snapshot)
	}
	componentDidMount(){
		console.log('Item componentDidMount...挂载结束(只在第一次显示页面时会触发)');
	}
	componentWillUnmount(){//deleteu（或者之前的数据被覆盖(相当于删除)）之前会触发此函数
		console.log('Item componentWillUnmount...')
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