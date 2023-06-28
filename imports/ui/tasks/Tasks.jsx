import React, { useState } from "react";
import Table from "antd/lib/table";
import Button from "antd/lib/button";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { TasksApi } from "../../api/TasksApi";
import { PlusCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import TaskModal from "./TaskModal";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { TagsApi } from "../../api/TagsApi";

const Tasks = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [model, setModel] = useState({});

  const { getTag } = useTracker(() => {
    Meteor.subscribe("tags");
    const getTag = (tagId) => TagsApi.findOne(tagId);
    return { getTag };
  }, []);

  const columns = [
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      align: "center",
      render: (priority) => {
        let color;
        switch (priority) {
          case "High":
            color = "#ff4d4f";
            break;
          case "Medium":
            color = "#ffc53d";
            break;
          case "Low":
            color = "#73d13d";
            break;
          default:
            break;
        }
        return (
          <span style={{ color: color || "inherit", fontWeight: "bold" }}>
            {priority}
          </span>
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      align: "center",
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (tags) =>
        tags ? tags.map((tag) => getTag(tag)?.name).join(", ") : "-",
      align: "center",
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (dueDate) => {
        const isToday =
          dayjs(dueDate).format("DD.MM.YYYY") === dayjs().format("DD.MM.YYYY");
        return (
          <span style={{ color: isToday ? "#ff4d4f" : "inherit" }}>
            {dayjs(dueDate).format("DD.MM.YYYY")}
          </span>
        );
      },
      align: "center",
    },
  ];

  // Handle modal visibility
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Subscribe to the tasks collection
  const { tasks, ready } = useTracker(() => {
    const subscription = Meteor.subscribe("tasks");
    return { ready: subscription.ready(), tasks: TasksApi.find().fetch() };
  }, []);

  return (
    <div>
      <Table
        caption={
          <h2 style={{ margin: 0, padding: "16px 24px", textAlign: "left" }}>
            Tasks
          </h2>
        }
        dataSource={tasks}
        columns={columns}
        pagination={tasks.length > 10 ? { pageSize: 10 } : false}
        responsive
        rowKey="_id"
        style={{ maxHeight: "80vh", overflow: "auto", padding: "0 1rem" }}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              setModel({ ...record, dueDate: dayjs(record.dueDate) });
              setIsModalVisible(true);
            },
          };
        }}
      />
      <Row justify="end" style={{ marginRight: "1rem", marginTop: "0.5rem" }}>
        <Col>
          <Button type="dashed" onClick={showModal}>
            Add Task <PlusCircleOutlined />
          </Button>
        </Col>
      </Row>
      <TaskModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        model={model}
        setModel={setModel}
      />
    </div>
  );
};
export default Tasks;
