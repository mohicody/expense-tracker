import React from 'react';
import { Table, ProgressBar } from 'react-bootstrap';
import { useExpense } from '../context/ExpenseContext';

const CategoryBreakdown = () => {
  const { getExpensesByCategory, getTotalExpenses } = useExpense();
  const categories = getExpensesByCategory();
  const totalExpenses = getTotalExpenses();

  if (Object.keys(categories).length === 0) {
    return (
      <div className="text-center text-muted py-3">
        No expenses recorded yet
      </div>
    );
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Category</th>
          <th>Amount</th>
          <th>Percentage</th>
          <th>Distribution</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(categories).map(([category, amount]) => {
          const percentage = ((amount / totalExpenses) * 100).toFixed(1);
          return (
            <tr key={category}>
              <td>{category}</td>
              <td>${amount.toFixed(2)}</td>
              <td>{percentage}%</td>
              <td>
                <ProgressBar 
                  now={percentage} 
                  label={`${percentage}%`}
                  variant="info"
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default CategoryBreakdown;
