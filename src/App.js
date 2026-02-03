import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import CoinDashboard from './pages/CoinDashboard';
import HomeLanding from './pages/HomeLanding';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import UserGuide from './pages/UserGuide';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomeLanding />} />
          <Route path="/dashboard" element={<CoinDashboard />} />
          <Route path="/user-guide" element={<UserGuide />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;