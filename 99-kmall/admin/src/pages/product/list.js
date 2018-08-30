import React,{ Component } from 'react'
import Layout from 'common/layout'
import { Link } from 'react-router-dom'

class ProductList extends Component{
	render(){
		return(
			<Layout>
				<Link to='/product/save'>add</Link>
			</Layout>
		)
	}

}
export default ProductList;