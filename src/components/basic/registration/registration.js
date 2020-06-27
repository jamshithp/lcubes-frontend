import React, {useState} from 'react'
import { Form } from 'antd';
import '@ant-design/compatible/assets/index.css';
import { Input, Button } from 'antd';

import InstituteForm from '../partials/registration/instituteForm'
import StudentForm from '../partials/registration/studentForm'

function Register(props) {

  const [validated, setValidated] = useState(false);
  const [submit, setSubmit] = useState('disabled');
  const [data, setData] = useState({
    courseDetailsList: [],
    address:{state:'Kerala',country:'India'},
    role: {role:props.client,roleId:props.roleId}
  })

  const handlePassword = (event) =>{
    if(event.target.value != data.password){
      console.log('password not matching')
      setValidated(true)
      setSubmit('disabled')
    }else if(event.target.value != data.password){

    }else {
      setValidated(false)
      setSubmit('')
    }
  }
  const handleChange = (event) => {
    let {name, value} = event.target
    if(event.target.name == 'poneNumber'){
      value = parseInt(event.target.value)
    }
    const values = {...data, [name]:value}
    setData(values)
    console.log(data)
  }

  const handleInstituteCode =(event)=>{
    props.courseDetails(event.target.value)
  }

  const handleCourse = (event) =>{
    let dataId= data.courseDetailsList.findIndex((element)=>{return element == parseInt(event.target.id)})
    if(dataId >= 0){
      let newArray = data.courseDetailsList.filter((element) => element !== parseInt(event.target.id))
      const values = {...data,
        courseDetailsList:[...newArray]
        }
      setData(values)
    }else{
      const values = {...data,
        courseDetailsList:[...data.courseDetailsList,parseInt(event.target.id)]
        }
      setData(values)
    }
  }

  const addressHandleChange = (event) => {
    const {name, value} = event.target
    const values = {...data, address:{
      ...data.address,
      [name]:value
    }}
    setData(values)
    console.log(data)
  }

  const onFinish = values => {
    if (validated == false) {
      props.api(data)
    }else{
      console.log("validation failed")
    }
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
    {props.client==="student"?<h2>
      Regiter as Student
    </h2>:<h2>
      Regiter as Institute
    </h2>}
        {props.client === 'institute'?
        <InstituteForm
        handleChange ={handleChange}
        addressHandleChange={addressHandleChange}
        handleInstituteCode={handleInstituteCode}
        handlePassword={handlePassword}
        onSubmit={onFinish}
        onFail={onFinishFailed}
        validated={validated}
        submit={submit}
        />:
        <StudentForm handleChange ={handleChange}
        addressHandleChange={addressHandleChange}
        handleCourse={handleCourse}
        handleInstituteCode={handleInstituteCode}
        courseData={props.courseData}
        onSubmit={onFinish}
        onFail={onFinishFailed}
        />}
    </div>
  );
}

export default Register
