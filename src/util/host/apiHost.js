import axios from "../axios.customize";

const getAllPropertiesApi = () => {
  const URL_API = "/v1/apiHost/allProperties";
  return axios.get(URL_API);
};

// const getHostByIdApi = (userId) => {
//   const URL_API = `/v1/apiAdmin/getHost/${userId}`;
//   return axios.get(URL_API);
// };

// const createHostApi = (hostData) =>{
//   const URL_API = `/v1/apiAdmin/createHost`;
//   return axios.post(URL_API, hostData);
// }
export { getAllPropertiesApi };
