import React, { Component } from 'react';
import { EditOutlined, FileTextOutlined, SearchOutlined } from '@ant-design/icons';
import { Table, Input, Button, Typography, Modal } from 'antd';
import Highlighter from 'react-highlight-words';
import { connect } from 'react-redux';
import { 
    ChangeSubjectSearchText,
    ChangeAdminCourseTableData,
    ChangeAdminCourseModalState
} from '../../../actions/adminAction';
import './allMainCourses.css'
import NewCourseForm from '../newCourse/newCourse.js';


class AllCourses extends Component {

  constructor(props){
    super(props);
    this.state={
      IsCreate :false,
    }
  }

  openModal = (id,mode,row)=>{
    console.log("id my",row)
    this.props.ChangeAdminCourseModalState(true,id,mode,row);
  }
  
  closeModal = ()=>{
   this.props.ChangeAdminCourseModalState(false,null,'New Topic');
  }


  componentDidMount(){
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
      const columns = [
        {
          title: 'Main Course ID',
          dataIndex: 'id',
          key: 'id',
          width: '5%',
          ...this.getColumnSearchProps('id'),
        },
        {
          title: 'Main Course Name',
          dataIndex: 'name',
          key: 'name',
          width: '25%',
          ...this.getColumnSearchProps('name'),
        },
        {
          title: 'Course Description',
          dataIndex: 'description',
          key: 'description',
          width: '40%',
          ...this.getColumnSearchProps('description'),
        },
        {
          title: 'Action',
          key: '_id',
          dataIndex: '_id',
          render: (key,row) => (
            <span>
              <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={()=>this.openModal(key,'Save Changes',row)}/>
            </span>
          ),
        },
      ];
        return (
          <div className="admin-table-container">
            <Button type="primary" icon={<FileTextOutlined />} style={{marginBottom:'10px',marginRight:'10px'}} onClick={()=>this.openModal(null,'New Topic',true)}>
              Create Main Course
            </Button>
            <div className="register-trainer-form-header">
              <Title level={4} style={{color:'#fff',textAlign:'center'}}>List of Courses</Title>
            </div>
            <Table
              bordered={true}
              columns={columns}
              dataSource={this.props.admin.courseTableData}
              size="medium"
              pagination={{ pageSize: 10 }}
              loading={this.props.admin.courseTableLoading}
              rowKey="_id"
            />;
            <Modal
              visible={this.props.admin.courseModalOpened}
              title={false}
              onOk={this.handleOk}
              onCancel={()=>this.closeModal(this.props.admin.courseModalOpened)}
              style={{top :'20px',padding:'0px',backgroundColor:'rgb(155,175,190)'}}
              destroyOnClose={true}
              footer={[
                
              ]}
            >
            <NewCourseForm /> {/*This is for adding Main course in Admin */}
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
})(AllCourses);