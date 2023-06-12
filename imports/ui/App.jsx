import React, { useEffect, useState } from "react";
import Login from "./Login";
import ConfigProvider from "antd/lib/config-provider";
import { Meteor } from "meteor/meteor";
import ModuleWrapper from "./ModuleWrapper";
import { useTracker } from "meteor/react-meteor-data";

export const App = () => {
  const currentUser = useTracker(() => Meteor.user(), []);
  const html = document.getElementsByTagName("html")[0];
  html.setAttribute("lang", "en");
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorTextBase: "#ffffff",
            fontSize: 16,
            sizeStep: 4,
            sizeUnit: 4,
            borderRadius: 8,
            wireframe: true,
            colorBgBase: "#f0e2d0",
            colorPrimary: "#70af85",
            colorText: "rgba(0, 0, 0, 0.88)",
            colorTextSecondary: "rgba(0, 0, 0, 0.65)",
            colorTextTertiary: "rgba(0, 0, 0, 0.45)",
            colorTextQuaternary: "rgba(0, 0, 0, 0.25)",
            colorBgSpotlight: "rgba(0, 0, 0, 0.85)",
          },
        }}
      >
        {currentUser ? <ModuleWrapper user={currentUser} /> : <Login />}
      </ConfigProvider>
    </>
  );
};
