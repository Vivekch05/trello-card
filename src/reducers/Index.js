
import { combineReducers } from "redux";
import TrelloReducer from "./TrelloReducer";
export default combineReducers({
  trelloItem: TrelloReducer
});