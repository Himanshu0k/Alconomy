import React from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function TradingChart() {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Trading Volume",
        data: [120, 150, 90, 170, 130, 160, 180],
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="h-64">
      <Line
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { labels: { color: "#fff", font: { size: 14 } } },
            title: {
              display: true,
              text: "Trading Volume",
              color: "#fff",
              font: { size: 18 },
            },
            tooltip: {
              backgroundColor: "#1f2937",
              titleColor: "#f3f4f6",
              bodyColor: "#e5e7eb",
              borderColor: "#4b5563",
              borderWidth: 1,
              padding: 12,
            },
          },
          scales: {
            x: { grid: { color: "#4b5563" }, ticks: { color: "#9ca3af" } },
            y: { grid: { color: "#4b5563" }, ticks: { color: "#9ca3af" } },
          },
          interaction: { mode: "nearest", intersect: false },
        }}
      />
    </div>
  );
}

function TradingApps() {
  // Updated heading style: gradient from purple to pink for a more vibrant look.
  const headingStyle =
    "text-2xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent";

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-800 to-gray-900 text-white flex flex-col">
      <header className="p-8 text-center">
        <h1 className="text-5xl font-bold animate-fadeIn">Trading Apps</h1>
        <p className="mt-4 text-lg text-gray-300 animate-fadeIn">
          Explore market trends, in-depth analytics, and connect with top
          trading platforms.
        </p>
      </header>

      <main className="flex-1 p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1: Market Trends */}
          <div className="bg-gray-700 p-6 rounded-lg shadow-xl transform hover:scale-105 transition duration-300">
            <h2 className={headingStyle}>Market Trends</h2>
            <TradingChart />
            <p className="mt-4 text-gray-300">
              Stay updated with the latest trading volumes and market
              activities. Our chart provides a week-long overview of trading
              volume fluctuations.
            </p>
            <ul className="mt-2 list-disc ml-5 text-sm text-gray-400">
              <li>Real-time data updates</li>
              <li>Comprehensive volume analysis</li>
              <li>Interactive chart features</li>
            </ul>
          </div>
          {/* Card 2: Our Partners */}
          <div className="bg-gray-700 p-6 rounded-lg shadow-xl transform hover:scale-105 transition duration-300">
            <h2 className={headingStyle}>Our Partners</h2>
            <p className="text-gray-300 mb-4">
              We collaborate with leading trading platforms to provide the best
              market insights.
            </p>
            <ul className="space-y-6">
              <li className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                <a
                  href="https://www.binance.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-4 hover:text-blue-400 transition-colors duration-300"
                >
                  <img
                    src="https://cryptologos.cc/logos/binance-coin-bnb-logo.png?v=022"
                    alt="Binance"
                    className="w-12 h-12"
                  />
                  <span className="text-xl font-medium">Binance</span>
                </a>
                <p className="mt-1 sm:mt-0 text-sm text-gray-400">
                  Leading global exchange.
                </p>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                <a
                  href="https://www.coinbase.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-4 hover:text-blue-400 transition-colors duration-300"
                >
                  <img
                    src="https://cryptologos.cc/logos/coinbase-coinbase-logo.png?v=022"
                    alt="Coinbase"
                    className="w-12 h-12"
                  />
                  <span className="text-xl font-medium">Coinbase</span>
                </a>
                <p className="mt-1 sm:mt-0 text-sm text-gray-400">
                  Trusted by millions.
                </p>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                <a
                  href="https://www.kraken.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-4 hover:text-blue-400 transition-colors duration-300"
                >
                  <img
                    src="https://cryptologos.cc/logos/kraken-kraken-logo.png?v=022"
                    alt="Kraken"
                    className="w-12 h-12"
                  />
                  <span className="text-xl font-medium">Kraken</span>
                </a>
                <p className="mt-1 sm:mt-0 text-sm text-gray-400">
                  Secure & reliable.
                </p>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                <a
                  href="https://www.bitfinex.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-4 hover:text-blue-400 transition-colors duration-300"
                >
                  <img
                    src="https://cryptologos.cc/logos/bitfinex-bitfinex-logo.png?v=022"
                    alt="Bitfinex"
                    className="w-12 h-12"
                  />
                  <span className="text-xl font-medium">Bitfinex</span>
                </a>
                <p className="mt-1 sm:mt-0 text-sm text-gray-400">
                  Advanced trading features.
                </p>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                <a
                  href="https://www.gemini.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-4 hover:text-blue-400 transition-colors duration-300"
                >
                  <img
                    src="https://cryptologos.cc/logos/gemini-gemini-logo.png?v=022"
                    alt="Gemini"
                    className="w-12 h-12"
                  />
                  <span className="text-xl font-medium">Gemini</span>
                </a>
                <p className="mt-1 sm:mt-0 text-sm text-gray-400">
                  Simplified trading.
                </p>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                <a
                  href="https://www.etoro.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-4 hover:text-blue-400 transition-colors duration-300"
                >
                  <img
                    src="https://cryptologos.cc/logos/etoro-etoro-logo.png?v=022"
                    alt="eToro"
                    className="w-12 h-12"
                  />
                  <span className="text-xl font-medium">eToro</span>
                </a>
                <p className="mt-1 sm:mt-0 text-sm text-gray-400">
                  Social trading platform.
                </p>
              </li>
            </ul>
          </div>
          {/* Card 3: Advanced Trading Analytics */}
          <div className="bg-gray-700 p-6 rounded-lg shadow-xl transform hover:scale-105 transition duration-300">
            <h2 className={headingStyle}>
              Advanced Trading Analytics &amp; Insights
            </h2>
            <p className="text-gray-300 mb-4">
              Unlock the power of data with our comprehensive analytics suite
              designed to boost your trading strategies.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gray-800 p-4 rounded-md text-center">
                <p className="text-sm text-gray-400">Avg. Trade Duration</p>
                <p className="text-xl font-bold">5d</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-md text-center">
                <p className="text-sm text-gray-400">Profit Factor</p>
                <p className="text-xl font-bold">1.8</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-md text-center">
                <p className="text-sm text-gray-400">Win Rate</p>
                <p className="text-xl font-bold">60%</p>
              </div>
            </div>
            <ul className="mt-4 list-disc ml-5 text-sm text-gray-400">
              <li>Advanced statistical analysis</li>
              <li>Real-time data feeds</li>
              <li>Customizable dashboards</li>
              <li>Market sentiment tracking</li>
              <li>Volatility indices</li>
            </ul>
            <p className="mt-4 text-gray-300">
              Dive deeper with interactive charts, historical comparisons, and
              predictive analytics to gain a competitive edge.
            </p>
          </div>
          {/* Card 4: Portfolio Management */}
          <div className="bg-gray-700 p-6 rounded-lg shadow-xl transform hover:scale-105 transition duration-300">
            <h2 className={headingStyle}>Portfolio Management</h2>
            <p className="text-gray-300 mb-4">
              Monitor and manage your investments seamlessly with our integrated
              tools.
            </p>
            <ul className="mt-2 list-disc ml-5 text-sm text-gray-400">
              <li>Detailed asset allocation</li>
              <li>Risk analysis reports</li>
              <li>Performance comparisons</li>
              <li>Automated rebalancing options</li>
              <li>Tax optimization strategies</li>
            </ul>
            <p className="mt-4 text-gray-300">
              Stay informed about your investments with real-time tracking and
              smart analytics.
            </p>
          </div>
          {/* Card 5: Real-Time Alerts */}
          <div className="bg-gray-700 p-6 rounded-lg shadow-xl transform hover:scale-105 transition duration-300">
            <h2 className={headingStyle}>Real-Time Alerts</h2>
            <p className="text-gray-300 mb-4">
              Never miss a market opportunity with instant notifications on
              critical price movements and events.
            </p>
            <ul className="mt-2 list-disc ml-5 text-sm text-gray-400">
              <li>Price fluctuation alerts</li>
              <li>Volume surge warnings</li>
              <li>News-based notifications</li>
              <li>Customizable alert thresholds</li>
              <li>Event-driven triggers</li>
            </ul>
            <p className="mt-4 text-gray-300">
              Get alerts directly on your device and take timely action in this
              fast-paced market.
            </p>
          </div>
          {/* Card 6: News & Insights */}
          <div className="bg-gray-700 p-6 rounded-lg shadow-xl transform hover:scale-105 transition duration-300">
            <h2 className={headingStyle}>News &amp; Insights</h2>
            <p className="text-gray-300 mb-4">
              Get the latest market news, expert analysis, and in-depth articles
              from industry leaders.
            </p>
            <ul className="mt-2 list-disc ml-5 text-sm text-gray-400">
              <li>Daily market roundups</li>
              <li>In-depth feature articles</li>
              <li>Expert video insights</li>
              <li>Interactive webinars</li>
              <li>Breaking news updates</li>
            </ul>
            <p className="mt-4 text-gray-300">
              Stay informed and make smarter trading decisions with real-time
              news and expert commentary.
            </p>
          </div>
        </div>
      </main>

      <footer className="p-8 text-center text-gray-400">
        &copy; {new Date().getFullYear()} Trading Apps. All rights reserved.
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 1.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}

export default TradingApps;
