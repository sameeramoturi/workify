import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import {
  Users,
  ShieldCheck,
  AlertCircle,
  TrendingUp,
  Check,
  X
} from 'lucide-react';

export default function AdminDashboard() {
  const [kycQueue, setKycQueue] = useState([
    {
      id: 201,
      name: 'Ramesh Das',
      category: 'Plumber',
      city: 'Rajahmundry',
      docType: 'Aadhaar Card & ITI Certificate',
      submittedAt: '12 Sep 2026',
      status: 'PENDING'
    },
    {
      id: 202,
      name: 'Kishore Varma',
      category: 'Electrician',
      city: 'Rajahmundry',
      docType: 'Driving License & Diploma',
      submittedAt: '13 Sep 2026',
      status: 'PENDING'
    }
  ]);

  const handleApprove = (id) => {
    setKycQueue(kycQueue.filter(k => k.id !== id));
    alert(`Worker #${id} verified! Badge enabled and worker can now receive jobs.`);
  };

  const handleReject = (id) => {
    setKycQueue(kycQueue.filter(k => k.id !== id));
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <Navbar />

      <div style={{ display: 'flex' }}>
        <Sidebar />

        <main style={{ flex: 1, padding: '24px 32px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>
            Workify Admin Governance Center
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '24px' }}>
            Platform metrics, KYC verification pipeline, and dispute monitoring.
          </p>

          {/* Stat Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
            <div className="card" style={{ padding: '20px' }}>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Total Customers</span>
              <h3 style={{ fontSize: '26px', fontWeight: '800', color: '#2563eb', marginTop: '4px' }}>10,420</h3>
            </div>
            <div className="card" style={{ padding: '20px' }}>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Registered Workers</span>
              <h3 style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a', marginTop: '4px' }}>1,280</h3>
            </div>
            <div className="card" style={{ padding: '20px' }}>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Completed Jobs</span>
              <h3 style={{ fontSize: '26px', fontWeight: '800', color: '#10b981', marginTop: '4px' }}>24,890</h3>
            </div>
            <div className="card" style={{ padding: '20px' }}>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Pending Verifications</span>
              <h3 style={{ fontSize: '26px', fontWeight: '800', color: '#f59e0b', marginTop: '4px' }}>{kycQueue.length}</h3>
            </div>
          </div>

          {/* KYC Approval Queue */}
          <div className="card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', marginBottom: '16px' }}>
              🛡️ Worker KYC Verification Requests (AWS S3 Documents)
            </h3>

            {kycQueue.length === 0 ? (
              <p style={{ fontSize: '13px', color: '#64748b' }}>All pending KYC requests have been processed!</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {kycQueue.map(item => (
                  <div
                    key={item.id}
                    style={{
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      padding: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', margin: 0 }}>
                        {item.name} — <span style={{ color: '#2563eb' }}>{item.category}</span>
                      </h4>
                      <p style={{ fontSize: '12px', color: '#64748b', margin: '4px 0' }}>
                        City: {item.city} • Documents: <strong>{item.docType}</strong>
                      </p>
                      <span style={{ fontSize: '11px', color: '#94a3b8' }}>Submitted: {item.submittedAt}</span>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => handleApprove(item.id)}
                        className="btn btn-primary"
                        style={{ padding: '6px 14px', fontSize: '12px', backgroundColor: '#10b981', borderColor: '#10b981' }}
                      >
                        <Check size={14} /> Approve KYC
                      </button>
                      <button
                        onClick={() => handleReject(item.id)}
                        className="btn btn-outline"
                        style={{ padding: '6px 12px', fontSize: '12px', color: '#ef4444' }}
                      >
                        <X size={14} /> Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
