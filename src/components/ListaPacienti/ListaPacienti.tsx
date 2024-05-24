import { useEffect, useState } from "react";
import Container from "../Container/Container";
import Grid from "../Grid/Grid";
import { useUserStore } from "../../hooks/useUserStore";
import "./ListaPacienti.scss";
import { Pacient } from "../../models/models";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const ListaPacienti = () => {
  const { getAssignedPacientsList, authToken } = useUserStore();
  const [pacientList, setPacientList] = useState<Pacient[]>([]);

  const fetchPacients = async () => {
    const pacients = await getAssignedPacientsList();
    setPacientList(pacients);
  };

  useEffect(() => {
    fetchPacients();
  }, [authToken]);

  return (
    <section className="pacient-list">
      <Container>
        <Grid>
          {pacientList && pacientList.length > 0 ? (
            pacientList.map((pacient) => (
              <div className="pacient" key={pacient.id}>
                <div className="details">
                  <div className="icon">
                    {pacient.profile_picture ?? <AccountCircleIcon />}
                  </div>
                  <p className="name">{`${pacient.first_name} ${String(
                    pacient.last_name
                  ).toUpperCase()}`}</p>
                  <p className="age">{pacient.varsta_pacient} years</p>
                  <a href={`tel:${pacient.telefon_pacient}`} className="phone">
                    {pacient.telefon_pacient}
                  </a>
                </div>

                <div className="actions">
                  <p className="view-pacinet">View pacient</p>
                </div>
              </div>
            ))
          ) : (
            <h2 className="no-pacient">No pacient added</h2>
          )}
        </Grid>
      </Container>
    </section>
  );
};

export default ListaPacienti;
