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
  Select,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { AuthContext } from "../../components/context/auth.context";
import { getListP, getAllTypeRooms } from "../../util/host/apiHost";
import RoomTypeModal from "./roomTypeModal";

const { Search } = Input;

const RoomType = () => {
  const { appLoading } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPT, setSelectedPT] = useState(null);
  const [form] = Form.useForm();
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: ["5", "10", "20", "50", "100"],
  });

  const fetchAccount = async () => {
    setLoading(true);
    try {
      const response = await getListP();
      if (response.EC === 0) {
        setProperties(response.data);
      } else {
        console.error("Error fetching properties:", response.message);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  const handleSearch = (value) => {
    const filtered = data.filter((room) =>
      room?.typeOfRoom?.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  const handlePropertyChange = async (propertyId) => {
    setSelectedProperty(propertyId);
    try {
      const response = await getAllTypeRooms(propertyId);
      if (response.EC === 0) {
        setData(response.data);
        setFilteredData(response.data);
      } else {
        console.error("Error fetching type rooms:", response.message);
      }
    } catch (error) {
      console.error("Error fetching type rooms:", error);
    }
  };

  const openAddModal = () => {
    setEditingRoom(null); // Reset for adding
    setModalVisible(true);
  };

  const openEditModal = (room) => {
    setEditingRoom(room); // Set the room to edit
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const handleModalSubmit = async (formData) => {
    if (editingRoom) {
      // Edit case
      await addOrEditRoom({ ...formData, id: editingRoom._id });
    } else {
      // Add case
      await addOrEditRoom(formData);
    }
    // Refresh the data after success
    fetchData();
  };

  const columns = [
    { title: "No", key: "stt", render: (_, __, index) => index + 1 },
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
          <span>No Image</span>
        );
      },
    },
    { title: "Type Room", dataIndex: "typeOfRoom", key: "typeOfRoom" },
    { title: "Price", dataIndex: "price", key: "price" },
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
          <Button
            icon={<EditOutlined />}
            onClick={() => openEditModal(record)}
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

  return appLoading ? (
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
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Button type="primary" onClick={openAddModal}>
          Add Room Type
        </Button>
        <div style={{ marginTop: "10px" }}>
          <Select
            showSearch
            placeholder="Select Property"
            style={{
              width: "500px",
            }}
            onChange={handlePropertyChange}
            value={selectedProperty}
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            {properties.map((property) => (
              <Select.Option key={property._id} value={property._id}>
                {property.name}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>
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
          style={{ width: "500px" }}
        />
        <Button onClick={fetchAccount} type="primary">
          Refresh
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={Array.isArray(filteredData) ? filteredData : []}
        pagination={pagination}
        loading={loading}
        rowKey="_id"
        onChange={handleTableChange}
      />

      <RoomTypeModal
        visible={modalVisible}
        onCancel={handleModalCancel}
        onSubmit={handleModalSubmit}
        roomData={editingRoom}
        properties={properties} // Pass properties to modal
      />
    </>
  );
};

export default RoomType;
