import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useExpense } from '../context/ExpenseContext';

const ExpenseForm = () => {
  const { addExpense } = useExpense();
  const [expense, setExpense] = useState({
    title: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense({
      ...expense,
      amount: Number(expense.amount)
    });
    // Reset form
    setExpense({
      title: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={expense.title}
          onChange={(e) => setExpense({...expense, title: e.target.value})}
          placeholder="Enter expense title"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Amount</Form.Label>
        <Form.Control
          type="number"
          value={expense.amount}
          onChange={(e) => setExpense({...expense, amount: e.target.value})}
          placeholder="Enter amount"
          min="0"
          step="0.01"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Category</Form.Label>
        <Form.Select
          value={expense.category}
          onChange={(e) => setExpense({...expense, category: e.target.value})}
          required
        >
          <option value="">Select category</option>
          <option value="Food">Food</option>
          <option value="Transportation">Transportation</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">Other</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          value={expense.date}
          onChange={(e) => setExpense({...expense, date: e.target.value})}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Add Expense
      </Button>
    </Form>
  );
};

export default ExpenseForm;
