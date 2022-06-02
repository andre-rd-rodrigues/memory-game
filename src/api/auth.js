import axios from "axios";
import { httpUtils, notification, authUtils } from "utils";

const { errorMessage } = httpUtils;

// Set config defaults when creating the instance
const authRequest = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/auth`
});

//HTTP
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
      authUtils.setStorage(token, user);

      notification(`Welcome ${name}!`, "success");
      return data;
    })
    .catch((err) => errorMessage(err));

const postRegister = async (values) =>
  await authRequest
    .post("/register", {
      password: values.password,
      email: values.email,
      name: values.name
    })
    .then(({ data }) => {
      notification(
        `Registered successfully ${data?.results?.user?.name}!`,
        "success"
      );
      return data;
    })
    .catch((err) => errorMessage(err));

export { postLogin, postRegister };
