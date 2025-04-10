import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "Urban Apparel", amount: 870, overdue: true },
  { name: "City Construction", amount: 720, overdue: false },
  { name: "Green Gardens", amount: 500, overdue: true },
  { name: "Innovative Tech", amount: 450, overdue: false },
  { name: "TechAdvantage Software", amount: 400, overdue: true },
  { name: "Coastal Shipping", amount: 300, overdue: false },
  { name: "Solar Solutions", amount: 150, overdue: true },
  { name: "Global Exports Co.", amount: 50, overdue: false },
];

const COLORS = {
  overdue: "#ef4444", // red-500
  current: "#3b82f6", // blue-500
  other: [
    "#10b981", // emerald-500
    "#f59e0b", // amber-500
    "#8b5cf6", // violet-500
    "#ec4899", // pink-500
    "#14b8a6", // teal-500
    "#f97316", // orange-500
  ],
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-200">
        <p className="font-medium text-gray-800">{label}</p>
        <p className="text-sm">
          <span className="text-gray-600">Amount: </span>
          <span className="font-semibold">
            ${payload[0].value.toLocaleString()}
          </span>
        </p>
        <p className="text-xs mt-1">
          Status:{" "}
          <span
            className={
              payload[0].payload.overdue ? "text-red-500" : "text-blue-500"
            }
          >
            {payload[0].payload.overdue ? "Overdue" : "Current"}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

const UnpaidBillsChart = () => {
  return (
    <div className="bg-gray-50 rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Accounts Payable Overview
            </h2>
            <p className="text-sm text-gray-600 mt-1">Unpaid vendor invoices</p>
          </div>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <span className="text-xs text-gray-700">Current</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <span className="text-xs text-gray-700">Overdue</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Content */}
      <div className="p-6 bg-white">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Bar Chart - Left Side */}
          <div className="w-full lg:w-2/3">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={data}
                  margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
                  barCategoryGap={12}
                >
                  <CartesianGrid
                    horizontal={true}
                    vertical={false}
                    stroke="#e5e7eb"
                    strokeDasharray="3 3"
                  />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                    axisLine={{ stroke: "#d1d5db" }}
                    tickLine={{ stroke: "#d1d5db" }}
                  />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={120}
                    tick={{ fontSize: 12, fill: "#374151" }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ fill: "rgba(209, 213, 219, 0.5)" }}
                  />
                  <Bar
                    dataKey="amount"
                    radius={[0, 4, 4, 0]}
                    animationDuration={1800}
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.overdue ? COLORS.overdue : COLORS.current}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart - Right Side */}
          <div className="w-full lg:w-1/3">
            <div className="h-80 flex flex-col">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="amount"
                    nameKey="name"
                    label={({ name, percent }) =>
                      `${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          entry.overdue
                            ? COLORS.overdue
                            : COLORS.other[index % COLORS.other.length]
                        }
                        stroke="#fff"
                        strokeWidth={1}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    height={48}
                    wrapperStyle={{
                      paddingTop: "16px",
                      color: "#4b5563",
                      fontSize: "12px",
                    }}
                    formatter={(value) => (
                      <span className="text-gray-600">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-3 bg-gray-100 border-t border-gray-200 flex justify-between items-center">
        <p className="text-xs text-gray-700">
          Total unpaid:{" "}
          <span className="font-medium text-gray-900">
            ${data.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
          </span>
        </p>
        <p className="text-xs text-gray-500">
          Updated:{" "}
          {new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
};

export default UnpaidBillsChart;
