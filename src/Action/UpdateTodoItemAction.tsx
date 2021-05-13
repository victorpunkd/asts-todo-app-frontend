import axios from "axios";
import { getApiEndpoint } from "../CommonControls/apiEndpoint";

export const updateToDoItemAction =
  (id: number, body: object) => (dispatch: any) => {
    axios.put(`${getApiEndpoint()}/todos/${id}`, body).then(
      (data) => {
        dispatch({
          type: "updateToDoItemData",
          payLoad: data,
        });
      },
      (error) => {
        dispatch({
          type: "updateToDoItemDataError",
          payLoad: error,
        });
      }
    );
  };
