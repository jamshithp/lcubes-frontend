import React from 'react'
import {Row, Col} from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function Registration() {
  return (
      <div className="registration-wrap">
      <Form>
        <Form.Row>
          <Form.Group as={Col} controlId="name">
            <Form.Label>Institute Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Institute name" />
          </Form.Group>

          <Form.Group as={Col} controlId="contactName">
            <Form.Label>Contact Name</Form.Label>
            <Form.Control type="text" placeholder="Enter contact name" />
          </Form.Group>

        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group as={Col} controlId="phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control type="tel" placeholder="Enter phone number" />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group controlId="location">
            <Form.Label>Location</Form.Label>
            <Form.Control placeholder="vadakara" />
          </Form.Group>

          <Form.Group controlId="formGridAddress2">
            <Form.Label>District</Form.Label>
            <Form.Control placeholder="calicut" />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <Form.Control as="select" value="Choose...">
              <option>Choose...</option>
              <option>...</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control />
          </Form.Group>
        </Form.Row>

        <Form.Group id="formGridCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
        </Form>
      </div>
  )
}

export default Registration
