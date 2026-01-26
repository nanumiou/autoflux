import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import CoinDashboard from './pages/CoinDashboard';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import UserGuide from './pages/UserGuide';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* 메인 페이지를 코인 대시보드로 변경 */}
          <Route path="/" element={<CoinDashboard />} />
          <Route path="/dashboard" element={<Navigate to="/" replace />} />
          <Route path="/user-guide" element={<UserGuide />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;