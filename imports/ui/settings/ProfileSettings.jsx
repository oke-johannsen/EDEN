import React, { useEffect } from "react";
import { UserOutlined, MailOutlined, SaveOutlined } from "@ant-design/icons";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Button from "antd/lib/button";
import { Meteor } from "meteor/meteor";
import message from "antd/lib/message";

const ProfileSettings = ({ user }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    Meteor.call("users.update", user._id, values, (err, _res) => {
      if (!err) {
        message.success("Saved successfully");
      } else {
        message.error("Log in failed");
      }
    });
  };

  useEffect(() => {
    const formFields = {
      username: user?.username,
      firstname: user?.profile?.firstname,
      lastname: user?.profile?.lastname,
      email: user?.emails[0]?.address,
    };

    form.setFieldsValue(formFields);

    return () => {
      form.resetFields();
    };
  }, [user]);

  return (
    <Form
      form={form}
      name="profileSettings"
      labelCol={{ lg: 3, md: 4, sm: 6, xs: 24 }}
      labelAlign="left"
      wrapperCol={{ lg: 9, md: 12, sm: 18, xs: 24 }}
      size="large"
      onFinish={onFinish}
    >
      <Form.Item name="username" label="Username">
        <Input suffix={<UserOutlined />} />
      </Form.Item>
      <Form.Item name="firstname" label="First Name">
        <Input suffix={<UserOutlined />} />
      </Form.Item>
      <Form.Item name="lastname" label="Last Name">
        <Input suffix={<UserOutlined />} />
      </Form.Item>
      <Form.Item name="email" label="Email">
        <Input suffix={<MailOutlined />} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save <SaveOutlined />
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProfileSettings;
