import { useState } from "react";
import LeftNavbar from "./LeftNavbar";
import { useTheme } from "../context/ThemeContext"; // ⬅️ Import theme context

function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(false);

  const { theme, toggleTheme } = useTheme(); // ⬅️ Destructure theme and toggle function

  return (
    <div className="flex min-h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-all">
      {/* Sidebar */}
      <aside className="w-64 h-screen overflow-y-auto bg-white dark:bg-gray-800 border-r border-gray-300 dark:border-gray-700 shadow-md">
        <LeftNavbar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-4xl mx-auto space-y-8">
          <header>
            <h1 className="text-4xl font-extrabold mb-4 text-blue-600 dark:text-blue-400">Settings</h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Manage your preferences and application settings.
            </p>
          </header>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-8 space-y-6">
            {/* Notifications */}
            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold">Enable Notifications</span>
              <ToggleSwitch isChecked={notifications} onChange={() => setNotifications(!notifications)} />
            </div>

            {/* Dark Mode */}
            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold">Dark Mode</span>
              <ToggleSwitch isChecked={theme === "dark"} onChange={toggleTheme} />
            </div>

            {/* Auto-Save */}
            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold">Auto-Save</span>
              <ToggleSwitch isChecked={autoSave} onChange={() => setAutoSave(!autoSave)} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Reusable Toggle Switch Component
const ToggleSwitch = ({ isChecked, onChange }) => (
  <label className="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      checked={isChecked}
      onChange={onChange}
      className="sr-only peer"
    />
    <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-400 rounded-full 
                    peer-checked:bg-blue-500 peer-checked:after:translate-x-full peer-checked:after:border-white
                    after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 
                    after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:after:border-gray-700" />
  </label>
);

export default Settings;
