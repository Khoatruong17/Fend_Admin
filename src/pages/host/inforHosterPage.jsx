import React, { useState, useEffect, useContext } from "react";
import { Table, Spin, Button, Modal, Input, notification } from "antd";
import { AuthContext } from "../../components/context/auth.context";
import { getUserByIdApi, updateUserByIdApi } from "../../util/api";

const InforHoster = () => {
  const { auth, setAuth, appLoading, setAppLoading } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState();
  const [editingField, setEditingField] = useState(null);
  const [newValue, setNewValue] = useState("");

  useEffect(() => {
    if (editingField !== null) {
      startEditing(); // Đặt giá trị mặc định khi mở Modal
    }
    const fetchAccount = async () => {
      const userId = localStorage.getItem("userId");
      const res = await getUserByIdApi(userId);
      setUserInfo(res);
    };
    fetchAccount();
  }, [editingField, setAuth, setAppLoading]);

  const handleEdit = (field, currentValue) => {
    setEditingField(field);
    setNewValue(currentValue);
  };

  const handleSave = async () => {
    try {
      const updatedUser = { ...userInfo, [editingField]: newValue };
      const res = await updateUserByIdApi(userInfo._id, updatedUser); // Update the user with the new value
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
      title: "Info",
      dataIndex: "info",
      key: "info",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button onClick={() => handleEdit(record.key, record.value)}>
          Edit
        </Button>
      ),
    },
  ];

  const data = userInfo
    ? [
        {
          key: "username",
          info: "Username",
          value: userInfo.username || "",
        },
        {
          key: "email",
          info: "Email",
          value: userInfo.email || "",
        },
        {
          key: "phone",
          info: "PhoneNumber",
          value: userInfo.phone || "",
        },
        {
          key: "role",
          info: "Role",
          value: userInfo.role || "",
        },
        {
          key: "password",
          info: "Password",
          value: "****************",
        },
      ]
    : [];

  const startEditing = () => {
    setNewValue("");
  };

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
            title={`Edit ${editingField}`}
            open={editingField !== null}
            onOk={newValue ? handleSave : null} // Gọi hàm handleSave khi có giá trị nhập
            onCancel={() => setEditingField(null)}
            okButtonProps={{ disabled: !newValue }} // Vô hiệu hóa nút OK khi giá trị trống
          >
            <Input
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              placeholder={`Input new values for ${editingField}`}
            />
          </Modal>
        </>
      ) : (
        <>No Host Information.</>
      )}
    </>
  );
};

export default InforHoster;
