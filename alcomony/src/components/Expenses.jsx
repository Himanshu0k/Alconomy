import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import LeftNavbar from './LeftNavbar';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('all');

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/expenses/');
        if (response.data && Array.isArray(response.data)) {
          setExpenses(response.data);
        } else {
          setError('Invalid data format received from server');
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch expenses. Please make sure the backend server is running.');
        setLoading(false);
        console.error('Error fetching expenses:', err);
      }
    };

    fetchExpenses();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white text-gray-800">
        <div className="text-xl font-medium">Loading expense data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-white text-red-500">
        <div className="text-xl">{error}</div>
      </div>
    );
  }

  if (expenses.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-white text-gray-800">
        <div className="text-xl">No expense data available</div>
      </div>
    );
  }

  const filteredExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    const now = new Date();
    if (timeRange === 'month') {
      return (
        expenseDate.getMonth() === now.getMonth() &&
        expenseDate.getFullYear() === now.getFullYear()
      );
    } else if (timeRange === 'week') {
      const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
      return expenseDate >= weekStart;
    }
    return true;
  });

  const lineChartData = {
    labels: filteredExpenses.map(expense => new Date(expense.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Expenses',
        data: filteredExpenses.map(expense => expense.amount),
        borderColor: '#6366F1',
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const barChartData = {
    labels: filteredExpenses.map(expense => new Date(expense.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Expenses',
        data: filteredExpenses.map(expense => expense.amount),
        backgroundColor: 'rgba(99, 102, 241, 0.8)',
        borderColor: '#6366F1',
        borderWidth: 1,
      },
    ],
  };

  const expenseGroups = filteredExpenses.reduce((acc, expense) => {
    acc[expense.description] = (acc[expense.description] || 0) + expense.amount;
    return acc;
  }, {});

  const pieChartData = {
    labels: Object.keys(expenseGroups),
    datasets: [
      {
        data: Object.values(expenseGroups),
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(251, 191, 36, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)',
        ],
        borderColor: [
          '#6366F1',
          '#10B981',
          '#FBBF24',
          '#EF4444',
          '#8B5CF6',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: '#4B5563' },
        position: 'top',
      },
      title: {
        display: true,
        text: 'Expense Analysis',
        color: '#1F2937',
        font: { size: 16 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount',
          color: '#374151',
        },
        ticks: { color: '#4B5563' },
        grid: { color: 'rgba(0, 0, 0, 0.05)' },
      },
      x: {
        title: {
          display: true,
          text: 'Date',
          color: '#374151',
        },
        ticks: { color: '#4B5563' },
        grid: { color: 'rgba(0, 0, 0, 0.05)' },
      },
    },
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-white to-gray-100 text-gray-800">
      <div className="fixed left-0 top-0 h-full">
        <LeftNavbar />
      </div>

      <div className="flex-1 ml-64 p-10">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-4xl font-bold text-gray-800 tracking-tight">Expense Analytics</h1>
          <div className="flex space-x-3">
            {['all', 'month', 'week'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-5 py-2 rounded-lg font-medium shadow-md transition-all duration-300 ${
                  timeRange === range
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                }`}
              >
                {range === 'all' ? 'All Time' : range === 'month' ? 'This Month' : 'This Week'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-gray-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Expense Trends</h3>
            <div className="h-80">
              <Line data={lineChartData} options={chartOptions} />
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-gray-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Expense Distribution</h3>
            <div className="h-80">
              <Bar data={barChartData} options={chartOptions} />
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-gray-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Expense Categories</h3>
            <div className="h-80">
              <Pie data={pieChartData} options={chartOptions} />
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-gray-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Expense Breakdown</h3>
            <div className="h-80">
              <Doughnut data={pieChartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
  