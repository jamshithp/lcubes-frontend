import React, { Component } from 'react';
import { EditOutlined, FileTextOutlined, SearchOutlined,PlusCircleOutlined } from '@ant-design/icons';
import { Table, Input, Button, Typography, Modal } from 'antd';
import Highlighter from 'react-highlight-words';
import { connect } from 'react-redux';
import {
  ChangeCourseSearchText,
  ChangeSubjectTableData,
  ChangeSubjectModalState
} from '../../../actions/trainerAction';
import './allSubjects.css'
import NewSubjectForm from '../../trainer/addSubjects/addSubjects';




class AllSubjects extends Component {

  constructor(props){
    super(props);
    this.state={
      IsCreate :false,
    }
  }

  openModal = ()=>{
     this.props.ChangeSubjectModalState(true);
  }
  
  closeModal = ()=>{
    this.props.ChangeSubjectModalState(false);
  }


  componentDidMount(){
    this.props.ChangeSubjectTableData();
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
          title: 'Subject ID',
          dataIndex: 'subjectId',
          key: 'subjectId',
          width: '5%',
          ...this.getColumnSearchProps('subjectId'),
        },
        {
          title: 'Name',
          dataIndex: 'subjectName',
          key: 'subjectName',
          width: '25%',
          ...this.getColumnSearchProps('subjectName'),
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
            <Button type="primary" icon={<PlusCircleOutlined/>} style={{marginBottom:'10px',marginRight:'10px'}} onClick={()=>this.openModal()}>
              Add Subject
            </Button>
            <div className="register-trainer-form-header">
              <Title level={4} style={{color:'#fff',textAlign:'center'}}>List of Subjects</Title>
            </div>
            <Table
              bordered={true}
              columns={columns}
              dataSource={this.props.trainer.SubjectTableData}
              size="medium"
              pagination={{ pageSize: 5 }}
              loading={this.props.trainer.SubjectTableLoading}
              rowKey="_id"
            />;
            <Modal
              visible={this.props.trainer.SubjectmodalOpened}
              title={false}
              onOk={this.handleOk}
              onCancel={()=>this.closeModal()}
              style={{top :'20px',padding:'0px',backgroundColor:'rgb(155,175,190)'}}
              destroyOnClose={true}
              footer={[
                
              ]}
            >
             { <NewSubjectForm />}
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
    ChangeSubjectModalState,
    ChangeSubjectTableData,


})(AllSubjects);
