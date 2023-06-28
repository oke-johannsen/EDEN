import React from "react";
import Modal from "antd/lib/modal";
import TagForm from "./TagForm";

const TagModal = ({ handleCancel, isModalVisible, form }) => {
  return (
    <Modal
      title="Tag Details"
      open={isModalVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <TagForm handleCancel={handleCancel} form={form} />
    </Modal>
  );
};

export default TagModal;
