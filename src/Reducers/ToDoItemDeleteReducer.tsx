const toDoItemDeleteDataState: Object = {
  isLoaded: false,
  data: [],
  status: 0,
  error: false,
  errorMessage: [],
};

const toDoItemDeleteDataReducer = (
  state = toDoItemDeleteDataState,
  action: any
) => {
  switch (action.type) {
    case "todoItemDeleteData":
      return {
        isLoaded: true,
        data: action.payLoad.data,
        status: action.payLoad.status,
        error: false,
        errorMessage: [],
      };
    case "todoItemDeleteError":
      return {
        isLoaded: true,
        data: [],
        status: 0,
        error: true,
        errorMessage: action.payLoad,
      };
    case "todoItemDeleteClear":
      return {
        isLoaded: true,
        data: [],
        status: 0,
        error: false,
        errorMessage: [],
      };
    default:
      return state;
  }
};

export default toDoItemDeleteDataReducer;
