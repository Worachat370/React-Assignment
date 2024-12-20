import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography, Space } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

const { Title } = Typography;

function DashBoard({ onLogout }) {
  return (
    <>
      <div
        className="container"
        style={{
          textAlign: "center",
          paddingRight: "400px",
          paddingTop: "100px",
          paddingLeft: "400px",

          border: "2px solid #d9d9d9",
          borderRadius: "20px",
          margin: "20px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Title level={1}>Home</Title>
        <br />

        <Space direction="vertical" size="large">
          <Link to="/finance">
            <Button type="primary" size="large" style={{ width: "250px" }}>
              Finance Tracker
            </Button>
          </Link>
          <br />

          <Link to="/chart">
            <Button
              size="large"
              style={{
                width: "250px",
                backgroundColor: "#000000",
                color: "white", 
                borderColor: "#000000", 
              }}
            >
              Chart Dataset
            </Button>
          </Link>
          <br />

          <Button
            type="danger" 
            size="large"
            icon={<LogoutOutlined />}
            onClick={onLogout}
            style={{
              width: "250px",
              backgroundColor: "#ff4d4f", 
              color: "white", 
              borderColor: "#ff4d4f", 
            }}
          >
            Logout
          </Button>
          <br />
        </Space>
      </div>
    </>
  );
}

export default DashBoard;
