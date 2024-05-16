import BackgroundImage from "../../components/BackgroundImage/BackgroundImage";
import { useEffect, useState } from "react";

import "./LoginPage.scss";
import Container from "../../components/Container/Container";
import Grid from "../../components/Grid/Grid";
import { useUserStore } from "../../hooks/useUserStore";
import { useNavigate } from "react-router-dom";
import { MyRoutes } from "../../routes/routes";

interface UserData {
  email: string;
  password: string;
}
interface Error {
  email: boolean;
  password: boolean;
  message: string;
}

const LoginPage = () => {
  const { login } = useUserStore();
  const navigate = useNavigate();

  const { authToken, getAuthTokenFromCookies } = useUserStore();

  const [userData, setUserData] = useState<UserData>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<Error>({
    email: false,
    password: false,
    message: "",
  });

  const handleLogin = async () => {
    if (userData && userData.email && userData.password) {
      const isLogged = await login(userData.email, userData.password);

      if (isLogged) {
        setError({
          email: false,
          password: false,
          message: "",
        });

        navigate(MyRoutes.HomePage);
      } else {
        setError({
          email: true,
          password: true,
          message: "Invalid Email/Password!",
        });
      }
    } else {
      if (!userData.email && !userData.password)
        setError({
          email: true,
          password: true,
          message: "Email and Password are required",
        });
      else if (!userData.email) {
        setError({
          email: true,
          password: false,
          message: "Email is required",
        });
      } else if (!userData.password) {
        setError({
          password: true,
          email: false,
          message: "Password is required",
        });
      } else setError({ ...error, message: "" });
    }
  };

  useEffect(() => {
    getAuthTokenFromCookies();
  }, []);

  useEffect(() => {
    //TODO: verify if token is valid

    if (authToken) {
      navigate(MyRoutes.HomePage);
    }
  }, [authToken]);

  return (
    <section className="login-page">
      <BackgroundImage image="/images/loginBackground.png" />
      <Container>
        <Grid>
          <h1>Connect to your account</h1>

          <input
            type="text"
            className={`f-18 ${error.email ? ` error` : ``}`}
            placeholder="Enter your email or username"
            onChange={({ target }) =>
              setUserData({ ...userData, email: target.value })
            }
          />
          <input
            type="password"
            className={`f-18 ${error.password ? ` error` : ``}`}
            placeholder="Enter tour password"
            onChange={({ target }) =>
              setUserData({ ...userData, password: target.value })
            }
          />

          {error.message && (
            <p className="f-18 error-message">{error.message}</p>
          )}
          <input
            type="button"
            value="Login"
            className="f-18"
            onClick={handleLogin}
          />
        </Grid>
      </Container>
    </section>
  );
};

export default LoginPage;
