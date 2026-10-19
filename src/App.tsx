import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { InvitationPage } from './pages/InvitationPage';
import { AdminDashboard } from './pages/AdminDashboard';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Animated Wedding Invitation */}
        <Route path="/" element={<InvitationPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/:slug" element={<InvitationPage />} />
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
