import React, { useState } from "react";
import Button from "antd/lib/button";
import Checkbox from "antd/lib/checkbox";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Divider from "antd/lib/divider";
import SignUpModal from "./SignUpModal";
import {
  GoogleOutlined,
  TwitterOutlined,
  LoginOutlined,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";
import message from "antd/lib/message";
import { Meteor } from "meteor/meteor";

export default function Login({}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    setIsLoading(true);
    Meteor.loginWithPassword(
      { username: values.username },
      values.password,
      (err, _res) => {
        if (!err) {
          const user = Meteor.user();
          message.success(
            `Welcome, ${user?.profile?.firstname} ${user?.profile?.lastname}`
          );
        } else {
          message.error("Log in failed");
        }
        setIsLoading(false);
      }
    );
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100%" }}>
      <Col lg={24} xl={10} id="form_wrapper">
        <Form
          name="sign-in-form"
          className="login_form"
          onFinish={onFinish}
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
        >
          <Row gutter={8} justify="center" align="middle">
            <img
              src="https://cdn.midjourney.com/a30dfce1-cf40-4aba-8a86-88e579f0116b/0_1.png"
              alt="picture of a tree with a symbol underneath in a minimalistic style"
              style={{
                borderRadius: "50%",
                maxWidth: "8rem",
                margin: "0 auto",
              }}
            />
            <Col span={24}>
              <h1 style={{ color: "#556E53", textAlign: "center" }}>
                Welcome, to EDEN
              </h1>
            </Col>
            <Col
              span={24}
              style={{ fontSize: 24, fontWeight: "bold", color: "#70af85" }}
            >
              Sign into your account
            </Col>
            <Col span={24}>
              <span style={{ color: "grey" }}>Not a member? </span>
              <a style={{ fontWeight: "bold" }} onClick={() => setIsOpen(true)}>
                Sign up now!
              </a>
              <SignUpModal isOpen={isOpen} setIsOpen={setIsOpen} />
            </Col>
            <Col span={24}>
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  autoComplete="username"
                  placeholder="Username..."
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  autoComplete="current-password"
                  placeholder="Password..."
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Checkbox disabled>Remember me</Checkbox>
            </Col>
            <Col span={12} style={{ textAlign: "right" }}>
              <a style={{ fontWeight: "bold" }} disabled>
                Forgot password?
              </a>
            </Col>
            <Col span={24} style={{ marginTop: "0.5rem" }}>
              <Button
                htmlType="submit"
                type="primary"
                style={{ width: "100%" }}
                disabled={isLoading}
                loading={isLoading}
              >
                Sign in
                <LoginOutlined />
              </Button>
            </Col>
            <Col span={24}>
              <Divider style={{ fontSize: 12 }}>Or continue with</Divider>
            </Col>
            <Col span={12}>
              <Button type="primary" disabled style={{ width: "100%" }}>
                <GoogleOutlined />
                Google
              </Button>
            </Col>
            <Col span={12}>
              <Button type="primary" disabled style={{ width: "100%" }}>
                <TwitterOutlined />
                Twitter
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
      <Col
        span={14}
        style={{
          display: "block",
          width: 0,
          flex: "1 1 0%",
        }}
      >
        <img
          src="https://cdn.midjourney.com/9863e009-8e34-477a-9901-d93269d549bb/0_0.png"
          alt="picture of a woman walking through the wilderness in a minimalistic art style"
          style={{
            objectFit: "cover",
            width: "100%",
            maxHeight: "50rem",
            borderRadius: "10rem 0 0 10rem",
          }}
        />
      </Col>
    </Row>
  );
}
