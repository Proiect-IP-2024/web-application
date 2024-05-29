import { User } from "../models/models";
import { BASE_URL, endpoints } from "../routes/routes";
import { createRequestOptions } from "../utils/utils";

export const useIngrijitor = () => {
  const registerIngrijitor = async ({
    ingrijitor,
    password,
  }: {
    ingrijitor: Omit<User, "id" | "userPower">;
    password: string;
  }) => {
    try {
      const response = await fetch(
        `${BASE_URL}${endpoints.Register}`,
        createRequestOptions("POST", undefined, {
          userData: {
            firstName: ingrijitor.first_name,
            lastName: ingrijitor.last_name,
            email: ingrijitor.email,
            password: password,
          },
        })
      );
      if (!response.ok) {
        console.log("Register: ", response);
        return false;
      }

      const loginResponse = await fetch(
        `${BASE_URL}${endpoints.Login}`,
        createRequestOptions("POST", undefined, {
          userData: {
            email: ingrijitor.email,
            password,
          },
        })
      );

      const loginResult = await loginResponse.json();

      if (!loginResponse.ok) {
        console.log("Login: ", loginResponse);
        return false;
      }

      const addIngrijitorResponse = await fetch(
        `${BASE_URL}${endpoints.AddIngrijitor}`,
        createRequestOptions("POST", loginResult.token, undefined)
      );

      if (!addIngrijitorResponse.ok) {
        return false;
      }

      return true;
    } catch (e) {
      console.log(e);
      console.log("Failed to login user");
    }
    return false;
  };

  return { registerIngrijitor };
};
