import { useEffect, useState } from "react";
import Container from "../Container/Container";
import "./ViewPacient.scss";
import {
  Alarms,
  AllPacientData,
  Istoric_Alarme,
  Recomandare,
} from "../../models/models";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useUserStore } from "../../hooks/useUserStore";
import {
  initiateSocketConnection,
  disconnectSocket,
  subscribeToPulseUpdates,
  joinRoom,
  leaveRoom,
} from "../../services/socketService";
import EKGChar from "../EKGChart/EKGChart";
import { Button } from "@mui/material";
import SetAlarms from "../SetAlarms/SetAlarms";
import AddRecomandation from "../AddRecomandation/AddRecomandation";
import { usePacient } from "../../hooks/usePacient";

interface SensorData {
  valoare_puls: number;
  valoare_lumina: number;
  valoare_temp: number;
  valoare_umiditate: number;
}

const ViewPacient = ({ pacientID }: { pacientID: string }) => {
  const { getIstoricAlarme } = usePacient();
  const { getPacientProfile } = useUserStore();
  const [pacientData, setPacientData] = useState<AllPacientData | null>(null);
  const [sensorData, setSensorData] = useState<SensorData | null>(null);
  const [istoricAlarme, setIstoricAlarme] = useState<Istoric_Alarme[]>();
  const [isAlarmsModalOpen, setIsAlarmsModalOpen] = useState(false);
  const [isRecomandationModalOpen, setIsRecomandationModalOpen] =
    useState(false);

  const [selectedAlarmsValue, setSelectedAlarmsValue] = useState<Alarms | null>(
    null
  );

  const [selectedRecomandationValue, setSelectedRecomandationValue] =
    useState<Recomandare | null>({
      CNP_pacient: pacientID,
      tip_recomandare: "",
      durata_zilnica: 0,
      alte_indicatii: "",
      tratamente: "",
    });

  const handleClose = () => {
    setIsAlarmsModalOpen(false);
    setIsRecomandationModalOpen(false);
  };

  const fetchIstoricAlarme = async () => {
    if (!pacientData?.CNP_pacient) {
      setIstoricAlarme([]);

      return false;
    }
    const result = await getIstoricAlarme(pacientData?.CNP_pacient);

    setIstoricAlarme(result?.data.alarms);
  };

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
    setSelectedAlarmsValue({
      puls_max: pacientData?.alerta_automata?.puls_valoare_maxima ?? 120,
      puls_min: pacientData?.alerta_automata?.puls_valoare_minima ?? 40,
      temperatura_max:
        pacientData?.alerta_automata?.temperatura_valoare_maxima ?? 37,
      temperatura_min:
        pacientData?.alerta_automata?.temperatura_valoare_minima ?? 25,
      umiditate_max:
        pacientData?.alerta_automata?.umiditate_valoare_maxima ?? 0.96,
      umiditate_min:
        pacientData?.alerta_automata?.umiditate_valoare_minima ?? 0,
    });
  }, [pacientData]);

  useEffect(() => {
    fetchIstoricAlarme();
    const interval = setInterval(fetchIstoricAlarme, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [pacientData]);

  useEffect(() => {
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
    <>
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
                  <a href={`emailto:${pacientData?.email}`}>
                    Email: <b>{`${pacientData?.email}`}</b>
                  </a>
                </div>
                <div className="Firm">
                  <p>
                    Firm: <b>{`${pacientData?.loc_munca_pacient}`}</b>
                  </p>
                </div>
                <div className="phone-number">
                  <a href={`tel:${pacientData?.telefon_pacient}`}>
                    Phone Number: <b>{`${pacientData?.telefon_pacient}`}</b>
                  </a>
                </div>

                <div className="options">
                  <Button variant="outlined" sx={{ width: "90%" }}>
                    Edit patient
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{ width: "90%" }}
                    onClick={() => {
                      setIsRecomandationModalOpen(true);
                    }}
                  >
                    Add recomandation
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{ width: "90%" }}
                    onClick={() => {
                      setIsAlarmsModalOpen(true);
                    }}
                  >
                    Set Alarms
                  </Button>
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

            <EKGChar />

            <div className="gc-2">
              <div className="alergeni">
                <h3>Allergens</h3>
                <p>{pacientData?.alergii ?? "No allergens"}</p>
              </div>
              <div className="alarme">
                <h3>Alarms</h3>
                {pacientData?.alerta_automata ? (
                  <div className="params">
                    <p>
                      Pulse: {pacientData?.alerta_automata.puls_valoare_maxima}{" "}
                      - {pacientData?.alerta_automata.puls_valoare_minima}
                    </p>
                    <p>
                      Temperature:{" "}
                      {pacientData?.alerta_automata.temperatura_valoare_maxima}{" "}
                      -{" "}
                      {pacientData?.alerta_automata.temperatura_valoare_minima}
                    </p>
                    <p>
                      Humidity:{" "}
                      {pacientData?.alerta_automata.umiditate_valoare_maxima} -{" "}
                      {pacientData?.alerta_automata.umiditate_valoare_minima}
                    </p>
                  </div>
                ) : (
                  <p>No alarms set</p>
                )}
              </div>
            </div>

            <div className="istoric-medical">
              <h3>Istoric alarme</h3>
              {istoricAlarme?.map((alarma, index) => (
                <div
                  className={`alarm${alarma.resolved ? "" : " active"}`}
                  key={index}
                >
                  {alarma.puls !== null ? (
                    <p>{alarma.puls}</p>
                  ) : alarma.temperatura !== null ? (
                    <p>{alarma.temperatura}</p>
                  ) : alarma.umiditate !== null ? (
                    <p>{alarma.umiditate}</p>
                  ) : (
                    <p>Alarma Senzori</p>
                  )}
                  <p className="date">30.05.2024</p>
                </div>
              ))}
            </div>

              

          </div>
        </Container>
      </section>

      {pacientData?.CNP_pacient && (
        <>
          <SetAlarms
            CNP_pacient={pacientData.CNP_pacient}
            pacientID={pacientID}
            selectedValue={selectedAlarmsValue}
            setSelectedValue={setSelectedAlarmsValue}
            open={isAlarmsModalOpen}
            onClose={handleClose}
            fetchPacientProfile={fetchPacientProfile}
          />

          <AddRecomandation
            CNP_pacient={pacientData.CNP_pacient}
            open={isRecomandationModalOpen}
            selectedValue={selectedRecomandationValue}
            setSelectedValue={setSelectedRecomandationValue}
            onClose={handleClose}
          />
        </>
      )}
    </>
  );
};

export default ViewPacient;
