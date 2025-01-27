import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const ExpenseSearch = ({ onSearchChange, onFilterChange }) => {
  const today = new Date().toISOString().split('T')[0];

  return (
    <Row className="g-3">
      <Col md={4}>
        <Form.Control
          type="text"
          placeholder="Search by title..."
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </Col>
      <Col md={4}>
        <Form.Select
          onChange={(e) => onFilterChange('category', e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Food">Food</option>
          <option value="Transportation">Transportation</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">Other</option>
        </Form.Select>
      </Col>
      <Col md={4}>
        <Form.Select
          onChange={(e) => onFilterChange('date', e.target.value)}
        >
          <option value="">All Time</option>
          <option value={today}>Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </Form.Select>
      </Col>
    </Row>
  );
};

export default ExpenseSearch;
