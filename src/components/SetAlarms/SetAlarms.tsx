import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { TextField } from "@mui/material";
import { Alarms } from "../../models/models";
import { useEffect } from "react";

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: Alarms | null;
  setSelectedValue: (value: Alarms) => void;
  onClose: () => void;
}

const SetAlarms = ({
  open,
  selectedValue,
  setSelectedValue,
  onClose,
}: SimpleDialogProps) => {

  
  useEffect(() => {
    console.warn("Selected Values: ", selectedValue);
  }, [selectedValue]);

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
                onClick={() => onClose()}
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
                onClick={() => onClose()}
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
          </>
        )}
      </List>
    </Dialog>
  );
};

export default SetAlarms;
