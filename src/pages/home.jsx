import React from 'react';
import { Button } from 'antd';

const HomePage = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f2f5',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1 style={{
        fontSize: '36px',
        fontWeight: 'bold',
        color: '#333'
      }}>
        Welcome to Our Website!
      </h1>
      <p style={{
        fontSize: '18px',
        color: '#666',
        maxWidth: '600px'
      }}>
        This is your go-to place for the latest updates, news, and more. Explore our features and enjoy your stay!
      </p>
      <Button type="primary" size="large" style={{ marginTop: '20px' }}>
        Get Started
      </Button>
    </div>
  );
};

export default HomePage;
