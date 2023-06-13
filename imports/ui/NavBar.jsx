import {
  BookOutlined,
  CalendarOutlined,
  CarryOutOutlined,
  MailOutlined,
  SettingOutlined,
  TagOutlined,
} from "@ant-design/icons";
import React from "react";
import Button from "antd/lib/button";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { useNavigate } from "react-router-dom";

const NavBar = ({ leftSiderExpanded }) => {
  const navigate = useNavigate();
  const areas = [
    { key: "notes", icon: <BookOutlined /> },
    { key: "calendar", icon: <CalendarOutlined /> },
    { key: "mail", icon: <MailOutlined /> },
    { key: "tasks", icon: <CarryOutOutlined /> },
    { key: "tags", icon: <TagOutlined /> },
    { key: "settings", icon: <SettingOutlined /> },
  ];

  return (
    <Row justify="center" align="middle">
      {areas.map((area) => (
        <Col span={24} key={area.key}>
          <Button
            className="sidebar-button"
            type="text"
            onClick={() => navigate(`/${area.key}`)}
          >
            {area.icon} {leftSiderExpanded && area.key}
          </Button>
        </Col>
      ))}
    </Row>
  );
};

export default NavBar;
