import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import ExpenseChart from './ExpenseChart';
import SummaryCards from './SummaryCards';
import MonthlyTrend from './MonthlyTrend';
import CategoryBreakdown from './CategoryBreakdown';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Container fluid>
        <h1 className="text-center mb-4 mt-5">Expense Tracker Dashboard</h1>
        
        {/* Summary Cards Row */}
        <Row className="g-3 mb-4">
          <Col xs={12}>
            <SummaryCards />
          </Col>
        </Row>

        {/* Charts Row */}
        <Row className="g-3 mb-4">
          <Col lg={6} xs={12}>
            <Card>
              <Card.Body>
                <Card.Title>Expense Distribution</Card.Title>
                <div className="chart-container">
                  <ExpenseChart />
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6} xs={12}>
            <Card>
              <Card.Body>
                <Card.Title>Monthly Trend</Card.Title>
                <div className="chart-container">
                  <MonthlyTrend />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Category Breakdown and Form Row */}
        <Row className="g-3 mb-4">
          <Col lg={4} xs={12}>
            <Card>
              <Card.Body>
                <Card.Title>Add New Expense</Card.Title>
                <ExpenseForm />
              </Card.Body>
            </Card>
          </Col>
          <Col lg={8} xs={12}>
            <Card>
              <Card.Body>
                <Card.Title>Category Breakdown</Card.Title>
                <div className="table-responsive">
                  <CategoryBreakdown />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Transactions List Row */}
        <Row className="g-3">
          <Col xs={12}>
            <Card>
              <Card.Body>
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
                  <Card.Title className="mb-3 mb-md-0">Recent Transactions</Card.Title>
                </div>
                <div className="table-responsive">
                  <ExpenseList />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
