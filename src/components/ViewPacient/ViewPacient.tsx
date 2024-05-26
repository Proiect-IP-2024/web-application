import { useEffect, useState } from "react";
import Container from "../Container/Container";
import "./ViewPacient.scss";
import { AllPacientData } from "../../models/models";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useUserStore } from "../../hooks/useUserStore";
import {
  initiateSocketConnection,
  disconnectSocket,
  subscribeToPulseUpdates,
  joinRoom,
  leaveRoom,
} from "../../services/socketService";

interface SensorData {
  valoare_puls: number;
  valoare_lumina: number;
  valoare_temp: number;
  valoare_umiditate: number;
}

const ViewPacient = ({ pacientID }: { pacientID: string }) => {
  const { getPacientProfile } = useUserStore();
  const [pacientData, setPacientData] = useState<AllPacientData | null>(null);
  const [sensorData, setSensorData] = useState<SensorData | null>(null);

  const fetchPacientProfile = async () => {
    const response = await getPacientProfile(pacientID);
    if (response.isOk) {
      setPacientData(response.response);
    } else {
      setPacientData(null);
    }
  };

  useEffect(() => {
    fetchPacientProfile();
  }, [pacientID]);

  useEffect(() => {
    console.log(pacientData);

    if (pacientData && pacientData.CNP_pacient) {
      initiateSocketConnection();

      joinRoom(Number(pacientData.CNP_pacient));

      subscribeToPulseUpdates((err: any, data: any) => {
        if (err) return console.error(err);
        setSensorData(data.sensor_data);
      });

      return () => {
        leaveRoom(Number(pacientData.CNP_pacient));
        disconnectSocket();
      };
    }
  }, [pacientData]);

  return (
    <section className="view-pacient">
      <Container>
        <div className="pacinet-card">
          <div className="card-container">
            <div className="profile">
              <AccountCircleIcon />
            </div>
            <div className="name">{`${pacientData?.first_name} ${pacientData?.last_name}`}</div>
            <div className="gender">Male</div>
            <div className="general-information">
              <h1 className="f-24">General Information</h1>
              <div className="birth-date">
                <p>
                  Birth Date: <b>4.10.2002</b>
                </p>
              </div>
              <div className="address">
                <p>
                  Address: <b>{`${pacientData?.adresa_pacient}`}</b>
                </p>
              </div>
              <div className="cnp">
                <p>
                  CNP: <b>{`${pacientData?.CNP_pacient}`}</b>
                </p>
              </div>
              <div className="profesie">
                <p>
                  Job: <b>{`${pacientData?.profesie_pacient}`}</b>
                </p>
              </div>
              <div className="email">
                <p>
                  Email: <b>{`${pacientData?.email}`}</b>
                </p>
              </div>
              <div className="Firm">
                <p>
                  Firm: <b>{`${pacientData?.loc_munca_pacient}`}</b>
                </p>
              </div>
              <div className="phone-number">
                <p>
                  Phone Number: <b>{`${pacientData?.telefon_pacient}`}</b>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="pacient-details">
          <div className="pacient-details-container">
            <div className="box">
              <h3 className="f-18">Tensiune arteriala</h3>
              <p>{pacientData?.consult?.tensiune ?? 0}</p>
            </div>
            <div className="box">
              <h3 className="f-18">Glicemie</h3>
              <p>{pacientData?.consult?.glicemie ?? 0}</p>
            </div>
            <div className="box">
              <h3 className="f-18">Batai pe minut</h3>
              <p>{sensorData?.valoare_puls}</p>
            </div>
          </div>

          <div className="ecg"></div>

          <div className="gc-2">
            <div className="alergeni">
              <h3>Alergeni</h3>
              <p>{pacientData?.alergii}</p>
            </div>
            <div className="alarme">
              <h3>Alarme</h3>
            </div>
          </div>

          <div className="istoric-medical">
            <h3 >Istoric medical</h3>
            
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ViewPacient;
