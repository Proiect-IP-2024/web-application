import { useContext } from "react";
import { UserStoreContext } from "../context/UserContext";
import { BASE_URL, endpoints } from "../routes/routes";
import { createRequestOptions } from "../utils/utils";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { MyRoutes } from "../routes/routes";

export const useUserStore = () => {
  const navigate = useNavigate();
  const { user, authToken, setAuthToken } = useContext(UserStoreContext);
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
        return result.pacientList;
      }

      return [];
    } catch (e) {
      console.log(e);
      console.log("Failed to get registered patients");
    }
  };

  return {
    user,
    getAuthTokenFromCookies,
    authToken,
    login,
    logout,
    register,
    getAssignedPacientsList,
    getUnassignedPacientsList,
  };
};
