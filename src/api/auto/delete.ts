import axios from "axios";
import {joinPath} from ".";

export function deleteAuto(id: number | number[]) {
  let promises = [];
  if (typeof id === "number") {
    promises.push(
      axios.post<{error: boolean; message: string}>(
        joinPath(id.toString(), "delete")
      )
    );
  } else {
    promises = id.map(i =>
      axios.post<{error: boolean; message: string}>(
        joinPath(i.toString(), "delete")
      )
    );
  }
  return Promise.all(promises);
}
