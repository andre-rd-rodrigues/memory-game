import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notification = (message, type) =>
  toast[type](<p data-testid="notification">{message}</p>);

export default notification;
