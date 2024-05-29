import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { TextField } from "@mui/material";
import { Alarms } from "../../models/models";
import { useMedic } from "../../hooks/useMedic";
import { useState } from "react";

interface SimpleDialogProps {
  fetchPacientProfile: () => void;
  CNP_pacient: string;
  pacientID: string;
  open: boolean;
  selectedValue: Alarms | null;
  setSelectedValue: (value: Alarms) => void;
  onClose: () => void;
}

const SetAlarms = ({
  fetchPacientProfile,
  CNP_pacient,
  pacientID,
  open,
  selectedValue,
  setSelectedValue,
  onClose,
}: SimpleDialogProps) => {
  const [error, setError] = useState<boolean>(false);

  const { setAlarmConfigToPacient } = useMedic();

  const handleSetAlarms = async () => {
    if (selectedValue === null) {
      setError(true);
      return false;
    }

    const result = await setAlarmConfigToPacient({
      alarmConfiguration: { ...selectedValue },
      pacientID,
      CNP_pacient,
    });

    if (result) {
      fetchPacientProfile();
      onClose();
      setError(false);
      return true;
    } else {
      setError(true);
      return false;
    }
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Set Alerts Values</DialogTitle>
      <List sx={{ p: "20px" }}>
        {selectedValue && (
          <>
            <ListItem disableGutters>
              <TextField
                type="number"
                label="Pulse Max Value"
                variant="outlined"
                onChange={({ target }) =>
                  setSelectedValue({
                    ...selectedValue,
                    puls_max: Number(target.value),
                  })
                }
                value={selectedValue.puls_max}
              />
            </ListItem>
            <ListItem disableGutters>
              <TextField
                type="number"
                label="Pulse Min Value"
                variant="outlined"
                onChange={({ target }) =>
                  setSelectedValue({
                    ...selectedValue,
                    puls_min: Number(target.value),
                  })
                }
                value={selectedValue.puls_min}
              />
            </ListItem>
            <ListItem disableGutters>
              <TextField
                type="number"
                label="Temperature Max Value"
                variant="outlined"
                onChange={({ target }) =>
                  setSelectedValue({
                    ...selectedValue,
                    temperatura_max: Number(target.value),
                  })
                }
                value={selectedValue.temperatura_max}
              />
            </ListItem>
            <ListItem disableGutters>
              <TextField
                type="number"
                label="Temperature Min Value"
                variant="outlined"
                onChange={({ target }) =>
                  setSelectedValue({
                    ...selectedValue,
                    temperatura_min: Number(target.value),
                  })
                }
                value={selectedValue.temperatura_min}
              />
            </ListItem>
            <ListItem disableGutters>
              <TextField
                type="number"
                label="Humidity Max Value"
                variant="outlined"
                onChange={({ target }) =>
                  setSelectedValue({
                    ...selectedValue,
                    umiditate_max: Number(target.value),
                  })
                }
                value={selectedValue.umiditate_max}
              />
            </ListItem>
            <ListItem disableGutters>
              <TextField
                type="number"
                label="Humidity Min Value"
                variant="outlined"
                onChange={({ target }) =>
                  setSelectedValue({
                    ...selectedValue,
                    umiditate_min: Number(target.value),
                  })
                }
                value={selectedValue.umiditate_min}
              />
            </ListItem>
            <ListItem disableGutters>
              <ListItemButton
                onClick={() => {
                  handleSetAlarms();
                }}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                  alignItems: "center",
                }}
              >
                Set Alert
              </ListItemButton>
            </ListItem>
            <ListItem disableGutters>
              <ListItemButton
                onClick={() => {
                  onClose();
                  setError(false);
                }}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                  alignItems: "center",
                }}
              >
                Close
              </ListItemButton>
            </ListItem>
            {error && (
              <ListItem disableGutters>
                <p style={{ color: "red" }}>Please enter the correct values.</p>
              </ListItem>
            )}
          </>
        )}
      </List>
    </Dialog>
  );
};

export default SetAlarms;
