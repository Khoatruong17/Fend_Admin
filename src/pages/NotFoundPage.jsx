// NotFoundPage.jsx
import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h1>404 - Page Not Found</h1>
      <p>
        The page you are looking for doesn’t exist or you don’t have permission
        to access it.
      </p>
      <Button type="primary" onClick={goBack} style={{ marginTop: "20px" }}>
        Go Back
      </Button>
    </div>
  );
};

export default NotFoundPage;
