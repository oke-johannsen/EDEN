import React from "react";
import List from "antd/lib/list";
import Badge from "antd/lib/badge";
import Button from "antd/lib/button";
import Form from "antd/lib/form";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { TagsApi } from "../../api/TagsApi";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import TagModal from "./TagModal";

const Tags = () => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [form] = Form.useForm();

  // Handle modal visibility
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Handle tag deletion
  const handleDelete = (tagId) => {
    Meteor.call("tags.delete", tagId);
  };

  // Subscribe to the tasks collection
  const { tags, ready } = useTracker(() => {
    const subscription = Meteor.subscribe("tags");
    return { ready: subscription.ready(), tags: TagsApi.find().fetch() };
  }, []);

  return (
    <div>
      <List
        header={<h2 style={{ margin: 0 }}>Tags</h2>}
        size="large"
        dataSource={tags}
        pagination={tags.length > 10 ? { pageSize: 10 } : false}
        style={{ maxHeight: "80vh", overflow: "auto", margin: "0 1rem" }}
        bordered
        renderItem={(tag) => {
          return (
            <List.Item
              key={tag._id}
              actions={[
                <EditOutlined
                  onClick={() => {
                    form.setFieldsValue(tag);
                    showModal();
                  }}
                />,
                <DeleteOutlined
                  onClick={() => handleDelete(tag._id)}
                  style={{ color: "#ff4d4f" }}
                />,
              ]}
            >
              <Badge color={tag.color} text={tag.name} />
            </List.Item>
          );
        }}
      />
      <Row justify="end" style={{ marginRight: "1rem", marginTop: "0.5rem" }}>
        <Col>
          <Button type="dashed" onClick={showModal}>
            Add Tag <PlusCircleOutlined />
          </Button>
        </Col>
      </Row>
      <TagModal
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        form={form}
      />
    </div>
  );
};

export default Tags;
