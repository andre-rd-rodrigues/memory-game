import { combineReducers } from "redux";
import entitiesReducer from "./entities/entitiesReducer";
import uiReducer from "./ui/uiReducer";

export default combineReducers({
  entities: entitiesReducer,
  ui: uiReducer
});
