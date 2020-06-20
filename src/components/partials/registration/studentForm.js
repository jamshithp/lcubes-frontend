import React from 'react'
import Form from 'react-bootstrap/Form'
import {Col} from 'react-bootstrap'

export default function StudentForm(props) {
  return (
    <div>
    <Form.Group as={Col} md="6" controlId="firstName">
      <Form.Label>Name</Form.Label>
      <Form.Control
        required
        type="text"
        placeholder="First Name"
        name="firstName"
        onChange={props.handleChange}
      />
      <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
    </Form.Group>

    <Form.Group as={Col} md="6" controlId="lastName">
      <Form.Label>Name</Form.Label>
      <Form.Control
        required
        type="text"
        placeholder="Last name"
        name="lastName"
        onChange={props.handleChange}
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
        onChange={props.handleChange}
      />
      <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
    </Form.Group>

    <Form.Group as={Col} md="6" controlId="mobile">
      <Form.Label>Mobile</Form.Label>
      <Form.Control
        required
        type="tel"
        placeholder="Mobile"
        name="poneNumber"
        onChange={props.handleChange}
      />
      <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
    </Form.Group>

    <Form.Group as={Col} md="6" controlId="password">
      <Form.Label>Password</Form.Label>
      <Form.Control
        required
        type="text"
        placeholder="password"
        name="password"
      />
      <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
    </Form.Group>

    <Form.Group as={Col} md="6" controlId="password">
      <Form.Label>Retype Password</Form.Label>
      <Form.Control
        required
        type="text"
        placeholder="re-type password"
        name="password"
        onChange={props.handleChange}
      />
      <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
    </Form.Group>

    <Form.Group as={Col} md="6" controlId="locaiton" className="d-none">
      <Form.Label>Location</Form.Label>
      <Form.Control
        type="text"
        placeholder="location"
        name="location"
        onChange={props.addressHandleChange}
      />
      <Form.Control.Feedback type="invalid">Enter location</Form.Control.Feedback>
    </Form.Group>

    <Form.Group as={Col} md="6" controlId="district" className="d-none">
      <Form.Label>District</Form.Label>
      <Form.Control
        type="text"
        placeholder="District"
        name="district"
        onChange={props.addressHandleChange}
      />
      <Form.Control.Feedback type="invalid">Enter your district</Form.Control.Feedback>
    </Form.Group>

    <Form.Group as={Col} md="6" controlId="pinCode" className="d-none">
      <Form.Label>Pin code</Form.Label>
      <Form.Control
        type="text"
        placeholder="PIN"
        name="pinCode"
        onChange={props.addressHandleChange}
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
        onChange={props.handleInstituteCode}
      />
      <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
    </Form.Group>

    <Form.Group as={Col} md="6" controlId="course">
    {props.courseData!==''?<Form.Label>Select your courses</Form.Label>:''}
        <div className="flex-inline">
          {props.courseData.map((type) => (
            <div key={type.course.courseName} className="mb-2">
              <Form.Check
                custom
                type="checkbox"
                id={type.course.courseId}
                label={type.course.courseName}
                name={type.course.courseType}
                onChange={props.handleCourse}
              />
            </div>
          ))}
        </div>
    </Form.Group>
    </div>
  )
}
