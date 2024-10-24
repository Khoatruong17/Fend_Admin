import React, { useState, useEffect, useContext } from "react";
import { Modal, Input, Form, Button, Select, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
//import { getAllTypeRooms, addOrEditRoom } from "../../util/host/apiHost";

const RoomTypeModal = ({
  visible,
  onCancel,
  onSubmit,
  roomData,
  properties,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (roomData) {
      form.setFieldsValue({
        property_id: roomData.property_id,
        images: roomData.images,
        typeOfRoom: roomData.typeOfRoom,
        amenities: roomData.amenities,
        price: roomData.price,
      });
    } else {
      form.resetFields();
    }
  }, [roomData, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      await onSubmit(values);

      message.success(
        roomData
          ? "Room type updated successfully!"
          : "Room type added successfully!"
      );
      onCancel(); // Close modal after success
    } catch (error) {
      console.error("Failed to submit:", error);
      message.error("Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      title={roomData ? "Edit Room Type" : "Add Room Type"}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleOk}
        >
          {roomData ? "Update" : "Add"}
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="property_id"
          label="Select Property"
          rules={[{ required: true, message: "Please select a property" }]}
        >
          <Select placeholder="Select Property">
            {properties.map((property) => (
              <Select.Option key={property._id} value={property._id}>
                {property.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="images"
          label="Images"
          rules={[{ required: true, message: "Please upload images" }]}
        >
          <Upload
            listType="picture"
            beforeUpload={() => false} // Prevent automatic upload
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          name="typeOfRoom"
          label="Type of Room"
          rules={[{ required: true, message: "Please enter room type" }]}
        >
          <Input placeholder="Enter room type" />
        </Form.Item>

        <Form.Item
          name="amenities"
          label="Amenities"
          rules={[{ required: true, message: "Please enter amenities" }]}
        >
          <Select
            mode="tags"
            style={{ width: "100%" }}
            placeholder="Enter amenities"
          />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: "Please enter room price" }]}
        >
          <Input type="number" placeholder="Enter price" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RoomTypeModal;
