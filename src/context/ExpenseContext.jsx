import React, { createContext, useContext, useReducer, useEffect } from 'react';

const ExpenseContext = createContext();

// Initial state
const initialState = {
  expenses: [],
  monthlyBudget: 3000,
};

// Load state from localStorage
const loadState = () => {
  try {
    const savedState = localStorage.getItem('expenseTrackerState');
    return savedState ? JSON.parse(savedState) : initialState;
  } catch (error) {
    console.error('Error loading state:', error);
    return initialState;
  }
};

// Action types
const ADD_EXPENSE = 'ADD_EXPENSE';
const DELETE_EXPENSE = 'DELETE_EXPENSE';
const UPDATE_BUDGET = 'UPDATE_BUDGET';

// Reducer
const expenseReducer = (state, action) => {
  switch (action.type) {
    case ADD_EXPENSE:
      return {
        ...state,
        expenses: [...state.expenses, { ...action.payload, id: Date.now() }],
      };
    case DELETE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.filter((expense) => expense.id !== action.payload),
      };
    case UPDATE_BUDGET:
      return {
        ...state,
        monthlyBudget: action.payload,
      };
    default:
      return state;
  }
};

export const ExpenseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(expenseReducer, loadState());

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('expenseTrackerState', JSON.stringify(state));
  }, [state]);

  // Calculate total expenses
  const getTotalExpenses = () => {
    return state.expenses.reduce((total, expense) => total + Number(expense.amount), 0);
  };

  // Get expenses by category
  const getExpensesByCategory = () => {
    return state.expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + Number(expense.amount);
      return acc;
    }, {});
  };

  // Get monthly expenses
  const getMonthlyExpenses = () => {
    const monthlyData = {};
    state.expenses.forEach((expense) => {
      const date = new Date(expense.date);
      const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;
      monthlyData[monthYear] = (monthlyData[monthYear] || 0) + Number(expense.amount);
    });
    return monthlyData;
  };

  // Get remaining budget
  const getRemainingBudget = () => {
    return state.monthlyBudget - getTotalExpenses();
  };

  // Get top spending category
  const getTopCategory = () => {
    const categories = getExpensesByCategory();
    const categoryEntries = Object.entries(categories);
    if (categoryEntries.length === 0) return 'No expenses';
    return categoryEntries.reduce((a, b) => (a[1] > b[1] ? a : b))[0];
  };

  const value = {
    expenses: state.expenses,
    monthlyBudget: state.monthlyBudget,
    addExpense: (expense) => dispatch({ type: ADD_EXPENSE, payload: expense }),
    deleteExpense: (id) => dispatch({ type: DELETE_EXPENSE, payload: id }),
    updateBudget: (amount) => dispatch({ type: UPDATE_BUDGET, payload: Number(amount) }),
    getTotalExpenses,
    getRemainingBudget,
    getExpensesByCategory,
    getMonthlyExpenses,
    getTopCategory,
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpense must be used within an ExpenseProvider');
  }
  return context;
};
