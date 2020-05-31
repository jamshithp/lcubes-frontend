import React, {useState} from 'react'
import {Col} from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
//import InputGroup from 'react-bootstrap/InputGroup'

function Registration(props) {

  const [validated, setValidated] = useState(false);

  const [data, setData] = useState([
      {name: "instituteName",value:''},
      {name: "location",value:''},
      {name: "pinCode",value:''},
      {name: "district",value:''},
      {name: "name",value:''},
      {name: "email",value:''},
      {name: "mobile",value:''},
      {name: "phone",value:''},
      {name: "PSC",value:''},
      {name: "JAM",value:''},
      {name: "instituteCode",value:''}
    ]
  )
  const handleChange = (event) => {
    const index = data.findIndex(element => {return element.name === event.target.name})
    const element = {...data[index]}
    element.value = event.target.value
    const newData = [...data]
    newData[index] = element
    setData(newData)
  }
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  let fields = null
  if(props.client === 'institute'){
    fields = (
      <div>
      <Form.Group as={Col} md="6" controlId="instituteName">
        <Form.Label>Institute name</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Institute name"
          name="instituteName"
          onChange={handleChange}
        />
        <Form.Control.Feedback type="invalid" >Enter institute name</Form.Control.Feedback>
      </Form.Group>

      <Form.Group as={Col} md="6" controlId="locaiton">
        <Form.Label>Location</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="location"
          name="location"
          onChange={handleChange}
        />
        <Form.Control.Feedback type="invalid">Enter location</Form.Control.Feedback>
      </Form.Group>

      <Form.Group as={Col} md="6" controlId="district">
        <Form.Label>District</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="District"
          name="district"
          onChange={handleChange}
        />
        <Form.Control.Feedback type="invalid">Enter your district</Form.Control.Feedback>
      </Form.Group>

      <Form.Group as={Col} md="6" controlId="pinCode">
        <Form.Label>Pin code</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="PIN"
          name="pinCode"
          onChange={handleChange}
        />
        <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
      </Form.Group>

      <Form.Group as={Col} md="6" controlId="name">
        <Form.Label>Contact name</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Contact name"
          name="name"
          onChange={handleChange}
        />
        <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
      </Form.Group>

      <Form.Group as={Col} md="6" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          required
          type="tel"
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />
        <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
      </Form.Group>

      <Form.Group as={Col} md="6" controlId="mobile">
        <Form.Label>Mobile</Form.Label>
        <Form.Control
          required
          type="tel"
          placeholder="Mobile"
          name="mobile"
          onChange={handleChange}
        />
        <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
      </Form.Group>

      <Form.Group as={Col} md="6" controlId="phone">
        <Form.Label>Landphone</Form.Label>
        <Form.Control
          required
          type="tel"
          placeholder="Landphone"
          name="phone"
          onChange={handleChange}
        />
        <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Col} md="6" controlId="course">
        <Form.Label>Select courses</Form.Label>
        <div className="flex-inline">
          {['PSC', 'JAM'].map((type) => (
            <div key={`exam-${type}`} className="mb-2">
              <Form.Check
                custom
                type="checkbox"
                id={`exam-${type}`}
                label={`${type}`}
                name={`${type}`}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>
      </Form.Group>
      </div>
    )
  }else{
    fields = (
      <div>
      <Form.Group as={Col} md="6" controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Name"
          name="contactName"
          onChange={handleChange}
        />
        <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
      </Form.Group>

      <Form.Group as={Col} md="6" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          required
          type="tel"
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />
        <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
      </Form.Group>

      <Form.Group as={Col} md="6" controlId="mobile">
        <Form.Label>Mobile</Form.Label>
        <Form.Control
          required
          type="tel"
          placeholder="Mobile"
          name="mobile"
          onChange={handleChange}
        />
        <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
      </Form.Group>

      <Form.Group as={Col} md="6" controlId="locaiton">
        <Form.Label>Location</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="location"
          name="location"
          onChange={handleChange}
        />
        <Form.Control.Feedback type="invalid">Enter location</Form.Control.Feedback>
      </Form.Group>

      <Form.Group as={Col} md="6" controlId="district">
        <Form.Label>District</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="District"
          name="district"
          onChange={handleChange}
        />
        <Form.Control.Feedback type="invalid">Enter your district</Form.Control.Feedback>
      </Form.Group>

      <Form.Group as={Col} md="6" controlId="pinCode">
        <Form.Label>Pin code</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="PIN"
          name="pinCode"
          onChange={handleChange}
        />
        <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
      </Form.Group>

      <Form.Group as={Col} md="6" controlId="instituteCode">
        <Form.Label>Institute Code</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Institute code"
          name="instituteCode"
          onChange={handleChange}
        />
        <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
      </Form.Group>

      <Form.Group as={Col} md="6" controlId="course">
        <Form.Label>Select courses</Form.Label>
          <div className="flex-inline">
            {['PSC', 'JAM'].map((type) => (
              <div key={`exam-${type}`} className="mb-2">
                <Form.Check
                  custom
                  type="checkbox"
                  id={`exam-${type}`}
                  label={`${type}`}
                  name={`${type}`}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>
      </Form.Group>
      </div>
    )
  }

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
        {fields}
      <Button type="submit">Register</Button>
    </Form>
  );
}

export default Registration
