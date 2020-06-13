import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

function primaryMenu() {
  return (
    <div>
      <div className="questionMenu">
      <Card>
        <Card.Header>Question</Card.Header>
        <ListGroup>
          <ListGroup.Item><span className="menuIcon"><FontAwesomeIcon icon={faAngleRight} /></span>Question</ListGroup.Item>
          <ListGroup.Item><span className="menuIcon"><FontAwesomeIcon icon={faAngleRight} /></span>Dapibus ac facilisis in</ListGroup.Item>
          <ListGroup.Item><span className="menuIcon"><FontAwesomeIcon icon={faAngleRight} /></span>Morbi leo risus</ListGroup.Item>
          <ListGroup.Item><span className="menuIcon"><FontAwesomeIcon icon={faAngleRight} /></span>Porta ac consectetur ac</ListGroup.Item>
          <ListGroup.Item><span className="menuIcon"><FontAwesomeIcon icon={faAngleRight} /></span>Vestibulum at eros</ListGroup.Item>
        </ListGroup>
      </Card>
      </div>
      <div className="questionMenu">
        <Card className="examsMenu">
          <Card.Header>Exams</Card.Header>
          <ListGroup>
            <ListGroup.Item><span className="menuIcon"><FontAwesomeIcon icon={faAngleRight} /></span>Question</ListGroup.Item>
            <ListGroup.Item><span className="menuIcon"><FontAwesomeIcon icon={faAngleRight} /></span>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item><span className="menuIcon"><FontAwesomeIcon icon={faAngleRight} /></span>Morbi leo risus</ListGroup.Item>
            <ListGroup.Item><span className="menuIcon"><FontAwesomeIcon icon={faAngleRight} /></span>Porta ac consectetur ac</ListGroup.Item>
            <ListGroup.Item><span className="menuIcon"><FontAwesomeIcon icon={faAngleRight} /></span>Vestibulum at eros</ListGroup.Item>
          </ListGroup>
        </Card>
      </div>
    </div>
  )
}

export default primaryMenu
