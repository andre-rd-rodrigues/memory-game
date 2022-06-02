import axios from "axios";
import { getToken, getUserFromStorage } from "utils/authUtils";

// User
const user = getUserFromStorage;

// Instance
const userRequest = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/user/${user?.id}`
});

userRequest.interceptors.request.use(
  function (config) {
    const token = getToken;
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

//HTTP
const postGameMatch = async (values) => {
  const match = {
    moves: values.moves,
    duration: values.duration,
    date: values.date
  };

  await userRequest
    .post("/games/history", match)
    .then(({ data }) => {
      return data?.results;
    })
    .catch((err) => {
      throw err?.response?.data;
    });
};
const getUser = async () => {
  if (!user) {
    window.location.hash = "#/login";
    throw "User not authenticated";
  }

  return await userRequest
    .get("")
    .then(({ data }) => {
      return data?.results?.user;
    })
    .catch((err) => {
      throw err?.response?.data;
    });
};

export { postGameMatch, getUser };
