import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import HomePage from './pages/HomePage.jsx'; 
import ForSalePage from './pages/ForSalePage.jsx'; 
import LocalNewsPage from './pages/LocalNewsPage.jsx';
import GroupsPage from './pages/GroupsPage.jsx';
import EventsPage from './pages/EventsPage.jsx';

import EventDetailPage from './pages/EventDetailPage.jsx';
function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<AuthPage mode="login" />} />
      <Route path="/register" element={<AuthPage mode="register" />} />
      
      <Route path="/profile" element={<ProfilePage />} />
      
      {/* DashboardPage sekarang menjadi "Layout Induk" */}
      <Route path="/dashboard" element={<DashboardPage />}>
        
        {/* 'index' (URL: /dashboard) memuat HomePage */}
        <Route index element={<HomePage />} /> 
        
        {/* /dashboard/forsale memuat ForSalePage */}
        <Route path="forsale" element={<ForSalePage />} />
        
        {/* ---- 3 RUTE BARU DITAMBAHKAN DI SINI ---- */}
        <Route path="news" element={<LocalNewsPage />} />
        <Route path="groups" element={<GroupsPage />} />
        <Route path="events" element={<EventsPage />} />
        
        {/* /dashboard/events/:id menunjuk ke halaman detail */}
        <Route path="events/:id" element={<EventDetailPage />} />

      </Route>
      
    </Routes>
  );
}

export default App;