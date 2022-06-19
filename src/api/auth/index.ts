import axios from "axios";
import {API_ENDPOINT, error} from "..";
import {IEmployee, WithPassword} from "../types";

/**
 * Method for authenticating user
 *
 * @async
 * @param data
 * @throws error if something went wrong
 * @returns Information about current user
 */
export async function login(data: {
  username: string;
  password: string;
}): Promise<IEmployee> {
  const result = await axios.post(`${API_ENDPOINT}/auth/login`, data);
  if (result.status !== 200) {
    throw result.data || error("Couldn't log user in");
  }
  return result.data;
}

/**
 * Method for creating new users
 *
 * @async
 * @param newUser - data for new user
 * @throws error if something went wrong
 * @returns New user instance
 */
export async function signUp(
  newUser: Omit<IEmployee, "id" | "password" | "post"> & {post: number}
) {
  try {
    const response = await axios.post<WithPassword<IEmployee>>(
      `${API_ENDPOINT}/auth/signup`,
      newUser
    );
    if (response.status !== 200) {
      throw error(
        (response.data as any)?.message || "Could not create new user",
        response.data
      );
    }
    return response.data;
  } catch (e: any) {
    throw e.response ? e.response.data : e.data;
  }
}
