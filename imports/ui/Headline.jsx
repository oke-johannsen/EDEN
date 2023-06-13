import React from "react";
import { Meteor } from "meteor/meteor";
import message from "antd/lib/message";
import Button from "antd/lib/button";
import { LogoutOutlined } from "@ant-design/icons";

const Headline = ({ user }) => {
  const { firstname, lastname } = user?.profile || {};

  return (
    <>
      <h1 style={{ color: "var(--primary-color)" }}>
        {`Welcome to EDEN, ${firstname} ${lastname}`}
      </h1>
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
    </>
  );
};

export default Headline;
