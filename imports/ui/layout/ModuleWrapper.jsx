import Sider from "antd/lib/layout/Sider";
import Layout, { Content, Footer, Header } from "antd/lib/layout/layout";
import React, { useState } from "react";
import Headline from "../layout/Headline";
import NavBar from "../layout/NavBar";
import ErrorPage from "../ErrorPage";
import Notes from "../notes/Notes";
import Calendar from "../appointments/Calendar";
import Tasks from "../tasks/Tasks";
import Tags from "../tags/Tags";
import Settings from "../settings/settings";

const ModuleWrapper = ({ user, activePath }) => {
  const [leftSiderExpanded, setLeftSiderExpanded] = useState(false);
  const getContent = (path = activePath) => {
    switch (path) {
      case "notes":
        return <Notes />;
      case "calendar":
        return <Calendar />;
      case "tasks":
        return <Tasks />;
      case "tags":
        return <Tags />;
      case "settings":
        return <Settings user={user} />;

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
            paddingLeft: leftSiderExpanded ? 216 : 96,
            paddingRight: "1rem",
            transition: "all 0.2s,background 0s",
            background: "transparent",
          }}
        >
          <Headline user={user} />
        </Header>
        <Layout>
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
              background: "#fafafa",
              borderTopRightRadius: 8,
              borderBottomRightRadius: 8,
            }}
          >
            <NavBar leftSiderExpanded={leftSiderExpanded} />
          </Sider>
          <Content>{getContent()}</Content>
        </Layout>
        <Footer
          style={{
            position: "sticky",
            bottom: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
            paddingLeft: leftSiderExpanded ? 216 : 96,
            transition: "all 0.2s,background 0s",
          }}
        >
          <h3 style={{ margin: 0, padding: 0 }}>EDEN</h3>
        </Footer>
      </Layout>
    </>
  );
};

export default ModuleWrapper;
