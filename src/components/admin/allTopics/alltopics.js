import React, { Component } from 'react';
import { EditOutlined, FileTextOutlined, SearchOutlined } from '@ant-design/icons';
import { Table, Input, Button, Typography, Modal } from 'antd';
import Highlighter from 'react-highlight-words';
import { connect } from 'react-redux';
import { 
    ChangeSubjectSearchText,
    ChangeSubjectTableData,
    ChangeSubjectModalState
} from '../../../actions/adminAction';
import {
  ChangeCourseSearchText,
  ChangeCourseTableData,
  ChangeCourseModalState
} from '../../../actions/trainerAction';
import './alltopics.css'
import NewSubjectForm from '../newTopics/newtopics';




class AllTopics extends Component {

  openModal = (id,mode)=>{
    this.props.ChangeSubjectModalState(true,id,mode);
  }
  
  closeModal = ()=>{
    this.props.ChangeSubjectModalState(false,null,'New Topic');
  }

  componentDidMount(){
    const {user} = this.props;
    user.userDetails.category === "Institution" ?
    this.props.ChangeCourseTableData(user.userDetails.institution.id):this.props.ChangeSubjectTableData();
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
      const dataSource = IsAdmin?this.props.admin.subjectTableData:this.props.trainer.CourseTableData.filter(
        course=>course.course).map(course=>{
          return course.course;
      });
      console.log("dataSource",dataSource)
      const columns = [
        {
          title: 'Course ID',
          dataIndex: 'courseId',
          key: 'courseId',
          width: '25%',
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
          width: '25%',
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
            <Button type="primary" icon={<FileTextOutlined />} style={{marginBottom:'10px'}} onClick={()=>this.openModal(null,'New Topic')}>
              Add New
            </Button>
            <div className="register-trainer-form-header">
              <Title level={4} style={{color:'#fff',textAlign:'center'}}>List of Courses</Title>
            </div>
            <Table
              bordered={true}
              columns={columns}
              dataSource={dataSource}
              size="medium"
              pagination={{ pageSize: 5 }}
              loading={this.props.admin.SubjectTableLoading}
              rowKey="_id"
            />;
            <Modal
              visible={this.props.admin.SubjectmodalOpened}
              title={false}
              onOk={this.handleOk}
              onCancel={this.closeModal}
              style={{top :'20px',padding:'0px',backgroundColor:'rgb(155,175,190)'}}
              destroyOnClose={true}
              footer={[
                
              ]}
            >
              <NewSubjectForm />
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
    ChangeSubjectTableData,
    ChangeSubjectModalState,
    ChangeCourseSearchText,
    ChangeCourseTableData,
    ChangeCourseModalState,

})(AllTopics);