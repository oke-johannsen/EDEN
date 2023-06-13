import Result from "antd/lib/result";
import Button from "antd/lib/button";
import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  const backHome = () => navigate("/");
  return (
    <Result
      status={"404"}
      title="Page doesn't exist"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={backHome}>
          Back Home
        </Button>
      }
    />
  );
};

export default ErrorPage;
