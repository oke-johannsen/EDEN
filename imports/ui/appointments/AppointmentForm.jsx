import React, { useEffect, useState } from "react";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import DatePicker from "antd/lib/date-picker";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Button from "antd/lib/button";
import Select from "antd/lib/select";
import Radio from "antd/lib/radio";
import Checkbox from "antd/lib/checkbox";
import Tooltip from "antd/lib/tooltip";
import { Meteor } from "meteor/meteor";
import TagSelect from "../tags/TagSelect";
import { DeleteOutlined, SaveOutlined } from "@ant-design/icons";

const { Option } = Select;
const dayOptions = [
  { value: "monday", label: "M", key: "monday" },
  { value: "tuesday", label: "T", key: "tuesday" },
  { value: "wednesday", label: "W", key: "wednesday" },
  { value: "thursday", label: "T", key: "thursday" },
  { value: "friday", label: "F", key: "friday" },
  { value: "saturday", label: "S", key: "saturday" },
  { value: "sunday", label: "S", key: "sunday" },
];
const rhythmOptions = [
  { value: "weekly", label: "Every week", key: "weekly" },
  { value: "monthly", label: "Every month", key: "monthly" },
  { value: "quarterly", label: "Every quarterly", key: "quarterly" },
  { value: "yearly", label: "Every year", key: "yearly" },
];

const AppointmentForm = ({ model, onFinish, onCancel }) => {
  const [form] = Form.useForm();
  const [recurring, setRecurring] = useState(model?.recurring ? 1 : 0);

  useEffect(() => {
    form.setFieldValue("title", model?.title);
    form.setFieldValue("start", model?.start);
    form.setFieldValue("end", model?.end);
    form.setFieldValue("location", model?.location);
    form.setFieldValue("tags", model?.tags);
    form.setFieldValue("recurring", model?.recurring || recurring);
    if (model?.recurring) {
      form.setFieldValue(
        "days",
        model?.days || dayOptions.map((option) => option.value)
      );
      form.setFieldValue("rhythm", model?.rhythm);
    }

    return () => {
      form.resetFields();
    };
  }, [model]);

  useEffect(() => {
    form.setFieldValue("recurring", recurring);
    if (recurring === 0 && form.getFieldValue("days")?.length) {
      form.setFieldValue(undefined);
    }
  }, [recurring]);

  return (
    <Form form={form} onFinish={(values) => onFinish(values)} layout="vertical">
      <Form.Item
        name="title"
        label="Title"
        rules={[{ required: true, message: "Please enter the title" }]}
      >
        <Input placeholder="Enter the title" />
      </Form.Item>
      <Row gutter={8}>
        <Col span={12}>
          <Form.Item
            name="start"
            label="Start"
            rules={[
              { required: true, message: "Please select the start date" },
            ]}
          >
            <DatePicker
              placeholder="Select the start date"
              format={"DD.MM HH:mm"}
              style={{ width: "100%" }}
              showTime
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="end"
            label="End"
            rules={[{ required: true, message: "Please select the end date" }]}
          >
            <DatePicker
              placeholder="Select the end date"
              format={"DD.MM HH:mm"}
              style={{ width: "100%" }}
              showTime
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        name="location"
        label="Location"
        rules={[{ required: true, message: "Please enter the location" }]}
      >
        <Input placeholder="Enter the location" />
      </Form.Item>
      <Form.Item name="tags" label="Tags">
        <TagSelect
          value={model.tags}
          onChange={(value) => form.setFieldValue("tags", value)}
        />
      </Form.Item>
      <Form.Item name="recurring">
        <Radio.Group onChange={(e) => setRecurring(e.target.value)}>
          <Radio value={1}>Repeats</Radio>
          <Radio value={0}>Does not repeat</Radio>
        </Radio.Group>
      </Form.Item>
      {recurring === 1 && (
        <>
          <Form.Item
            name="days"
            label="What days?"
            rules={[{ required: true, message: "Please select any days" }]}
          >
            <Checkbox.Group>
              <Row>
                {dayOptions.map((option) => {
                  return (
                    <Col style={{ width: "20%" }} key={option.key}>
                      <Tooltip title={option.value}>
                        <Checkbox value={option.value}>{option.label}</Checkbox>
                      </Tooltip>
                    </Col>
                  );
                })}
              </Row>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item
            name="rhythm"
            label="How often?"
            rules={[
              {
                required: true,
                message: "Please select the rhythm of the appointment",
              },
            ]}
          >
            <Select placeholder="Select any  rhythm option">
              {rhythmOptions.map((option) => {
                return (
                  <Option key={option.key} value={option.value}>
                    {option.label}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </>
      )}
      <Row style={{ width: "100%" }} justify="end">
        <Col style={{ marginRight: 8 }}>
          <Button type="primary" htmlType="submit">
            Save <SaveOutlined />
          </Button>
        </Col>
        {model._id && (
          <Col>
            <Button
              danger
              onClick={() =>
                Meteor.call("appointments.delete", model._id, () => onCancel())
              }
            >
              Delete <DeleteOutlined />
            </Button>
          </Col>
        )}
      </Row>
    </Form>
  );
};

export default AppointmentForm;
