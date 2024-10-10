import { Table } from "antd";
import { useState, useEffect } from "react";
import { getAllUserApi } from "../util/api";
const userPage = () => {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await getAllUserApi();
      if (res) {
        setDataSource(res.data);
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
      <Table
        bordered
        dataSource={dataSource}
        columns={columns}
        rowKey={"_id"}
      />
      ;
    </div>
  );
};

export default userPage;
