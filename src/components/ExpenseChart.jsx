import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useExpense } from '../context/ExpenseContext';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseChart = () => {
  const { getExpensesByCategory } = useExpense();
  const expensesByCategory = getExpensesByCategory();

  const data = {
    labels: Object.keys(expensesByCategory),
    datasets: [
      {
        data: Object.values(expensesByCategory),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `$${value.toFixed(2)} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <div style={{ height: '300px' }}>
      {Object.keys(expensesByCategory).length === 0 ? (
        <div className="text-center text-muted h-100 d-flex align-items-center justify-content-center">
          No expense data available
        </div>
      ) : (
        <Pie data={data} options={options} />
      )}
    </div>
  );
};

export default ExpenseChart;
