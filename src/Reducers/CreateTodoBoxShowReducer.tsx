const createTodoBoxShowReducerData: Object = {
  isVisible: false,
};

const createTodoBoxShowReducer = (
  state = createTodoBoxShowReducerData,
  action: any
) => {
  switch (action.type) {
    case "showcreateTodoBoxShowReducer":
      return { isVisible: true };
    case "hidecreateTodoBoxShowReducer":
      return { isVisible: false };
    default:
      return state;
  }
};

export default createTodoBoxShowReducer;
