import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import LandingPage from './pages/LandingPage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import HomePage from './pages/HomePage.jsx'; 
import ForSalePage from './pages/ForSalePage.jsx'; 
import LocalNewsPage from './pages/LocalNewsPage.jsx';
import GroupsPage from './pages/GroupsPage.jsx';
import EventsPage from './pages/EventsPage.jsx';
import UnderDevelopmentPage from './pages/UnderDevelopmentPage.jsx';

import EventDetailPage from './pages/EventDetailPage.jsx';
function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<AuthPage mode="login" />} />
      <Route path="/register" element={<AuthPage mode="register" />} />
      
      <Route path="/profile" element={<ProfilePage />} />

      <Route path="/dashboard" element={<DashboardPage />}>
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<HomePage />} /> 
        <Route path="forsale" element={<ForSalePage />} />
        <Route path="news" element={<LocalNewsPage />} />
        <Route path="groups" element={<GroupsPage />} />
        <Route path="faves" element={<UnderDevelopmentPage />} />
        <Route path="treatmaps" element={<UnderDevelopmentPage />} />

        {/* Punyanya events sama context hooknya */}
        <Route path="events" element={<EventsPage />} />
        <Route path="events/:id" element={<EventDetailPage />} />

        <Route path="settings" element={<UnderDevelopmentPage />} />
        <Route path="help" element={<UnderDevelopmentPage />} />
        <Route path="invite" element={<UnderDevelopmentPage />} />
      </Route>
      
    </Routes>
  );
}

export default App;