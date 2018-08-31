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

import {UPLOAD_PRODUCT_IMAGE,UPLOAD_PRODUCT_DETAIL_IMAGE} from 'api'

class NormalProductSave extends Component{
   constructor(props){
		super(props)
		this.handleSubmit=this.handleSubmit.bind(this)
   }
   handleSubmit(e){
	    e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	      // if (!err) {                    //用于校验规则判断  

	      	// console.log(values)       //values中只包含antd原装插件的value,对于被改动的或自己封装的插件，获取不到value
	      	this.props.handleAdd(err,values);
	      // }
	    });
	}
	render(){
		const { getFieldDecorator } = this.props.form;//获取表单values的时候用到

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
				          })(
				            <Input 
				            	placeholder='商品名称'
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
				          })(
				            <Input 
				            	placeholder='商品描述'
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
				          })(
				            <InputNumber 
				            	
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
				          })(
				            <InputNumber 
				            	
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
				          <CategorySelector                      //注意传递写法 {  }
				          		getCategoryId={(parentCategoryId,categoryId)=>{  
				          			// console.log(parentCategoryId,categoryId)
				          			this.props.handleCategoryId(parentCategoryId,categoryId)
				          		}}
				          />
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="商品图片"
				        >
				         <UploadImage                        //组件名首字母必须大写
				         	max={3}						     //向组件传递参数max,接收用this.props.max
				         	action={UPLOAD_PRODUCT_IMAGE}    //传递参数action,接收用{this.props.action}
				        	getImageFilePath={(filePath)=>{
				        		this.props.handleImages(filePath)
				        	}}
				         />    
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="商品详情"
				        >
				          <RichEditor
				          	url={UPLOAD_PRODUCT_DETAIL_IMAGE}
				          	getRichEditorValue={(value)=>{
				          		this.props.handleEditorValue(value)
				          	}}
				          />

				        </FormItem>
				        <FormItem {...tailFormItemLayout}>
				          <Button 
				          type="primary"
				          onClick={this.handleSubmit}
				          loading={this.props.isAddFetching}
				          >
				          	提交
				          </Button>
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
		categoryId_help:state.get('product').get('categoryId_help')
	}
}
const mapDispatchToProps=(dispatch)=>{
	return {
		handleAdd:(values)=>{
			const action=actionCreators.addProductAction(values);
			dispatch(action)
		},
		handleCategoryId:(parentCategoryId,categoryId)=>{
			dispatch(actionCreators.getSetCategoryId(parentCategoryId,categoryId))
		},
		handleImages:(filePath)=>{
			dispatch(actionCreators.getSetImages(filePath))
		},
		handleEditorValue:(value)=>{
			dispatch(actionCreators.getSetEditorValue(value))
		}
	}
}

const ProductSave= Form.create()(NormalProductSave)
export default connect(mapStateToProps,mapDispatchToProps)(ProductSave);
