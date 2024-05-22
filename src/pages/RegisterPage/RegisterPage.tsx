import { useEffect, useState } from "react";
import BackgroundImage from "../../components/BackgroundImage/BackgroundImage";
import Container from "../../components/Container/Container";
import Grid from "../../components/Grid/Grid";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.scss";
import { MyRoutes } from "../../routes/routes";
import { useUserStore } from "../../hooks/useUserStore";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

interface UserData {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}

interface Error {
  email: boolean;
  password: boolean;
  message: string;
}

const RegisterPage = () => {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState<number>(1);
  const { getAuthTokenFromCookies, authToken, register } = useUserStore();
  const [userData, setUserData] = useState<UserData>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const [error, setError] = useState<Error>({
    email: false,
    password: false,
    message: "",
  });

  const handleRegister = async () => {
    if (userData && userData.email && userData.password) {
      const result = 

      navigate(MyRoutes.LoginPage);
      setError({
        email: false,
        password: false,
        message: "",
      });
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
    <section className="register-page">
      <BackgroundImage image="/images/loginBackground.png" />
      <Container>
        <Grid>
          <h1>Create account</h1>

          <Box className={"drop-menu"}>
            <FormControl fullWidth>
              <TextField
                type="text"
                label="First Name"
                variant="outlined"
                error={error.email}
                onChange={({ target }) =>
                  setUserData({ ...userData, firstName: target.value })
                }
              />
            </FormControl>
          </Box>

          <Box className={"drop-menu"}>
            <FormControl fullWidth>
              <TextField
                type="text"
                label="Last Name"
                variant="outlined"
                error={error.email}
                onChange={({ target }) =>
                  setUserData({ ...userData, lastName: target.value })
                }
              />
            </FormControl>
          </Box>

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
              />
            </FormControl>
          </Box>

          <Box className={"drop-menu"}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Account Type
              </InputLabel>

              <Select
                labelId="demo-simple-select-label"
                value={accountType}
                label="Account Type"
                onChange={({ target }) => setAccountType(Number(target.value))}
              >
                <MenuItem value={1}>Pacient</MenuItem>
                <MenuItem value={2}>Ingrijitor</MenuItem>
                <MenuItem value={3}>Medic</MenuItem>
                <MenuItem value={4}>Admin</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {accountType > 1 && (
            <Box className={"drop-menu"}>
              <FormControl fullWidth>
                <TextField type="password" label="Code" variant="outlined" />
              </FormControl>
            </Box>
          )}

          {error.message && (
            <p className="f-18 error-message">{error.message}</p>
          )}
          <input
            type="button"
            value="Create account"
            className="f-18 register-button"
            onClick={handleRegister}
          />

          <p className="f-18">
            Already have an account? <a href={MyRoutes.LoginPage}>Login</a>
          </p>
        </Grid>
      </Container>
    </section>
  );
};

export default RegisterPage;
