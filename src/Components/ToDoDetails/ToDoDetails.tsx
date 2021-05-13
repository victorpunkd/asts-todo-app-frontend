import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { useHistory } from "react-router-dom";

import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

import "./ToDoDetails.css";
import { fetchToDoDetailsAction } from "../../Action/FetchToDoDetailsAction";
import {
  deleteToDoItemAction,
  clearDeleteToDoItemAction,
} from "../../Action/DeleteToDoItemAction";
import { fetchToDoListAction } from "../../Action/FetchToDoListAction";
import { showSnackBarDialogueAction } from "../../Action/ShowSnackBarMessage";

interface MatchParams {
  todoid: string;
}

const ToDoDetails: React.FC<RouteComponentProps<MatchParams>> = (props) => {
  const { toDoDetailsDataReducer, toDoItemDeleteDataReducer } = useSelector(
    (state: any) => state
  );
  const dispatched = useDispatch();
  const history = useHistory();
  const { todoid } = props.match.params;

  useEffect(() => {
    dispatched(fetchToDoDetailsAction(todoid));
  }, [dispatched, todoid]);

  const handleDeleteTaskClick = () => {
    dispatched(deleteToDoItemAction(parseInt(todoid)));
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
        history.push(`/`);
      }
    }
  }, [toDoItemDeleteDataReducer, dispatched, history]);

  if (toDoDetailsDataReducer.isLoaded) {
    if (toDoDetailsDataReducer.error) {
      return <div className="loader">Oh ho Something is wrong</div>;
    }
    if (!toDoDetailsDataReducer.data) {
      return (
        <div className="loader">We havent found any data with this id</div>
      );
    }
    const dueDateFormatted = new Date(toDoDetailsDataReducer.data.dueDate);
    return (
      <>
        <div className="toDoDetailsContainer w3-animate-opacity">
          <Paper
            elevation={3}
            style={{ backgroundColor: "#AE8495", height: 500, padding: 15 }}
          >
            <div className="toDoDetailsHeading">ToDo Details</div>
            <div className="toDoDetailsBody">
              <div className="w3-card w3-white toDoDetailsItem">
                <span className="toDoItemHeader">Title - </span>
                <span className="toDoItemDetail">
                  {toDoDetailsDataReducer.data.title}
                </span>
              </div>
              <div className="w3-card w3-white toDoDetailsItem">
                <span className="toDoItemHeader">Description - </span>
                <span className="toDoItemDetail">
                  {toDoDetailsDataReducer.data.description}
                </span>
              </div>
              <div className="w3-card w3-white toDoDetailsItem">
                <span className="toDoItemHeader">Priority - </span>
                <span className="toDoItemDetail">
                  {toDoDetailsDataReducer.data.priority}
                </span>
              </div>
              <div className="w3-card w3-white toDoDetailsItem">
                <span className="toDoItemHeader">Due Date - </span>
                <span className="toDoItemDetail">
                  {dueDateFormatted.toLocaleDateString()}
                </span>
              </div>
              <div className="w3-card w3-white toDoDetailsItem">
                <span className="toDoItemHeader">Status - </span>
                <span
                  className={`toDoItemDetail ${
                    toDoDetailsDataReducer.data.isDone
                      ? "toDoItemStatusCompleted"
                      : "toDoItemStatusInProgress"
                  }`}
                >
                  {toDoDetailsDataReducer.data.isDone
                    ? "Completed"
                    : "In Progress"}
                </span>
              </div>
              <div>
                <Button
                  color="inherit"
                  onClick={handleDeleteTaskClick}
                  style={{
                    marginTop: 15,
                    backgroundColor: "#d00412",
                    color: "white",
                  }}
                >
                  Delete this task
                </Button>
              </div>
            </div>
          </Paper>
        </div>
      </>
    );
  } else {
    return (
      <div className="loader">
        <CircularProgress />
      </div>
    );
  }
};

export default ToDoDetails;
