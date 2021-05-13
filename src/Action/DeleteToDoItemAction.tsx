import axios from "axios";
import { getApiEndpoint } from "../CommonControls/apiEndpoint";

export const deleteToDoItemAction = (id: number) => (dispatch: any) => {
  axios.delete(`${getApiEndpoint()}/todos/${id}`).then(
    (data) => {
      dispatch({
        type: "todoItemDeleteData",
        payLoad: data,
      });
    },
    (error) => {
      dispatch({
        type: "todoItemDeleteError",
        payLoad: error,
      });
    }
  );
};

export const clearDeleteToDoItemAction = () => (dispatch: any) => {
  dispatch({
    type: "todoItemDeleteClear",
  });
};
