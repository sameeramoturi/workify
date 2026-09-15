import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import {
  Activity,
  CheckCircle,
  XCircle,
  Clock,
  CircleDollarSign,
  Briefcase,
  AlertTriangle
} from 'lucide-react';

export default function WorkerDashboard() {
  const [status, setStatus] = useState('AVAILABLE'); // AVAILABLE, BUSY, OFFLINE
  const [incomingJobs, setIncomingJobs] = useState([
    {
      id: 101,
      customer: 'Sameera Rao',
      service: 'Pipe Repair & Leak Fixing',
      location: 'Danavaipeta, Rajahmundry (2.5 km away)',
      time: 'Today, 2:00 PM',
      budget: '₹650',
      priority: 'HIGH'
    }
  ]);

  const handleAccept = (id) => {
    alert(`Accepted Job #${id}! Customer will be notified via SMS/Push.`);
    setIncomingJobs(incomingJobs.filter(j => j.id !== id));
  };

  const handleReject = (id) => {
    setIncomingJobs(incomingJobs.filter(j => j.id !== id));
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <Navbar />

      <div style={{ display: 'flex' }}>
        <Sidebar />

        <main style={{ flex: 1, padding: '24px 32px' }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a' }}>
                Worker Portal — Ramesh Das
              </h1>
              <p style={{ fontSize: '13px', color: '#64748b' }}>
                Manage your real-time availability, accept dispatches, and track daily earnings.
              </p>
            </div>

            {/* Live Status Toggle Widget */}
            <div className="card" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '13px', fontWeight: '700', color: '#475569' }}>My Status:</span>
              <div style={{ display: 'flex', gap: '6px' }}>
                {[
                  { label: 'Available', value: 'AVAILABLE', color: '#10b981', bg: '#ecfdf5' },
                  { label: 'Busy', value: 'BUSY', color: '#f59e0b', bg: '#fffbeb' },
                  { label: 'Offline', value: 'OFFLINE', color: '#64748b', bg: '#f1f5f9' },
                ].map(s => (
                  <button
                    key={s.value}
                    onClick={() => setStatus(s.value)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      border: status === s.value ? `2px solid ${s.color}` : '1px solid #e2e8f0',
                      backgroundColor: status === s.value ? s.bg : '#fff',
                      color: status === s.value ? s.color : '#475569',
                      fontSize: '12px',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    ● {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
            <div className="card" style={{ padding: '18px' }}>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Today's Earnings</span>
              <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#2563eb', marginTop: '4px' }}>₹1,850</h3>
            </div>
            <div className="card" style={{ padding: '18px' }}>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Jobs Completed</span>
              <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', marginTop: '4px' }}>4 Jobs</h3>
            </div>
            <div className="card" style={{ padding: '18px' }}>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Elo Skill Rating</span>
              <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#10b981', marginTop: '4px' }}>1,680</h3>
            </div>
            <div className="card" style={{ padding: '18px' }}>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Customer Feedback</span>
              <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#eab308', marginTop: '4px' }}>4.8 ★</h3>
            </div>
          </div>

          {/* Incoming Job Requests */}
          <div className="card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>
                ⚡ Incoming Job Alerts (Within 10 km Radius)
              </h3>
              <span className="badge badge-verified">Live Dispatch Active</span>
            </div>

            {incomingJobs.length === 0 ? (
              <p style={{ fontSize: '14px', color: '#64748b', textAlign: 'center', padding: '20px' }}>
                No active incoming job requests at this moment. Stay online to receive leads!
              </p>
            ) : (
              incomingJobs.map(job => (
                <div
                  key={job.id}
                  style={{
                    backgroundColor: '#eff6ff',
                    border: '1px solid #bfdbfe',
                    borderRadius: '12px',
                    padding: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#1e3a8a', margin: 0 }}>
                        {job.service}
                      </h4>
                      <span style={{
                        backgroundColor: '#fee2e2',
                        color: '#ef4444',
                        fontSize: '10px',
                        fontWeight: 'bold',
                        padding: '2px 6px',
                        borderRadius: '4px'
                      }}>
                        {job.priority} PRIORITY
                      </span>
                    </div>
                    <p style={{ fontSize: '13px', color: '#475569', margin: '2px 0' }}>
                      Customer: <strong>{job.customer}</strong> • 📍 {job.location}
                    </p>
                    <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
                      Scheduled: {job.time} • Proposed Budget: <strong style={{ color: '#2563eb' }}>{job.budget}</strong>
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => handleAccept(job.id)}
                      className="btn btn-primary"
                      style={{ padding: '8px 18px', fontSize: '13px' }}
                    >
                      <CheckCircle size={16} /> Accept Job
                    </button>
                    <button
                      onClick={() => handleReject(job.id)}
                      className="btn btn-outline"
                      style={{ padding: '8px 14px', fontSize: '13px', color: '#ef4444' }}
                    >
                      <XCircle size={16} /> Reject
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
