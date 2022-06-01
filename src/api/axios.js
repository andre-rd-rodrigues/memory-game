import { getToken } from "./auth";

const { default: axios } = require("axios");

// Set config defaults when creating the instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});

// Alter defaults after instance has been created
axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;

export { axiosInstance };
