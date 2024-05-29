import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { TextField } from "@mui/material";
import { Recomandare } from "../../models/models";
import { useEffect } from "react";
import { useMedic } from "../../hooks/useMedic";

export interface AddRecomandationProps {
  CNP_pacient: string;
  open: boolean;
  selectedValue: Recomandare | null;
  setSelectedValue: (value: Recomandare) => void;
  onClose: () => void;
}

const AddRecomandation = ({
  CNP_pacient,
  open,
  selectedValue,
  setSelectedValue,
  onClose,
}: AddRecomandationProps) => {
  const { setRecomandareMedic } = useMedic();

  const handleSetRecomandare = async () => {
    if (selectedValue && selectedValue.CNP_pacient) {
      await setRecomandareMedic(selectedValue);
      onClose();
    }
  };

  useEffect(() => {
    console.log("Selected Values: ", selectedValue);
  }, [selectedValue]);

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Add Recomandation</DialogTitle>
      <List sx={{ p: "20px" }}>
        {selectedValue && (
          <>
            <ListItem disableGutters>
              <TextField
                type="number"
                label="Duration"
                variant="outlined"
                onChange={({ target }) => {
                  setSelectedValue({
                    ...selectedValue,
                    durata_zilnica: parseInt(target.value),
                  });
                }}
                value={selectedValue.durata_zilnica}
              />
            </ListItem>
            <ListItem disableGutters>
              <TextField
                type="text"
                label="Recomandation Type"
                variant="outlined"
                onChange={({ target }) => {
                  setSelectedValue({
                    ...selectedValue,
                    tip_recomandare: target.value,
                  });
                }}
                value={selectedValue.tip_recomandare}
              />
            </ListItem>
            <ListItem disableGutters>
              <TextField
                type="text"
                label="Other Indications"
                variant="outlined"
                onChange={({ target }) => {
                  setSelectedValue({
                    ...selectedValue,
                    alte_indicatii: target.value,
                  });
                }}
                value={selectedValue.alte_indicatii}
              />
            </ListItem>
            <ListItem disableGutters>
              <TextField
                type="text"
                label="Treatment"
                variant="outlined"
                onChange={({ target }) => {
                  setSelectedValue({
                    ...selectedValue,
                    tratamente: target.value,
                  });
                }}
                value={selectedValue.tratamente}
              />
            </ListItem>

            <ListItem disableGutters>
              <ListItemButton
                onClick={() => handleSetRecomandare()}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                  alignItems: "center",
                }}
              >
                Submit
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

export default AddRecomandation;
