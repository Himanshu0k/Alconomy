import { useState } from "react";
import LeftNavbar from "./LeftNavbar";

function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [autoSave, setAutoSave] = useState(false);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Sidebar */}
      <aside className="w-64 h-screen overflow-y-auto bg-gray-800 border-r border-gray-700 shadow-lg">
        <LeftNavbar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-4xl mx-auto space-y-8">
          <header>
            <h1 className="text-4xl font-extrabold mb-4">Settings</h1>
            <p className="text-gray-400 text-lg">
              Manage your preferences and application settings.
            </p>
          </header>

          <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 p-8 space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold">
                Enable Notifications
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={() => setNotifications(!notifications)}
                  className="sr-only peer"
                />
                <div
                  className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full 
                  peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white
                  after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 
                  after:border after:rounded-full after:h-5 after:w-5 after:transition-all"
                ></div>
              </label>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold">Dark Mode</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                  className="sr-only peer"
                />
                <div
                  className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full 
                  peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white
                  after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 
                  after:border after:rounded-full after:h-5 after:w-5 after:transition-all"
                ></div>
              </label>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold">Auto-Save</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoSave}
                  onChange={() => setAutoSave(!autoSave)}
                  className="sr-only peer"
                />
                <div
                  className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full 
                  peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white
                  after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 
                  after:border after:rounded-full after:h-5 after:w-5 after:transition-all"
                ></div>
              </label>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Settings;
