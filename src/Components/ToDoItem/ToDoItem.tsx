import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Checkbox from "@material-ui/core/Checkbox";
import DeleteIcon from "@material-ui/icons/Delete";
import { useHistory } from "react-router-dom";

import "./ToDoItem.css";
import {
  deleteToDoItemAction,
  clearDeleteToDoItemAction,
} from "../../Action/DeleteToDoItemAction";
import { fetchToDoListAction } from "../../Action/FetchToDoListAction";
import { updateToDoItemAction } from "../../Action/UpdateTodoItemAction";
import { showSnackBarDialogueAction } from "../../Action/ShowSnackBarMessage";

type Props = {
  id: number;
  title: string;
  description: string;
  priority: number;
  dueDate: Date;
  isDone: boolean;
};

const ToDoItem: React.FC<Props> = ({
  id,
  title,
  description,
  priority,
  dueDate,
  isDone,
}) => {
  const history = useHistory();
  const dispatched = useDispatch();
  const dueDateFormatted = new Date(dueDate);
  const { toDoItemDeleteDataReducer, updateToDoItemReducer } = useSelector(
    (state: any) => state
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let data = {
      title: title,
      description: description,
      dueDate: dueDate,
      priority: priority,
      isDone: !isDone,
    };
    dispatched(updateToDoItemAction(id, data));
  };

  const hanldleTodoItemClick = () => {
    history.push(`/todo/${id}`);
  };

  useEffect(() => {
    if (
      toDoItemDeleteDataReducer.isLoaded &&
      !toDoItemDeleteDataReducer.error &&
      toDoItemDeleteDataReducer.data
    ) {
      if (toDoItemDeleteDataReducer.data === "Successfully deleted") {
        dispatched(
          showSnackBarDialogueAction("Todo Item Successfully Deleted")
        );
        dispatched(fetchToDoListAction());
        dispatched(clearDeleteToDoItemAction());
      }
    }
  }, [toDoItemDeleteDataReducer, dispatched]);

  useEffect(() => {
    if (
      updateToDoItemReducer.isLoaded &&
      !updateToDoItemReducer.error &&
      updateToDoItemReducer.data
    ) {
      dispatched(fetchToDoListAction());
    }
  }, [updateToDoItemReducer, dispatched]);

  const handleDeleteClick = () => {
    dispatched(deleteToDoItemAction(id));
  };

  return (
    <>
      <div className="toDoItemContainer w3-row w3-container w3-animate-top">
        <div className="w3-col todoItemColumn" style={{ width: "7%" }}>
          <Checkbox
            checked={isDone}
            onChange={handleChange}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </div>
        <div
          className="w3-col todoItemColumn"
          style={{ width: "30%" }}
          onClick={hanldleTodoItemClick}
        >
          <div
            className={`todoItemData toDoTitle ${isDone && "strikeThrough"}`}
          >
            {title}
          </div>
        </div>
        <div
          className={`w3-col todoItemColumn ${isDone && "strikeThrough"}`}
          style={{ width: "35%" }}
        >
          <div className="todoItemData">{description}</div>
        </div>
        <div
          className={`w3-col todoItemColumn ${isDone && "strikeThrough"}`}
          style={{ width: "15%" }}
        >
          <div className="todoItemData">
            {" "}
            {dueDateFormatted.toLocaleDateString()}
          </div>
        </div>
        <div
          className={`w3-col todoItemColumn ${isDone && "strikeThrough"}`}
          style={{ width: "10%", textAlign: "center" }}
        >
          <div className="todoItemData"> {priority}</div>
        </div>
        <div
          className="w3-col todoItemColumn"
          style={{ width: "3%", color: "red" }}
        >
          <div className="todoItemData toDoTitle">
            <DeleteIcon onClick={handleDeleteClick} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ToDoItem;
