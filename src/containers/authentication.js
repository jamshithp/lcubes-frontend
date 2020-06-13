import React, { Component } from 'react'
import Login from '../components/login'
import { connect } from 'react-redux'
import {Redirect } from 'react-router-dom'
import Alert from 'react-bootstrap/Row'

class Authentication extends Component {
  componentDidMount(){
    document.body.classList.add('login');
  }
  render() {
    if(this.props.uid !==0){
      document.body.classList.remove('login');
    }
    return (
      <div>
      {this.props.uid===0?"":<Redirect to="/home" />}
        <Login />
        {this.props.error?<Alert variant="danger"> login failed </Alert>:""}
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    uid:state.auth.userid,
    login:state.auth.loggedIn,
    error:state.auth.loginError
  }
}
export default connect(mapStateToProps,null)(Authentication);