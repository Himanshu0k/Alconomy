import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaMoneyBillWave,
  FaRegCalendarAlt,
  FaCog,
  FaRobot,
  FaKeyboard,
  FaBell,
  FaBullseye,
} from "react-icons/fa";
import alconomy from "./alconomy.png";

const navItems = [
  { name: "Dashboard", icon: <FaTachometerAlt size={18} />, route: "/dashboard" },
  { name: "Expenses", icon: <FaMoneyBillWave size={18} />, route: "/expenses" },
  { name: "Budgets", icon: <FaRegCalendarAlt size={18} />, route: "/budget" },
  { name: "Enter Expense", icon: <FaKeyboard size={18} />, route: "/enter-expense" },
  { name: "AI Report", icon: <FaRobot size={18} />, route: "/aireport" },
  { name: "Add Bill", icon: <FaRobot size={18} />, route: "/add-bill" },
  { name: "Bill Reminders", icon: <FaBell size={18} />, route: "/bill-reminders" },
  { name: "Goal Planner", icon: <FaBullseye size={18} />, route: "/goal-savings" },
  { name: "Expense Prediction", icon: <FaBullseye size={18} />, route: "/expense-prediction" },
  { name: "Settings", icon: <FaCog size={18} />, route: "/settings" },
];

function LeftNavbar() {
  const location = useLocation();

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white/80 backdrop-blur-lg border-r border-gray-200 shadow-xl">
      {/* Logo Section */}
      <div className="flex items-center justify-center py-8 border-b border-gray-200">
        <Link to="/">
          <img
            src={alconomy}
            alt="Alconomy Logo"
            className="w-40 h-40 ml-6 mr-6 -mt-15 transition-transform duration-300 ease-in-out hover:scale-110"
          />
        </Link>
      </div>

      {/* Navigation Items */}
      <nav className="p-4 -mt-15">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.route;
            return (
              <li key={item.name}>
                <Link
                  to={item.route}
                  className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export default LeftNavbar;
