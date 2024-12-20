import React from 'react';
import { Button, Typography, Space } from 'antd';

const { Title } = Typography;

const Prepage = ({ onStart }) => {
  return (
    <div 
      className="Prepage" 
      style={{
        position: 'relative',
        height: '40vh',
        margin: 0, 
        padding: 0,
      }}
    >
      <video 
        src="/images/Download.mp4" 
        autoPlay 
        loop 
        muted 
        style={{
          position: 'fixed',
          top:0 ,
          left: 575,
          width: '100%',
          height: '100%'}}
      />
      <video 
        src="/images/Download.mp4" 
        autoPlay 
        loop 
        muted 
        style={{
          position: 'fixed',
          top:0,
          right: 575,
          width: '100%',
          height: '100%'}}
      />

      <div 
        className="content"
        style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
          textAlign: 'center',
          maxWidth: '600px', 
          margin: 'auto', 
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
