import React from 'react';
import { Button, Typography, Space } from 'antd';
import './Prepage.css'; 

const { Title } = Typography;

const Prepage = ({ onStart }) => {
  return (
    <div 
      className="Prepage" 
      style={{
        backgroundImage: 'url("path-to-your-image.jpg")', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        height: '100vh', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div 
        className="content"
        style={{
          backgroundColor: 'white', 
          padding: '40px', 
          borderRadius: '10px', 
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
          textAlign: 'center', 
        }}
      >
        <Title level={1} className="title">Welcome to the Finance Tracker</Title>
        <Space direction="vertical" size="large">
          <Button 
            type="primary" 
            size="large" 
            onClick={onStart} 
            className="start-button"
            style={{
              width: '200px', 
              marginTop: '20px',
            }}
          >
            START TRACK
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default Prepage;
