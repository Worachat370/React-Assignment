import './App.css';
import axios from 'axios'
import { useState } from 'react';
import LoginScreen from './pages/LoginScreen';
import FinanceScreen from './pages/FinanceScreen';
import HomePage from "./pages/Home";



axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:1337"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLoginSuccess = () => setIsAuthenticated(true)
    
  return (
    <div className="App"> 
      <header className="App-header">
        {!isAuthenticated  && <LoginScreen onLoginSuccess={handleLoginSuccess} />}
        {isAuthenticated && <HomePage/>}
      </header>
    </div>
  );
}

export default App;

