export const sortToDoItemsAction = (sortField: string, sortOrder: boolean) => {
  return {
    type: "sortToDoItems",
    sortBy: sortField,
    sortOrder: sortOrder,
  };
};
