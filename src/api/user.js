import axios from "axios";
import { notification, authUtils } from "utils";

const { token, getUserFromStorage, setToken } = authUtils;

// User
const user = getUserFromStorage;

// Instance
const userRequest = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/user/${user?.id}`
});

//Interceptor
userRequest.interceptors.request.use(
  function (config) {
    if (!token) {
      return console.log("User not authenticated");
    }

    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

userRequest.interceptors.response.use(
  function (response) {
    return response;
  },
  function (err) {
    //Token expiration
    const status = err?.response?.status;
    if (status === 401) {
      setToken(undefined);
    }
    return Promise.reject(err);
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
  return await userRequest
    .get("")
    .then(({ data }) => {
      return data?.results?.user;
    })
    .catch((err) => {
      const response = err?.response?.data;
      return response?.message;
    });
};

export { postGameMatch, getUser };
