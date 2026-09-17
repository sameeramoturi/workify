import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/customer/LandingPage';
import FindWorkers from './pages/customer/FindWorkers';
import WorkerProfile from './pages/customer/WorkerProfile';
import PostJob from './pages/customer/PostJob';
import WorkerDashboard from './pages/worker/WorkerDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import CustomerBookings from './pages/customer/CustomerBookings';
import CustomerMessages from './pages/customer/CustomerMessages';
import CustomerWallet from './pages/customer/CustomerWallet';
import CustomerReviews from './pages/customer/CustomerReviews';
import Login from './pages/auth/Login';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Customer Flow */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/workers" element={<FindWorkers />} />
          <Route path="/workers/:id" element={<WorkerProfile />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/bookings" element={<CustomerBookings />} />
          <Route path="/messages" element={<CustomerMessages />} />
          <Route path="/wallet" element={<CustomerWallet />} />
          <Route path="/reviews" element={<CustomerReviews />} />
          
          {/* Auth Flow */}
          <Route path="/login" element={<Login initialTab="login" />} />
          <Route path="/register" element={<Login initialTab="register" />} />

          {/* Worker Flow */}
          <Route path="/worker-dashboard" element={<WorkerDashboard />} />

          {/* Admin Flow */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
