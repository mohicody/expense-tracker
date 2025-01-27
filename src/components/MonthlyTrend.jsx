import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useExpense } from '../context/ExpenseContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MonthlyTrend = () => {
  const { getMonthlyExpenses } = useExpense();
  const monthlyData = getMonthlyExpenses();

  // Get the last 6 months of data
  const last6Months = Object.entries(monthlyData)
    .sort((a, b) => new Date(a[0]) - new Date(b[0]))
    .slice(-6);

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const formatMonthYear = (dateStr) => {
    const [year, month] = dateStr.split('-');
    return `${monthNames[parseInt(month) - 1]} ${year.slice(2)}`;
  };

  const data = {
    labels: last6Months.map(([date]) => formatMonthYear(date)),
    datasets: [
      {
        label: 'Monthly Expenses',
        data: last6Months.map(([, amount]) => amount),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `$${context.raw.toFixed(2)}`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `$${value}`
        }
      }
    }
  };

  return (
    <div style={{ height: '300px' }}>
      {last6Months.length === 0 ? (
        <div className="text-center text-muted h-100 d-flex align-items-center justify-content-center">
          No expense data available
        </div>
      ) : (
        <Bar data={data} options={options} />
      )}
    </div>
  );
};

export default MonthlyTrend;
