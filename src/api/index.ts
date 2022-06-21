export const API_ENDPOINT =
  process.env.REACT_APP_API_ENDPOINT || "http://localhost:5000";

export type Error<T = any> = {
  /** Shows that response is error */
  error: true;
  /** Optional error message */
  message?: string;
  /** Additional error information */
  body?: T;
};

/**
 * Helper for building error responses
 *
 * @param [message] - message to display
 * @param [body] - additional error information
 * @returns {Error<any>}
 */
export function error(message = "", body: any = undefined): Error<any> {
  return {error: true, message, body};
}

/**
 * Helper for building URI string
 *
 * @param {string[]} paths - array of paths
 * @returns {string} URI for resource
 */
export function joinPath(...paths: string[]): string {
  let uri = API_ENDPOINT;
  if (uri[uri.length - 1] !== "/") uri += "/";
  return uri + paths.join("/");
}
