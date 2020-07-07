import React, { Component } from 'react'
import './newCourse.css';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Button,Select} from 'antd';
import { connect } from 'react-redux';
import {SecurePost} from '../../../services/axiosCall';
import apis from '../../../services/Apis';
import Alert from '../../common/alert';
import { 
    ChangeSubjectConfirmDirty,
    ChangeSubjectTableData,
    ChangeSubjectModalState
} from '../../../actions/adminAction';
import { ChangeCourseTableData } from '../../../actions/trainerAction';


class NewTopics extends Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                SecurePost({
                    url : `${apis.ADD_COURSE}`,
                    data : {
                        courseName : values.courseName,
                        courseType:values.courseType,
                        courseDescription:values.courseDescription,
                    }
                }).then((response)=>{
                    if(response.data.message ==="Success"){
                        if(this.props.user.userDetails.category === "Institution") {
                            const instituationId = this.props.userDetails.institution.id;
                            console.log("courseId",response.data.courseId)
                            SecurePost({
                                url : `${apis.ADD_COURSE_DETAILS}`,
                                data : {
                                    courseList : [response.data.data.courseId],
                                    institutionId : instituationId,
                                }
                            }).then((response)=>{
                                if(response.data.message ==="Success"){
                                    Alert('success','Success',response.data.message);
                                    this.props.ChangeCourseTableData(instituationId);
                                    this.props.ChangeSubjectModalState(false);
                                }
                                else{
                                    this.props.ChangeSubjectModalState(false);
                                    return Alert('warning','Warning!',response.data.message);
                                }
                            }).catch((error)=>{
                                this.props.ChangeSubjectModalState(false);
                                return Alert('error','Error!','Server Error');
                            })
                        }
                        else {
                            this.props.ChangeSubjectModalState(false,null,'New Topic');
                            Alert('success','Success',response.data.message);
                            this.props.ChangeSubjectTableData();
                        }
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

    handleMenuClick =(e,type) => {
        this.setState({[type]:e.key});
      }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { Option } = Select;
        const IsAdmin =  this.props.user.userDetails.category === "Institution" ? false : true;
        const CourseNameSet = new Set();
        this.props.admin.subjectTableData.map(course => {
        CourseNameSet.add(course.courseName);
        });

        return (
            <div className="register-subject-form" >
                <div className="register-trainer-form-body">
                    <Form  onSubmit={this.handleSubmit}>
                        <Form.Item label="Course Name" hasFeedback className="input-admin-trainer">
                            { getFieldDecorator('courseName', {
                                initialValue : this.props.admin.subjectDetails.courseName,
                                rules: [{ required: true, message: 'Please input course name!', whitespace: true }],
                            })(IsAdmin ? <Input /> :
                                <Select
                                    showSearch
                                    style={{ width:'100%'}}
                                    placeholder="Select a Course"
                                    optionFilterProp="s"
                                >
                                    {
                                        [...CourseNameSet].map((d,i)=><Option key={d._id} s={d} value={d}>{d}</Option>)
                                    }
                                </Select>
                                )
                            }
                        </Form.Item>
                        <Form.Item label="Course Type" hasFeedback className="input-admin-trainer">
                            {getFieldDecorator('courseType', {
                                initialValue : this.props.admin.subjectDetails.courseType,
                                rules: [{ required: true, message: 'Please input Course Type!', whitespace: true }],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="Course Description" hasFeedback className="input-admin-trainer">
                            {getFieldDecorator('courseDescription', {
                                initialValue : this.props.admin.subjectDetails.courseDescription,
                                rules: [{ required: true, message: 'Please input Course Description!', whitespace: true }],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                {this.props.admin.Subjectmode}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    admin : state.admin,
    user:state.user,
    userDetails:state.user.userDetails,
});



const NewSubjectForm = Form.create({ name: 'register' })(NewTopics);

export default connect(mapStateToProps,{
    ChangeSubjectConfirmDirty,
    ChangeSubjectTableData,
    ChangeSubjectModalState,
    ChangeCourseTableData,
})(NewSubjectForm);

