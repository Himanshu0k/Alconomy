import React from "react";
import LeftNavbar from "./LeftNavbar";
import FinancePlanner from "./FinancePlanner";
import FinanceHabits from "./FinancialHabits";
import UnpaidBillsChart from "./UnpaidBillsChart";
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const createChartOptions = (title) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { labels: { color: "#374151" } },
    title: {
      display: true,
      text: title,
      color: "#1f2937",
      font: { size: 18, weight: "bold" },
    },
  },
  scales: {
    x: { grid: { color: "#f3f4f6" }, ticks: { color: "#6b7280" } },
    y: { grid: { color: "#f3f4f6" }, ticks: { color: "#6b7280" } },
  },
});

const PersonalExpenditureGraph = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    datasets: [{
      label: "Personal Expenditure",
      data: [500, 600, 550, 700, 650, 620, 680, 720],
      borderColor: "#f59e0b",
      backgroundColor: "rgba(245, 158, 11, 0.1)",
      borderWidth: 2,
      tension: 0.4,
      fill: true,
    }],
  };

  return (
    <div className="fade-in h-72 bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-gray-200">
      <Line data={data} options={createChartOptions("Personal Expenditure Trend")} />
    </div>
  );
};

const FamilyExpenditureGraph = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    datasets: [{
      label: "Family Expenditure",
      data: [800, 850, 900, 870, 920, 910, 880, 940],
      borderColor: "#3b82f6",
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      borderWidth: 2,
      tension: 0.4,
      fill: true,
    }],
  };

  return (
    <div className="fade-in h-72 bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-gray-200">
      <Line data={data} options={createChartOptions("Family Expenditure Trend")} />
    </div>
  );
};

const QuickStats = () => {
  const stats = [
    {
      title: "Total Balance",
      value: "₹45,230",
      change: "+2.5%",
      icon: "💰",
      border: "border-green-400",
      ring: "ring-green-100",
    },
    {
      title: "Monthly Expenses",
      value: "₹12,450",
      change: "-1.2%",
      icon: "📉",
      border: "border-red-400",
      ring: "ring-red-100",
    },
    {
      title: "Investment Growth",
      value: "+8.7%",
      change: "+0.8%",
      icon: "📈",
      border: "border-blue-400",
      ring: "ring-blue-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 fade-in">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`transition-transform duration-300 hover:scale-105 bg-white/80 border ${stat.border} shadow-md rounded-xl p-6 ring-1 ${stat.ring} backdrop-blur-md`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
              <p className="text-3xl font-semibold text-gray-800 mt-1">{stat.value}</p>
            </div>
            <div className="text-4xl">{stat.icon}</div>
          </div>
          <p className="mt-4 text-sm text-gray-600">Last month: <span className="font-medium">{stat.change}</span></p>
        </div>
      ))}
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-200 text-gray-800">
      <aside className="w-64 h-screen border-r border-gray-200 bg-white shadow-sm z-10">
        <LeftNavbar />
      </aside>

      <main className="flex-1 overflow-y-auto p-6 md:p-10 space-y-14 animate-fade-in">
        <QuickStats />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 fade-in">
          <div className="bg-white/80 shadow rounded-xl p-6 backdrop-blur-xl border border-gray-200">
            <FinancePlanner />
          </div>
          <div className="bg-white/80 shadow rounded-xl p-6 backdrop-blur-xl border border-gray-200">
            <FinanceHabits />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <PersonalExpenditureGraph />
          <FamilyExpenditureGraph />
        </div>

        <div className="bg-white/90 shadow-md rounded-xl p-6 backdrop-blur-xl border border-gray-200 fade-in">
          <UnpaidBillsChart />
        </div>
      </main>

      {/* Animations */}
      <style jsx>{`
        .fade-in {
          animation: fadeInUp 0.8s ease-in-out both;
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
