import React, {useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import * as action from '../store/actions'

function Login(props) {

  const [validated, setValidated] = useState(false);
  const [data, setData] = useState({
    email:"",
    password:""
  })
  const handleChange = (event) => {
    const {name, value} = event.target
    const values = {...data, [name]:value}
    setData(values)
  }
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }
    setValidated(true)

    event.preventDefault();
    event.stopPropagation();
    props.loginMethod(data);
  }
  return (
    <div className="login text-center" >
        <Form validated={validated} onSubmit={handleSubmit} className="form-signin">
            <img className="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
            <h1 className="h3 mb-3 font-weight-normal">Sign In</h1>
          <Form.Group controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Enter email"
            onChange={handleChange}
            name="email"
            id="login"
            required/>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Password" onChange={handleChange}
            name="password"
            id="password"
            required/>
            <Form.Control.Feedback type="invalid" >Enter password</Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit" className="btn btn-lg btn-primary btn-block">
            Login
          </Button>
        </Form>
    </div>

  )
}

const mapDispatchToProps = (dispatch) => {
  return{
    loginMethod : (data) => dispatch(action.signIn(data))
  }
}

export default connect(null, mapDispatchToProps)(Login)
