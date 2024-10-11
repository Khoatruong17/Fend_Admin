import React, { useContext } from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { AuthContext } from "../components/context/auth.context";

const HomePage = () => {
  const { auth, setAuth } = useContext(AuthContext);
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
        Welcome to the Admin Dashboard!
      </h1>
      <p style={{
        fontSize: '18px',
        color: '#666',
        maxWidth: '600px'
      }}>
        Please log in to access the admin section and manage the content. Ensure secure and effective administration of our platform.
      </p>
      {!auth.isAuthenticated && (
        <Link to="/login">
          <Button type="primary" size="large" style={{ marginTop: '20px' }}>
            Login to Continue
          </Button>
        </Link>
      )}


    </div>
  );

};

export default HomePage;
