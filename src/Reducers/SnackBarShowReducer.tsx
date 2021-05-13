const showSnackBarReducerData: Object = {
  isVisible: false,
  message: "",
};

const showSnackBarReducer = (state = showSnackBarReducerData, action: any) => {
  switch (action.type) {
    case "showSnackBar":
      return { isVisible: true, message: action.payload };
    case "hideSnackBar":
      return { isVisible: false, message: "" };
    default:
      return state;
  }
};

export default showSnackBarReducer;
