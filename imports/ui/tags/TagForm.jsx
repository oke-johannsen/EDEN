import React from "react";
import Button from "antd/lib/button";
import Input from "antd/lib/input";
import { HexColorPicker } from "react-colorful";
import Form from "antd/lib/form";
import { SaveOutlined } from "@ant-design/icons";

const TagModal = ({ handleCancel, form }) => {
  // Handle form submission for tag creation/update
  const onFinish = (values) => {
    Meteor.call(`tags.${values._id ? "update" : "insert"}`, values, (error) => {
      if (!error) {
        form.resetFields();
        handleCancel();
      }
    });
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item name="_id" hidden>
        <Input />
      </Form.Item>
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: "Please enter the tag name" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="color"
        label="Color"
        rules={[{ required: true, message: "Please enter the tag color" }]}
      >
        <HexColorPicker style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save <SaveOutlined />
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TagModal;
