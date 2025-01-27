import React, { useState } from 'react';
import { Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';
import { useExpense } from '../context/ExpenseContext';

const SummaryCards = () => {
  const { 
    getTotalExpenses, 
    monthlyBudget, 
    getRemainingBudget,
    getTopCategory,
    updateBudget
  } = useExpense();

  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [newBudget, setNewBudget] = useState(monthlyBudget);

  const handleBudgetUpdate = (e) => {
    e.preventDefault();
    updateBudget(newBudget);
    setShowBudgetModal(false);
  };

  const remainingBudget = getRemainingBudget();
  const isOverBudget = remainingBudget < 0;

  return (
    <>
      <Row className="g-3">
        <Col xl={3} sm={6} xs={12}>
          <Card className="text-center h-100 bg-primary text-white">
            <Card.Body className="d-flex flex-column justify-content-center">
              <Card.Title>Total Expenses</Card.Title>
              <h3 className="mb-0">${getTotalExpenses().toFixed(2)}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={3} sm={6} xs={12}>
          <Card className="text-center h-100 bg-success text-white">
            <Card.Body className="d-flex flex-column justify-content-center">
              <Card.Title>Monthly Budget</Card.Title>
              <h3 className="mb-0">${monthlyBudget.toFixed(2)}</h3>
              <Button 
                variant="outline-light" 
                size="sm" 
                className="mt-2"
                onClick={() => setShowBudgetModal(true)}
              >
                Edit Budget
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={3} sm={6} xs={12}>
          <Card className={`text-center h-100 ${isOverBudget ? 'bg-danger' : 'bg-info'} text-white`}>
            <Card.Body className="d-flex flex-column justify-content-center">
              <Card.Title>Remaining Budget</Card.Title>
              <h3 className="mb-0">${Math.abs(remainingBudget).toFixed(2)}</h3>
              {isOverBudget && <small>Over Budget!</small>}
            </Card.Body>
          </Card>
        </Col>
        <Col xl={3} sm={6} xs={12}>
          <Card className="text-center h-100 bg-warning text-white">
            <Card.Body className="d-flex flex-column justify-content-center">
              <Card.Title>Top Category</Card.Title>
              <h3 className="mb-0">{getTopCategory()}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Budget Edit Modal */}
      <Modal show={showBudgetModal} onHide={() => setShowBudgetModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Monthly Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleBudgetUpdate}>
            <Form.Group className="mb-3">
              <Form.Label>New Budget Amount</Form.Label>
              <Form.Control
                type="number"
                value={newBudget}
                onChange={(e) => setNewBudget(Number(e.target.value))}
                min="0"
                step="0.01"
                required
              />
            </Form.Group>
            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={() => setShowBudgetModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SummaryCards;
