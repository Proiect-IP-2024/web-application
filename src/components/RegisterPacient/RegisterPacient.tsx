import { Box, FormControl, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyRoutes } from "../../routes/routes";
import { usePacient } from "../../hooks/usePacient";

interface UserData {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}

interface PacinetData {
  CNP_pacient: string;
  varsta_pacient: number;
  adresa_pacient: string;
  telefon_pacient: string;
  profesie_pacient: string;
  loc_munca_pacient: string;
}

interface FirstError {
  email: boolean;
  password: boolean;
  message: string;
}

interface Error {
  CNP_pacient: boolean;
  varsta_pacient: boolean;
  adresa_pacient: boolean;
  telefon_pacient: boolean;
  profesie_pacient: boolean;
  loc_munca_pacient: boolean;
  message: string;
}

const RegisterPacient = ({
  userData,
  firstError,
  setFirstError,
}: {
  userData: UserData;
  firstError: FirstError;
  setFirstError: (error: FirstError) => void;
}) => {
  const { registerPacient } = usePacient();
  const navigate = useNavigate();
  const [pacinet, setPacient] = useState<PacinetData>({
    CNP_pacient: "",
    varsta_pacient: 0,
    adresa_pacient: "",
    telefon_pacient: "",
    profesie_pacient: "",
    loc_munca_pacient: "",
  });

  const [error, setError] = useState<Error>({
    CNP_pacient: false,
    varsta_pacient: false,
    adresa_pacient: false,
    telefon_pacient: false,
    profesie_pacient: false,
    loc_munca_pacient: false,
    message: "",
  });

  const handleRegister = async () => {
    if (
      userData &&
      userData.email &&
      userData.password &&
      pacinet &&
      pacinet.CNP_pacient &&
      pacinet.CNP_pacient.length === 13 &&
      pacinet.varsta_pacient &&
      pacinet.adresa_pacient &&
      pacinet.telefon_pacient &&
      pacinet.profesie_pacient &&
      pacinet.loc_munca_pacient
    ) {
      setFirstError({
        email: false,
        password: false,
        message: "",
      });

      setError({
        CNP_pacient: false,
        varsta_pacient: false,
        adresa_pacient: false,
        telefon_pacient: false,
        profesie_pacient: false,
        loc_munca_pacient: false,
        message: "",
      });

      const response = await registerPacient({
        pacient: {
          ...pacinet,
          email: userData.email,
          first_name: userData.firstName,
          last_name: userData.lastName,
        },
        password: userData.password,
      });

      if (response) {
        navigate(MyRoutes.LoginPage);
      } else {
        console.log("Reg: ", response);
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

      if (!(pacinet.CNP_pacient && pacinet.CNP_pacient.length === 13)) {
        setError((perror) => ({ ...perror, CNP_pacient: true }));
      }
      if (!pacinet.varsta_pacient) {
        setError((perror) => ({ ...perror, varsta_pacient: true }));
      }
      if (!pacinet.adresa_pacient) {
        setError((perror) => ({ ...perror, adresa_pacient: true }));
      }
      if (!pacinet.telefon_pacient) {
        setError((perror) => ({ ...perror, telefon_pacient: true }));
      }
      if (!pacinet.profesie_pacient) {
        setError((perror) => ({ ...perror, profesie_pacient: true }));
      }
      if (!pacinet.loc_munca_pacient) {
        setError((perror) => ({ ...perror, loc_munca_pacient: true }));
      }
    }
  };

  return (
    <>
      <Box className={"drop-menu"}>
        <FormControl fullWidth>
          <TextField
            type="number"
            label="CNP"
            variant="outlined"
            error={error.CNP_pacient}
            onChange={({ target }) =>
              setPacient({ ...pacinet, CNP_pacient: target.value })
            }
            value={pacinet.CNP_pacient}
          />
        </FormControl>
      </Box>

      <Box className={"drop-menu"}>
        <FormControl fullWidth>
          <TextField
            type="number"
            label="Age"
            variant="outlined"
            error={error.varsta_pacient}
            onChange={({ target }) =>
              setPacient({ ...pacinet, varsta_pacient: parseInt(target.value) })
            }
            value={pacinet.varsta_pacient}
          />
        </FormControl>
      </Box>

      <Box className={"drop-menu"}>
        <FormControl fullWidth>
          <TextField
            type="text"
            label="Address"
            variant="outlined"
            error={error.adresa_pacient}
            onChange={({ target }) =>
              setPacient({ ...pacinet, adresa_pacient: target.value })
            }
            value={pacinet.adresa_pacient}
          />
        </FormControl>
      </Box>

      <Box className={"drop-menu"}>
        <FormControl fullWidth>
          <TextField
            type="text"
            label="Phone"
            variant="outlined"
            error={error.telefon_pacient}
            onChange={({ target }) =>
              setPacient({ ...pacinet, telefon_pacient: target.value })
            }
            value={pacinet.telefon_pacient}
          />
        </FormControl>
      </Box>

      <Box className={"drop-menu"}>
        <FormControl fullWidth>
          <TextField
            type="text"
            label="Profession"
            variant="outlined"
            error={error.profesie_pacient}
            onChange={({ target }) =>
              setPacient({ ...pacinet, profesie_pacient: target.value })
            }
            value={pacinet.profesie_pacient}
          />
        </FormControl>
      </Box>

      <Box className={"drop-menu"}>
        <FormControl fullWidth>
          <TextField
            type="text"
            label="Workplace"
            variant="outlined"
            error={error.loc_munca_pacient}
            onChange={({ target }) =>
              setPacient({ ...pacinet, loc_munca_pacient: target.value })
            }
            value={pacinet.loc_munca_pacient}
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
export default RegisterPacient;
