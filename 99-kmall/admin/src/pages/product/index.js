import React,{ Component } from 'react'
import { 
	BrowserRouter as Router,
	// HashRouter as Router,
	Route,
	Switch
} from 'react-router-dom'

import ProductSave from './save.js'
import ProductList from './list.js'

class Product extends Component{
	render(){
		return(
			<div>
				<Switch>
					<Route  path='/product/save' component={ ProductSave } />
					<Route  path='/product' component={ ProductList } />
				</Switch>
			</div>
		)
	}

}
export default Product;