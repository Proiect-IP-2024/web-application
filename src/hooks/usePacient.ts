import { Pacient } from "../models/models";
import { BASE_URL, endpoints } from "../routes/routes";
import { createRequestOptions } from "../utils/utils";

export const usePacient = () => {
  const registerPacient = async ({
    pacient,
    password,
  }: {
    pacient: Omit<Pacient, "id" | "userPower">;
    password: string;
  }) => {
    try {
      const response = await fetch(
        `${BASE_URL}${endpoints.Register}`,
        createRequestOptions("POST", undefined, {
          userData: {
            firstName: pacient.first_name,
            lastName: pacient.last_name,
            email: pacient.email,
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
            email: pacient.email,
            password,
          },
        })
      );

      const loginResult = await loginResponse.json();

      if (!loginResponse.ok) {
        console.log("Login: ", loginResponse);
        return false;
      }

      const addPacinetResponse = await fetch(
        `${BASE_URL}${endpoints.AddPacient}`,
        createRequestOptions("POST", loginResult.token, {
          userData: pacient,
        })
      );
      if (!addPacinetResponse.ok) {
        console.log("AddPacient: ", addPacinetResponse);
        return false;
      }

      return true;
    } catch (e) {
      console.log(e);
      console.log("Failed to login user");
    }
    return false;
  };

  return {
    registerPacient,
  };
};
