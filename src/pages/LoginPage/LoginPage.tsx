import BackgroundImage from "../../components/BackgroundImage/BackgroundImage";
import { useEffect, useState } from "react";

import "./LoginPage.scss";
import Container from "../../components/Container/Container";
import Grid from "../../components/Grid/Grid";
import { useUserStore } from "../../hooks/useUserStore";
import { useNavigate } from "react-router-dom";
import { MyRoutes } from "../../routes/routes";
import {
  Box,
  FormControl,
  TextField,
} from "@mui/material";

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
      if (!userData.email && !userData.password) {
        setError({
          email: true,
          password: true,
          message: "Email and Password are required",
        });
      } else if (!userData.email) {
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
      } else {
        setError({ ...error, message: "" });
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  useEffect(() => {
    getAuthTokenFromCookies();
  }, []);

  useEffect(() => {
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
          
          <Box className={"drop-menu"}>
            <FormControl fullWidth>
              <TextField
                type="email"
                label="Email"
                variant="outlined"
                error={error.email}
                onChange={({ target }) =>
                  setUserData({ ...userData, email: target.value })
                }
                value={userData.email}
                onKeyDown={handleKeyDown}
              />
            </FormControl>
          </Box>
          
          <Box className={"drop-menu"}>
            <FormControl fullWidth>
              <TextField
                type="password"
                label="Password"
                variant="outlined"
                error={error.password}
                onChange={({ target }) =>
                  setUserData({ ...userData, password: target.value })
                }
                value={userData.password}
                onKeyDown={handleKeyDown}
              />
            </FormControl>
          </Box>
          {error.message && (
            <p className="f-18 error-message">{error.message}</p>
          )}
          
          <input
            type="button"
            value="Login"
            className="f-18 loginButton"
            onClick={handleLogin}
          />

          <p className="f-18">
            Don't have an account?{" "}
            <a href={MyRoutes.RegisterPage}>Register now</a>
          </p>
        </Grid>
      </Container>
    </section>
  );
};

export default LoginPage;
