import React, { useState, useEffect, useContext } from "react";
import { Table, Spin, Button, Modal, Input, notification } from "antd";
import { AuthContext } from "../../components/context/auth.context";
import { getUserByIdApi } from "../../util/api"; // Ensure updateUserByIdApi is imported

const InforHoster = () => {
  const { auth, setAuth, appLoading, setAppLoading } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState();
  const [editingField, setEditingField] = useState(null);
  const [newValue, setNewValue] = useState("");

  useEffect(() => {
    const fetchAccount = async () => {
      const userId = localStorage.getItem("userId");
      const res = await getUserByIdApi(userId);
      console.log(res);
      setUserInfo(res);
    };
    fetchAccount();
  }, [setAuth, setAppLoading]);

  const handleEdit = (field, currentValue) => {
    setEditingField(field);
    setNewValue(currentValue);
  };

  const handleSave = async () => {
    try {
      const updatedUser = { ...userInfo, [editingField]: newValue };
      await updateUserByIdApi(userInfo._id, updatedUser); // Update the user with the new value
      setUserInfo(updatedUser);
      setEditingField(null);
      setNewValue("");
      notification.success({ message: "Cập nhật thông tin thành công!" });
    } catch (error) {
      console.error("Error updating user:", error);
      notification.error({ message: "Cập nhật thông tin thất bại!" });
    }
  };

  const columns = [
    {
      title: "Thông tin",
      dataIndex: "info",
      key: "info",
    },
    {
      title: "Giá trị",
      dataIndex: "value",
      key: "value",
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <Button onClick={() => handleEdit(record.key, record.value)}>
          Chỉnh sửa
        </Button>
      ),
    },
  ];

  const data = userInfo
    ? [
        {
          key: "name",
          info: "Tên người dùng",
          value: userInfo.name || "Chưa có dữ liệu",
        },
        {
          key: "email",
          info: "Email",
          value: userInfo.email || "Chưa có dữ liệu",
        },
        {
          key: "phone",
          info: "Số điện thoại",
          value: userInfo.phone || "Chưa có dữ liệu",
        },
        {
          key: "role",
          info: "Vai trò",
          value: userInfo.role || "Chưa có dữ liệu",
        },
        // Add more fields if needed
      ]
    : [];

  return (
    <>
      {appLoading === true ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#f0f2f5",
          }}
        >
          <Spin size="large" />
        </div>
      ) : data.length > 0 ? (
        <>
          <Table dataSource={data} columns={columns} pagination={false} />

          <Modal
            title="Chỉnh sửa thông tin"
            visible={editingField !== null}
            onOk={handleSave}
            onCancel={() => setEditingField(null)}
          >
            <Input
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              placeholder={`Nhập giá trị mới cho ${editingField}`}
            />
          </Modal>
        </>
      ) : (
        <>Không có thông tin người dùng.</>
      )}
    </>
  );
};

export default InforHoster;
