import { combineReducers } from "redux";
import createTodoBoxShowReducer from "./CreateTodoBoxShowReducer";
import toDoListItemsDataReducer from "./ToDoListItemsReducer";
import toDoDetailsDataReducer from "./ToDoDetailsReducer";
import toDoItemDeleteDataReducer from "./ToDoItemDeleteReducer";
import toDoItemCreateReducer from "./CreateToDoItemReducers";
import showSnackBarReducer from "./SnackBarShowReducer";
import updateToDoItemReducer from "./UpdateToDoItemReducer";
import sortToDoItemsReducer from "./SortToDoItemsReducer";

export default combineReducers({
  createTodoBoxShowReducer,
  toDoListItemsDataReducer,
  toDoDetailsDataReducer,
  toDoItemDeleteDataReducer,
  toDoItemCreateReducer,
  showSnackBarReducer,
  updateToDoItemReducer,
  sortToDoItemsReducer,
});
