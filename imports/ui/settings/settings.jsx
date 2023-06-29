import React from "react";
import Tabs from "antd/lib/tabs";
import ProfileSettings from "./ProfileSettings";

const Settings = ({ user }) => {
  return (
    <Tabs
      defaultActiveKey="general"
      style={{ margin: "0 1rem" }}
      items={[
        {
          key: "1",
          label: "General",
          children: (
            <>
              <h2>General Settings</h2>
              <ProfileSettings user={user} />
            </>
          ),
        },
        {
          key: "2",
          label: "Apearence",
          disabled: true,
          children: (
            <>
              {" "}
              <h2>Appearance Settings</h2>
            </>
          ),
        },
        {
          key: "3",
          label: "Notifications",
          disabled: true,
          children: (
            <>
              <h2>Notification Settings</h2>
            </>
          ),
        },
      ]}
    />
  );
};

export default Settings;
