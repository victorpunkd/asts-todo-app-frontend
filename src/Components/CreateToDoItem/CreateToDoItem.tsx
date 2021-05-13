import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Modal from "@material-ui/core/Modal";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";

import "./CreateToDoItem.css";

import { hideCreateToDoBoxDialogue } from "../../Action/CreateToDoBoxVisibleAction";
import { createToDoItemAction } from "../../Action/CreateToDoItemAction";
import { showSnackBarDialogueAction } from "../../Action/ShowSnackBarMessage";
import { fetchToDoListAction } from "../../Action/FetchToDoListAction";

const CreateToDoItem: React.FC = () => {
  const { createTodoBoxShowReducer, toDoItemCreateReducer } = useSelector(
    (state: any) => state
  );
  const dispatched = useDispatch();

  const [formErrorState, setFormErrorState] = React.useState<boolean>(false);
  const [toDoTitleState, settoDoTitleState] = React.useState<String | null>("");
  const [errorInTitleState, setErrorInTitleState] =
    React.useState<boolean>(false);
  const [toDoPriorityState, settoDoPriorityState] =
    React.useState<Number | null>(0);
  const [errorInPriorityState, setErrorInPriorityState] =
    React.useState<boolean>(false);
  const [selectedDateState, setSelectedDateState] = React.useState<Date | null>(
    new Date()
  );
  const [errorInDateState, seterrorInDateState] =
    React.useState<boolean>(false);
  const [toDoDescriptionState, settoDoDescriptionState] =
    React.useState<String | null>("");
  const [errorInDescriptionState, seterrorInDescriptionState] =
    React.useState<boolean>(false);

  const handleModalClose = () => {
    dispatched(hideCreateToDoBoxDialogue());
  };

  const handleSubmitClick = () => {
    if (
      !errorInTitleState &&
      !errorInPriorityState &&
      !errorInDateState &&
      !errorInDescriptionState
    ) {
      let data = {
        title: toDoTitleState,
        description: toDoDescriptionState,
        dueDate: selectedDateState,
        priority: toDoPriorityState,
        isDone: false,
      };
      dispatched(createToDoItemAction(data));
    }
  };

  const handleTitleValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    settoDoTitleState(event.target.value);
  };

  const handleTitleOnBlur = () => {
    if (toDoTitleState!.trim().length < 3) {
      raiseError("title");
    } else {
      cleaerError("title");
    }
  };

  const handlePriorityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
      Number.isInteger(parseInt(event.target.value)) &&
      parseInt(event.target.value) >= 0
    ) {
      settoDoPriorityState(parseInt(event.target.value));
    }
  };

  const handlePriorityOnBlur = () => {
    if (toDoPriorityState === 0) {
      raiseError("priority");
    } else {
      cleaerError("priority");
    }
  };

  const handleDateChange = (date: Date | null) => {
    let todaysDate = new Date();
    setSelectedDateState(date);

    if (date && todaysDate.toLocaleDateString() <= date.toLocaleDateString()) {
      cleaerError("date");
    } else raiseError("date");
  };

  const handleToDoDescriptionChnage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    settoDoDescriptionState(event.target.value);
  };

  const handleToDoDescriptionOnBlur = () => {
    if (toDoDescriptionState!.trim().length < 6) {
      raiseError("description");
    } else {
      cleaerError("description");
    }
  };

  const raiseError = (element: string) => {
    if (element === "title") {
      setErrorInTitleState(true);
    } else if (element === "priority") {
      setErrorInPriorityState(true);
    } else if (element === "date") {
      seterrorInDateState(true);
    } else if ("description") {
      seterrorInDescriptionState(true);
    }
  };

  const cleaerError = (element: string) => {
    if (element === "title") {
      setErrorInTitleState(false);
    } else if (element === "priority") {
      setErrorInPriorityState(false);
    } else if (element === "date") {
      seterrorInDateState(false);
    } else if ("description") {
      seterrorInDescriptionState(false);
    }
  };

  useEffect(() => {
    if (toDoItemCreateReducer.isLoaded) {
      if (
        !toDoItemCreateReducer.error &&
        toDoItemCreateReducer.data &&
        toDoItemCreateReducer.status !== 500
      ) {
        settoDoTitleState("");
        settoDoDescriptionState("");
        settoDoPriorityState(0);
        setSelectedDateState(new Date());
        setFormErrorState(false);
        dispatched(
          showSnackBarDialogueAction("Todo Item Created Successfully")
        );
        dispatched(fetchToDoListAction());
        dispatched(hideCreateToDoBoxDialogue());
      } else {
        setFormErrorState(true);
      }
    }
  }, [toDoItemCreateReducer, dispatched]);

  const body = (
    <div className="createToDoItemCard w3-animate-opacity">
      <div className="formHading">Create a ToDo Item</div>
      <div className={`errorMessage ${formErrorState && "showErrorMessage"}`}>
        Something is wrong, item not created
      </div>
      <FormControl style={{ width: "100%" }}>
        <div className="w3-row-padding">
          <div className="w3-third">
            <div className="titleField">
              <TextField
                error={errorInTitleState}
                id="standard-basic"
                label="Title"
                value={toDoTitleState}
                helperText={
                  errorInTitleState && "Miinimum 3 charactres are needed"
                }
                style={{ width: "100%", borderColor: "#fe658d" }}
                onChange={handleTitleValueChange}
                onBlur={handleTitleOnBlur}
              />
            </div>
          </div>
          <div className="w3-third">
            <div className="titleField">
              <TextField
                error={errorInPriorityState}
                id="standard-basic"
                label="Priority"
                type="number"
                value={toDoPriorityState}
                helperText={
                  errorInPriorityState && "The value has to be more than 0"
                }
                onChange={handlePriorityChange}
                onBlur={handlePriorityOnBlur}
                style={{ width: "100%", borderColor: "#fe658d" }}
              />
            </div>
          </div>
          <div className="w3-third" style={{ textAlign: "right" }}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                error={errorInDateState}
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="due_date"
                label="ToDo due date"
                value={selectedDateState}
                onChange={handleDateChange}
                helperText={
                  errorInDateState &&
                  "Selected date cant be less than todays date"
                }
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                style={{ width: "100%", borderColor: "#fe658d" }}
              />
            </MuiPickersUtilsProvider>
          </div>
        </div>
        <div className="w3-row-padding">
          <div className="w3-full formSection" style={{ padding: 6 }}>
            <TextField
              error={errorInDescriptionState}
              id="outlined-multiline-static"
              label="ToDo Description"
              multiline
              rows={4}
              style={{ width: "100%" }}
              helperText={
                errorInDescriptionState && "Miinimum 6 charactres are needed"
              }
              onChange={handleToDoDescriptionChnage}
              onBlur={handleToDoDescriptionOnBlur}
            />
          </div>
        </div>
        <Button
          variant="contained"
          color="primary"
          style={{ backgroundColor: "#fe658d", marginTop: "20px" }}
          onClick={handleSubmitClick}
        >
          Create
        </Button>
        <Button
          variant="outlined"
          color="primary"
          style={{
            borderColor: "#fe658d",
            marginTop: "20px",
            color: "#fe658d",
          }}
          onClick={handleModalClose}
        >
          Cancel
        </Button>
      </FormControl>
    </div>
  );

  return (
    <>
      <Modal
        open={createTodoBoxShowReducer.isVisible}
        onClose={handleModalClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </>
  );
};

export default CreateToDoItem;
