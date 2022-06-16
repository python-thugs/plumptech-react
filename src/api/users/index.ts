import axios from "axios";
import {IEmployee, PostEnum} from "../types";
import {error, API_ENDPOINT} from "..";

/**
 * Method for fetching list of users
 *
 * @async
 * @param [post] - optional: only fetch users with `post`
 * @throws error if response is not correct
 */
export async function getList(post: PostEnum | undefined = undefined) {
  const response = await axios.get<IEmployee[]>(`${API_ENDPOINT}/users`, {
    params: {
      post,
    },
  });
  if (response.status !== 200) {
    throw response.data || error("Couldn't fetch user list");
  }
  return response.data;
}
