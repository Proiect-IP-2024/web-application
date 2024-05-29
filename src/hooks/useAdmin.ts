import { User } from "../models/models";
import { BASE_URL, endpoints } from "../routes/routes";
import { createRequestOptions } from "../utils/utils";

export const useAdmin = () => {
  const registerAdmin = async ({
    admin,
    password,
  }: {
    admin: Omit<User, "id" | "userPower">;
    password: string;
  }) => {
    try {
      const response = await fetch(
        `${BASE_URL}${endpoints.Register}`,
        createRequestOptions("POST", undefined, {
          userData: {
            firstName: admin.first_name,
            lastName: admin.last_name,
            email: admin.email,
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
            email: admin.email,
            password,
          },
        })
      );

      const loginResult = await loginResponse.json();

      if (!loginResponse.ok) {
        console.log("Login: ", loginResponse);
        return false;
      }

      const addAdminResponse = await fetch(
        `${BASE_URL}${endpoints.AddAdmin}`,
        createRequestOptions("POST", loginResult.token, undefined)
      );

      if (!addAdminResponse.ok) {
        return false;
      }

      return true;
    } catch (e) {
      console.log(e);
      console.log("Failed to login user");
    }
    return false;
  };

  return { registerAdmin };
};
