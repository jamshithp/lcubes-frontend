import React, { Component } from 'react';
import { DeleteOutlined, SearchOutlined, UserAddOutlined } from '@ant-design/icons';
import { Table, Input, Button, Typography, Divider, Modal, Popconfirm } from 'antd';
import Highlighter from 'react-highlight-words';
import { connect } from 'react-redux';
import { 
    ChangeTrainerSearchText,
    ChangeInstituationTableData,
    ChangeTrainerModalState
} from '../../../actions/adminAction';
import './allInstituation.css';
import Alert from '../../../components/common/alert';
import {SecurePost} from '../../../services/axiosCall';
import apis from '../../../services/Apis';
import NewTrainerForm from '../newTrainer/newtrainer';


class AllInstituation extends Component {

  constructor(props){
    super(props);
    this.state={
      TrainertableLoading : false
    }
  }

  openModal = (id,mode)=>{
    this.props.ChangeTrainerModalState(true,id,mode);
  }

  closeModal = ()=>{
    this.props.ChangeTrainerModalState(false,null,'Register');
  }
  
  componentDidMount(){
      console.log("componentDidMount")
    this.props.ChangeInstituationTableData();
  }

  deleteTrainer = (id)=>{
    SecurePost({
      url : `${apis.DELETE_TRAINER}`,
      data : {
          _id : id
      }
    }).then((response)=>{
      if(response.data.message = "Success"){
        Alert('success','Success',response.data.message);
        this.props.ChangeInstituationTableData();
      }
      else{
        return Alert('warning','Warning!',response.data.message);
      }
    }).catch((error)=>{
      return Alert('error','Error!','Server Error');
    })
  }

  changeStatus = (status,id) => {
    console.log("id",id,"status",status)
    SecurePost({
      url : `${apis.UPATE_INSTITUTION_STATUS}`,
      data : {
        institutionId : id,
        status:{
          id:status,
        }
      }
    }).then((response)=>{
      if(response.data.message === "Success"){
        Alert('success','Success',response.data.message);
        this.props.ChangeInstituationTableData();
      }
      else{
        return Alert('warning','Warning!',response.data.message);
      }
    }).catch((error)=>{
      return Alert('error','Error!','Server Error');
    })
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
            searchWords={[this.props.admin.TrainersearchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ),
      });
    
      handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.props.ChangeTrainerSearchText(selectedKeys[0])
      };
    
      handleReset = clearFilters => {
        clearFilters();
        this.props.ChangeTrainerSearchText('')
      };

    render() {
        console.log("inside inst")
      const { Title } = Typography;
      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          width: '25%',
          ...this.getColumnSearchProps('name'),
        },
        {
          title: 'Email Id',
          dataIndex: 'email',
          key: 'emailid',
          width: '25%',
          ...this.getColumnSearchProps('email'),
        },
        {
          title: 'Contact Number',
          dataIndex: 'phone',
          key: 'contact',
          ...this.getColumnSearchProps('phone'),
        },
        {
            title: 'Subscription',
            dataIndex: 'status',
            key: 'contact',
            render: (status) => (
              <span>
                {status=== null?"Pending":status.name}
              </span>
            ),
            //...this.getColumnSearchProps('status.name'),
          },
        {
          title: 'Action',
          key: '_id',
          dataIndex: '_id',
          render: (key,data) => (
            <span>
              <Button
                type={(data.status && data.status.name ==="Active") ? "danger":"primary"}
                onClick={()=>this.changeStatus((data.status && data.status.name ==="Active") ? 3 : 2,data.id)}
                >
                  {(data.status && data.status.name ==="Active") ? 'DEACTIVATE' : 'ACTIVATE'}
                </Button>
                <Divider type="vertical" />
                <Popconfirm
                  title="Are you sure？"
                  cancelText="No"
                  okText="Yes"
                  onConfirm={()=>{this.deleteTrainer(key)}}
                  icon={<DeleteOutlined style={{ color: 'red' }} />}
                >
                  <Button type="danger" shape="circle" icon={<DeleteOutlined />} />
                </Popconfirm>
            </span>
          ),
        },
      ];
        return (
          <div className="admin-table-container">
            <Button type="primary" icon={<UserAddOutlined />} style={{marginBottom:'10px'}} onClick={()=>this.openModal(null,'Register')}>
              Add New
            </Button>
            <div className="register-trainer-form-header">
              <Title level={4} style={{color:'#fff',textAlign:'center'}}>List of Instituations</Title>
            </div>
            <Table
              bordered={true}
              columns={columns}
              dataSource={this.props.admin.instituationTableData}
              size="medium"
              pagination={{ pageSize: 5 }}
              loading={this.props.admin.instituationTableLoadingStatus}
              rowKey="_id"
            />;
            <Modal
              visible={this.props.admin.TrainermodalOpened}
              title={false}
              onOk={this.handleOk}
              onCancel={this.closeModal}
              style={{top :'20px',padding:'0px',backgroundColor:'rgb(155,175,190)'}}
              width="40%"
              destroyOnClose={true}
              footer={[
                
              ]}
            >
              <NewTrainerForm />
            </Modal>
          </div>
        );
    }
}

const mapStateToProps = state => ({
    admin : state.admin
});

export default connect(mapStateToProps,{
    ChangeTrainerSearchText,
    ChangeInstituationTableData,
    ChangeTrainerModalState
})(AllInstituation);