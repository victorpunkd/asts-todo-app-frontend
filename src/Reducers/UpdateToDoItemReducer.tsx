const updateTodoItemDataState: Object = {
  isLoaded: false,
  data: [],
  status: 0,
  error: false,
  errorMessage: [],
};

const updateToDoItemReducer = (
  state = updateTodoItemDataState,
  action: any
) => {
  switch (action.type) {
    case "updateToDoItemData":
      return {
        isLoaded: true,
        data: action.payLoad.data,
        status: action.payLoad.status,
        error: false,
        errorMessage: [],
      };
    case "updateToDoItemDataError":
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

export default updateToDoItemReducer;
