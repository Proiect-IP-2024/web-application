import { RequestMethod } from "../models/models";

export function createRequestOptions(
  method: RequestMethod,
  accessToken?: string,
  body?: any
): {
  method: string;
  headers: { [key: string]: string };
  body?: any;
} {
  return {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
    ...(body && { body: JSON.stringify(body) }),
  };
}
