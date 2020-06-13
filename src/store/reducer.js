import * as actionTypes from './actionTypes'


const initialState = {
  auth:{
    userid:0,
    loggedIn:0,
    token:0,
    loginError:''
  },
  userData:{}
}

const reducer = (state=initialState, action) => {
  console.log("action.data inside")
  if(actionTypes.LOGIN === action.type){
    console.log("action.data")
    console.log(action.data)
    return{
      ...state,
      auth:{
        ...state.auth,
        userid:1,
        loggedIn:1
      }
    }
  }
  if(actionTypes.AUTH_FAIL === action.type){
    console.log("action.data")
    console.log(action.data)
    return{
      ...state,
      auth:{
        ...state.auth,
        loginError:1
      }
    }
  }
  if(actionTypes.LOGOUT === action.type){
    return{
      ...state,
      auth:{
        ...state.auth,
        userid:0,
        loggedIn:0
      }
    }
  }
  return state
}

export default reducer
