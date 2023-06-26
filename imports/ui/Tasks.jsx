import React, { useState } from "react";
import Table from "antd/lib/table";
import Button from "antd/lib/button";
import Select from "antd/lib/select";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { TasksApi } from "../api/TasksApi";
import { PlusCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import TaskModal from "./TaskModal";

const { Option } = Select;
const columns = [
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
    title: "Priority",
    dataIndex: "priority",
    key: "priority",
    align: "center",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    align: "center",
  },
  {
    title: "Due Date",
    dataIndex: "dueDate",
    key: "dueDate",
    render: (dueDate) => dayjs(dueDate).format("DD.MM.YYYY"),
    align: "center",
  },
];

const Tasks = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [model, setModel] = useState({});

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
      <Button type="primary" onClick={showModal}>
        Add Task <PlusCircleOutlined />
      </Button>
      <Table
        dataSource={tasks}
        columns={columns}
        pagination={tasks.length > 10 ? { pageSize: 10 } : false}
        responsive
        rowKey="_id"
        style={{ maxHeight: "80vh", overflow: "auto", padding: "0.5rem" }}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              setModel({ ...record, dueDate: dayjs(record.dueDate) });
              setIsModalVisible(true);
            },
          };
        }}
      />
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
