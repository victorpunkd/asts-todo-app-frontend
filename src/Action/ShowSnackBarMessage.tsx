export const showSnackBarDialogueAction = (message: string) => {
  return {
    type: "showSnackBar",
    payload: message,
  };
};

export const hideSnackBarDialogueAction = () => {
  return {
    type: "hideSnackBar",
  };
};
