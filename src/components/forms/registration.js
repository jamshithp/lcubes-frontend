import React, { Component } from 'react'
import Register from '../basic/registration/registration'
import { Row, Col, Modal, Result, Button  } from 'antd';

import Alert from '../common/alert';
import * as action from '../../actions/registration'
import { SmileOutlined  } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

class Registration extends Component {
  render(props) {
    return (
      <div>
        <div className="register">
          <Row>
            <Col span={24}>
            {this.props.regStatus === 'SUCCESS'?
              <Result
                icon={<SmileOutlined />}
                title="Thanks, Our executive will contact you soon"
                extra={<Link to='/'>OK</Link>}
              />:<Register
                client={this.props.client}
                api={this.props.userRegMethod}
                courseData={this.props.courseDetails}
                roleId={this.props.client==="institute"?2:1}
                regStatus={this.props.regStatus}
              />
            }
            </Col>
            {this.props.error?Alert('error','Error!'):""}
          </Row>
        </div>
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return{
    userRegMethod : (data) => dispatch(action.userReg(data))
  }
}
const mapStateToProps = (state) => {
  return{
    courseDetails : state.registration.courseDetails,
    regStatus : state.registration.regStatus,
    regError : state.registration.error
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Registration);
