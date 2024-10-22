import axios from "../axios.customize";

const getAllPropertiesApi = () => {
  const URL_API = "/v1/apiHost/allProperties";
  return axios.get(URL_API);
};

// create new properties
const createNewProperties = (data) => {
  const URL_API = "/v1/apiHost/createProperties";
  return axios.post(URL_API, data);
};

const deletedProperties = (property_id) => {
  const URL_API = `/v1/apiHost/deleteProperty/${property_id}`;
  return axios.delete(URL_API);
};

const updateProperty = (property_id, data) => {
  const URL_API = `/v1/apiHost/editProperty/${property_id}`;
  return axios.put(URL_API, data);
};

// const getHostByIdApi = (userId) => {
//   const URL_API = `/v1/apiAdmin/getHost/${userId}`;
//   return axios.get(URL_API);
// };

// const createHostApi = (hostData) =>{
//   const URL_API = `/v1/apiAdmin/createHost`;
//   return axios.post(URL_API, hostData);
// }
export {
  getAllPropertiesApi,
  createNewProperties,
  deletedProperties,
  updateProperty,
};
