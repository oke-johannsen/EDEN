import Sider from "antd/lib/layout/Sider";
import Layout, { Content, Footer, Header } from "antd/lib/layout/layout";
import React, { useState } from "react";
import Headline from "./Headline";
import NavBar from "./NavBar";
import ErrorPage from "./ErrorPage";
import Notes from "./Notes";

const ModuleWrapper = ({ user, activePath }) => {
  const [leftSiderExpanded, setLeftSiderExpanded] = useState(false);
  const getContent = (path = activePath) => {
    switch (path) {
      case "notes":
        return <Notes />;
      case "calendar":
      case "mail":
      case "tasks":
      case "tags":
      case "settings":
        return <ErrorPage />;

      default:
        return <ErrorPage />;
    }
  };
  return (
    <>
      <Layout
        style={{
          height: "100vh",
          width: "100vw",
          background: "var(--background-color)",
        }}
      >
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "var(--background-color)",
            paddingLeft: leftSiderExpanded ? 200 : 80,
            paddingRight: "1rem",
            transition: "all 0.2s,background 0s",
          }}
        >
          <Headline user={user} />
        </Header>
        <Layout
          style={{
            background: "var(--background-color)",
          }}
        >
          <Sider
            collapsed={!leftSiderExpanded}
            onMouseEnter={() => setLeftSiderExpanded(!leftSiderExpanded)}
            onMouseLeave={() => setLeftSiderExpanded(!leftSiderExpanded)}
            theme="light"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingInline: "1rem",
              transition: "all 0.2s,background 0s",
            }}
          >
            <NavBar leftSiderExpanded={leftSiderExpanded} />
          </Sider>
          <Content style={{ borderRadius: "10rem 0 0 10rem" }}>
            {getContent()}
          </Content>
        </Layout>
        <Footer
          style={{
            position: "sticky",
            bottom: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
            paddingLeft: leftSiderExpanded ? 200 : 80,
            background: "var(--background-color)",
            transition: "all 0.2s,background 0s",
          }}
        >
          <h3 style={{ color: "var(--primary-color)", margin: 0, padding: 0 }}>
            footer
          </h3>
        </Footer>
      </Layout>
    </>
  );
};

export default ModuleWrapper;
