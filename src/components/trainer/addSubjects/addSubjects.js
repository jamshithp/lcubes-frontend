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
            console.log("values",values);
            if (!err) {
                console.log('Received values of form: ', values);
                const CreateSubject = this.props.trainer.Subjectmode ==='New Topic' ,
                    url = CreateSubject? apis.ADD_CATEGORY : apis.UPDATE_CATEGORY,
                    mainCourseId =  this.props.admin.courseTableData.find(d=>d.name = values.mainCourseName).id;
                SecurePost({
                    url : `http://54.160.111.123:9091${url}`,
                    data : {
                        subject:values.subject,
                        module:values.module,
                        chapter:values.chapter,
                        mainCourseId:mainCourseId,
                        id:this.props.trainer.SubjectDetails.id,
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
        const { Option } = Select;
        const mainCourse = this.props.admin.courseTableData.find(d=>d.id = this.props.trainer.SubjectDetails.mainCourseId),
        mainCourseName = mainCourse ? mainCourse.name : "";

        return (
            <div className="register-subject-form" >
                <div className="register-trainer-form-body">
                    <Form  onSubmit={this.handleSubmit}>
                        <Form.Item label="Main Course Name" hasFeedback className="input-admin-trainer">
                            { getFieldDecorator('mainCourseName', {
                                initialValue :   mainCourseName,
                                rules: [{ required: true, message: 'Please select a  main course!', whitespace: true }],
                            })(
                                <Select
                                    showSearch
                                    style={{ width:'100%'}}
                                    placeholder="Select a Main Course"
                                    optionFilterProp="s"
                                >
                                    {
                                        this.props.admin.courseTableData.map((d,i)=><Option key={d._id} s={d} value={d.name}>{d.name}</Option>)
                                    }
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label="Subject Name" hasFeedback className="input-admin-trainer">
                            { getFieldDecorator('subject', {
                                initialValue : this.props.trainer.SubjectDetails.subject,
                                rules: [{ required: true, message: 'Please input Subject name!', whitespace: true }],
                            })(<Input />)
                            }
                        </Form.Item>
                        <Form.Item label="Module" hasFeedback className="input-admin-trainer">
                            {getFieldDecorator('module', {
                                initialValue : this.props.trainer.SubjectDetails.module,
                                rules: [{ required: true, message: 'Please input Module!', whitespace: true }],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="Chapter" hasFeedback className="input-admin-trainer">
                            {getFieldDecorator('chapter', {
                                initialValue : this.props.trainer.SubjectDetails.chapter,
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
    admin:state.admin,
    userDetails:state.user.userDetails,
});



const NewSubjectForm = Form.create({ name: 'register' })(NewTopics);

export default connect(mapStateToProps,{
    ChangeSubjectTableData,
    ChangeSubjectModalState,
})(NewSubjectForm);

