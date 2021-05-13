import axios from "axios";
import { getApiEndpoint } from "../CommonControls/apiEndpoint";

export const fetchToDoListAction = () => (dispatch: any) => {
  axios.get(`${getApiEndpoint()}/todos`).then(
    (data) => {
      dispatch({
        type: "todoListItemsData",
        payLoad: data,
      });
    },
    (error) => {
      dispatch({
        type: "todoListItemsError",
        payLoad: error,
      });
    }
  );
};
