import axios from "axios";
import {API_ENDPOINT, error} from "..";
import {IPost} from "../types";

export async function getPosts() {
  const response = await axios.get<IPost[]>(`${API_ENDPOINT}/post`);
  if (response.status !== 200) {
    throw error("Could not fetch posts!");
  }
  return response.data;
}
