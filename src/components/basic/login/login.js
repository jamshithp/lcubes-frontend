import React from "react";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Button, Modal, Divider } from 'antd';
import './login.css';
import { connect } from 'react-redux';
import { login, logout } from '../../../actions/loginAction';
import Alert from '../../common/alert';
import { Redirect } from 'react-router-dom';
import apis from '../../../services/Apis';
import Register from '../../forms/registration';
import { SecurePost } from '../../../services/axiosCall';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isLoggedIn :false,
        }
    }
    state = { visible: false,
    client:'' };

    showModal = () => {
        this.setState({
          visible: true,
          client:'institute'
        });
      };

      showModal2 = () => {
          this.setState({
            visible: true,
            client:'student'
          });
        };

      handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const data = {
                    email:values.email,
                    password:values.password
                };
                console.log('Received values of form: ', values);
                SecurePost({
                    url : `${apis.LOGIN}`,
                    data:data
                }).then((response)=>{
                    console.log(response);
                    if(response.data.message === "Success"){
                        this.props.login(response.data.data)
                        this.setState({
                            isLoggedIn : true
                        })
                    }
                    else{
                        return Alert('error','Error!',response.data.message);
                    }
                }).catch((error)=>{
                    console.log(error);
                    return Alert('error','Error!','Server Error');
                })
            }
        });
    };


    render(){
        const { getFieldDecorator } = this.props.form;
        if(this.state.isLoggedIn){
            return <Redirect to={this.props.user.userOptions[0].link} />
        }
        else{
            return (
                <div className="login-container">
                    <div className="login-inner">
                        <Form  onSubmit={this.handleSubmit}>
                            <Form.Item label="Email" hasFeedback>
                                {getFieldDecorator('email', {
                                    rules: [
                                        {
                                            type: 'email',
                                            message: 'The input is not valid E-mail!',
                                        },
                                        {
                                            required: true,
                                            message: 'Please input your E-mail!',
                                        },
                                    ],
                                })(<Input
                                    prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username"/>)}
                            </Form.Item>
                            <Form.Item label="Password" hasFeedback>
                                {getFieldDecorator('password', {
                                    rules: [
                                        {
                                            required: true, message: 'Please input your Password!'
                                        }
                                    ],
                                })(
                                    <Input
                                    prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" block>
                                    Login
                                </Button>
                            </Form.Item>
                            <Divider>New Registration</Divider>
                            <div className="button-container">
                                <Button type="defalut" block value='institute' onClick={this.showModal}>
                                Register as Institute
                                </Button>
                                <Button type="defalut" value='student' block onClick={this.showModal2}>
                                Register as Student
                                </Button>
                            </div>
                            <Modal
                              visible={this.state.visible}
                              onCancel={this.handleCancel}
                              cancelButtonProps={{ style: { display: 'none' } }}
                              okButtonProps={{ style: { display: 'none' } }}
                            >
                              <Register client={this.state.client}/>
                            </Modal>
                        </Form>
                    </div>
                </div>
            );
        }
    }

}

const LoginForm = Form.create({ name: 'login' })(Login);


const mapStateToProps = state => ({
    user : state.user
});

export default connect(mapStateToProps,{
    login,
    logout
})(LoginForm);
