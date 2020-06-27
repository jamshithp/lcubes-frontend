import React from 'react';
import apis from '../services/Apis';
import Alert from '../components/common/alert';
import { SecureGet , Get} from '../services/axiosCall';
import { Modal, Button, Space } from 'antd';
import { Redirect } from 'react-router-dom';
const axios = require('axios');

// registration actions
export const userReg = (data) =>{
  return dispatch =>{
    let api=data.role.role==="student"?apis.USER_REG_URL:apis.INSTITUTE_REG_URL
    axios.post(apis.BASE+api,{...data}).then(response =>{
          console.log(response.data)
          if(response.data.status === 200){
            dispatch({
                type : 'USER_REG',
                data: response.data.data
            })

          }else{
            dispatch({
                type : 'USER_REG_FAIL',
                data: response.data.messageDetails
            })
            Alert('error','Error!', response.data.messageDetails);
          }
        })
  }
}

// get course details actions
// export const courseDetails = (data) =>{
//   return{
//     type:actionTypes.COURSE_DETAILS,
//     data:data
//   }
// }
//
// export const getCourse = (data) =>{
//   return dispatch =>{console.log(data)
//     axios.get(getCourseByIdUrl+data).then(response =>{
//           if(response.data.status === 200 && response.data.data.length > 0){
//             dispatch(courseDetails(response.data.data))
//           }else{
//             dispatch(apiFail(response.data))
//           }
//         })
//   }
// }
