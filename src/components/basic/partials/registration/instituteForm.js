import React, { useState } from 'react';
import { DesktopOutlined, UserOutlined, EyeInvisibleOutlined, EyeTwoTone, CloseCircleOutlined  } from '@ant-design/icons';
import { Form } from 'antd';
import '@ant-design/compatible/assets/index.css';
import { Row, Col, Input, Button, Select, Typography, Tag } from 'antd';



const Institute = (props) => {

  return (
    <div>
      <Row>
        <Col span={24}>
        <Form
          onFinish={props.onSubmit}
          onFinishFailed={props.onFail}
          layout="horizontal"
          size='large'
        >
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Enter your name!' }]}>
          <Input
            name="name"
            prefix={<DesktopOutlined className="site-form-item-icon" />}
            onChange={props.handleChange}
            placeholder="Institute Name"/>
        </Form.Item>

        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Enter your location!' }]}>
          <Input
            name="addressLine1"
            onChange={props.addressHandleChange}
            placeholder="Location"/>
        </Form.Item>

        <Form.Item
          name="district"
          rules={[{ required: true, message: 'Enter district!' }]}>
          <Input
            name="district"
            onChange={props.addressHandleChange}
            placeholder="Location"/>
        </Form.Item>

        <Form.Item
          name="pincode"
          rules={[{ required: true, message: 'Enter pin!' }]}>
          <Input
            name="postalCode"
            onChange={props.addressHandleChange}
            placeholder="Pin Code"/>
        </Form.Item>

        <Form.Item
          name="contact-name"
          rules={[{ required: true, message: 'Enter Contact name!' }]}>
          <Input
            name="contactName"
            onChange={props.handleChange}
            placeholder="Contact name"/>
        </Form.Item>

        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Enter email!' }]}>
          <Input
            name="email"
            onChange={props.handleChange}
            placeholder="Email"/>
        </Form.Item>

        <Form.Item
          name="mobile"
          rules={[{ required: true, message: 'Enter Mobile!' }]}>
          <Input
            name="phone"
            type="tel"
            onChange={props.handleChange}
            placeholder="Mobile"/>
        </Form.Item>

        <Form.Item
          name="phone"
          rules={[{ required: true, message: 'Enter Phone!' }]}>
          <Input
            name="poneNumber"
            type="tel"
            onChange={props.handleChange}
            placeholder="Landphone"/>
        </Form.Item>

        <Form.Item
          name="password1"
          rules={[{ required: true, message: 'Enter password!' }]}>
          <Input.Password
            name="password"
            onChange={props.handleChange}
            type="password"
            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            placeholder="Password"/>
        </Form.Item>
        {props.validated==true?
          <Tag icon={<CloseCircleOutlined />} color="error">
            Password mismatch
          </Tag>:''}
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Enter password!' }]}>
          <Input.Password
            name="password1"
            type="password"
            onChange={props.handlePassword}
            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            placeholder="Password"/>
        </Form.Item>
        {props.submit=='disabled'?<Button type="primary" disabled block>
          Submit
        </Button>:<Button type="primary" htmlType="submit" block>
           Submit
         </Button>}
        </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Institute
