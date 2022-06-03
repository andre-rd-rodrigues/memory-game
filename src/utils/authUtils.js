//Storage
const sessionStorage_token = "memory_auth_token";
const sessionStorage_user = "memory_user";

const setToken = (token_arg) =>
  sessionStorage.setItem(sessionStorage_token, token_arg);

let token = () => sessionStorage.getItem(sessionStorage_token);

const setUser = (user) =>
  sessionStorage.setItem(sessionStorage_user, JSON.stringify(user));

const setStorage = (token_arg, user) => {
  setToken(token_arg);
  setUser(user);
};

const getUserFromStorage = JSON.parse(
  sessionStorage.getItem(sessionStorage_user)
);

//Logout

const logout = () => {
  sessionStorage.removeItem(sessionStorage_token);
  window.location.pathname = "/login";
};
export { setStorage, token, setToken, getUserFromStorage, logout };
