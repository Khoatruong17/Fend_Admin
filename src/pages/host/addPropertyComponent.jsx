import React, { useState } from "react";
import { Form, Input, Checkbox, Button, notification } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import GoogleAutocomplete from "react-google-autocomplete";
import { createNewProperties } from "../../util/host/apiHost";

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
    console.log("Check data: ", formData);
    try {
      const response = await createNewProperties(formData);
      if (response && response.EC === 0) {
        notification.success({
          message: "Add Property Successful",
          description: `Property ${response.data.name} added successfully!`,
        });
      } else {
        notification.error({
          message: "Add Property Failed",
          description:
            response.message || "An error occurred while adding the property",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      notification.error({
        message: "Add Property Failed",
        description: error || "An error occurred while adding the property",
      });
    }
  };

  const handleChange = (e) => {
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

  const handleLocationSelect = (place) => {
    const address = place.formatted_address;
    setFormData((prev) => ({ ...prev, location: address }));
  };

  const isFormComplete = () => {
    return formData.name && formData.description && formData.address;
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
      <Form.Item label="Address" required>
        <Input
          name="address"
          placeholder="Enter property address"
          onChange={handleChange}
          rows={4}
        />
      </Form.Item>
      {/* <Form.Item label="Property Address" required>
        <GoogleAutocomplete
          apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
          placeholder="Enter property address"
          onPlaceSelected={handleLocationSelect}
          options={{
            types: ["address"],
            componentRestrictions: { country: "us" }, // Adjust country if needed
          }}
          style={{ width: "100%" }}
        />
      </Form.Item> */}

      <Form.Item label="Amenities">
        <Checkbox.Group onChange={handleAmenitiesChange}>
          {amenitiesOptions.map((amenity) => (
            <Checkbox key={amenity} value={amenity}>
              {amenity}
            </Checkbox>
          ))}
        </Checkbox.Group>
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
