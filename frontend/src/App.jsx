import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LandingPage from './components/pages/LandingPage.jsx';
import LoginPage from './components/pages/LoginPage.jsx';
import RegisterPage from './components/pages/RegisterPage.jsx';
import ProfilePage from './components/pages/ProfilePage.jsx';
// import DashboardPage from './components/pages/DashboardPage.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      {/* <Route path="/dashboard" element={<DashboardPage />} /> */}

      <Route path="/login" element={<LoginPage />} />

      <Route path="/register" element={<RegisterPage />} />

      <Route path="/profile" element={<ProfilePage />} />

      {/* <Route path="*" element={<h1>404 Not Found</h1>} /> */}
    </Routes>
  );
}

export default App;