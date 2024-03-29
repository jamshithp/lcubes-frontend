import React, { Component } from 'react'
import { Form } from '@ant-design/compatible';
import { Input, Button ,Dropdown ,Menu } from 'antd';
import { connect } from 'react-redux';
import {SecurePost} from '../../../services/axiosCall';
import apis from '../../../services/Apis';
import Alert from '../../../components/common/alert';
import {
    ChangeCourseTableData,
    ChangeCourseModalState
  } from '../../../actions/trainerAction';
import { DownOutlined } from '@ant-design/icons';


class NewCourse extends Component {
    constructor(props){
        super(props);
        this.state={
          SelectedCourse : 'Select a Course',
          SelectedType:'Select a type'
        }
      }

    handleSubmit = e => {
        e.preventDefault();
        const courseList = [this.props.trainer.AllCourse.find(course =>course.courseName === this.state.SelectedType).courseId];
        console.log("courseList",courseList)
        SecurePost({
            url : `${apis.ADD_COURSE_DETAILS}`,
            data : {
                courseList : courseList,
                institutionId : this.props.instituationId,
            }
        }).then((response)=>{
            if(response.data.message ==="Success"){
                Alert('success','Success',response.data.message);
                this.props.ChangeCourseTableData(this.props.instituationId);
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
    };

    handleMenuClick =(e,type) => {
      if(type === 'SelectedCourse') {
           const courseType =  this.props.trainer.AllCourse.find(course =>course.mainCourse.name === e.key).courseName;

            this.setState({SelectedType:courseType});
        }
        this.setState({[type]:e.key});
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const  { trainer } = this.props;
        const MainCourseSet = new Set();
        trainer.AllCourse.map(course => {
            MainCourseSet.add(course.mainCourse.name);
         });
         const CourseType = trainer.AllCourse.filter(course =>course.mainCourse.name === this.state.SelectedCourse).map(course =>
            course.courseName
        );
        const MainCourseName = [...MainCourseSet];
        console.log("MainCourseSet",MainCourseSet,"CourseType",CourseType)
        const courseList = (
            <Menu>
                {MainCourseName.map((course) => (
                    <Menu.Item key={course} onClick={(e)=>this.handleMenuClick(e,'SelectedCourse')}>
                        {course}
                    </Menu.Item>
                ))}
            </Menu>
          );
          const CourseTypeList = (
            <Menu>
                {CourseType.map((courseType) => (
                    <Menu.Item key={courseType} onClick={(e)=>this.handleMenuClick(e,'SelectedType')}>
                        {courseType}
                    </Menu.Item>
                ))}
            </Menu>
          );
        return (
            <div className="register-subject-form" >
                <div className="register-trainer-form-body">
                    <Form  onSubmit={this.handleSubmit}>
                        <Form.Item label="Main Course Name" hasFeedback className="input-admin-trainer">
                        <Dropdown.Button  overlay={courseList} icon={<DownOutlined />}>
                        {this.state.SelectedCourse}
                        </Dropdown.Button>
                        </Form.Item>
                        <Form.Item label="Sub Course Name" hasFeedback className="input-admin-trainer">
                        <Dropdown.Button  overlay={CourseTypeList} icon={<DownOutlined />}>
                        {this.state.SelectedType}
                        </Dropdown.Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                Add Course
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
    instituationId:state.user.userDetails.institution.id,
});



const AddCourseForm = Form.create({ name: 'register' })(NewCourse);

export default connect(mapStateToProps,{
    ChangeCourseTableData,
    ChangeCourseModalState
})(AddCourseForm);

