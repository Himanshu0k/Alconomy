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
  const [timeRange, setTimeRange] = useState('all'); // 'all', 'month', 'week'

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

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      <div className="text-xl">Loading expense data...</div>
    </div>
  );
  
  if (error) return (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      <div className="text-xl text-red-500">{error}</div>
    </div>
  );

  if (expenses.length === 0) return (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      <div className="text-xl">No expense data available</div>
    </div>
  );

  // Filter expenses based on time range
  const filteredExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    const now = new Date();
    if (timeRange === 'month') {
      return expenseDate.getMonth() === now.getMonth() && 
             expenseDate.getFullYear() === now.getFullYear();
    } else if (timeRange === 'week') {
      const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
      return expenseDate >= weekStart;
    }
    return true;
  });

  // Prepare data for charts
  const lineChartData = {
    labels: filteredExpenses.map(expense => new Date(expense.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Expenses',
        data: filteredExpenses.map(expense => expense.amount),
        borderColor: '#F59E0B',
        backgroundColor: 'rgba(245, 158, 11, 0.2)',
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
        backgroundColor: 'rgba(245, 158, 11, 0.8)',
        borderColor: '#F59E0B',
        borderWidth: 1,
      },
    ],
  };

  // Group expenses by description for pie chart
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
          'rgba(245, 158, 11, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: [
          '#F59E0B',
          '#10B981',
          '#3B82F6',
          '#8B5CF6',
          '#EF4444',
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
        labels: { color: '#fff' },
        position: 'top',
      },
      title: {
        display: true,
        text: 'Expense Analysis',
        color: '#fff',
        font: {
          size: 16,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount',
          color: '#fff',
        },
        ticks: { color: '#fff' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
      },
      x: {
        title: {
          display: true,
          text: 'Date',
          color: '#fff',
        },
        ticks: { color: '#fff' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
      },
    },
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
      <div className="fixed left-0 top-0 h-full">
        <LeftNavbar />
      </div>
      <div className="flex-1 ml-64 p-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Expense Analytics</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setTimeRange('all')}
              className={`px-4 py-2 rounded ${
                timeRange === 'all' ? 'bg-amber-500 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              All Time
            </button>
            <button
              onClick={() => setTimeRange('month')}
              className={`px-4 py-2 rounded ${
                timeRange === 'month' ? 'bg-amber-500 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              This Month
            </button>
            <button
              onClick={() => setTimeRange('week')}
              className={`px-4 py-2 rounded ${
                timeRange === 'week' ? 'bg-amber-500 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              This Week
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-white">Expense Trends</h3>
            <div className="h-80">
              <Line data={lineChartData} options={chartOptions} />
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-white">Expense Distribution</h3>
            <div className="h-80">
              <Bar data={barChartData} options={chartOptions} />
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-white">Expense Categories</h3>
            <div className="h-80">
              <Pie data={pieChartData} options={chartOptions} />
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-white">Expense Breakdown</h3>
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