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
    ChangeAdminCourseTableData,
    ChangeAdminCourseModalState,
} from '../../../actions/adminAction';
import { ChangeCourseTableData,ChangeCourseModalState} from '../../../actions/trainerAction';


class NewTopics extends Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log("category",this.props.userDetails.category)
                if(this.props.userDetails.category === "Admin") {
                    const CreateCourse = this.props.admin.coursemode ==='New Topic' ,
                    url = CreateCourse? apis.ADD_MAIN_COURSE : apis.UPDATE_MAIN_COURSE;

                    SecurePost({
                        url : `http://54.160.111.123:9091${url}`,
                        data : {
                            name : values.courseName,
                            description:values.courseDescription,
                            id:this.props.admin.courseDetails.id,
                        }
                    }).then((response)=>{
                        if(response.data.message ==="Success"){
                        this.props.ChangeAdminCourseModalState(false,null,'New Topic');
                        Alert('success','Success',response.data.message);
                        this.props.ChangeAdminCourseTableData();
                        }
                        else{
                            this.props.ChangeAdminCourseModalState(false,null,'New Topic');
                            return Alert('warning','Warning!',response.data.message);
                        }
                    }).catch((error)=>{
                        this.props.ChangeAdminCourseModalState(false,null,'New Topic');
                        return Alert('error','Error!','Server Error');
                    });
                }
                else {
                    const instituationId = this.props.userDetails.institution.id,
                    mainCourseId = this.props.trainer.AllCourse.find(course => course.mainCourse.name === values.courseName).courseId;

                    SecurePost({
                        url : `${apis.ADD_COURSE}`,
                        data : {
                            courseName:values.courseType,
                            courseDescription:values.courseDescription,
                            mainCourse:{
                                id:mainCourseId,
                            },
                        }
                    }).then((response)=>{
                        if(response.data.message ==="Success"){
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
                                    this.props.ChangeCourseModalState(false);
                                }
                                else{
                                    this.props.ChangeCourseModalState(false);
                                    return Alert('warning','Warning!',response.data.message);
                                }
                            }).catch((error)=>{
                                this.props.ChangeCourseModalState(false);
                                return Alert('error','Error!','Server Error');
                            })
                        }
                        else{
                            this.props.ChangeCourseModalState(false,null,'New Topic');
                            return Alert('warning','Warning!',response.data.message);
                        }
                    }).catch((error)=>{
                        this.props.ChangeCourseModalState(false,null,'New Topic');
                        return Alert('error','Error!','Server Error');
                    });
                }
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
        this.props.trainer.AllCourse.map(course => {
        CourseNameSet.add(course.mainCourse.name);
        });

        return (
            <div className="register-subject-form" >
                <div className="register-trainer-form-body">
                    <Form  onSubmit={this.handleSubmit}>
                        <Form.Item label="Main Course Name" hasFeedback className="input-admin-trainer">
                            { getFieldDecorator('courseName', {
                                initialValue : this.props.admin.courseDetails.name,
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
                        {!IsAdmin && <Form.Item label="Course Type" hasFeedback className="input-admin-trainer">
                            {getFieldDecorator('courseType', {
                                initialValue : this.props.admin.courseDetails.courseType,
                                rules: [{ required: true, message: 'Please input Course Type!', whitespace: true }],
                            })(<Input />)}
                        </Form.Item>}
                        <Form.Item label="Course Description" hasFeedback className="input-admin-trainer">
                            {getFieldDecorator('courseDescription', {
                                initialValue : this.props.admin.courseDetails.description,
                                rules: [{ required: true, message: 'Please input Course Description!', whitespace: true }],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                {this.props.admin.coursemode}
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
    trainer:state.trainer,
    user:state.user,
    userDetails:state.user.userDetails,
});



const NewSubjectForm = Form.create({ name: 'register' })(NewTopics);

export default connect(mapStateToProps,{
    ChangeSubjectConfirmDirty,
    ChangeAdminCourseTableData,
    ChangeAdminCourseModalState,
    ChangeCourseTableData,
    ChangeCourseModalState,
})(NewSubjectForm);

