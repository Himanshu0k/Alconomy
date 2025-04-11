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
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
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
            legend: {
              labels: {
                color: "#1f2937", // text-gray-800
                font: { size: 14 },
              },
            },
            title: {
              display: true,
              text: "Trading Volume",
              color: "#1f2937",
              font: { size: 18 },
            },
            tooltip: {
              backgroundColor: "#f3f4f6",
              titleColor: "#111827",
              bodyColor: "#374151",
              borderColor: "#d1d5db",
              borderWidth: 1,
              padding: 12,
            },
          },
          scales: {
            x: {
              grid: { color: "#e5e7eb" },
              ticks: { color: "#4b5563" },
            },
            y: {
              grid: { color: "#e5e7eb" },
              ticks: { color: "#4b5563" },
            },
          },
          interaction: { mode: "nearest", intersect: false },
        }}
      />
    </div>
  );
}

function TradingApps() {
  const headingStyle =
    "text-2xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-md";

  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-800 flex flex-col">
      <header className="p-8 text-center">
        <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent drop-shadow-lg animate-fadeIn">
          Trading Apps
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto animate-fadeIn leading-relaxed">
          Explore market trends, in-depth analytics, and connect with top trading platforms.
        </p>
      </header>

      <main className="flex-1 p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 p-6 rounded-xl shadow-md transform hover:scale-[1.02] hover:shadow-lg transition duration-300"
            >
              <h2 className={headingStyle}>{card.title}</h2>
              {card.chart && <TradingChart />}
              <p className="text-gray-600 mb-3">{card.description}</p>
              {card.stats && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-3">
                  {card.stats.map((stat, i) => (
                    <div
                      key={i}
                      className="bg-gray-100 p-4 rounded-md text-center"
                    >
                      <p className="text-sm text-gray-500">{stat.label}</p>
                      <p className="text-xl font-bold text-gray-800">{stat.value}</p>
                    </div>
                  ))}
                </div>
              )}
              {card.list && (
                <ul className="list-disc ml-5 text-sm text-gray-600 space-y-1">
                  {card.list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
              {card.extra && (
                <p className="mt-4 text-gray-600">{card.extra}</p>
              )}
              {card.links && (
                <ul className="space-y-6 mt-4">
                  {card.links.map((partner, i) => (
                    <li
                      key={i}
                      className="flex flex-col sm:flex-row sm:items-center sm:space-x-4"
                    >
                      <a
                        href={partner.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center space-x-4 hover:text-blue-600 transition-colors duration-300"
                      >
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="w-12 h-12"
                        />
                        <span className="text-xl font-medium">{partner.name}</span>
                      </a>
                      <p className="mt-1 sm:mt-0 text-sm text-gray-500">{partner.note}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </main>

      <footer className="p-6 text-center text-gray-400 border-t border-gray-200">
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

const cards = [
  {
    title: "Market Trends",
    chart: true,
    description:
      "Stay updated with the latest trading volumes and market activities. Our chart provides a week-long overview of trading volume fluctuations.",
    list: [
      "Real-time data updates",
      "Comprehensive volume analysis",
      "Interactive chart features",
    ],
  },
  {
    title: "Our Partners",
    description:
      "We collaborate with leading trading platforms to provide the best market insights.",
    links: [
      {
        name: "Binance",
        url: "https://www.binance.com",
        logo: "https://cryptologos.cc/logos/binance-coin-bnb-logo.png?v=022",
        note: "Leading global exchange.",
      },
      {
        name: "Coinbase",
        url: "https://www.coinbase.com",
        logo: "https://cryptologos.cc/logos/coinbase-coinbase-logo.png?v=022",
        note: "Trusted by millions.",
      },
      {
        name: "Kraken",
        url: "https://www.kraken.com",
        logo: "https://cryptologos.cc/logos/kraken-kraken-logo.png?v=022",
        note: "Secure & reliable.",
      },
      {
        name: "Bitfinex",
        url: "https://www.bitfinex.com",
        logo: "https://cryptologos.cc/logos/bitfinex-bitfinex-logo.png?v=022",
        note: "Advanced trading features.",
      },
      {
        name: "Gemini",
        url: "https://www.gemini.com",
        logo: "https://cryptologos.cc/logos/gemini-gemini-logo.png?v=022",
        note: "Simplified trading.",
      },
      {
        name: "eToro",
        url: "https://www.etoro.com",
        logo: "https://cryptologos.cc/logos/etoro-etoro-logo.png?v=022",
        note: "Social trading platform.",
      },
    ],
  },
  {
    title: "Advanced Trading Analytics & Insights",
    description:
      "Unlock the power of data with our comprehensive analytics suite designed to boost your trading strategies.",
    stats: [
      { label: "Avg. Trade Duration", value: "5d" },
      { label: "Profit Factor", value: "1.8" },
      { label: "Win Rate", value: "60%" },
    ],
    list: [
      "Advanced statistical analysis",
      "Real-time data feeds",
      "Customizable dashboards",
      "Market sentiment tracking",
      "Volatility indices",
    ],
    extra:
      "Dive deeper with interactive charts, historical comparisons, and predictive analytics to gain a competitive edge.",
  },
  {
    title: "Portfolio Management",
    description:
      "Monitor and manage your investments seamlessly with our integrated tools.",
    list: [
      "Detailed asset allocation",
      "Risk analysis reports",
      "Performance comparisons",
      "Automated rebalancing options",
      "Tax optimization strategies",
    ],
    extra:
      "Stay informed about your investments with real-time tracking and smart analytics.",
  },
  {
    title: "Real-Time Alerts",
    description:
      "Never miss a market opportunity with instant notifications on critical price movements and events.",
    list: [
      "Price fluctuation alerts",
      "Volume surge warnings",
      "News-based notifications",
      "Customizable alert thresholds",
      "Event-driven triggers",
    ],
    extra:
      "Get alerts directly on your device and take timely action in this fast-paced market.",
  },
  {
    title: "News & Insights",
    description:
      "Get the latest market news, expert analysis, and in-depth articles from industry leaders.",
    list: [
      "Daily market roundups",
      "In-depth feature articles",
      "Expert video insights",
      "Interactive webinars",
      "Breaking news updates",
    ],
    extra:
      "Stay informed and make smarter trading decisions with real-time news and expert commentary.",
  },
];

export default TradingApps;
