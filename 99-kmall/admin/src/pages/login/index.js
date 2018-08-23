import React,{ Component } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';

const FormItem = Form.Item;
/*
class Login extends Component{
	render(){
		return(

		)
	}
}
*/
class NormalLoginForm extends React.Component {
	constructor(props){
		super(props)
		this.handleSubmit=this.handleSubmit.bind(this)
	}
  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" onClick={this.handleSubmit} className="login-form-button">
           登录
          </Button>
        </FormItem>
      </Form>
    );
  }
}

// export default Login;
export default  Form.create()(NormalLoginForm);