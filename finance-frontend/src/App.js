import './App.css';
import axios from 'axios';
import { useState } from 'react';
import LoginScreen from './pages/LoginScreen';
import Prepage from './pages/Prepage';
import FinanceScreen from './pages/FinanceScreen';
import DashBoard from './pages/DashBoard';

// Set up the base URL for Axios
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:1337";

function App() {
  // State for tracking app start and authentication
  const [hasStarted, setHasStarted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Handlers for transitions
  const handleStart = () => setHasStarted(true);
  const handleLoginSuccess = () => setIsAuthenticated(true);

  return (
    <div className="App">
      <header className="App-header">
        {/* Show Prepage initially */}
        {!hasStarted && <Prepage onStart={handleStart} />}
        {/* Show LoginScreen if not authenticated */}
        {hasStarted && !isAuthenticated && <LoginScreen onLoginSuccess={handleLoginSuccess} />}
        {/* Show HomePage if authenticated */}
        {hasStarted && isAuthenticated && <DashBoard />}
      </header>
    </div>
  );
}

export default App;
