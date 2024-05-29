import { Box, FormControl, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyRoutes } from "../../routes/routes";
import { useIngrijitor } from "../../hooks/useIngrijitor";

interface UserData {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}

interface FirstError {
  email: boolean;
  password: boolean;
  message: string;
}

interface Error {
  securityCode: boolean;
  message: string;
}

const RegisterIngrijitor = ({
  userData,
  firstError,
  setFirstError,
}: {
  userData: UserData;
  firstError: FirstError;
  setFirstError: (error: FirstError) => void;
}) => {
  const validCode = "1234";
  const { registerIngrijitor } = useIngrijitor();

  const navigate = useNavigate();
  const [securityCode, setSecurityCode] = useState<string>("");

  const [error, setError] = useState<Error>({
    securityCode: false,
    message: "",
  });

  const handleRegister = async () => {
    if (
      userData &&
      userData.email &&
      userData.password &&
      securityCode === validCode
    ) {
      setFirstError({
        email: false,
        password: false,
        message: "",
      });

      setError({
        securityCode: false,
        message: "",
      });

      const response = await registerIngrijitor({
        ingrijitor: {
          ...userData,
          email: userData.email,
          first_name: userData.firstName,
          last_name: userData.lastName,
        },
        password: userData.password,
      });

      if (response) {
        navigate(MyRoutes.LoginPage);
      } else {
        console.log("RegisterIngrijitor: ", response);
      }
    } else {
      if (!userData.email && !userData.password)
        setFirstError({
          email: true,
          password: true,
          message: "Email and Password are required",
        });
      else if (!userData.email) {
        setFirstError({
          email: true,
          password: false,
          message: "Email is required",
        });
      } else if (!userData.password) {
        setFirstError({
          password: true,
          email: false,
          message: "Password is required",
        });
      } else setFirstError({ ...firstError, message: "" });

      if (!securityCode || securityCode !== validCode) {
        setError((perror) => ({
          ...perror,
          securityCode: true,
          message: "Security code is invalid",
        }));
      }
    }
  };

  return (
    <>
      <Box className={"drop-menu"}>
        <FormControl fullWidth>
          <TextField
            type="text"
            label="Security Code"
            variant="outlined"
            error={error.securityCode}
            onChange={({ target }) => setSecurityCode(target.value)}
            value={securityCode}
          />
        </FormControl>
      </Box>

      {error.message && <p className="f-18 error-message">{error.message}</p>}

      <input
        type="button"
        value="Create account"
        className="f-18 register-button"
        onClick={handleRegister}
      />
    </>
  );
};
export default RegisterIngrijitor;
