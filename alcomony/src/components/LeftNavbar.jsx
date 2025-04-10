import React from "react";
import { Link } from "react-router-dom";
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

function LeftNavbar() {
  const navItems = [
    {
      name: "Dashboard",
      icon: <FaTachometerAlt size={20} />,
      route: "/dashboard",
    },
    {
      name: "Expenses",
      icon: <FaMoneyBillWave size={20} />,
      route: "/expenses",
    },
    {
      name: "Budgets",
      icon: <FaRegCalendarAlt size={20} />,
      route: "/budget",
    },
    {
      name: "Enter Expense",
      icon: <FaKeyboard size={20} />,
      route: "/enter-expense",
    },
    { name: "AI Report", icon: <FaRobot size={20} />, route: "/aireport" },
    { name: "Add BIll", icon: <FaRobot size={20} />, route: "/add-bill" },

    {
      name: "Bill Reminders",
      icon: <FaBell size={20} />,
      route: "/bill-reminders",
    },
    {
      name: "Goal Planner",
      icon: <FaBullseye size={20} />,
      route: "/goal-savings",
    },
    { name: "Settings", icon: <FaCog size={20} />, route: "/settings" },
  ];

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 shadow-2xl transition-transform duration-300">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-700">
        <Link to="/">
          <img
            src={alconomy}
            alt="Alconomy Logo"
            className="h-50 object-contain"
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.route}
                className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-300 group"
              >
                <span className="mr-4 transition-transform group-hover:scale-110">
                  {item.icon}
                </span>
                <span className="font-medium">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default LeftNavbar;
