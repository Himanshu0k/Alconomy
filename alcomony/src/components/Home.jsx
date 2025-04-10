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
import LeftNavbar from "./LeftNavbar";
import Header from "./Header"; // Import the Header component
import Expenses from "./Expenses";

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
        borderColor: "#6366f1",
        backgroundColor: "rgba(99, 102, 241, 0.2)",
        borderWidth: 3,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.4,
        fill: { target: "origin", above: "rgba(99, 102, 241, 0.1)" },
      },
    ],
  };

  return (
    <div className="h-full w-full">
      <Line
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { labels: { color: "#e5e7eb", font: { size: 14 } } },
            title: {
              display: true,
              text: "Expenses Trend",
              color: "#f3f4f6",
              font: { size: 18 },
            },
            tooltip: {
              backgroundColor: "#1f2937",
              titleColor: "#f3f4f6",
              bodyColor: "#e5e7eb",
              borderColor: "#4b5563",
              borderWidth: 1,
              padding: 12,
              intersect: false,
              mode: "index",
            },
          },
          scales: {
            x: { grid: { color: "#374151" }, ticks: { color: "#9ca3af" } },
            y: { grid: { color: "#374151" }, ticks: { color: "#9ca3af" } },
          },
          interaction: { mode: "nearest", intersect: false },
        }}
      />
    </div>
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
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        borderWidth: 3,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.4,
        fill: { target: "origin", above: "rgba(16, 185, 129, 0.1)" },
      },
    ],
  };

  return (
    <div className="h-full w-full">
      <Line
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { labels: { color: "#e5e7eb", font: { size: 14 } } },
            title: {
              display: true,
              text: "Income Progression",
              color: "#f3f4f6",
              font: { size: 18 },
            },
            tooltip: {
              backgroundColor: "#1f2937",
              titleColor: "#f3f4f6",
              bodyColor: "#e5e7eb",
              borderColor: "#4b5563",
              borderWidth: 1,
              padding: 12,
              intersect: false,
              mode: "index",
            },
          },
          scales: {
            x: { grid: { color: "#374151" }, ticks: { color: "#9ca3af" } },
            y: { grid: { color: "#374151" }, ticks: { color: "#9ca3af" } },
          },
          interaction: { mode: "nearest", intersect: false },
        }}
      />
    </div>
  );
}

function Home() {
  // Define the dynamic phrases that follow the static "AI"
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
  }, [text, phase, phraseIndex, phrases]);

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Left Navbar can be added here if needed */}
      <div className="flex-1 overflow-auto">
        {/* Header component added here */}
        <Header />
        <div className="flex flex-col px-8 py-12 md:px-16">
          {/* Text Section */}
          <div className="mb-16">
            <div className="relative inline-block">
              <h1 className="mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-4xl font-bold text-transparent md:text-5xl lg:text-6xl">
                AI{text}
                <span
                  className={`ml-2 border-r-2 border-white ${
                    phase !== "waiting" ? "animate-blink" : ""
                  }`}
                ></span>
              </h1>
            </div>

            <p className="mb-8 text-lg leading-relaxed text-gray-300 md:text-xl">
              Streamline your financial operations with our comprehensive
              expense tracking and budgeting solutions. Gain real-time insights
              and take control of your finances.
            </p>

            <a href="/main">
              <button className="transform rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Get Started
              </button>
            </a>
          </div>

          {/* Dual Graphs Section */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="h-[500px] rounded-xl bg-gray-800 p-6 shadow-2xl">
              <ExpenseGraph />
            </div>
            <div className="h-[500px] rounded-xl bg-gray-800 p-6 shadow-2xl">
              <IncomeGraph />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                title: "Total Balance",
                value: "₹45,230",
                change: "+2.5%",
                color: "bg-green-500",
              },
              {
                title: "Monthly Expenses",
                value: "₹12,450",
                change: "-1.2%",
                color: "bg-red-500",
              },
              {
                title: "Investment Growth",
                value: "+8.7%",
                change: "+0.8%",
                color: "bg-blue-500",
              },
            ].map((stat, index) => (
              <div key={index} className="rounded-xl bg-gray-800 p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400">{stat.title}</p>
                    <p className="mt-2 text-3xl font-bold text-white">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`${stat.color} rounded-full p-4`}>
                    <span className="text-2xl">📈</span>
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-300">
                  Last month: {stat.change}
                </p>
              </div>
            ))}
          </div>
        </div>
        <Testimonials />
      </div>

      <style jsx>{`
        @keyframes blink {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </div>
  );
}

export default Home;
