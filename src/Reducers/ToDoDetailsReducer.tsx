const toDoDetailsDataState: Object = {
  isLoaded: false,
  data: [],
  status: 0,
  error: false,
  errorMessage: [],
};

const toDoDetailsDataReducer = (state = toDoDetailsDataState, action: any) => {
  switch (action.type) {
    case "todoDetailsData":
      return {
        isLoaded: true,
        data: action.payLoad.data,
        status: action.payLoad.status,
        error: false,
        errorMessage: [],
      };
    case "todoDetailsError":
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

export default toDoDetailsDataReducer;
