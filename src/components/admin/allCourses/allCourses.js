import React, { Component } from 'react';
import { EditOutlined, FileTextOutlined, SearchOutlined,PlusCircleOutlined } from '@ant-design/icons';
import { Table, Input, Button, Typography, Modal } from 'antd';
import Highlighter from 'react-highlight-words';
import { connect } from 'react-redux';
import { 
    ChangeSubjectSearchText,
    ChangeAdminCourseTableData,
    ChangeAdminCourseModalState
} from '../../../actions/adminAction';
import {
  ChangeCourseSearchText,
  ChangeCourseTableData,
  ChangeCourseModalState
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
    IsCreate ? this.props.ChangeAdminCourseModalState(true,id,mode):this.props.ChangeCourseModalState(true);
    this.setState({IsCreate:IsCreate});
  }
  
  closeModal = (IsCreate)=>{
    IsCreate ? this.props.ChangeAdminCourseModalState(false,null,'New Topic'):this.props.ChangeCourseModalState(false);
  }


  componentDidMount(){
    const {user} = this.props;
    user.userDetails.category === "Institution" &&
    this.props.ChangeCourseTableData(user.userDetails.institution.id);
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
      const IsAdmin =  this.props.user.userDetails.category === "Institution" ? false : true;
      const dataSource = IsAdmin?this.props.admin.courseTableData:this.props.trainer.CourseTableData.filter(
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
          title: 'Name',
          dataIndex: 'courseName',
          key: 'courseName',
          width: '25%',
          ...this.getColumnSearchProps('courseName'),
        },
        {
          title: 'Course Type',
          dataIndex: 'courseType',
          key: 'courseType',
          width: '25%',
          ...this.getColumnSearchProps('courseType'),
        },
        {
          title: 'Course Description',
          dataIndex: 'courseDescription',
          key: 'courseDescription',
          width: '40%',
          ...this.getColumnSearchProps('courseDescription'),
        },
        {
          title: 'Action',
          key: '_id',
          dataIndex: '_id',
          render: (key) => (
            <span>
              <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={()=>this.openModal(key,'Save Changes')}/>
            </span>
          ),
        },
      ];
        return (
          <div className="admin-table-container">
            {!IsAdmin && <Button type="primary" icon={<PlusCircleOutlined/>} style={{marginBottom:'10px',marginRight:'10px'}} onClick={()=>this.openModal(null,'New Topic',false)}>
              Add Course
            </Button>}
            {<Button type="primary" icon={<FileTextOutlined />} style={{marginBottom:'10px',marginRight:'10px'}} onClick={()=>this.openModal(null,'New Topic',true)}>
              Create Course
            </Button>}
            <div className="register-trainer-form-header">
              <Title level={4} style={{color:'#fff',textAlign:'center'}}>List of Courses</Title>
            </div>
            <Table
              bordered={true}
              columns={columns}
              dataSource={dataSource}
              size="medium"
              pagination={{ pageSize: 5 }}
              loading={this.props.admin.courseTableLoading}
              rowKey="_id"
            />;
            <Modal
              visible={this.state.IsCreate ?this.props.admin.courseModalOpened:this.props.trainer.CoursemodalOpened}
              title={false}
              onOk={this.handleOk}
              onCancel={()=>this.closeModal(this.state.IsCreate)}
              style={{top :'20px',padding:'0px',backgroundColor:'rgb(155,175,190)'}}
              destroyOnClose={true}
              footer={[
                
              ]}
            >
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
    ChangeAdminCourseTableData,
    ChangeAdminCourseModalState,
    ChangeCourseSearchText,
    ChangeCourseTableData,
    ChangeCourseModalState,

})(AllCourses);