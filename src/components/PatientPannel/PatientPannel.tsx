import Container from "../Container/Container";
import { useUserStore } from "../../hooks/useUserStore";
import Grid from "../Grid/Grid";
import "./PatientPannel.scss";

const PatientPannel = () => {
    const {user} = useUserStore();

  return (
    <section className="patient-pannel">
        <Container>
            <Grid>
                <h1>Welcome, {user?.first_name}.</h1>
            </Grid>
        </Container>
    </section>
  );
};

export default PatientPannel;
