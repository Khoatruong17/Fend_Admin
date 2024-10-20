import React, { useState, useEffect, useContext } from "react";
import { Table, Spin, Button, Modal, Input, notification, Space, Popconfirm,Tag } from "antd";
import { AuthContext } from "../../components/context/auth.context";
import { getAllPropertiesApi } from "../../util/host/apiHost"; // Ensure updateUserByIdApi is imported

const { Search } = Input;

const PropertiesPage = () => {
  const { auth, setAuth, appLoading, setAppLoading } = useContext(AuthContext);
  const [propertyInfo, setPropertyInfo] = useState();
  const [editingField, setEditingField] = useState(null);
  const [newValue, setNewValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchAccount = async () => {
      setLoading(true); // Show loading before fetching data

      try {
        const responseData = await getAllPropertiesApi(); // Fetch the data
        console.log("Fetched data:", responseData.data); // Log the response data for debugging

        if (Array.isArray(responseData.data)) {
          setData(responseData.data);           // Set the original data
          setFilteredData(responseData.data);   // Set the filtered data (initially the same)
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

    fetchAccount(); // Call the function
  }, []);


  const handleEdit = (host) => {
    setSelectedHost(host);
    form.setFieldsValue({
      is_active: host.is_active,
      is_ban: host.is_ban,
    });
    setIsModalVisible(true);
  };
  const handleDelete = (hostId) => {
    console.log(`Deleting properties with ID: ${hostId}`);
    // Implement deletion logic here
  };
  const handleSearch = (value) => {
    const filtered = data.filter(properties =>
      properties.name.toLowerCase().includes(value.toLowerCase()) ||
      properties.address.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: ['5', '10', '20', '50', '100'],
  });

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };


  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amanities",
      dataIndex: "amanities",
      key: "amanities",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, { status }) => (
        <Tag color={status ? 'green' : 'red'}>
          {status ? 'Active' : 'Hidden'}
        </Tag>)
    },
    {
      title: "Verify",
      dataIndex: "verify",
      key: "verify",
      render: (_, { isCheck }) => (
        <Tag color={isCheck ? 'green' : 'red'}>
          {isCheck ? 'Active' : 'Hidden'}
        </Tag>)
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link">List Properties</Button>
          <Button onClick={() => handleEdit(record)} type="link">Set Permission</Button>
          <Popconfirm
            title="Are you sure to delete this host?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];



  

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
          <h1>List Properties of</h1>
          <Search
            placeholder="Search username/gmail hoster..."
            onSearch={handleSearch}
            style={{ marginBottom: 20 }}
          />
          <Table
            columns={columns}
            dataSource={Array.isArray(filteredData) ? filteredData : []} // Ensure it's always an array
            pagination={pagination}
            loading={loading}
            rowKey="_id"
            onChange={handleTableChange}
            locale={{ emptyText: "No data available" }}  /* Custom 'No Data' message */
          />
        </>
      )}
    </>
  );


}
export default PropertiesPage;
