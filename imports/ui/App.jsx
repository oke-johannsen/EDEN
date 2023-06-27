import React from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import ModuleWrapper from "./ModuleWrapper";
import Login from "./Login";
import ConfigProvider from "antd/lib/config-provider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ErrorPage from "./ErrorPage";

const html = document.getElementsByTagName("html")[0];
html.setAttribute("lang", "en");

export const App = () => {
  const currentUser = useTracker(() => Meteor.user(), []);

  return (
    <>
      <ConfigProvider
        theme={
          {
            /* token: {
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
          }, */
          }
        }
      >
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                currentUser ? <ModuleWrapper user={currentUser} /> : <Login />
              }
            />
            <Route
              path="/notes"
              element={
                currentUser ? (
                  <ModuleWrapper user={currentUser} activePath={"notes"} />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="/calendar"
              element={
                currentUser ? (
                  <ModuleWrapper user={currentUser} activePath={"calendar"} />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="/mail"
              element={
                currentUser ? (
                  <ModuleWrapper user={currentUser} activePath={"mail"} />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="/tasks"
              element={
                currentUser ? (
                  <ModuleWrapper user={currentUser} activePath={"tasks"} />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="/tags"
              element={
                currentUser ? (
                  <ModuleWrapper user={currentUser} activePath={"tags"} />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="/settings"
              element={
                currentUser ? (
                  <ModuleWrapper user={currentUser} activePath={"settings"} />
                ) : (
                  <Login />
                )
              }
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Router>
      </ConfigProvider>
    </>
  );
};
