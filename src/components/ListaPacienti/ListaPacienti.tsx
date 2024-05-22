import { useEffect, useState } from "react";
import Container from "../Container/Container";
import Grid from "../Grid/Grid";
import { useUserStore } from "../../hooks/useUserStore";
import "./ListaPacienti.scss";

const ListaPacienti = () => {
  const { getRegisteredPacients } = useUserStore();
  const [pacientList, setPacientList] = useState([]);

  const fetchPacients = async () => {
    const pacients = await getRegisteredPacients();
    // setPacientList(pacients);
    console.log("Pacients: ", pacients);
  };

  useEffect(() => {
    fetchPacients();
  }, []);

  return (
    <section className="pacient-list">
      <Container>
        <Grid>
          {pacientList.length > 0 ? (
            <div className="pacient">
              <div className="details">
                <div className="icon"></div>
                <p className="name">Nume Prenume</p>
                <p className="age"></p>
                <a href="tel:+4072 222 222" className="phone">
                  +4072 222 222
                </a>
              </div>

              <div className="actions">
                <p className="view-pacinet">View pacient</p>
              </div>
            </div>
          ) : (
            <h2 className="no-pacient">No pacient added</h2>
          )}
        </Grid>
      </Container>
    </section>
  );
};

export default ListaPacienti;
