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

  const login = async (
    usernameOrEmail: string,
    password: string
  ): Promise<boolean> => {
    try {
      const response = await fetch(
        `${BASE_URL}${endpoints.Login}`,
        createRequestOptions("POST", undefined, {
          usernameOrEmail,
          password,
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
    username: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await fetch(
        `${BASE_URL}${endpoints.Register}`,
        createRequestOptions("POST", undefined, {
          username,
          email,
          password,
        })
      );
      const result = await response.json();
      if (response.ok) {
        setCookie("DocAppUserToken", result.token, { path: "/" });
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
    removeCookie("DocAppUserToken");
    navigate(MyRoutes.LoginPage);
  };

  return {
    user,
    getAuthTokenFromCookies,
    authToken,
    login,
    logout,
    register,
  };
};
