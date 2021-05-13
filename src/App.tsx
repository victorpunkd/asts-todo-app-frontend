import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

import "./App.css";
import Home from "./Components/Home/Home";
import NavBar from "./Components/NavBar/NavBar";
import CreateToDoItem from "./Components/CreateToDoItem/CreateToDoItem";
import ToDoDetails from "./Components/ToDoDetails/ToDoDetails";

import { hideSnackBarDialogueAction } from "./Action/ShowSnackBarMessage";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const App: React.FC = () => {
  const { showSnackBarReducer } = useSelector((state: any) => state);
  const dispatched = useDispatch();

  useEffect(() => {
    if (showSnackBarReducer.isVisible === true) {
      setTimeout(() => {
        dispatched(hideSnackBarDialogueAction());
      }, 4000);
    }
  }, [showSnackBarReducer, dispatched]);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    dispatched(hideSnackBarDialogueAction());
  };

  return (
    <Router>
      <div className="App">
        <Snackbar
          open={showSnackBarReducer.isVisible}
          autoHideDuration={4000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="success">
            {showSnackBarReducer.message}
          </Alert>
        </Snackbar>
        <CreateToDoItem />
        <NavBar />
        <div className="body">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/todo/:todoid" exact component={ToDoDetails} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
