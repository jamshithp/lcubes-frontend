import React from 'react';
import './homepage.css';
import './homepage.jpg';
import { connect } from 'react-redux';
import Login from '../login/login';
import HomepageHeader from '../header/header';
import auth from '../../../services/AuthServices';
import { Redirect } from 'react-router-dom';


function Homepage(props) {
  if(localStorage.getItem('my')){
    return <Redirect to='/user/home' />
  }
  else{
    return (
      <div>
          <div className="parallax">
            <Login />
          </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user : state.user
});

export default connect(mapStateToProps,{

})(Homepage);
