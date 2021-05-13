import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Switch from "@material-ui/core/Switch";
import CircularProgress from "@material-ui/core/CircularProgress";

import "./Home.css";

import ToDoListContainer from "../ToDoListContainer/ToDoListContainer";
import { fetchToDoListAction } from "../../Action/FetchToDoListAction";

const Home: React.FC = () => {
  const [state, setState] = useState({
    checkedA: false,
  });
  const [toDoListCurrentItemState, setToDoListCurrentItemState] = useState<
    any[]
  >([]);
  const { toDoListItemsDataReducer, sortToDoItemsReducer } = useSelector(
    (state: any) => state
  );
  const dispatched = useDispatch();

  const sortTodoItems = useCallback(() => {
    setToDoListCurrentItemState(
      sortArray(
        toDoListCurrentItemState,
        sortToDoItemsReducer.sortBy,
        sortToDoItemsReducer.isAscendingOrder
      )
    );
  }, [toDoListCurrentItemState, sortToDoItemsReducer]);

  useEffect(() => {
    sortTodoItems();
  }, [sortToDoItemsReducer, sortTodoItems]);

  useEffect(() => {
    dispatched(fetchToDoListAction());
  }, [dispatched]);

  useEffect(() => {
    if (
      toDoListItemsDataReducer.isLoaded &&
      !toDoListItemsDataReducer.error &&
      toDoListItemsDataReducer.data
    ) {
      let tempData = toDoListItemsDataReducer.data.filter(
        (data: any) => data.isDone === false
      );

      setToDoListCurrentItemState(tempData);
    }
  }, [toDoListItemsDataReducer, sortToDoItemsReducer.sortBy]);

  useEffect(() => {
    if (state.checkedA) {
      if (toDoListItemsDataReducer) {
        let tempData = toDoListItemsDataReducer.data.filter(
          (data: any) => data.isDone === true
        );

        setToDoListCurrentItemState(
          sortArray(
            tempData,
            sortToDoItemsReducer.sortBy,
            sortToDoItemsReducer.isAscendingOrder
          )
        );

        setToDoListCurrentItemState(tempData);
      }
    } else {
      if (toDoListItemsDataReducer) {
        let tempData = toDoListItemsDataReducer.data.filter(
          (data: any) => data.isDone === false
        );

        setToDoListCurrentItemState(
          sortArray(
            tempData,
            sortToDoItemsReducer.sortBy,
            sortToDoItemsReducer.isAscendingOrder
          )
        );
      }
    }
  }, [state.checkedA, toDoListItemsDataReducer, sortToDoItemsReducer]);

  const sortArray = (data: any, sortBy: string, sortOrder: boolean) => {
    if (sortOrder) {
      return data.sort((a: any, b: any) =>
        a[sortBy] > b[sortBy] ? 1 : b[sortBy] > a[sortBy] ? -1 : 0
      );
    } else {
      return data.sort((a: any, b: any) =>
        a[sortBy] < b[sortBy] ? 1 : b[sortBy] < a[sortBy] ? -1 : 0
      );
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  if (toDoListItemsDataReducer.isLoaded) {
    if (toDoListItemsDataReducer.error) {
      return <div className="loader">Oh ho Something is wrong</div>;
    }
    if (!toDoListItemsDataReducer.data.length) {
      return (
        <div className="loader">
          There's no data yet try creating one todo item
        </div>
      );
    }
    return (
      <>
        <div className="statusToggleContainer">
          <span className={`${!state.checkedA && "active"}`}>In Progress</span>
          <Switch
            checked={state.checkedA}
            onChange={handleChange}
            name="checkedA"
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
          <span className={`${state.checkedA && "active"}`}>Completed</span>
        </div>
        <ToDoListContainer data={toDoListCurrentItemState} />
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

export default Home;
