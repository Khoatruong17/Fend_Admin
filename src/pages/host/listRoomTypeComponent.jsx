import React, { useState, useEffect, useContext } from "react";
import {
  Table,
  Spin,
  Button,
  Modal,
  Input,
  notification,
  Space,
  Popconfirm,
  Tag,
  Form,
  Checkbox,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

import { AuthContext } from "../../components/context/auth.context";
import { getRT } from "../../util/host/apiHost"; // Ensure updateUserByIdApi is imported

const { Search } = Input;

const amenitiesOptions = [
  "WiFi",
  "Parking",
  "Air Conditioning",
  "Pool",
  "Gym",
  "Breakfast",
  // Add more amenities as needed
];

const RoomType = ({ onBack, property_id }) => {
  const { auth, setAuth, appLoading, setAppLoading } = useContext(AuthContext);
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPT, setSelectedPT] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const fetchAccount = async () => {
    setLoading(true); // Show loading before fetching data

    try {
      console.log(property_id);
      const responseData = await getRT();
      console.log(responseData);
      setFilteredData(responseData);
      if (Array.isArray(responseData.data)) {
        setData(responseData.data); // Set the original data
        setFilteredData(responseData.data); // Set the filtered data (initially the same)
      } else {
        console.error("Response data is not an array:", responseData.data);
        setFilteredData([]); // Fallback to empty array if the data is not valid
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setFilteredData([]); // Handle error state
    }

    setLoading(false); // Turn off loading once the data is fetched
  };

  useEffect(() => {
    fetchAccount(); // Call the function on initial load
  }, []);

  const handleEdit = (property) => {
    setSelectedPT(property);
    form.setFieldsValue({
      name: property.name, // Property name
      description: property.description, // Property description
      address: property.location, // Property address
      amenities: property.amenities || [], // Pre-select amenities
      is_active: property.is_active,
    });
    setIsModalVisible(true);
  };

  const handleDelete = async (property_id) => {
    try {
      const responseData = await deletedProperties(property_id); // Fetch the data
      if (responseData && responseData.EC === 0) {
        notification.success({
          message: "Deleted Successful",
          description: `Properties ${responseData.data.name} deleted successfully!`,
        });
        fetchAccount();
      } else {
        notification.error({
          message: "Deleted Failed",
          description:
            responseData?.message || "An error occurred while adding the host.",
        }); // Fallback to empty array if the data is not valid
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = (value) => {
    const filtered = data.filter((typeofRoom) =>
      typeofRoom?.typeOfRoom?.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
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
      title: "No",
      key: "stt",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Image",
      dataIndex: "images",
      key: "images",
      render: (images) => {
        const firstImage =
          Array.isArray(images) && images.length > 0 ? images[0] : null;
        return firstImage ? (
          <img src={firstImage} alt="Property" style={{ width: 100 }} />
        ) : (
          <span>No Image</span> // Optional: handle case when there's no image
        );
      },
    },
    {
      title: "Type Room",
      dataIndex: "typeOfRoom",
      key: "typeOfRoom",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Amenities",
      dataIndex: "amenities",
      key: "amenities",
      render: (amenities) =>
        Array.isArray(amenities) ? amenities.join(", ") : "",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, { status }) => (
        <Tag color={status ? "green" : "red"}>
          {status ? "Active" : "Hidden"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<UnorderedListOutlined />} type="link" />
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            type="link"
          />
          <Popconfirm
            title="Are you sure to delete this property?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} type="link" danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleAmenitiesChange = (checkedValues) => {
    console.log("Selected Amenities: ", checkedValues);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      const responseData = await updateProperty(selectedPT._id, values);
      if (responseData && responseData.EC === 0) {
        notification.success({
          message: "Update Successful",
          description: `Property ${responseData.data.name} updated successfully!`,
        });
        fetchAccount();
        setIsModalVisible(false);
      } else {
        notification.error({
          message: "Update Failed",
          description:
            responseData?.message ||
            "An error occurred while updating the property.",
        });
      }
    } catch (error) {
      console.error("Error updating property:", error);
      notification.error({
        message: "Update Failed",
        description: "Please check the form fields.",
      });
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false); // Close modal
  };

  return (
    <>
      {appLoading ? (
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
      ) : (
        <>
          <div
            style={{
              marginBottom: 20,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Search
              placeholder="Search name of property..."
              onSearch={handleSearch}
              style={{ width: "300px" }}
            />
            <Button onClick={fetchAccount} type="primary">
              Refresh
            </Button>
          </div>
          <Button onClick={onBack} type="primary" style={{ marginBottom: 20 }}>
            Back to Properties
          </Button>
          <Table
            columns={columns}
            dataSource={Array.isArray(filteredData) ? filteredData : []}
            pagination={pagination}
            loading={loading}
            rowKey="_id"
            onChange={handleTableChange}
          />
        </>
      )}
    </>
  );
};

export default RoomType;
