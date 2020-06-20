import * as actionTypes from './actionTypes'


const initialState = {
  auth:{
    userid:0,
    loggedIn:0,
    token:0
  },
  error:'',
  userData:{},
  userRegistration:'',
  courseDetails:[]
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
  if(actionTypes.API_FAIL === action.type){
    console.log("action.data")
    console.log(action.data)
    return{
      ...state,
      error:action.data
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

  if(actionTypes.USER_REG === action.type){
    return{
      ...state,
      userRegistration:action.data
    }
  }
  if(actionTypes.COURSE_DETAILS === action.type){
    console.log("action.data")
    console.log(action.data)
    return{
      ...state,
       courseDetails:[...action.data]
    }
  }
  return state
}

export default reducer
