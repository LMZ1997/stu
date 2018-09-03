import React,{ Component } from 'react'
import Layout from 'common/layout'
import { Form, Input,Select,Button,InputNumber} from 'antd'

const FormItem = Form.Item;
const Option = Select.Option;

import {connect} from 'react-redux'
import { actionCreators } from './store'
import CategorySelector from './category-selector.js'

import UploadImage from 'common/upload-image'
import RichEditor from 'common/rich-editor'
import './detail.css'
import {UPLOAD_PRODUCT_IMAGE,UPLOAD_PRODUCT_DETAIL_IMAGE} from 'api'


class NormalProductDetail extends Component{
   constructor(props){
		super(props)
		this.handleSubmit=this.handleSubmit.bind(this)
   }
   componentDidMount(){
   		if(this.props.match.params.productId){
   			this.props.handleProductDetail(this.props.match.params.productId)
   		}
   }
   handleSubmit(e){
	    e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	      	if(this.props.match.params.productId){
	      		values.id=this.props.match.params.productId
	      	}
	      	this.props.handleSave(err,values);
	    });
   }
	render(){
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
	      labelCol: {
	        xs: { span: 24 },
	        sm: { span: 2 },
	      },
	      wrapperCol: {
	        xs: { span: 24 },
	        sm: { span: 22 },
	      },
	    };
	    const tailFormItemLayout = {
	      wrapperCol: {
	        xs: {
	          span: 24,
	          offset: 0,
	        },
	        sm: {
	          span: 16,
	          offset: 8,
	        },
	      },
	    };

		let fileList=[];
		if(this.props.imagePath){
			fileList=this.props.imagePath.split(',').map((img,index)=>(
				<li>
					<img src={img} key={index} />
				</li>
			))
		}
		return(
			<Layout>
			  <div >
				<Form>
					<FormItem
			          {...formItemLayout}
			          label="商品名称"
			        >
			          {getFieldDecorator('name', {
			            rules: [{
			              required: true, message: '请输入商品名称!',
			            }],
			            initialValue:this.props.name,
			          })(
			            <Input 
			            	placeholder='商品名称'
			            	disabled={true}
			            />
			          )}
			        </FormItem>
			        <FormItem
			          {...formItemLayout}
			          label="商品描述"
			        >
			          {getFieldDecorator('description', {
			            rules: [{
			              required: true, message: '请输入商品描述!',
			            }],
			            initialValue:this.props.description,
			          })(
			            <Input 
			            	placeholder='商品描述'
			            	disabled={true}
			            />
			          )}
			        </FormItem>
			        <FormItem
			          {...formItemLayout}
			          label="商品价格"
			        >
			          {getFieldDecorator('price', {
			            rules: [{
			              required: true, message: '请输入商品价格!',
			            }],
			            initialValue:this.props.price,
			          })(
			            <InputNumber 
			            	formatter={value => `${value}元`}
			            	parser={value => value.replace('元', '')}
			            	disabled={true}
			            />
			          )}
			        </FormItem>
			        <FormItem
			          {...formItemLayout}
			          label="商品库存"
			        >
			          {getFieldDecorator('stock', {
			            rules: [{
			              required: true, message: '请输入商品库存!',
			            }],
			            initialValue:this.props.stock,
			          })(
			            <InputNumber 
			            	formatter={value => `${value}件`}
			            	parser={value => value.replace('件', '')}
			            	disabled={true}
			            />
			          )}
			        </FormItem>
			        <FormItem              //自行填写验证规则
			          {...formItemLayout}
			          required={true}
			          validateStatus={this.props.categoryId_validateStatus}
			          help={this.props.categoryId_help}
			          label="所属分类"
			        >
			        </FormItem>
			        <FormItem
			          {...formItemLayout}
			          label="商品图片"
			        >  
			       		<ul className='img-box'>
			        		{fileList}
			        	</ul>
			        </FormItem>
			        <FormItem
			          {...formItemLayout}
			          label="商品详情"       //下边这个很叼
			        >
			        <div dangerouslySetInnerHTML={{__html:this.props.detailValue}}></div>
			        </FormItem>
				</Form>
			  </div>
			</Layout>
		)
	}
}
const mapStateToProps=(state)=>{
	return{
		isAddFetching:state.get('product').get('isAddFetching'),
		categories:state.get('product').get('categories'),
		categoryId_validateStatus:state.get('product').get('categoryId_validateStatus'),
		categoryId_help:state.get('product').get('categoryId_help'),

		name:state.get('product').get('name'),
		description:state.get('product').get('description'),
		price:state.get('product').get('price'),
		stock:state.get('product').get('stock'),
		parentCategoryId:state.get('product').get('parentCategoryId'),
		categoryId:state.get('product').get('categoryId'),
		imagePath:state.get('product').get('imagePath'),
		detailValue:state.get('product').get('detailValue'),
	}
}

const mapDispatchToProps=(dispatch)=>{
	return {
		handleProductDetail:(productId)=>{
			dispatch(actionCreators.getProductDetail(productId))
		}
	}
}
const ProductDetail= Form.create()(NormalProductDetail)
export default connect(mapStateToProps,mapDispatchToProps)(ProductDetail)