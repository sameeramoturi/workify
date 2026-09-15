import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/customer/LandingPage';
import FindWorkers from './pages/customer/FindWorkers';
import WorkerProfile from './pages/customer/WorkerProfile';
import PostJob from './pages/customer/PostJob';
import WorkerDashboard from './pages/worker/WorkerDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Customer Flow */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/workers" element={<FindWorkers />} />
        <Route path="/workers/:id" element={<WorkerProfile />} />
        <Route path="/post-job" element={<PostJob />} />
        
        {/* Worker Flow */}
        <Route path="/worker-dashboard" element={<WorkerDashboard />} />

        {/* Admin Flow */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        {/* Shortcuts for mock navigation */}
        <Route path="/bookings" element={<FindWorkers />} />
        <Route path="/messages" element={<WorkerProfile />} />
        <Route path="/reviews" element={<WorkerProfile />} />
        <Route path="/wallet" element={<WorkerDashboard />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
