import axios from "axios";
import { getApiEndpoint } from "../CommonControls/apiEndpoint";

export const createToDoItemAction = (body: object) => (dispatch: any) => {
  axios.post(`${getApiEndpoint()}/todos`, body).then(
    (data) => {
      dispatch({
        type: "todoItemCreateData",
        payLoad: data,
      });
    },
    (error) => {
      dispatch({
        type: "todoItemCreateError",
        payLoad: error,
      });
    }
  );
};
