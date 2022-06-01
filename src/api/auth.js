import { loginUser } from "store/entities/user";
import { axiosInstance } from "./axios";

//Token
const sessionStorage_token = "memory_auth_token";
const setToken = (token) => sessionStorage.setItem(sessionStorage_token, token);
const getToken = sessionStorage.getItem(sessionStorage_token);

//Login
const loginRequest = async (values) => {
  await axiosInstance
    .post("auth/login", {
      password: values.password,
      email: values.email
    })
    .then(({ data }) => {
      const { email, id, name, token } = data.results;
      loginUser({ email, id, name });
      setToken(token);
    })
    .catch((err) => {
      console.log(err);
    });
};

//Register

export { setToken, getToken, loginRequest };
