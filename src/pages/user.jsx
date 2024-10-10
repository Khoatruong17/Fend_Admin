import { Table, Spin, Descriptions, notification } from "antd";
import { useState, useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { getAllUserApi } from "../util/api";
import React from "react";

const userPage = () => {
  const [dataSource, setDataSource] = useState([]);
  var [loading, setLoading] = React.useState(true);
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await getAllUserApi();
      if (!res?.message) {
        setDataSource(res.data);
        setLoading(false);
      } else {
        notification.error({
          message: "Unauthorized",
          description: res.message,
        });
      }
    };
    fetchUsers();
  }, []);

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
  ];

  return (
    <div style={{ padding: 25 }}>
      user page
      <Spin spinning={loading} indicator={<LoadingOutlined spin />}>
        <Table
          bordered
          dataSource={dataSource}
          columns={columns}
          rowKey={"_id"}
        />
      </Spin>
    </div>
  );
};

export default userPage;
