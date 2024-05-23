import { useEffect, useState } from "react";
import Container from "../Container/Container";
import Grid from "../Grid/Grid";
import { useUserStore } from "../../hooks/useUserStore";
import "./AddPacientList.scss";
import { Pacient } from "../../models/models";

const AddPacientList = () => {
  const { authToken, getUnassignedPacientsList } = useUserStore();
  const [pacientList, setPacientList] = useState<Pacient[]>([]);
  const [error, setError] = useState<string>(
    "No patient without an associated doctor"
  );

  const fetchPacients = async () => {
    const pacients = await getUnassignedPacientsList();

    if (pacients.isOk) {
      setPacientList(pacients.response);
    } else {
      setError("User is not a medic");
    }
  };

  useEffect(() => {
    fetchPacients();
  }, [authToken]);

  return (
    <section className="add-pacient-list">
      <Container>
        <Grid>
          {pacientList.length > 0 ? (
            pacientList.map((pacient) => (
              <div className="pacient" key={pacient.id}>
                <div className="details">
                  <div className="icon"></div>
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
            <h2 className="no-pacient">{error}</h2>
          )}
        </Grid>
      </Container>
    </section>
  );
};

export default AddPacientList;
