import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useExpense } from '../context/ExpenseContext';
import ExpenseSearch from './ExpenseSearch';

const ExpenseList = () => {
  const { expenses, deleteExpense } = useExpense();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    date: ''
  });

  const filterExpenses = (expenses) => {
    return expenses.filter(expense => {
      // Search term filter
      const matchesSearch = expense.title.toLowerCase().includes(searchTerm.toLowerCase());

      // Category filter
      const matchesCategory = !filters.category || expense.category === filters.category;

      // Date filter
      let matchesDate = true;
      if (filters.date) {
        const expenseDate = new Date(expense.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        switch (filters.date) {
          case today.toISOString().split('T')[0]: // Today
            matchesDate = expenseDate.toISOString().split('T')[0] === filters.date;
            break;
          case 'week':
            const weekAgo = new Date(today);
            weekAgo.setDate(today.getDate() - 7);
            matchesDate = expenseDate >= weekAgo;
            break;
          case 'month':
            matchesDate = expenseDate.getMonth() === today.getMonth() &&
                         expenseDate.getFullYear() === today.getFullYear();
            break;
          case 'year':
            matchesDate = expenseDate.getFullYear() === today.getFullYear();
            break;
          default:
            matchesDate = true;
        }
      }

      return matchesSearch && matchesCategory && matchesDate;
    });
  };

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const filteredExpenses = filterExpenses(expenses);

  return (
    <div>
      <div className="mb-3">
        <ExpenseSearch 
          onSearchChange={setSearchTerm}
          onFilterChange={handleFilterChange}
        />
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Date</th>
            <th>Title</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                {expenses.length === 0 ? 'No expenses recorded yet' : 'No matching expenses found'}
              </td>
            </tr>
          ) : (
            filteredExpenses.map(expense => (
              <tr key={expense.id}>
                <td>{new Date(expense.date).toLocaleDateString()}</td>
                <td>{expense.title}</td>
                <td>{expense.category}</td>
                <td>${Number(expense.amount).toFixed(2)}</td>
                <td>
                  <Button 
                    variant="danger" 
                    size="sm"
                    onClick={() => deleteExpense(expense.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default ExpenseList;
