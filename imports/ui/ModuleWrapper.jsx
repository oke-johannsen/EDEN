import {
  BookOutlined,
  CalendarOutlined,
  CarryOutOutlined,
  LogoutOutlined,
  MailOutlined,
  SettingOutlined,
  TagOutlined,
} from "@ant-design/icons";
import Sider from "antd/lib/layout/Sider";
import Layout, { Content, Footer, Header } from "antd/lib/layout/layout";
import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import message from "antd/lib/message";
import Button from "antd/lib/button";
import Row from "antd/lib/row";
import Col from "antd/lib/col";

export default function ModuleWrapper({ user }) {
  const [leftSiderExpanded, setLeftSiderExpanded] = useState(true);
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
          <h1
            style={{ color: "var(--primary-color)" }}
          >{`Welcome to EDEN, ${user?.profile?.firstname} ${user?.profile?.lastname}`}</h1>
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
        </Header>
        <Layout
          style={{
            background: "var(--background-color)",
          }}
        >
          <Sider
            collapsed={!leftSiderExpanded}
            onClick={() => setLeftSiderExpanded(!leftSiderExpanded)}
            theme="light"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingInline: "1rem",
            }}
          >
            <Row justify="center" align="middle">
              <Col
                span={24}
                style={{ color: "var(--primary-color)", fontSize: "2rem" }}
              >
                <BookOutlined /> {leftSiderExpanded && "Notes"}
              </Col>
              <Col
                span={24}
                style={{ color: "var(--primary-color)", fontSize: "2rem" }}
              >
                <CalendarOutlined /> {leftSiderExpanded && "Calendar"}
              </Col>
              <Col
                span={24}
                style={{ color: "var(--primary-color)", fontSize: "2rem" }}
              >
                <MailOutlined /> {leftSiderExpanded && "E-Mail"}
              </Col>
              <Col
                span={24}
                style={{ color: "var(--primary-color)", fontSize: "2rem" }}
              >
                <CarryOutOutlined /> {leftSiderExpanded && "Tasks"}
              </Col>
              <Col
                span={24}
                style={{ color: "var(--primary-color)", fontSize: "2rem" }}
              >
                <TagOutlined /> {leftSiderExpanded && "Labels"}
              </Col>
              <Col
                span={24}
                style={{ color: "var(--primary-color)", fontSize: "2rem" }}
              >
                <SettingOutlined /> {leftSiderExpanded && "Settings"}
              </Col>
            </Row>
          </Sider>
          <Content style={{ borderRadius: "10rem 0 0 10rem" }}>
            <div
              style={{
                borderRadius: "2rem 0 0 2rem",
                height: "100%",
                width: "100%",
                padding: "1rem 0 0 2rem",
                background: "#edd3bd",
              }}
            >
              body
            </div>
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
}
