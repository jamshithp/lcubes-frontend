import React, {useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import StudentForm from './partials/registration/studentForm'
import InstituteForm from './partials/registration/instituteForm'

function Register(props) {

  const [validated, setValidated] = useState(false);

  const [data, setData] = useState({
    courseDetailsList: [],
    role: {role:props.client,roleId:props.roleId}
  })

  const handleChange = (event) => {
    let {name, value} = event.target
    if(event.target.name == 'poneNumber'){
      value = parseInt(event.target.value)
    }
    const values = {...data, [name]:value}
    setData(values)
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
    // const {name, value} = event.target
    // const values = {...data, address:{
    //   ...data.address,
    //   [name]:value
    // }}
    // setData(values)
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    event.preventDefault();
    event.stopPropagation();
    props.api(data)
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
        {props.client === 'institute'?
        <InstituteForm
        handleChange ={handleChange}
        addressHandleChange={addressHandleChange}
        handleCourse={handleCourse}
        handleInstituteCode={handleInstituteCode}
        />:
        <StudentForm handleChange ={handleChange}
        addressHandleChange={addressHandleChange}
        handleCourse={handleCourse}
        handleInstituteCode={handleInstituteCode}
        courseData={props.courseData}
        />}
      <Button type="submit">Register</Button>
    </Form>
  );
}

export default Register
