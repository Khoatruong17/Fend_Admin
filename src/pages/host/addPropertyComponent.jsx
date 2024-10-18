import React, { useState } from "react";
import { Form, Input, Checkbox, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import GoogleAutocomplete from "react-google-autocomplete";

const amenitiesOptions = [
  "WiFi",
  "Parking",
  "Air Conditioning",
  "Pool",
  "Gym",
  "Breakfast",
  // Add more amenities as needed
];

const AddPropertyForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    amenities: [],
    location: "",
    imageUrl: null,
  });

  const onFinish = async () => {
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    try {
      const response = await fetch("/api/properties", {
        method: "POST",
        body: formDataToSend,
      });
      const data = await response.json();
      message.success("Thêm bất động sản thành công!");
    } catch (error) {
      console.error("Error:", error);
      message.error("Có lỗi xảy ra khi thêm bất động sản.");
    }
  };

  const handleImageChange = (info) => {
    if (info.file.status === "done") {
      setFormData((prev) => ({ ...prev, imageUrl: info.file.response.url }));
    }
  };

  const handleChange = (e) => {
    // Kiểm tra nếu e.target tồn tại
    if (e.target) {
      const { name, value, type, checked } = e.target;

      if (type === "checkbox") {
        setFormData((prev) => ({
          ...prev,
          amenities: checked
            ? [...prev.amenities, value]
            : prev.amenities.filter((amenity) => amenity !== value),
        }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    }
  };

  const handleAmenitiesChange = (checkedValues) => {
    setFormData((prev) => ({ ...prev, amenities: checkedValues }));
  };

  const handleLocationChange = (place) => {
    setFormData((prev) => ({
      ...prev,
      location: place.formatted_address,
    }));
  };

  const isFormComplete = () => {
    return (
      formData.name &&
      formData.description &&
      formData.amenities.length > 0 &&
      formData.location
    );
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item label="Property Name" required>
        <Input
          name="name"
          placeholder="Enter property name"
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item label="Description" required>
        <Input.TextArea
          name="description"
          placeholder="Enter property description"
          onChange={handleChange}
          rows={4}
        />
      </Form.Item>
      <Form.Item label="Amenities">
        <Checkbox.Group onChange={handleAmenitiesChange}>
          {amenitiesOptions.map((amenity) => (
            <Checkbox key={amenity} value={amenity}>
              {amenity}
            </Checkbox>
          ))}
        </Checkbox.Group>
      </Form.Item>

      <Form.Item label="Hình ảnh">
        <Upload name="avatar" listType="picture" onChange={handleImageChange}>
          <Button icon={<UploadOutlined />}>Click để chọn hình</Button>
        </Upload>
      </Form.Item>
      <Form.Item label="Vị trí" required>
        <GoogleAutocomplete
          onPlaceSelected={handleLocationChange}
          style={{ width: "100%" }}
          placeholder="Tìm kiếm địa chỉ"
          // Include your Google Maps API key and other necessary props
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={!isFormComplete()}>
          Create Property
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddPropertyForm;
