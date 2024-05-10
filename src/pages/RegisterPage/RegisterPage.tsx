import { useState } from "react";
import BackgroundImage from "../../components/BackgroundImage/BackgroundImage";
import Container from "../../components/Container/Container";
import Grid from "../../components/Grid/Grid";
import "./RegisterPage.scss";

interface UserData {
  email: string;
  password: string;
}

interface Error {
  email: boolean;
  password: boolean;
  message: string;
}

const RegisterPage = () => {
  const [userData, setUserData] = useState<UserData>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<Error>({
    email: false,
    password: false,
    message: "",
  });

  const handleRegister = async () => {
    if (userData && userData.email && userData.password) {
      console.log(userData);
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

  return (
    <section className="register-page">
      <BackgroundImage image="/images/loginBackground.png" />
      <Container>
        <Grid>
          <h1>Create account</h1>

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
            onClick={handleRegister}
          />
        </Grid>
      </Container>
    </section>
  );
};

export default RegisterPage;
