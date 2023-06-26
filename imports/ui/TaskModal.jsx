import React from "react";
import Modal from "antd/lib/modal";
import TaskForm from "./TaskForm";

const TaskModal = ({ isModalVisible, setIsModalVisible, model, setModel }) => {
  const handleCancel = () => {
    setIsModalVisible(false);
    setModel({});
  };
  return (
    <Modal
      title={`${model._id ? "Update" : "Add"} Task`}
      open={isModalVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <TaskForm
        setIsModalVisible={setIsModalVisible}
        model={model}
        setModel={setModel}
      />
    </Modal>
  );
};

export default TaskModal;
