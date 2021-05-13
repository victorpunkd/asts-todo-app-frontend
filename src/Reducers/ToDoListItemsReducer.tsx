const toDoListItemsDataState: Object = {
  isLoaded: false,
  data: [],
  status: 0,
  error: false,
  errorMessage: [],
};

const toDoListItemsDataReducer = (
  state = toDoListItemsDataState,
  action: any
) => {
  switch (action.type) {
    case "todoListItemsData":
      return {
        isLoaded: true,
        data: action.payLoad.data,
        status: action.payLoad.status,
        error: false,
        errorMessage: [],
      };
    case "todoListItemsError":
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

export default toDoListItemsDataReducer;
