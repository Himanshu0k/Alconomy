import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
  Title,
} from "chart.js";
import LeftNavbar from "./LeftNavbar";

// Chart.js registration
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
  Title
);

// Static bill data
const bills = [
  { name: "Electricity Bill", amount: 1200, due: "2025-04-15" },
  { name: "Internet Bill", amount: 800, due: "2025-04-18" },
  { name: "Credit Card", amount: 4000, due: "2025-04-20" },
  { name: "Water Bill", amount: 600, due: "2025-04-22" },
  { name: "Phone Recharge", amount: 300, due: "2025-04-25" },
];

// Calculate days left for each bill
const today = new Date();
const billsWithDaysLeft = bills.map((bill) => {
  const dueDate = new Date(bill.due);
  const timeDiff = dueDate - today;
  const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  return { ...bill, daysLeft };
});

// Find the bill with the closest due date
const minDaysLeft = Math.min(...billsWithDaysLeft.map((bill) => bill.daysLeft));
const closestBillName = billsWithDaysLeft.find(bill => bill.daysLeft === minDaysLeft)?.name;

// Bar Chart Data
const barData = {
  labels: bills.map((bill) => bill.name),
  datasets: [
    {
      label: "Bill Amount (₹)",
      data: bills.map((bill) => bill.amount),
      backgroundColor: "#3b82f6",
      borderRadius: 8,
    },
  ],
};

const barOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: {
      display: true,
      text: "Upcoming Bills by Amount",
      font: { size: 30 },
      color: "#1f2937",
    },
  },
  scales: {
    x: { ticks: { color: "#4b5563" }, grid: { display: false } },
    y: { ticks: { color: "#4b5563" }, grid: { color: "#f3f4f6" } },
  },
};

// Pie Chart Data
const pieData = {
  labels: bills.map((bill) => bill.name),
  datasets: [
    {
      label: "Amount",
      data: bills.map((bill) => bill.amount),
      backgroundColor: [
        "#60a5fa",
        "#fbbf24",
        "#34d399",
        "#f87171",
        "#a78bfa",
      ],
    },
  ],
};

const pieOptions = {
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        color: "#4b5563",
        padding: 76,
      },
    },
    title: {
      display: true,
      text: "Bill Distribution by Category",
      color: "#1f293",
      font: { size: 30 },
    },
  },
};

const BillReminders = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-tr from-gray-100 via-white to-gray-200 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 h-screen border-r border-gray-200 bg-white shadow-md z-10">
        <LeftNavbar />
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto p-6 md:p-10 space-y-10 animate-fade-in">
        <h1 className="text-3xl font-bold text-center">📅 Bill Reminders</h1>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 fade-in">
          <div className="bg-white/80 backdrop-blur-lg border border-gray-200 rounded-xl shadow-lg p-4">
            <Bar data={barData} options={barOptions} height={200} />
          </div>
          <div className="bg-white/80 backdrop-blur-lg border border-gray-200 rounded-xl shadow-lg p-4">
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>

        {/* Upcoming Bills List */}
        <div className="bg-white/90 backdrop-blur-xl border border-gray-200 shadow-md rounded-xl p-6 fade-in">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Upcoming Bills</h2>
          <ul className="space-y-4">
            {billsWithDaysLeft.map((bill, index) => {
              const isClosest = bill.name === closestBillName;
              return (
                <li
                  key={index}
                  className={`flex items-center justify-between p-4 rounded-lg border border-gray-200 bg-white/70 shadow-sm transition duration-300 ${
                    isClosest ? "text-red-600 animate-pulse border-red-300" : "hover:shadow-md"
                  }`}
                >
                  <div>
                    <p className="text-lg font-medium">{bill.name}</p>
                    <p className="text-sm text-gray-500">Due: {bill.due}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">₹{bill.amount}</p>
                    <p className={`text-sm ${isClosest ? "text-red-500 font-semibold" : "text-gray-500"}`}>
                      {bill.daysLeft} {bill.daysLeft === 1 ? "day" : "days"} left
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Animations */}
        <style jsx>{`
          .fade-in {
            animation: fadeInUp 0.6s ease-in-out both;
          }
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </main>
    </div>
  );
};

export default BillReminders;
