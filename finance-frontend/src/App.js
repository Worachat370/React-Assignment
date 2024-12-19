import './App.css';
import axios from 'axios';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginScreen from './pages/LoginScreen';
import Prepage from './pages/Prepage';
import DashBoard from './pages/DashBoard';
import FinanceScreen from './pages/FinanceScreen';
import ChartPage from './pages/ChartPage'; // Import ChartPage

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:1337";

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleStart = () => setHasStarted(true);
  const handleLoginSuccess = () => setIsAuthenticated(true);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          {!hasStarted && <Prepage onStart={handleStart} />}
          {hasStarted && !isAuthenticated && <LoginScreen onLoginSuccess={handleLoginSuccess} />}
          {hasStarted && isAuthenticated && (
            <Routes>
              <Route path="/" element={<DashBoard />} />
              <Route path="/finance" element={<FinanceScreen />} />
              <Route path="/chart" element={<ChartPage />} /> {/* Chart route */}
            </Routes>
          )}
        </header>
      </div>
    </Router>
  );
}

export default App;
