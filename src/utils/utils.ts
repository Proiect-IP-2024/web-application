import { RequestMethod } from "../models/models";

export function createRequestOptions(
  method: RequestMethod,
  accessToken?: string,
  body?: { [key: string]: string | number }
): {
  method: string;
  headers: { [key: string]: string };
  body?: string;
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
