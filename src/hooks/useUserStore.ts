import { useContext } from "react";
import { UserStoreContext } from "../context/UserContext";
import { BASE_URL, endpoints } from "../routes/routes";
import { createRequestOptions } from "../utils/utils";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { MyRoutes } from "../routes/routes";

export const useUserStore = () => {
  const navigate = useNavigate();
  const { user, setUser, authToken, setAuthToken } =
    useContext(UserStoreContext);
  const [cookies, setCookie, removeCookie] = useCookies([
    process.env.COOKIE_NAME || "ProiectIP2024",
  ]);

  const getAuthTokenFromCookies = () => {
    if (
      cookies &&
      process.env.COOKIE_NAME &&
      cookies[process.env.COOKIE_NAME]
    ) {
      setAuthToken(cookies[process.env.COOKIE_NAME]);
      return true;
    } else if (cookies && cookies.ProiectIP2024) {
      setAuthToken(cookies.ProiectIP2024);
      return true;
    } else {
      return false;
    }
  };

  const getUserData = async () => {
    if (!authToken) {
      return false;
    }

    const getUserDataResponse = await (
      await fetch(
        `${BASE_URL}${endpoints.GetUserData}`,
        createRequestOptions("GET", authToken)
      )
    ).json();

    if (!(getUserDataResponse && getUserDataResponse.user)) {
      return false;
    }

    const getUserTypeResponse = await (
      await fetch(
        `${BASE_URL}${endpoints.GetUserType}`,
        createRequestOptions("GET", authToken)
      )
    ).json();

    if (!getUserTypeResponse) {
      return false;
    }

    if (getUserTypeResponse.isMedic) {
      const getMedicDataResponse = await (
        await fetch(
          `${BASE_URL}${endpoints.GetMedicData}`,
          createRequestOptions("GET", authToken)
        )
      ).json();

      if (getMedicDataResponse && getMedicDataResponse.medic) {
        setUser({
          ...getUserDataResponse.user,
          telefon: getMedicDataResponse.medic.telefon,
          userPower: 2,
        });
        return true;
      }
    } else if (getUserTypeResponse.isPacient) {
      const getPacientDataResponse = await (
        await fetch(
          `${BASE_URL}${endpoints.GetPacientData}`,
          createRequestOptions("GET", authToken)
        )
      ).json();
      if (getPacientDataResponse && getPacientDataResponse.pacient) {
        setUser({
          ...getUserDataResponse.user,
          ...getPacientDataResponse.pacient,
          userPower: 5,
        });
        return true;
      }
    } else if (getUserTypeResponse.isIngrijitor) {
      const getIngrijitorDataResponse = await (
        await fetch(
          `${BASE_URL}${endpoints.GetIngrijitorData}`,
          createRequestOptions("GET", authToken)
        )
      ).json();

      if (getIngrijitorDataResponse && getIngrijitorDataResponse.ingrijitor) {
        setUser({
          ...getUserDataResponse.user,
          userPower: 4,
        });
        return true;
      }
    } else if (getUserTypeResponse.isAdmin) {
      setUser({
        ...getUserDataResponse.user,
        userPower: 1,
      });
      return true;
    } else {
      console.error("Error getting data");
      return false;
    }

    console.error("Error getting data");
    return false;
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(
        `${BASE_URL}${endpoints.Login}`,
        createRequestOptions("POST", undefined, {
          userData: {
            email,
            password,
          },
        })
      );
      const result = await response.json();
      if (response.ok) {
        setCookie(process.env.COOKIE_NAME || "ProiectIP2024", result.token, {
          path: "/",
        });

        setAuthToken(result.token);
        return true;
      }
    } catch (e) {
      console.log(e);
      console.log("Failed to login user");
      return false;
    }
    return false;
  };

  const refreshUserToken = async () => {
    try {
      if (!authToken) return false;

      const response = await fetch(
        `${BASE_URL}${endpoints.RefreshToken}`,
        createRequestOptions("GET", authToken)
      );
      const result = await response.json();
      if (response.ok) {
        setCookie(process.env.COOKIE_NAME || "ProiectIP2024", result.token, {
          path: "/",
        });

        setAuthToken(result.token);
        return true;
      }
    } catch (e) {
      console.log(e);
      console.log("Failed to refresh token");
      return false;
    }
    return false;
  };

  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    accoutType: number,
    securityCore: string
  ) => {
    try {
      const response = await fetch(
        `${BASE_URL}${endpoints.Register}`,
        createRequestOptions("POST", undefined, {
          userData: {
            firstName,
            lastName,
            email,
            password,
          },
        })
      );
      const result = await response.json();
      if (response.ok) {
        setCookie("ProiectIP2024", result.token, { path: "/" });
        setAuthToken(result.token);
        return true;
      }
    } catch (e) {
      console.log(e);
      console.log("Failed to login user");
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setAuthToken(null);
    removeCookie("ProiectIP2024");
    navigate(MyRoutes.LoginPage);
  };

  const getAssignedPacientsList = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}${endpoints.GetAssignedPacients}`,
        createRequestOptions("GET", authToken ?? undefined)
      );
      const result = await response.json();
      if (response.ok && result.pacientList) {
        return result.pacientList;
      }

      return [];
    } catch (e) {
      console.log(e);
      console.log("Failed to get registered patients");
    }
  };

  const getUnassignedPacientsList = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}${endpoints.GetUnassignedPacients}`,
        createRequestOptions("GET", authToken ?? undefined)
      );
      const result = await response.json();
      if (response.ok && result.pacientList) {
        return { isOk: true, response: result.pacientList };
      } else {
        return { isOk: false, response: "User is not a message" };
      }
    } catch (e) {
      console.log(e);
      console.log("Failed to get registered patients");
      return { isOk: false, response: "User is not a message" };
    }
  };

  return {
    user,
    getAuthTokenFromCookies,
    authToken,
    login,
    logout,
    register,
    getUserData,
    refreshUserToken,
    getAssignedPacientsList,
    getUnassignedPacientsList,
  };
};
