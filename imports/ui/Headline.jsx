import React from "react";
import { Meteor } from "meteor/meteor";
import message from "antd/lib/message";
import Button from "antd/lib/button";
import { LogoutOutlined } from "@ant-design/icons";
import Row from "antd/lib/row";
import Col from "antd/lib/col";

const Headline = ({ user }) => {
  return (
    <>
      <Row justify="end" style={{ width: "100%" }}>
        <Col>
          <Button
            type="primary"
            onClick={() => {
              Meteor.logout((err, _res) =>
                !err
                  ? message.success("See you soon 👋")
                  : message.error("We are not ready to let you go yet 🔒")
              );
            }}
          >
            Logout <LogoutOutlined />
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Headline;
