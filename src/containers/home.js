import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PrimaryMenu from '../components/partials/primaryMenu'

class Home extends Component {
  render() {
    return (
      <div className="home">
        <Row className="m-0">
          <Col className="gradient">
          text content
          </Col>
        </Row>
        <Row className="primarySection m-0">
            <Col className="primaryMenu">
              <PrimaryMenu />
            </Col>
            <Col xs={6} className="primaryContent">
              <Row className="firstSection">Ist row</Row>
              <Row className="secondSection">2nd row</Row>
            </Col>
            <Col className="">3 of 3</Col>
        </Row>
      </div>
    )
  }
}

export default Home
