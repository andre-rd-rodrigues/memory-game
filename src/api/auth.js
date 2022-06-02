import axios from "axios";
import { setStorage } from "utils/authUtils";

// Set config defaults when creating the instance
const authRequest = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}auth`
});

const postLogin = async (values) =>
  await authRequest
    .post("/login", {
      password: values.password,
      email: values.email
    })
    .then(({ data }) => {
      const { email, id, name, token } = data.results;

      let user = { email, id, name };

      //Set storage (user & token)
      setStorage(token, user);
      return data;
    })
    .catch((err) => {
      return err?.response?.data;
    });

const postRegister = async (values) =>
  await authRequest
    .post("/register", {
      password: values.password,
      email: values.email,
      name: values.name
    })
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      return err?.response?.data;
    });

export { authRequest, postLogin, postRegister };
