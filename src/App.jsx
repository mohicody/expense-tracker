import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import Dashboard from './components/Dashboard';
import { ExpenseProvider } from './context/ExpenseContext';

function App() {
  return (
    <ExpenseProvider>
      <div className="App">
        <Container className="py-4">
          <header className="text-center mb-5">
            <h1 className="display-4 fw-bold text-primary">Spend Smart</h1>
            <p className="lead text-muted">Track, Analyze, and Optimize Your Spending</p>
          </header>
          <Dashboard />
        </Container>
      </div>
    </ExpenseProvider>
  );
}

export default App;
