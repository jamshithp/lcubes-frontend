import React, { Component } from 'react'
import Register from '../components/register'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Badge from 'react-bootstrap/Badge'
import Alert from 'react-bootstrap/Alert'
import * as action from '../store/actions'
import { connect } from 'react-redux'

class Registration extends Component {
  render(props) {
    return (
      <div>
        <Container className="register">
        {this.props.client==="student"?<h2>
          Regiter as <Badge variant="secondary">Student</Badge>
        </h2>:<h2>
          Regiter as <Badge variant="secondary">Institute</Badge>
        </h2>}
          <Row>
            <Col>
              <Register
                client={this.props.client}
                api={this.props.userRegMethod}
                courseDetails={this.props.getCourseDetails}
                courseData={this.props.courseDetails}
                roleId={this.props.client==="institute"?2:1}
              />
            </Col>
            {this.props.error?<Alert variant="danger"> login failed </Alert>:""}
          </Row>
        </Container>
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return{
    userRegMethod : (data) => dispatch(action.userReg(data)),
    getCourseDetails : (data) => dispatch(action.getCourse(data))
  }
}
const mapStateToProps = (state) => {
  return{
    courseDetails : state.courseDetails
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Registration);
