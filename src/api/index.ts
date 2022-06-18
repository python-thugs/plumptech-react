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
