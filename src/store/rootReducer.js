import { combineReducers } from "redux";
import entitiesReducer from "./entities/entitiesReducer";

export default combineReducers({
  entities: entitiesReducer
});
