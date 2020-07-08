import React, { Component } from 'react'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Button,Select} from 'antd';
import { connect } from 'react-redux';
import {SecurePost} from '../../../services/axiosCall';
import apis from '../../../services/Apis';
import Alert from '../../common/alert';
import { 
    ChangeSubjectTableData,
    ChangeSubjectModalState
} from '../../../actions/trainerAction';

class NewTopics extends Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                SecurePost({
                    url : `${apis.ADD_COURSE}`,
                    data : {
                        subject:values.subject,
                        module:values.module,
                        chapter:values.chapter,
                    }
                }).then((response)=>{
                    if(response.data.message ==="Success"){
                        this.props.ChangeSubjectModalState(false,null,'New Topic');
                        Alert('success','Success',response.data.message);
                        this.props.ChangeSubjectTableData();
                    }
                    else{
                        this.props.ChangeSubjectModalState(false,null,'New Topic');
                        return Alert('warning','Warning!',response.data.message);
                    }
                }).catch((error)=>{
                    this.props.ChangeSubjectModalState(false,null,'New Topic');
                    return Alert('error','Error!','Server Error');
                })
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div className="register-subject-form" >
                <div className="register-trainer-form-body">
                    <Form  onSubmit={this.handleSubmit}>
                        <Form.Item label="Subject Name" hasFeedback className="input-admin-trainer">
                            { getFieldDecorator('subject', {
                                initialValue : this.props.trainer.SubjectTableData.subject,
                                rules: [{ required: true, message: 'Please input Subject name!', whitespace: true }],
                            })(<Input />)
                            }
                        </Form.Item>
                        <Form.Item label="Module" hasFeedback className="input-admin-trainer">
                            {getFieldDecorator('module', {
                                initialValue : this.props.trainer.SubjectTableData.module,
                                rules: [{ required: true, message: 'Please input Module!', whitespace: true }],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="Chapter" hasFeedback className="input-admin-trainer">
                            {getFieldDecorator('chapter', {
                                initialValue : this.props.trainer.SubjectTableData.chapter,
                                rules: [{ required: true, message: 'Please input Chapter!', whitespace: true }],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                {this.props.trainer.Subjectmode}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    trainer:state.trainer,
    user:state.user,
    userDetails:state.user.userDetails,
});



const NewSubjectForm = Form.create({ name: 'register' })(NewTopics);

export default connect(mapStateToProps,{
    ChangeSubjectTableData,
    ChangeSubjectModalState,
})(NewSubjectForm);

