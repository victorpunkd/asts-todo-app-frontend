import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Paper from "@material-ui/core/Paper";

import ToDoItem from "../ToDoItem/ToDoItem";
import "./ToDoListContainer.css";
import { sortToDoItemsAction } from "../../Action/SortTodoItemsAction";

type Props = {
  data: Array<data>;
};

interface data {
  id: number;
  title: string;
  description: string;
  priority: number;
  dueDate: Date;
  isDone: boolean;
}

const ToDoListContainer: React.FC<Props> = ({ data }) => {
  const dispatched = useDispatch();

  const { sortToDoItemsReducer } = useSelector((state: any) => state);

  const handleDueDateSortClick = () => {
    dispatched(
      sortToDoItemsAction("dueDate", !sortToDoItemsReducer.isAscendingOrder)
    );
  };

  const handlePrioritySortClick = () => {
    dispatched(
      sortToDoItemsAction("priority", !sortToDoItemsReducer.isAscendingOrder)
    );
  };

  return (
    <>
      <div className="toDoListContainer">
        <Paper
          elevation={3}
          style={{
            backgroundColor: "#7DDCFB",
            height: "100%",
            minHeight: "500px",
          }}
        >
          <div className="allTodosSubSection">
            <div className="todoHeaderCard w3-row w3-container w3-animate-top">
              <div className="w3-col headerItem" style={{ width: "7%" }}>
                Close
              </div>
              <div className="w3-col headerItem" style={{ width: "30%" }}>
                Title
              </div>
              <div className="w3-col headerItem" style={{ width: "35%" }}>
                Description
              </div>
              <div
                className="w3-col headerItem"
                style={{ width: "15%", cursor: "pointer" }}
                onClick={handleDueDateSortClick}
              >
                Due Date{" "}
                {sortToDoItemsReducer.sortBy === "dueDate" && (
                  <i
                    className={`fa ${
                      sortToDoItemsReducer.isAscendingOrder
                        ? "fa-arrow-up"
                        : "fa-arrow-down"
                    }`}
                    aria-hidden="true"
                  ></i>
                )}
              </div>
              <div
                className="w3-col headerItem"
                style={{ width: "10%", cursor: "pointer" }}
                onClick={handlePrioritySortClick}
              >
                Priority{" "}
                {sortToDoItemsReducer.sortBy === "priority" && (
                  <i
                    className={`fa ${
                      sortToDoItemsReducer.isAscendingOrder
                        ? "fa-arrow-up"
                        : "fa-arrow-down"
                    }`}
                    aria-hidden="true"
                  ></i>
                )}
              </div>
              <div className="w3-col headerItem" style={{ width: "3%" }}></div>
            </div>
          </div>
          <div className="allTodos">
            <div className="allTodosSubSection">
              {data.length ? (
                data.map((element) => {
                  return (
                    <ToDoItem
                      key={element.id}
                      id={element.id}
                      title={element.title}
                      description={element.description}
                      priority={element.priority}
                      dueDate={element.dueDate}
                      isDone={element.isDone}
                    />
                  );
                })
              ) : (
                <span className="noDataMessage">
                  There's no item in this section
                </span>
              )}
            </div>
          </div>
        </Paper>
      </div>
    </>
  );
};

export default ToDoListContainer;
