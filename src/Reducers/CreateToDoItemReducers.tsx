const toDoItemCreateDataState: Object = {
  isLoaded: false,
  data: [],
  status: 0,
  error: false,
  errorMessage: [],
};

const toDoItemCreateReducer = (
  state = toDoItemCreateDataState,
  action: any
) => {
  switch (action.type) {
    case "todoItemCreateData":
      return {
        isLoaded: true,
        data: action.payLoad.data,
        status: action.payLoad.status,
        error: false,
        errorMessage: [],
      };
    case "todoItemCreateError":
      return {
        isLoaded: true,
        data: [],
        status: 0,
        error: true,
        errorMessage: action.payLoad,
      };
    default:
      return state;
  }
};

export default toDoItemCreateReducer;
