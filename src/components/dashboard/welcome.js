import React from 'react';
import './welcome.css';
import { DeleteOutlined, EditOutlined, InfoOutlined } from '@ant-design/icons';
import { Button } from 'antd';



export default function welcome() {  
  return (
    <div>
        <h2><b>Admin Instructions</b></h2>
        <h3>1. All Instiutation</h3>
        <h4>   List of Instiutation trainers.</h4>
        <ul>
          <li>Add New - Create new Instiutation account.</li>
          <li>Action - <br/> <p style={{marginBottom:'2px'}}><Button size = 'small' type="primary" shape="circle" icon={<EditOutlined />} /> Edit Instiutation details.</p><Button size = 'small' type="primary" shape="circle" icon={<DeleteOutlined />} /> Delete Instiutation account.</li>
        </ul>
        <h3>2. All Courses</h3>
        <h4>   List of existing courses.</h4>
        <ul>
          <li>Add New - Create new course </li>
          <li>Action - <br/><Button size = 'small' type="primary" shape="circle" icon={<EditOutlined />} /> Edit course name.</li>
        </ul>
        <br/>
        <h2><b>Instiutation Instructions</b></h2>
        <h3>1. All Students</h3>
        <h4>   List of Students trainers.</h4>
        <ul>
          <li>Add New - Create new Students account.</li>
          <li>Action - <br/> <p style={{marginBottom:'2px'}}><Button size = 'small' type="primary" shape="circle" icon={<EditOutlined />} /> Edit trainer details.</p><Button size = 'small' type="primary" shape="circle" icon={<DeleteOutlined />} /> Delete trainer account.</li>
        </ul>
        <br/>
        <h3>2. All Questions</h3>
        <h4>   List of existing questions.</h4>
        <ul>
          <li>Add New - Create new question.</li>
          <li>Action - <br/> <p style={{marginBottom:'2px'}}><Button size = 'small' type="primary" shape="circle" icon={<InfoOutlined />} />  Question details & body.</p><Button size = 'small' type="primary" shape="circle" icon={<DeleteOutlined />} /> Delete question.</li>
        </ul>
        <h3>3. All Tests</h3>
        <h4>   List of existing tests</h4>
        <ul>
          <li>Action - <Button size = 'small' type="primary" shape="circle" icon={<InfoOutlined />} /> <ul>
            <li>Test Details</li>
            <li>Test Questions</li>
            <li>Trainees - List of Registered Candidates</li>
            <li>Statistics - <ul>
              <li>Download excel sheet of results</li>
              <li>Graphical representation of results</li>
              </ul></li>
            </ul></li>
        </ul>
        <h3>3. New Tests</h3>
        <ul>
          <li>Create new test</li>
          <ol>
            <li>Enter basic test details</li>
            <li>Select Questions</li><ul>
              <li>Questions - Random > Enter number of questions to be selected automatically and click Generate Test Paper. Click Next to proceed.</li>
              <li>Questions - Manually > Select Questions manually . Click Next to proceed.</li>
            </ul>
          </ol>
          <li>Basic test info</li>
          <ul>
            <li>Registration link - The link for Registration of trainee for the test.</li>
            <li>Stop Registration - Click to disable Registration Link.</li>
            <li>Reload - Click to get the list of registered candidates.</li>
            <li>Start Test - Click to begin test.</li>
            <li>End Test - Click to end test.</li>
          </ul>
          <p><b>NOTE-</b>A link for this test has been sent to the email id of registered trainees. Click on the link to take test.</p>
        </ul>

    </div>
  );  
}


   