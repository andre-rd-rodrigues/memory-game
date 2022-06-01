//Storage
const sessionStorage_token = "memory_auth_token";
const sessionStorage_user = "memory_user";

const setToken = (token) => sessionStorage.setItem(sessionStorage_token, token);
const getToken = sessionStorage.getItem(sessionStorage_token);

const setUser = (user) => sessionStorage.setItem(sessionStorage_user, user);

const setStorage = (token, user) => {
  setToken(token);
  setUser(user);
};

export { setStorage, getToken, setToken };
