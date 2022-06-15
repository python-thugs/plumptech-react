import axios from "axios";
import {API_ENDPOINT, error} from "..";

/**
 * Method for authenticating user
 *
 * @async
 * @param data
 * @throws {import('..').Error<any>} - error if something went wrong
 * @returns {Promise<IEmployee>} Information about current user
 */
export async function login(data: {username: string; password: string}) {
  const result = await axios.post(`${API_ENDPOINT}/auth/login`, data);
  if (result.status !== 200) {
    throw result.data || error("Couldn't log user in");
  }
  return result.data;
}
