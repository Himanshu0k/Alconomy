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

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Component: Personal Expenditure Graph
const PersonalExpenditureGraph = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    datasets: [
      {
        label: "Personal Expenditure",
        data: [500, 600, 550, 700, 650, 620, 680, 720],
        borderColor: "#F59E0B", // amber color
        backgroundColor: "rgba(245, 158, 11, 0.2)",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: "#fff" } },
      title: {
        display: true,
        text: "Personal Expenditure Trend",
        color: "#fff",
      },
    },
    scales: {
      x: { grid: { color: "#374151" }, ticks: { color: "#fff" } },
      y: { grid: { color: "#374151" }, ticks: { color: "#fff" } },
    },
  };

  return (
    <div className="h-64">
      <Line data={data} options={options} />
    </div>
  );
};

// Component: Family Expenditure Graph
const FamilyExpenditureGraph = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    datasets: [
      {
        label: "Family Expenditure",
        data: [800, 850, 900, 870, 920, 910, 880, 940],
        borderColor: "#3B82F6", // blue color
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: "#fff" } },
      title: {
        display: true,
        text: "Family Expenditure Trend",
        color: "#fff",
      },
    },
    scales: {
      x: { grid: { color: "#374151" }, ticks: { color: "#fff" } },
      y: { grid: { color: "#374151" }, ticks: { color: "#fff" } },
    },
  };

  return (
    <div className="h-64">
      <Line data={data} options={options} />
    </div>
  );
};

// Component: Quick Stats
const QuickStats = () => {
  const stats = [
    {
      title: "Total Balance",
      value: "₹45,230",
      change: "+2.5%",
      icon: "💰",
      color: "bg-gray-800",
    },
    {
      title: "Monthly Expenses",
      value: "₹12,450",
      change: "-1.2%",
      icon: "📉",
      color: "bg-gray-800",
    },
    {
      title: "Investment Growth",
      value: "+8.7%",
      change: "+0.8%",
      icon: "📈",
      color: "bg-gray-800",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`rounded-2xl p-6 shadow-xl bg-gradient-to-r ${stat.color} text-white`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">{stat.title}</p>
              <p className="mt-2 text-3xl font-bold">{stat.value}</p>
            </div>
            <div className="text-4xl">{stat.icon}</div>
          </div>
          <p className="mt-4 text-sm">
            Last month: <span className="font-semibold">{stat.change}</span>
          </p>
        </div>
      ))}
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Left Sidebar */}
      <aside className="w-64 h-screen overflow-y-auto">
        <LeftNavbar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Page Content */}
        <section className="p-6 space-y-8 overflow-auto">
          {/* Quick Stats */}
          <QuickStats />

          {/* Planner and Habits */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <FinancePlanner />
            <FinanceHabits />
          </div>

          {/* Expenditure Graphs */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <PersonalExpenditureGraph />
            <FamilyExpenditureGraph />
          </div>

          {/* Unpaid Bills Chart */}
          <div className="mt-8">
            <UnpaidBillsChart />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
