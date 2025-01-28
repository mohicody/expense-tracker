import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ExpenseProvider } from '../../context/ExpenseContext';
import ExpenseList from '../ExpenseList';

const renderWithContext = (component) => {
  return render(
    <ExpenseProvider>
      {component}
    </ExpenseProvider>
  );
};

describe('ExpenseList Component', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  test('renders empty state message when no expenses', () => {
    renderWithContext(<ExpenseList />);
    expect(screen.getByText(/No expenses recorded yet/i)).toBeInTheDocument();
  });

  test('filters expenses by search term', () => {
    const { container } = renderWithContext(<ExpenseList />);
    
    // Add test data to localStorage
    const testExpenses = [
      { id: 1, title: 'Grocery Shopping', amount: 50, category: 'Food', date: '2025-01-27' },
      { id: 2, title: 'Movie Ticket', amount: 15, category: 'Entertainment', date: '2025-01-27' }
    ];
    localStorage.setItem('expenses', JSON.stringify(testExpenses));

    // Get search input and type
    const searchInput = screen.getByPlaceholderText(/Search/i);
    fireEvent.change(searchInput, { target: { value: 'Grocery' } });

    // Check if only grocery expense is shown
    expect(screen.getByText('Grocery Shopping')).toBeInTheDocument();
    expect(screen.queryByText('Movie Ticket')).not.toBeInTheDocument();
  });

  test('deletes an expense', () => {
    renderWithContext(<ExpenseList />);
    
    // Add test data
    const testExpense = { id: 1, title: 'Test Expense', amount: 50, category: 'Food', date: '2025-01-27' };
    localStorage.setItem('expenses', JSON.stringify([testExpense]));

    // Find and click delete button
    const deleteButton = screen.getByText(/Delete/i);
    fireEvent.click(deleteButton);

    // Verify expense was deleted
    expect(screen.queryByText('Test Expense')).not.toBeInTheDocument();
  });

  test('displays correct expense details', () => {
    renderWithContext(<ExpenseList />);
    
    // Add test data
    const testExpense = {
      id: 1,
      title: 'Test Expense',
      amount: 50,
      category: 'Food',
      date: '2025-01-27'
    };
    localStorage.setItem('expenses', JSON.stringify([testExpense]));

    // Verify all expense details are displayed
    expect(screen.getByText('Test Expense')).toBeInTheDocument();
    expect(screen.getByText('$50.00')).toBeInTheDocument();
    expect(screen.getByText('Food')).toBeInTheDocument();
  });
});
