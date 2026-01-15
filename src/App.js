import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserGuide from './pages/UserGuide';
import CoinDashboard from './pages/CoinDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* 메인 페이지를 코인 대시보드로 변경 */}
          <Route path="/" element={<CoinDashboard />} />
          <Route path="/dashboard" element={<Navigate to="/" replace />} />
          <Route path="/download" element={<HomePage />} />
          <Route path="/user-guide" element={<UserGuide />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;