import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import type { ChartOptions } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface StatProps {
  mode: "globali" | "mie";
}

const Stat: React.FC<StatProps> = ({ mode }) => {
  const [dataBackend, setDataBackend] = useState<{
    numeroStorie: number;
    numeroCapitoli: number;
    numeroCommenti: number;
    mediaCapitoliPerStoria: number;
  } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token usato:", token);
    console.log("UserId usato:", localStorage.getItem("userId"));

    const endpoint =
      mode === "globali"
        ? "http://localhost:8080/api/statistiche/globali"
        : `http://localhost:8080/api/statistiche/${localStorage.getItem(
            "userId"
          )}`;

    fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Errore nel fetch");
        return res.json();
      })
      .then((data) => {
        console.log("📊 Statistiche ricevute:", data);
        setDataBackend(data);
      })
      .catch((err) =>
        console.error("Errore nel caricamento delle statistiche:", err)
      );
  }, [mode]);

  if (!dataBackend) return <div>Loading...</div>;

  const chartData = {
    labels: ["Storie", "Capitoli", "Commenti"],
    datasets: [
      {
        label:
          mode === "globali" ? "Statistiche Globali" : "Le Mie Statistiche",
        data: [
          dataBackend.numeroStorie,
          dataBackend.numeroCapitoli,
          dataBackend.numeroCommenti,
        ],
        backgroundColor: ["#f36dffff", "#b351e0ff", "#5020caff"],
        borderRadius: 10,
        borderSkipped: false,
        barThickness: 40,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: "#374151",
          font: {
            weight: "bold",
          },
        },
        grid: {
          color: "#e5e7eb",
        },
      },
      x: {
        ticks: {
          color: "#374151",
          font: {
            weight: "bold",
          },
        },
      },
    },
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-xl border border-gray-100 w-full max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6 text-indigo-600 text-center">
        {mode === "globali" ? "Statistiche Generali" : "Le tue Statistiche"}
      </h2>
      <Bar data={chartData} options={options} />
      <p className="mt-4 text-center">
        <strong>Media capitoli per storia:</strong>{" "}
        {dataBackend.mediaCapitoliPerStoria}
      </p>
    </div>
  );
};

export default Stat;
