import axios from "./axios.customize";

const createUserApi = (name, email, password) => {
  const URL_API = "/v1/api/register";
  const data = {
    name,
    email,
    password,
  };
  return axios.post(URL_API, data);
};

const loginUserApi = (email, password) => {
  const URL_API = "/v1/api/login";
  const data = {
    email,
    password,
  };
  return axios.post(URL_API, data);
};

const getAllUserApi = () => {
  const URL_API = "/v1/api/getAllUsers";
  return axios.get(URL_API);
};

const getUserByIdApi = (userId) => {
  const URL_API = `/v1/api/users/${userId}`;
  return axios.get(URL_API);
};

const updateUserByIdApi = (userId, data) => {
  const URL_API = `/v1/api/updateUsers/${userId}`;
  return axios.put(URL_API, data);
};

export {
  createUserApi,
  loginUserApi,
  getAllUserApi,
  getUserByIdApi,
  updateUserByIdApi,
};
