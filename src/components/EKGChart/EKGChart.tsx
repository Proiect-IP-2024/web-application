import { useEffect, useState } from "react";
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
import jsonData from "./EKG.json"; // Importing JSON data

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const EKGChart = () => {
  const [sensorData, setSensorData] = useState<number[]>([]);
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    setSensorData(jsonData);
  }, []);

  useEffect(() => {
    // Set the initial data to be the first chunk of sensorData
    if (sensorData.length > 0) {
      setData(sensorData.slice(0, 11)); // Set initial chunk of 11 elements
    }

    const interval = setInterval(() => {
      setSensorData((prevSensorData) => {
        if (prevSensorData.length === 0) return prevSensorData;

        // Take the next chunk of 11 elements
        const newData = prevSensorData.slice(0, 11);
        setData(newData);

        // Remove the first chunk from sensorData
        return prevSensorData.slice(11);
      });
    }, 3000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
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
              tension: 0.2,
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

export default EKGChart;
