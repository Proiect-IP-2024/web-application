import { Medic, Recomandare } from "../models/models";
import { BASE_URL, endpoints } from "../routes/routes";
import { createRequestOptions } from "../utils/utils";
import { useUserStore } from "./useUserStore";

export const useMedic = () => {
  const { authToken } = useUserStore();

  const setRecomandareMedic = async (userData: Recomandare) => {
    const response = await fetch(
      `${BASE_URL}${endpoints.SetRecomandareMedic}`,
      createRequestOptions("POST", authToken ?? undefined, {
        userData,
      })
    );
    const result = await response.json();

    console.log("setRecomandare: ", result);
  };

  const registerMedic = async ({
    medic,
    password,
  }: {
    medic: Omit<Medic, "id" | "userPower">;
    password: string;
  }) => {
    try {
      const response = await fetch(
        `${BASE_URL}${endpoints.Register}`,
        createRequestOptions("POST", undefined, {
          userData: {
            firstName: medic.first_name,
            lastName: medic.last_name,
            email: medic.email,
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
            email: medic.email,
            password,
          },
        })
      );

      const loginResult = await loginResponse.json();

      if (!loginResponse.ok) {
        console.log("Login: ", loginResponse);
        return false;
      }

      const addMedicResponse = await fetch(
        `${BASE_URL}${endpoints.AddMedic}`,
        createRequestOptions("POST", loginResult.token, {
          userData: {
            telefon: medic.telefon,
          },
        })
      );
      if (!addMedicResponse.ok) {
        console.log("AddMedic: ", addMedicResponse);
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
    setRecomandareMedic,
    registerMedic,
  };
};
