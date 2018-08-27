import React,{ Component } from 'react'
import Layout from 'common/layout'
import { Form, Input,Select,Button} from 'antd'
import {connect} from 'react-redux'
import { actionCreators } from './store'


const FormItem = Form.Item;
const Option = Select.Option;

class NormalCategoryAdd extends Component{
   constructor(props){
		super(props)
		this.handleSubmit=this.handleSubmit.bind(this)
   }
   componentDidMount(){
   		this.props.getCateName()
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
	        sm: { span: 8 },
	      },
	      wrapperCol: {
	        xs: { span: 24 },
	        sm: { span: 16 },
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
		console.log('addCate:::',this.props.name)
		var html='';
		for(var i=0;i<this.props.name.length;i++){
	      	html+='<Option value=i>name[i]</Option>'
	      }
		return(
			<Layout>
				<div>
					<Form>
						<FormItem
				          {...formItemLayout}
				          label="分类名称"
				        >
				          {getFieldDecorator('name', {
				            rules: [{
				              required: true, message: '请输入分类名称!',
				            }],
				          })(
				            <Input />
				          )}
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="所属分类"
				        >
				          {getFieldDecorator('pid', {
				            rules: [{
				              required: true, message: '请选择父级分类!',
				            }],
				          })(		//defaultValue被替代
				             <Select initialValue="0" style={{ width: 120 }}>
						      <Option value="0">根分类</Option>
						    </Select>

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
		name:state.get('category').get('name')
	}
}
const mapDispatchToProps=(dispatch)=>{
	return {
		handleAdd:(values)=>{
			const action=actionCreators.addCategoryAction(values);
			dispatch(action)
		},
		getCateName:()=>{
			dispatch(actionCreators.getCateNameAction())
		}
	}
}


const CategoryAdd= Form.create()(NormalCategoryAdd)
export default connect(mapStateToProps,mapDispatchToProps)(CategoryAdd);