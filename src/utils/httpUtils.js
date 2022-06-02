import notification from "./notifications";

//Error message
export const errorMessage = (err) => {
  const message = err?.response?.data;
  notification(message, "error");
  throw message;
};
