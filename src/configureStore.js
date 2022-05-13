import { configureStore } from "@reduxjs/toolkit";
import restoreReset from "store/middleware/restoreReset";
import reducer from "./store/rootReducer";

export default function () {
  return configureStore({
    reducer,
    middleware: [restoreReset]
  });
}
