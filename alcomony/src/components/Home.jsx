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
  Filler,
} from "chart.js";
import Testimonials from "./Testimonials";
import Header from "./Header";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function ExpenseGraph() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    datasets: [
      {
        label: "Expenses",
        data: [65, 59, 80, 81, 56, 55, 40, 70],
        borderColor: "#ef4444",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        borderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 5,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  return (
    <Line
      data={data}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: "#4b5563",
              font: { size: 14 },
            },
          },
          title: {
            display: false,
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: "#6b7280" },
          },
          y: {
            grid: { color: "#e5e7eb" },
            ticks: { color: "#6b7280" },
          },
        },
      }}
    />
  );
}

function IncomeGraph() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    datasets: [
      {
        label: "Income",
        data: [45, 60, 75, 90, 65, 60, 50, 80],
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        borderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 5,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  return (
    <Line
      data={data}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: "#4b5563",
              font: { size: 14 },
            },
          },
          title: {
            display: false,
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: "#6b7280" },
          },
          y: {
            grid: { color: "#e5e7eb" },
            ticks: { color: "#6b7280" },
          },
        },
      }}
    />
  );
}

function Home() {
  const phrases = [
    " Meets Finance and Profit Follows",
    " Unlocking New Financial Opportunities",
    " To Your Financial Economy",
  ];

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState("typing");

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];

    if (phase === "typing") {
      if (text.length < currentPhrase.length) {
        const timeout = setTimeout(() => {
          setText(currentPhrase.slice(0, text.length + 1));
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        setPhase("waiting");
      }
    } else if (phase === "waiting") {
      const waitingTimeout = setTimeout(() => setPhase("erasing"), 2000);
      return () => clearTimeout(waitingTimeout);
    } else if (phase === "erasing") {
      if (text.length > 0) {
        const eraseTimeout = setTimeout(() => {
          setText(currentPhrase.slice(0, text.length - 1));
        }, 50);
        return () => clearTimeout(eraseTimeout);
      } else {
        setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        setPhase("typing");
      }
    }
  }, [text, phase, phraseIndex]);

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <Header />
      <main className="px-6 py-12 md:px-20 lg:px-32">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
            AI<span className="text-blue-600">{text}</span>
            <span
              className={`ml-1 border-r-2 border-gray-800 ${
                phase !== "waiting" ? "animate-blink" : ""
              }`}
            ></span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 mt-4 max-w-2xl mx-auto">
            Beautifully track, analyze, and optimize your finances with smart AI and sleek visuals.
          </p>
          <a href="/main">
            <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-lg font-semibold transition-all">
              Get Started
            </button>
          </a>
        </div>

        {/* Graph Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="h-[400px] bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
            <ExpenseGraph />
          </div>
          <div className="h-[400px] bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
            <IncomeGraph />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Total Balance",
              value: "₹45,230",
              change: "+2.5%",
              color: "text-green-600",
            },
            {
              title: "Monthly Expenses",
              value: "₹12,450",
              change: "-1.2%",
              color: "text-red-600",
            },
            {
              title: "Investment Growth",
              value: "+8.7%",
              change: "+0.8%",
              color: "text-blue-600",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white border border-gray-200 shadow-sm p-6 transition-all hover:shadow-md"
            >
              <p className="text-sm text-gray-500">{stat.title}</p>
              <p className="text-3xl font-bold mt-2">{stat.value}</p>
              <p className={`mt-1 text-sm font-semibold ${stat.color}`}>
                {stat.change} this month
              </p>
            </div>
          ))}
        </div>

        {/* Testimonials Section */}
        <div className="mt-20">
          <Testimonials />
        </div>
      </main>

      {/* Typing cursor animation */}
      <style jsx>{`
        @keyframes blink {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
      `}</style>
    </div>
  );
}

export default Home;
