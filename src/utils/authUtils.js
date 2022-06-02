//Storage
const sessionStorage_token = "memory_auth_token";
const sessionStorage_user = "memory_user";

const setToken = (token) => sessionStorage.setItem(sessionStorage_token, token);
const getToken = sessionStorage.getItem(sessionStorage_token);

const setUser = (user) =>
  sessionStorage.setItem(sessionStorage_user, JSON.stringify(user));

const setStorage = (token, user) => {
  setToken(token);
  setUser(user);
};

const getUserFromStorage = JSON.parse(
  sessionStorage.getItem(sessionStorage_user)
);

export { setStorage, getToken, setToken, getUserFromStorage };
