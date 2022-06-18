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

/**
 * Method for deleting users
 *
 * @async
 * @param id - ID of user to delete
 */
export async function deleteUser(id: number) {
  if (!id) {
    throw error("ID must be set");
  }
  const response = await axios.post(`${API_ENDPOINT}/users/${id}/delete`);
  return !response.data.error;
}
