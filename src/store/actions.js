import * as actionTypes from './actionTypes'
import axios from 'axios'
import {loginUrl} from '../data/data'


export const signInSuccess = (data) =>{
  console.log("inside")
  return{
    type:actionTypes.LOGIN,
    data:data
  }
}
export const signInFail = () =>{
  return{
    type:actionTypes.AUTH_FAIL
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
            dispatch(signInFail())
          }

        })
  }
}
