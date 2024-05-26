import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { SensorData } from "../../models/models";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const EKGChar = ({ sensorData }: { sensorData: any }) => {
  const [data, setData] = useState<number[]>([]);

  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       setData((prev) => {
  //         if (prev.length > 10) {
  //           prev.shift();
  //         }
  //         return [...prev, Math.floor(Math.random() * 100)];
  //       });
  //     }, 500);
  //     return () => clearInterval(interval);
  //   }, []);

  useEffect(() => {
    console.log(sensorData);
    if (sensorData === null) return;

    setData((prev) => {
      if (prev.length > 10) {
        prev.shift();
      }
      return [...prev, sensorData.valoare_puls];
    });
  }, [sensorData]);

  return (
    <div className="ekg-container">
      <Line
        data={{
          labels: ["", "", "", "", "", "", "", "", "", "", ""],
          datasets: [
            {
              label: "EKG",
              data: data,
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default EKGChar;
