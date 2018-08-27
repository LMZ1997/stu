import React,{ Component } from 'react'
import Layout from 'common/layout'
import {Link} from 'react-router-dom'

class CategoryList extends Component{
	render(){
		return(
			<Layout>
				<div>
					<Link to='/category/add' >新增分类</Link>
				</div>
			</Layout>
		)
	}
}


export default CategoryList;