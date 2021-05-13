const sortToDoItemData: Object = {
  sortBy: "dueDate",
  isAscendingOrder: true,
};

const sortToDoItemsReducer = (state = sortToDoItemData, action: any) => {
  switch (action.type) {
    case "sortToDoItems":
      return { sortBy: action.sortBy, isAscendingOrder: action.sortOrder };
    default:
      return state;
  }
};

export default sortToDoItemsReducer;
