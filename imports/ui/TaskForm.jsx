import React, { useEffect } from "react";
import Button from "antd/lib/button";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import DatePicker from "antd/lib/date-picker";
import Select from "antd/lib/select";
import { Meteor } from "meteor/meteor";
import dayjs from "dayjs";

const { Option } = Select;

const TaskForm = ({ setIsModalVisible, model = {}, setModel }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldValue("name", model?.name);
    form.setFieldValue("priority", model?.priority);
    form.setFieldValue("dueDate", model?.dueDate);
    form.setFieldValue("description", model?.description);
    form.setFieldValue("status", model?.status);

    return () => {
      form.resetFields();
    };
  }, [model]);

  // Handle form submission
  const onFinish = (values) => {
    const data = {
      ...values,
      _id: model._id || undefined,
      dueDate: dayjs(values.dueDate).toDate(),
    };
    Meteor.call(`tasks.${data._id ? "update" : "insert"}`, data, (error) => {
      if (!error) {
        form.resetFields();
        setIsModalVisible(false);
        setModel({});
      }
    });
  };
  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: "Please enter the task name" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="priority"
        label="Priority"
        rules={[{ required: true, message: "Please select the task priority" }]}
      >
        <Select>
          <Option value="High">High</Option>
          <Option value="Medium">Medium</Option>
          <Option value="Low">Low</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="dueDate"
        label="Due Date"
        rules={[{ required: true, message: "Please select the due date" }]}
      >
        <DatePicker style={{ width: "100%" }} format={"DD.MM.YYYY"} />
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
        rules={[
          { required: true, message: "Please enter the task description" },
        ]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item
        name="status"
        label="Status"
        rules={[{ required: true, message: "Please select the task status" }]}
      >
        <Select>
          <Option value="todo">To Do</Option>
          <Option value="inProgress">In Progress</Option>
          <Option value="done">Done</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
        {model._id && (
          <Button
            style={{ marginLeft: 8 }}
            danger
            onClick={() =>
              Meteor.call("tasks.delete", model._id, () => {
                form.resetFields();
                setIsModalVisible(false);
                setModel({});
              })
            }
          >
            Delete
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
