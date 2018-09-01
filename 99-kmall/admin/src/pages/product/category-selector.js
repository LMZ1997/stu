import React,{Component} from 'react'
import { Select } from 'antd';
const Option = Select.Option;
import { request } from 'util'
import {GET_CATEGORY} from 'api'


class CategorySelector extends Component{
	constructor(props){
		super(props);
		this.state={
			levelOneCategory:[],
			levelOneCategoryId:this.props.ParentCategoryId,
			levelTwoCategory:[],
			levelTwoCategoryId:this.props.categoryId
		}
		this.handleLevelOneCategory=this.handleLevelOneCategory.bind(this)
		this.handleLevelTwoCategory=this.handleLevelTwoCategory.bind(this)
		this.handleLevelOneChange=this.handleLevelOneChange.bind(this)
		this.handleLevelTwoChange=this.handleLevelTwoChange.bind(this)
	}
	getDerivedStateFromProps(){
		if(this.state.ParentCategoryId==0){
			this.setState({
				levelOneCategoryId:this.props.categoryId,
				levelTwoCategoryId:''
			})
		}
		else{
			
		}
	}
	componentDidMount(){
		this.handleLevelOneCategory()
	}
	handleLevelOneCategory(){//初始化页面获取分类
		request({
			method:'get',
			url:GET_CATEGORY,
			data:{
				pid:0
			}
		})
		.then(result=>{
			if(result.code==0){
				this.setState({
					levelOneCategory:result.data,
				})
			}
		})
	}
	handleLevelTwoCategory(){
		request({
			method:'get',
			url:GET_CATEGORY,
			data:{
				pid:this.state.levelOneCategoryId
			}
		})
		.then(result=>{
			if(result.code==0){
				this.setState({
					levelTwoCategory:result.data,
				})
			}
		})
	}
	handleLevelOneChange(value){//触发一级分类change事件，获取对应子分类，value是antd封装的参数，表示对应option的value或key值
		this.setState({
			levelOneCategoryId:value,
			levelTwoCategory:[],
			levelTwoCategoryId:''
		},()=>{
			this.handleLevelTwoCategory()
			this.onChangeId()                //调用函数向父组件传递参数Id
		}) 
	}
	handleLevelTwoChange(value){//传递id，主要是为了父组件到时提交时有对应的id,在此组件并无用处
		this.setState({
			levelTwoCategoryId:value
		},()=>{
			this.onChangeId()               //调用函数向父组件传递参数Id
		})
	}
	onChangeId(){
		const {levelOneCategoryId,levelTwoCategoryId}=this.state;
		if(levelTwoCategoryId){
			this.props.getCategoryId(levelOneCategoryId,levelTwoCategoryId)
		}
		else{
			this.props.getCategoryId(0,levelOneCategoryId)
		}
	}
	render(){                 //简化调用this.state中的值
		 const { levelOneCategory,levelOneCategoryId,levelTwoCategory,levelTwoCategoryId } = this.state
		 const levelOneOptions = levelOneCategory.map(category => <Option key={category._id} value={category._id}>{category.name}</Option>);
   		 const levelTwoOptions = levelTwoCategory.map(category => <Option key={category._id} value={category._id}>{category.name}</Option>);
		return(
			<div>
		        <Select 
		        style={{ width: 300,marginRight:10 }} 
		        onChange={this.handleLevelOneChange}
		        >
		          {levelOneOptions}
		        </Select>
		        {		//如果二级分类有数据则显示select框，否则不显示
		        	levelTwoCategory.length
		        	? <Select 
				        defaultValue={levelTwoCategoryId}//切换一级菜单时，将levelTwoCategoryId置空，可以使此处原来的值消失
				        value={levelTwoCategoryId}  //当选择二级菜单时，可以使此处显示对应分类
				        style={{ width: 300 }} 
				        onChange={this.handleLevelTwoChange}
				        >
				          {levelTwoOptions}
				       </Select>
				     :null

		        }
		       
		    </div>
		)
	}
}

export default CategorySelector;