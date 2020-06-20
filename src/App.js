import React, {useState} from 'react';
import '../src/styles/App.css';
import Registration from './containers/registration'
import Home from './containers/home'
import Authentication from './containers/authentication'
import Header from './components/partials/header'
import Footer from './components/partials/footer'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'


import 'bootstrap/dist/css/bootstrap.min.css';

function App(props) {
  return (
    <BrowserRouter>
      {props.uid!==0?<Header status={props.uid} role=""/>:""}
    <Switch>
      {props.uid!==0?<Route path="/home" ><Route path="/home" exact><Home /></Route></Route>:""}
      <Route path="/" exact><Authentication/></Route>
      <Route path="/register/institute" exact ><Registration client="institute"/></Route>
      <Route path="/register/student" exact ><Registration client="student"/></Route>
    </Switch>
      {props.uid!==0?<Footer status={props.uid}/>:""}
    </BrowserRouter>
  );
}
const mapStateToProps = (state) =>{
  return{
    uid:state.auth.userid,
    login:state.auth.loggedIn
  }
}
export default connect(mapStateToProps,null)(App);
