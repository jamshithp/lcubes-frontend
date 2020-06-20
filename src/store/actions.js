import * as actionTypes from './actionTypes'
import axios from 'axios'
import {loginUrl ,userRegUrl, getCourseByIdUrl, instituteRegUrl} from '../data/data'

// login actions
export const signInSuccess = (data) =>{
  return{
    type:actionTypes.LOGIN,
    data:data
  }
}
export const apiFail = (data) =>{
  return{
    type:actionTypes.API_FAIL,
    data:data
  }
}

export const signIn = (data) =>{
  return dispatch =>{
    axios.post(loginUrl,{...data}).then(response =>{
          console.log(response.data)
          console.log(data)
          if(response.data.status === 200){
            dispatch(signInSuccess(response.data.data))
          }else{
            dispatch(apiFail(response.data))
          }

        })
  }
}

// registration actions
export const userRegistration = (data) =>{
  return{
    type:actionTypes.USER_REG,
    data:data
  }
}


export const userReg = (data) =>{
  return dispatch =>{
    let api=data.role.role==="student"?userRegUrl:instituteRegUrl
    axios.post(api,{...data}).then(response =>{
          console.log(response.data)
          if(response.data.status === 200){
            dispatch(userRegistration(response.data.data))
          }else{
            dispatch(apiFail(response.data))
          }
        })
  }
}

// get course details actions
export const courseDetails = (data) =>{
  return{
    type:actionTypes.COURSE_DETAILS,
    data:data
  }
}

export const getCourse = (data) =>{
  return dispatch =>{console.log(data)
    axios.get(getCourseByIdUrl+data).then(response =>{
          if(response.data.status === 200 && response.data.data.length > 0){
            dispatch(courseDetails(response.data.data))
          }else{
            dispatch(apiFail(response.data))
          }
        })
  }
}
