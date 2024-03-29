import React, { Component } from 'react';
import { EditOutlined, FileTextOutlined, SearchOutlined,PlusCircleOutlined } from '@ant-design/icons';
import { Table, Input, Button, Typography, Modal } from 'antd';
import Highlighter from 'react-highlight-words';
import { connect } from 'react-redux';
import { 
    ChangeSubjectSearchText,
    ChangeAdminCourseTableData,
} from '../../../actions/adminAction';
import {
  ChangeCourseSearchText,
  ChangeCourseTableData,
  ChangeCourseModalState,
  getAllCourseData,
} from '../../../actions/trainerAction';
import './allCourses.css'
import NewCourseForm from '../newCourse/newCourse.js';
import AddCourseForm from '../../trainer/addCourses/addCourses';




class AllCourses extends Component {

  constructor(props){
    super(props);
    this.state={
      IsCreate :false,
    }
  }

  openModal = (id,mode,IsCreate)=>{
    this.props.ChangeCourseModalState(true);
    this.setState({IsCreate:IsCreate});
  }
  
  closeModal = (IsCreate)=>{
    this.props.ChangeCourseModalState(false);
  }


  componentDidMount(){
    const {user} = this.props;
    user.userDetails.category === "Institution" &&
    this.props.ChangeCourseTableData(user.userDetails.institution.id);
    this.props.getAllCourseData();
    this.props.ChangeAdminCourseTableData();
  }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => {
                this.searchInput = node;
              }}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button
              type="primary"
              onClick={() => this.handleSearch(selectedKeys, confirm)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              Search
            </Button>
            <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </div>
        ),
        filterIcon: filtered => (
          <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
          record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => this.searchInput.select());
          }
        },
        render: text => (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[this.props.admin.SubjectsearchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ),
      });
    
      handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.props.ChangeSubjectSearchText(selectedKeys[0])
      };
    
      handleReset = clearFilters => {
        clearFilters();
        this.props.ChangeSubjectSearchText('')
      };

    render() {
      const { Title } = Typography;
      console.log("CourseTableData in",this.props.trainer)
      const dataSource = this.props.trainer.CourseTableData && this.props.trainer.CourseTableData.filter(
        course=>course.course).map(course=>{
          return course.course;
      });
      const columns = [
        {
          title: 'Course ID',
          dataIndex: 'courseId',
          key: 'courseId',
          width: '5%',
          ...this.getColumnSearchProps('courseId'),
        },
        {
          title: 'Main Course',
          dataIndex: 'mainCourse',
          key: 'mainCourse',
          width: '25%',
          render: (mainCourse) => (
            <span>
              {mainCourse && mainCourse.name}
            </span>
          ),
          //...this.getColumnSearchProps('mainCourse'),
        },
        {
          title: 'Sub Course Name',
          dataIndex: 'courseName',
          key: 'courseName',
          width: '25%',
          ...this.getColumnSearchProps('courseName'),
        },
        {
          title: 'Course Description',
          dataIndex: 'courseDescription',
          key: 'courseDescription',
          width: '40%',
          ...this.getColumnSearchProps('courseDescription'),
        },
        // {
        //   title: 'Action',
        //   key: '_id',
        //   dataIndex: '_id',
        //   render: (key) => (
        //     <span>
        //       <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={()=>this.openModal(key,'Save Changes')}/>
        //     </span>
        //   ),
        // },
      ];
        return (
          <div className="admin-table-container">
            <Button type="primary" icon={<PlusCircleOutlined/>} style={{marginBottom:'10px',marginRight:'10px'}} onClick={()=>this.openModal(null,'New Topic',false)}>
              Add Course
            </Button>
            <Button type="primary" icon={<FileTextOutlined />} style={{marginBottom:'10px',marginRight:'10px'}} onClick={()=>this.openModal(null,'New Topic',true)}>
              Create Course
            </Button>
            <div className="register-trainer-form-header">
              <Title level={4} style={{color:'#fff',textAlign:'center'}}>List of Courses</Title>
            </div>
            <Table
              bordered={true}
              columns={columns}
              dataSource={dataSource}
              size="medium"
              pagination={{ pageSize: 10 }}
              loading={this.props.trainer.CourseTableLoading}
              rowKey="_id"
            />;
            <Modal
              visible={this.props.trainer.CoursemodalOpened}
              title={false}
              onOk={this.handleOk}
              onCancel={()=>this.closeModal(this.state.IsCreate)}
              style={{top :'20px',padding:'0px',backgroundColor:'rgb(155,175,190)'}}
              destroyOnClose={true}
              footer={[]}
            >
              {/*NewCourseForm is for adding new course and AddCourseForm is for selecting existing course by institiute  */}

             { this.state.IsCreate ? <NewCourseForm />:<AddCourseForm/>}
            </Modal>
          </div>
        );
    }
}

const mapStateToProps = state => ({
    user:state.user,
    admin : state.admin,
    trainer:state.trainer,
});

export default connect(mapStateToProps,{
    ChangeSubjectSearchText,
    getAllCourseData,
    ChangeCourseSearchText,
    ChangeCourseTableData,
    ChangeCourseModalState,
    ChangeAdminCourseTableData,

})(AllCourses);