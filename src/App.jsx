import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './components/Dashboard';
import { ExpenseProvider } from './context/ExpenseContext';

function App() {
  return (
    <ExpenseProvider>
      <div className="App">
        <Dashboard />
      </div>
    </ExpenseProvider>
  );
}

export default App;
