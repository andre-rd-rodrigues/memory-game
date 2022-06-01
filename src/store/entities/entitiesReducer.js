import { combineReducers } from "redux";
import gameReducer from "./game";
import userReducer from "./user";

export default combineReducers({
  game: gameReducer,
  user: userReducer
});
