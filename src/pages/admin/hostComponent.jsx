import React, { useEffect, useState } from "react";
import {
  Table,
  Tag,
  Space,
  Input,
  Button,
  Popconfirm,
  Modal,
  Form,
  Switch,
  notification,
} from "antd";
import { getAllHostApi, createHostApi } from "../../util/admin/apiAdmin"; // Import createHostApi
import "antd/dist/reset.css";

const { Search } = Input;

const HostTable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddHostModalVisible, setIsAddHostModalVisible] = useState(false); // State for add host modal
  const [selectedHost, setSelectedHost] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await getAllHostApi();
      setData(responseData);
      setFilteredData(responseData);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleSearch = (value) => {
    const filtered = data.filter(
      (user) =>
        user.username.toLowerCase().includes(value.toLowerCase()) ||
        user.email.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleEdit = (host) => {
    setSelectedHost(host);
    form.setFieldsValue({
      is_active: host.is_active,
      is_ban: host.is_ban,
    });
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    const values = await form.validateFields();
    // Here you would call your API to update the host
    console.log("Updating host:", selectedHost._id, values);

    // Update the local state
    setData((prevData) =>
      prevData.map((item) =>
        item._id === selectedHost._id ? { ...item, ...values } : item
      )
    );

    // Close the modal
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = (hostId) => {
    console.log(`Deleting host with ID: ${hostId}`);
    // Implement deletion logic here
  };

  const handleAddHost = async () => {
    try {
      const values = await form.validateFields(); // Validate form fields

      // Check for missing values
      if (
        !values === undefined ||
        values.username === undefined ||
        !values.email === undefined ||
        !values.password === undefined
      ) {
        notification.error({
          message: "Validation Error",
          description:
            "Please fill in all required fields: username, email, and password.",
        });
        return; // Exit the function if validation fails
      }

      // Call the API to create a new host
      const newHost = await createHostApi(values);

      // Check if the API call was successful
      if (newHost && newHost.EC === 0) {
        // Check for the success code from the backend
        // Display success notification
        notification.success({
          message: "Add Host Successful",
          description: `Host ${newHost.host.username} added successfully!`,
        });

        // Fetch updated data and update local state
        const responseData = await getAllHostApi(); // Refresh data
        setData(responseData);
        setFilteredData(responseData);
        setIsAddHostModalVisible(false); // Close the modal
        form.resetFields(); // Reset form fields
      } else {
        // Display error notification if the host was not added successfully
        notification.error({
          message: "Add Host Failed",
          description:
            newHost?.message || "An error occurred while adding the host.",
        });
      }
    } catch (error) {
      console.error("Error adding host:", error);
    }
  };

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: ["5", "10", "20", "50", "100"],
  });

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Active Account",
      key: "is_active",
      render: (_, { is_active }) => (
        <Tag color={is_active ? "green" : "red"}>
          {is_active ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Ban",
      key: "is_ban",
      render: (_, { is_ban }) => (
        <Tag color={is_ban ? "red" : "green"}>
          {is_ban ? "Banned" : "Not Banned"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link">List Properties</Button>
          <Button onClick={() => handleEdit(record)} type="link">
            Set Permission
          </Button>
          <Popconfirm
            title="Are you sure to delete this host?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        style={{ marginBottom: 20 }}
        onClick={() => setIsAddHostModalVisible(true)}
      >
        Add Host
      </Button>
      <Search
        placeholder="Search username/gmail hoster..."
        onSearch={handleSearch}
        style={{ marginBottom: 20 }}
      />
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={pagination}
        loading={loading}
        rowKey="_id"
        onChange={handleTableChange}
      />

      <Modal
        title="Set Permission"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="is_active"
            label="Active Account"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.Item name="is_ban" label="Ban" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Add Host"
        visible={isAddHostModalVisible}
        onOk={handleAddHost}
        onCancel={() => setIsAddHostModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please input the username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input the email!" },
              { type: "email", message: "The input is not valid E-mail!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input the password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="phone" label="Phone">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default HostTable;
