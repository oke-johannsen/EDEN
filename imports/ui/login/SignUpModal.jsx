import React, { useState } from "react";
import Modal from "antd/lib/modal";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import {
  InfoCircleOutlined,
  LockOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Button from "antd/lib/button";
import message from "antd/lib/message";
import { Meteor } from "meteor/meteor";

const SignUpModal = ({ isOpen, setIsOpen }) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = (values) => {
    console.log("Finish:", values);
    setIsLoading(true);
    Meteor.call("accounts-create", values, (err, _res) => {
      if (!err) {
        message.success("Success");
        setIsOpen(false);
      } else {
        message.error("Failed");
      }
      setIsLoading(false);
    });
  };

  return (
    <Modal
      open={isOpen}
      onOk={() => setIsOpen(false)}
      onCancel={() => setIsOpen(false)}
      title="Sign up"
      footer={null}
      centered
    >
      <Form
        form={form}
        name="horizontal_login"
        onFinish={onFinish}
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
      >
        <Form.Item
          name="email"
          label="E-Mail"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined />}
            placeholder="your@email.com"
            autoComplete="current-email"
          />
        </Form.Item>
        <Form.Item
          name="firstname"
          label="First Name"
          rules={[
            {
              required: true,
              message: "Please input your firstname!",
            },
          ]}
        >
          <Input
            prefix={<InfoCircleOutlined />}
            placeholder="John"
            autoComplete="current-firstname"
          />
        </Form.Item>
        <Form.Item
          name="lastname"
          label="Last Name"
          rules={[
            {
              required: true,
              message: "Please input your lastname!",
            },
          ]}
        >
          <Input
            prefix={<InfoCircleOutlined />}
            placeholder="Doe"
            autoComplete="current-lastname"
          />
        </Form.Item>
        <Form.Item
          name="username"
          label="Username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="user.name"
            autoComplete="current-username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            type="password"
            autoComplete="current-password"
            placeholder="secure-password123*"
          />
        </Form.Item>
        <Form.Item style={{ display: "flex", justifyContent: "end" }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            style={{ float: "right" }}
          >
            Create
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SignUpModal;
