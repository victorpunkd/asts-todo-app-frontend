import axios from "axios";
import { getApiEndpoint } from "../CommonControls/apiEndpoint";

export const fetchToDoDetailsAction = (id: string) => (dispatch: any) => {
  axios.get(`${getApiEndpoint()}/todos/${id}`).then(
    (data) => {
      dispatch({
        type: "todoDetailsData",
        payLoad: data,
      });
    },
    (error) => {
      dispatch({
        type: "todoDetailsError",
        payLoad: error,
      });
    }
  );
};
