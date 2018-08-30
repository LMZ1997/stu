import React,{ Component } from 'react'
import Layout from 'common/layout'
import { Form, Input,Select,Button,InputNumber} from 'antd'
const FormItem = Form.Item;
const Option = Select.Option;
import {connect} from 'react-redux'
import { actionCreators } from './store'
import CategorySelector from './category-selector.js'

import uploadImage from 'common/upload-image'


class NormalProductSave extends Component{
   constructor(props){
		super(props)
		this.handleSubmit=this.handleSubmit.bind(this)
   }
   componentDidMount(){
   		this.props.getCategories()
   }
   handleSubmit(e){
	    e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	      if (!err) {
	      	this.props.handleAdd(values);
	      }
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
				          {getFieldDecorator('description', {
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
				          {getFieldDecorator('description', {
				            rules: [{
				              required: true, message: '请输入商品库存!',
				            }],
				          })(
				            <InputNumber 
				            	
				            />
				          )}
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="所属分类"
				        >
				          <CategorySelector                      //注意传递写法 {  }
				          		getCategoryId={(pid,id)=>{       //为了从子组件向父组件传递值
				          			console.log(pid,id)
				          		}}
				          />
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="商品图片"
				        >
				         <uploadImage 

				         />
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="商品详情"
				        >
				          {getFieldDecorator('description', {
				            rules: [{
				              required: true, message: '请输入商品详情!',
				            }],
				          })(
				            <Input 
				            	placeholder='商品详情'
				            />
				          )}
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
		isAddFetching:state.get('category').get('isAddFetching'),
		categories:state.get('category').get('categories')
	}
}
const mapDispatchToProps=(dispatch)=>{
	return {
		handleAdd:(values)=>{
			const action=actionCreators.addCategoryAction(values);
			dispatch(action)
		},
		getCategories:()=>{
			dispatch(actionCreators.getAddCategoriesAction())
		}
	}
}

const ProductSave= Form.create()(NormalProductSave)
export default connect(mapStateToProps,mapDispatchToProps)(ProductSave);
