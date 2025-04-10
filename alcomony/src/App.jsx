// import { useState } from "react";
import "./App.css";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Selector from "./components/Selector";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Expenses from "./components/Expenses";
import Budget from "./components/Budget";
import EnterExpense from "./components/EnterExpense";
import AIReports from "./components/AIReports";
import Settings from "./components/Settings";
import AISavingsPlanner from "./components/GoalSavingPlanner";
import BillReminders from "./components/BillReminders";
import AddBill from "./components/AddBill";
import TradingApps from "./components/TradingApps";
import Freelancer from "./components/Freelancer";
import PayPalCheckout from "./components/PayPalCheckout";
import VoiceToText from "./components/VoiceToText";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<Selector />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/enter-expense" element={<EnterExpense />} />
        <Route path="/aireport" element={<AIReports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/bill-reminders" element={<BillReminders />} />
        <Route path="/goal-savings" element={<AISavingsPlanner />} />
        <Route path="/add-bill" element={<AddBill />} />
        <Route path="/trading-app" element={<TradingApps />} />
        <Route path="/freelancer" element={<Freelancer />} />
        <Route path="/paypal-checkout" element={<PayPalCheckout />} />
        <Route path="/voice-to-text" element={<VoiceToText />} />
      </Routes>
    </Router>
  );
}

export default App;
