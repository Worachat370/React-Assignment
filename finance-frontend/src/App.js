import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./pages/LoginScreen";
import Prepage from "./pages/Prepage";
import Home from "./pages/Home";
import FinanceScreen from "./pages/FinanceScreen";
import ChartPage from "./pages/ChartPage";
import Cookies from "js-cookie";

axios.defaults.baseURL =
  process.env.REACT_APP_BASE_URL || "http://localhost:1337";

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      axios.defaults.headers.common = { Authorization: `bearer ${token}` };
      setIsAuthenticated(true);
    }
  }, []);

  const handleStart = () => setHasStarted(true);

  const handleLoginSuccess = (token) => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    axios.defaults.headers.common = {};
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          {!hasStarted && <Prepage onStart={handleStart} />}
          {hasStarted && !isAuthenticated && (
            <LoginScreen onLoginSuccess={handleLoginSuccess} />
          )}
          {hasStarted && isAuthenticated && (
            <Routes>
              <Route path="/" element={<Home onLogout={handleLogout} />} />
              <Route path="/finance" element={<FinanceScreen />} />
              <Route path="/chart" element={<ChartPage />} />
            </Routes>
          )}
        </header>
      </div>
    </Router>
  );
}

export default App;
