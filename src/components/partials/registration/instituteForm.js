import React from 'react'
import Form from 'react-bootstrap/Form'
import {Col} from 'react-bootstrap'

export default function InstituteForm(props) {
  return (
    <div>
    <Form.Group as={Col} md="6" controlId="instituteName">
      <Form.Label>Institute name</Form.Label>
      <Form.Control
        required
        type="text"
        placeholder="Institute name"
        name="name"
        onChange={props.handleChange}
      />
      <Form.Control.Feedback type="invalid" >Enter institute name</Form.Control.Feedback>
    </Form.Group>

    <Form.Group as={Col} md="6" controlId="locaiton">
      <Form.Label>Location</Form.Label>
      <Form.Control
        required
        type="text"
        placeholder="location"
        name="addressLine1"
        onChange={props.addressHandleChange}
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
        onChange={props.addressHandleChange}
      />
      <Form.Control.Feedback type="invalid">Enter your district</Form.Control.Feedback>
    </Form.Group>

    <Form.Group as={Col} md="6" controlId="pinCode">
      <Form.Label>Pin code</Form.Label>
      <Form.Control
        required
        type="text"
        placeholder="PIN"
        name="postalCode"
        onChange={props.addressHandleChange}
      />
      <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
    </Form.Group>

    <Form.Group as={Col} md="6" controlId="name">
      <Form.Label>Contact name</Form.Label>
      <Form.Control
        required
        type="text"
        placeholder="Contact name"
        name="contactName"
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
        name="mobile"
        onChange={props.handleChange}
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
        name="phone"
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
    </div>
  )
}
