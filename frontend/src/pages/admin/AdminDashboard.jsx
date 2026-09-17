import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { INITIAL_WORKERS } from '../../services/api';
import {
  Users,
  ShieldCheck,
  AlertCircle,
  TrendingUp,
  Check,
  X,
  Eye,
  FileText,
  CheckCircle2,
  XCircle,
  Search,
  Filter,
  RefreshCw,
  Server,
  Database,
  Cloud,
  AlertTriangle,
  Award,
  Lock,
  Building,
  CheckCircle
} from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('kyc'); // kyc, workers, disputes, infra
  const [searchWorker, setSearchWorker] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [alertMessage, setAlertMessage] = useState(null);

  // KYC Queue State
  const [kycQueue, setKycQueue] = useState([
    {
      id: 201,
      name: 'Ramesh Das',
      category: 'Plumber',
      city: 'Rajahmundry',
      locality: 'Danavaipeta',
      phone: '+91 98765 43210',
      docType: 'Aadhaar Card & ITI Certificate',
      aadhaarNo: 'XXXX-XXXX-4829',
      certificateNo: 'ITI-AP-2017-PLM-849',
      submittedAt: '12 Sep 2026',
      status: 'PENDING',
      experience: '7 years'
    },
    {
      id: 202,
      name: 'Kishore Varma',
      category: 'Electrician',
      city: 'Rajahmundry',
      locality: 'Aryapuram',
      phone: '+91 98481 22334',
      docType: 'Aadhaar Card & Electrical Wireman License',
      aadhaarNo: 'XXXX-XXXX-6190',
      certificateNo: 'AP-ELEC-LIC-9241',
      submittedAt: '13 Sep 2026',
      status: 'PENDING',
      experience: '6 years'
    },
    {
      id: 203,
      name: 'Mahesh Kumar',
      category: 'AC Technician',
      city: 'Rajahmundry',
      locality: 'Morampudi',
      phone: '+91 94402 78901',
      docType: 'Aadhaar Card & HVAC Diploma',
      aadhaarNo: 'XXXX-XXXX-3312',
      certificateNo: 'HVAC-DIPLOMA-2019',
      submittedAt: '14 Sep 2026',
      status: 'PENDING',
      experience: '5 years'
    },
    {
      id: 204,
      name: 'Lakshmi Devi',
      category: 'Cleaner',
      city: 'Rajahmundry',
      locality: 'Innespeta',
      phone: '+91 98765 99881',
      docType: 'Aadhaar Card & Police Clearance Certificate',
      aadhaarNo: 'XXXX-XXXX-7744',
      certificateNo: 'PCC-RJY-2026-102',
      submittedAt: '15 Sep 2026',
      status: 'PENDING',
      experience: '5 years'
    }
  ]);

  // Document Inspection Modal State
  const [inspectingItem, setInspectingItem] = useState(null);
  const [docTab, setDocTab] = useState('aadhaar'); // aadhaar, cert, police
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectForm, setShowRejectForm] = useState(false);

  // Workers List (local state initialized from INITIAL_WORKERS)
  const [workerList, setWorkerList] = useState(INITIAL_WORKERS);

  // Customer Disputes State
  const [disputes, setDisputes] = useState([
    {
      id: 'DISP-401',
      customer: 'Sita Mahalakshmi',
      worker: 'Ramesh Das (Plumber)',
      date: 'Yesterday, 4:30 PM',
      issue: 'Delay of 25 minutes due to heavy rain in Danavaipeta.',
      severity: 'LOW',
      status: 'OPEN'
    },
    {
      id: 'DISP-402',
      customer: 'P. Satyanarayana',
      worker: 'Amit Verma (Electrician)',
      date: '14 Sep 2026',
      issue: 'Requested invoice receipt for modular switch spare parts.',
      severity: 'MEDIUM',
      status: 'OPEN'
    }
  ]);

  // Handle KYC Approval
  const handleApprove = (id) => {
    const approvedItem = kycQueue.find(k => k.id === id);
    setKycQueue(prev => prev.filter(k => k.id !== id));
    
    // Also update in workerList if matching
    setWorkerList(prev => prev.map(w => w.name === approvedItem?.name ? { ...w, is_verified: true } : w));

    setAlertMessage({
      type: 'success',
      text: `✅ Worker ${approvedItem?.name} verified! Blue Verified Badge activated & AWS S3 record sealed.`
    });
    setInspectingItem(null);
    setShowRejectForm(false);
    setTimeout(() => setAlertMessage(null), 5000);
  };

  // Handle KYC Rejection
  const handleReject = (id, reason = 'Document clarity insufficient') => {
    const rejectedItem = kycQueue.find(k => k.id === id);
    setKycQueue(prev => prev.filter(k => k.id !== id));

    setAlertMessage({
      type: 'error',
      text: `❌ Worker ${rejectedItem?.name} KYC rejected (${reason}). Notification sent for re-upload.`
    });
    setInspectingItem(null);
    setShowRejectForm(false);
    setTimeout(() => setAlertMessage(null), 5000);
  };

  // Toggle worker verification
  const toggleWorkerVerification = (workerId) => {
    setWorkerList(prev => prev.map(w => {
      if (w.id === workerId) {
        const nextState = !w.is_verified;
        setAlertMessage({
          type: 'info',
          text: `Worker ${w.name} verification status set to ${nextState ? 'VERIFIED' : 'UNVERIFIED'}.`
        });
        setTimeout(() => setAlertMessage(null), 3000);
        return { ...w, is_verified: nextState };
      }
      return w;
    }));
  };

  // Resolve Dispute
  const handleResolveDispute = (dispId) => {
    setDisputes(prev => prev.map(d => d.id === dispId ? { ...d, status: 'RESOLVED' } : d));
    setAlertMessage({
      type: 'success',
      text: `Ticket ${dispId} resolved successfully. Customer and worker notified.`
    });
    setTimeout(() => setAlertMessage(null), 3500);
  };

  // Filtered workers list
  const filteredWorkers = workerList.filter(w => {
    if (filterCategory !== 'All' && w.category.toLowerCase() !== filterCategory.toLowerCase()) return false;
    if (searchWorker && !w.name.toLowerCase().includes(searchWorker.toLowerCase()) && !w.city.toLowerCase().includes(searchWorker.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <Navbar />

      <div style={{ display: 'flex' }}>
        <Sidebar />

        <main style={{ flex: 1, padding: '24px 32px' }}>
          {/* Alert Message Banner */}
          {alertMessage && (
            <div style={{
              padding: '14px 20px',
              borderRadius: '10px',
              backgroundColor: alertMessage.type === 'success' ? '#ecfdf5' : alertMessage.type === 'error' ? '#fef2f2' : '#eff6ff',
              border: alertMessage.type === 'success' ? '1px solid #a7f3d0' : alertMessage.type === 'error' ? '1px solid #fecaca' : '1px solid #bfdbfe',
              color: alertMessage.type === 'success' ? '#065f46' : alertMessage.type === 'error' ? '#991b1b' : '#1e40af',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
              fontSize: '14px',
              fontWeight: '600',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
              <span>{alertMessage.text}</span>
              <button
                onClick={() => setAlertMessage(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}
              >
                <X size={16} />
              </button>
            </div>
          )}

          {/* Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                  Workify Admin Governance Center
                </h1>
                <span className="badge badge-verified">
                  <ShieldCheck size={13} /> Platform Administrator
                </span>
              </div>
              <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
                Manage KYC verification pipelines, inspect AWS S3 documents, enforce safety standards, and oversee platform health.
              </p>
            </div>

            <span style={{ fontSize: '12px', color: '#64748b', backgroundColor: '#fff', padding: '6px 12px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
              📍 Hub: Rajahmundry & Godavari Region
            </span>
          </div>

          {/* Stat Metrics Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
            <div className="card" style={{ padding: '20px' }}>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Total Customers</span>
              <h3 style={{ fontSize: '26px', fontWeight: '800', color: '#2563eb', marginTop: '4px' }}>10,420</h3>
              <span style={{ fontSize: '11px', color: '#10b981' }}>+120 this week</span>
            </div>
            <div className="card" style={{ padding: '20px' }}>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Registered Workers</span>
              <h3 style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a', marginTop: '4px' }}>{workerList.length}+ Active</h3>
              <span style={{ fontSize: '11px', color: '#64748b' }}>Across 7 core trades</span>
            </div>
            <div className="card" style={{ padding: '20px' }}>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Pending KYC Verifications</span>
              <h3 style={{ fontSize: '26px', fontWeight: '800', color: kycQueue.length > 0 ? '#f59e0b' : '#10b981', marginTop: '4px' }}>
                {kycQueue.length} Pending
              </h3>
              <span style={{ fontSize: '11px', color: '#f59e0b' }}>AWS S3 Queue</span>
            </div>
            <div className="card" style={{ padding: '20px' }}>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Customer Safety Rating</span>
              <h3 style={{ fontSize: '26px', fontWeight: '800', color: '#10b981', marginTop: '4px' }}>99.2%</h3>
              <span style={{ fontSize: '11px', color: '#10b981' }}>Dispute resolution under 2h</span>
            </div>
          </div>

          {/* Admin Navigation Tabs */}
          <div style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '20px',
            borderBottom: '1px solid #e2e8f0',
            paddingBottom: '12px',
            overflowX: 'auto'
          }}>
            {[
              { id: 'kyc', label: `🛡️ Worker KYC Pipeline (${kycQueue.length})` },
              { id: 'workers', label: `👥 Worker Directory (${workerList.length})` },
              { id: 'disputes', label: `🚨 Safety & Disputes (${disputes.filter(d => d.status === 'OPEN').length})` },
              { id: 'infra', label: `☁️ DevOps & AWS Architecture` },
            ].map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: isActive ? '#2563eb' : '#ffffff',
                    color: isActive ? '#ffffff' : '#475569',
                    fontSize: '13px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    boxShadow: isActive ? '0 4px 6px -1px rgba(37, 99, 235, 0.2)' : '0 1px 2px rgba(0,0,0,0.05)',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* ============================================================== */}
          {/* TAB 1: WORKER KYC VERIFICATION PIPELINE */}
          {/* ============================================================== */}
          {activeTab === 'kyc' && (
            <div className="card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                    🛡️ Worker KYC Submissions (AWS S3 Encrypted Storage)
                  </h3>
                  <p style={{ fontSize: '12px', color: '#64748b', margin: '4px 0 0 0' }}>
                    Inspect uploaded Government IDs, trade certificates, and police clearance proofs before approving the badge.
                  </p>
                </div>
                <span className="badge badge-verified">
                  Pre-Signed S3 URLs Active
                </span>
              </div>

              {kycQueue.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                  <CheckCircle size={36} color="#10b981" style={{ margin: '0 auto 8px auto' }} />
                  <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a', margin: '4px 0' }}>
                    All caught up! Zero pending KYC requests
                  </h4>
                  <p style={{ fontSize: '12px', margin: 0 }}>
                    All registered blue-collar workers in Rajahmundry have been verified.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {kycQueue.map(item => (
                    <div
                      key={item.id}
                      style={{
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        padding: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '16px',
                        backgroundColor: '#f8fafc',
                        flexWrap: 'wrap'
                      }}
                    >
                      <div style={{ flex: 1, minWidth: '280px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                            {item.name}
                          </h4>
                          <span style={{ backgroundColor: '#eff6ff', color: '#2563eb', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '700' }}>
                            🔧 {item.category}
                          </span>
                          <span style={{ backgroundColor: '#fef3c7', color: '#92400e', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '700' }}>
                            Pending Review
                          </span>
                        </div>

                        <p style={{ fontSize: '13px', color: '#475569', margin: '4px 0' }}>
                          📍 {item.locality}, {item.city} • Phone: <strong>{item.phone}</strong> • Experience: <strong>{item.experience}</strong>
                        </p>

                        <div style={{ fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span>📄 Submitted Documents: <strong>{item.docType}</strong></span>
                          <span>🕒 {item.submittedAt}</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => { setInspectingItem(item); setShowRejectForm(false); }}
                          className="btn btn-outline"
                          style={{ padding: '8px 14px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}
                        >
                          <Eye size={15} /> Inspect Documents
                        </button>
                        <button
                          onClick={() => handleApprove(item.id)}
                          className="btn btn-primary"
                          style={{ padding: '8px 16px', fontSize: '13px', backgroundColor: '#10b981', borderColor: '#10b981' }}
                        >
                          <Check size={15} /> Quick Approve
                        </button>
                        <button
                          onClick={() => handleReject(item.id)}
                          className="btn btn-outline"
                          style={{ padding: '8px 12px', fontSize: '13px', color: '#ef4444', borderColor: '#fca5a5' }}
                        >
                          <X size={15} /> Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 2: WORKER DIRECTORY & CATALOG */}
          {/* ============================================================== */}
          {activeTab === 'workers' && (
            <div className="card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                  👥 Master Worker Directory ({filteredWorkers.length} Workers)
                </h3>

                <div style={{ display: 'flex', gap: '10px' }}>
                  {/* Category Filter */}
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  >
                    <option value="All">All Trades</option>
                    <option value="Plumber">Plumber</option>
                    <option value="Electrician">Electrician</option>
                    <option value="Carpenter">Carpenter</option>
                    <option value="Painter">Painter</option>
                    <option value="AC Technician">AC Technician</option>
                    <option value="Mechanic">Mechanic</option>
                    <option value="Cleaner">Cleaner</option>
                  </select>

                  {/* Search input */}
                  <div style={{ position: 'relative' }}>
                    <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input
                      type="text"
                      placeholder="Search name or location..."
                      value={searchWorker}
                      onChange={(e) => setSearchWorker(e.target.value)}
                      style={{ padding: '8px 12px 8px 30px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                    />
                  </div>
                </div>
              </div>

              {/* Workers Table */}
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0', textAlign: 'left', color: '#475569' }}>
                      <th style={{ padding: '12px 14px' }}>Worker Name</th>
                      <th style={{ padding: '12px 14px' }}>Trade / Category</th>
                      <th style={{ padding: '12px 14px' }}>Experience</th>
                      <th style={{ padding: '12px 14px' }}>Hourly Rate</th>
                      <th style={{ padding: '12px 14px' }}>Rating</th>
                      <th style={{ padding: '12px 14px' }}>Verification</th>
                      <th style={{ padding: '12px 14px', textAlign: 'right' }}>Admin Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredWorkers.map(w => (
                      <tr key={w.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '12px 14px', fontWeight: '700', color: '#0f172a' }}>
                          {w.name}
                        </td>
                        <td style={{ padding: '12px 14px', color: '#2563eb', fontWeight: '600' }}>
                          {w.category}
                        </td>
                        <td style={{ padding: '12px 14px', color: '#475569' }}>
                          {w.experience_years} yrs
                        </td>
                        <td style={{ padding: '12px 14px', fontWeight: '700', color: '#0f172a' }}>
                          ₹{w.hourly_rate}/hr
                        </td>
                        <td style={{ padding: '12px 14px', color: '#eab308', fontWeight: '700' }}>
                          ★ {w.rating} ({w.review_count})
                        </td>
                        <td style={{ padding: '12px 14px' }}>
                          {w.is_verified ? (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', backgroundColor: '#ecfdf5', color: '#059669', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '700' }}>
                              <Check size={12} /> Verified
                            </span>
                          ) : (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', backgroundColor: '#fffbeb', color: '#d97706', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '700' }}>
                              <Clock size={12} /> Unverified
                            </span>
                          )}
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                          <button
                            onClick={() => toggleWorkerVerification(w.id)}
                            style={{
                              padding: '4px 10px',
                              borderRadius: '6px',
                              border: '1px solid #cbd5e1',
                              backgroundColor: '#fff',
                              fontSize: '11px',
                              fontWeight: '600',
                              cursor: 'pointer',
                              color: w.is_verified ? '#ef4444' : '#2563eb'
                            }}
                          >
                            {w.is_verified ? 'Revoke Badge' : 'Grant Badge'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 3: SAFETY & CUSTOMER DISPUTES */}
          {/* ============================================================== */}
          {activeTab === 'disputes' && (
            <div className="card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                    🚨 Customer Disputes & Safety Tickets
                  </h3>
                  <p style={{ fontSize: '12px', color: '#64748b', margin: '4px 0 0 0' }}>
                    Monitor reported customer experiences, late arrivals, and billing clarifications in Rajahmundry.
                  </p>
                </div>
                <span className="badge badge-verified">Dispute Resolution SLA: 2 Hours</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {disputes.map(disp => (
                  <div
                    key={disp.id}
                    style={{
                      padding: '16px',
                      borderRadius: '10px',
                      border: '1px solid #e2e8f0',
                      backgroundColor: disp.status === 'RESOLVED' ? '#f8fafc' : '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '16px',
                      flexWrap: 'wrap'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <strong style={{ fontSize: '14px', color: '#0f172a' }}>{disp.id}</strong>
                        <span style={{
                          fontSize: '11px',
                          fontWeight: '800',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          backgroundColor: disp.severity === 'HIGH' ? '#fee2e2' : disp.severity === 'MEDIUM' ? '#fef3c7' : '#e0e7ff',
                          color: disp.severity === 'HIGH' ? '#ef4444' : disp.severity === 'MEDIUM' ? '#92400e' : '#3730a3'
                        }}>
                          {disp.severity} SEVERITY
                        </span>
                        <span style={{ fontSize: '11px', color: disp.status === 'RESOLVED' ? '#10b981' : '#f59e0b', fontWeight: '700' }}>
                          ● {disp.status}
                        </span>
                      </div>
                      <p style={{ fontSize: '13px', color: '#334155', margin: '2px 0' }}>
                        "{disp.issue}"
                      </p>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>
                        Reported by <strong>{disp.customer}</strong> regarding worker <strong>{disp.worker}</strong> • {disp.date}
                      </span>
                    </div>

                    <div>
                      {disp.status === 'OPEN' ? (
                        <button
                          onClick={() => handleResolveDispute(disp.id)}
                          className="btn btn-primary"
                          style={{ padding: '8px 16px', fontSize: '12px' }}
                        >
                          <Check size={14} /> Mark Resolved
                        </button>
                      ) : (
                        <span style={{ fontSize: '12px', color: '#10b981', fontWeight: '700' }}>
                          ✓ Ticket Closed
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 4: DEVOPS & AWS ARCHITECTURE STATUS */}
          {/* ============================================================== */}
          {activeTab === 'infra' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>
                  ☁️ AWS Cloud & DevOps Infrastructure Blueprint
                </h3>
                <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '20px' }}>
                  Production multi-tier deployment running containerized microservices in AWS ap-south-1 (Mumbai).
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
                  {/* EC2 */}
                  <div style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <Server size={18} color="#2563eb" />
                      <strong style={{ fontSize: '14px', color: '#0f172a' }}>Amazon EC2 (t3.medium)</strong>
                    </div>
                    <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0' }}>
                      Host: workify-app-prod
                    </p>
                    <span style={{ fontSize: '11px', color: '#10b981', fontWeight: '700' }}>● Healthy (CPU 12%, RAM 41%)</span>
                  </div>

                  {/* S3 Storage */}
                  <div style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <Cloud size={18} color="#f59e0b" />
                      <strong style={{ fontSize: '14px', color: '#0f172a' }}>AWS S3 Object Storage</strong>
                    </div>
                    <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0' }}>
                      Bucket: workify-media-storage
                    </p>
                    <span style={{ fontSize: '11px', color: '#10b981', fontWeight: '700' }}>● KYC Pre-Signed URLs Active</span>
                  </div>

                  {/* RDS PostgreSQL */}
                  <div style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <Database size={18} color="#10b981" />
                      <strong style={{ fontSize: '14px', color: '#0f172a' }}>AWS RDS (PostgreSQL 15)</strong>
                    </div>
                    <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0' }}>
                      Multi-AZ Private VPC Subnet
                    </p>
                    <span style={{ fontSize: '11px', color: '#10b981', fontWeight: '700' }}>● Automated Backups Enabled</span>
                  </div>
                </div>

                {/* Service Endpoints Health Table */}
                <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', marginBottom: '12px' }}>
                  Microservices Health Check Status
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', backgroundColor: '#f1f5f9', borderRadius: '6px' }}>
                    <span>Django Core REST API (Port 8000)</span>
                    <strong style={{ color: '#10b981' }}>200 OK • Response 18ms</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', backgroundColor: '#f1f5f9', borderRadius: '6px' }}>
                    <span>FastAPI ML Recommendation Microservice (Port 5001)</span>
                    <strong style={{ color: '#10b981' }}>200 OK • Haversine Active</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', backgroundColor: '#f1f5f9', borderRadius: '6px' }}>
                    <span>React 18 + Vite Frontend (Port 3000)</span>
                    <strong style={{ color: '#10b981' }}>200 OK • Serving 15+ Workers</strong>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ============================================================== */}
      {/* DOCUMENT INSPECTION MODAL */}
      {/* ============================================================== */}
      {inspectingItem && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.7)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '640px',
            maxHeight: '92vh',
            overflowY: 'auto',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid #e2e8f0'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '18px 24px',
              borderBottom: '1px solid #f1f5f9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'sticky',
              top: 0,
              backgroundColor: '#fff',
              zIndex: 10
            }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                  Inspect KYC: {inspectingItem.name}
                </h3>
                <span style={{ fontSize: '12px', color: '#64748b' }}>
                  {inspectingItem.category} • {inspectingItem.locality}, {inspectingItem.city}
                </span>
              </div>
              <button
                onClick={() => setInspectingItem(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '24px' }}>
              {/* Document Tabs */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                <button
                  onClick={() => setDocTab('aadhaar')}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '6px',
                    border: docTab === 'aadhaar' ? '2px solid #2563eb' : '1px solid #cbd5e1',
                    backgroundColor: docTab === 'aadhaar' ? '#eff6ff' : '#fff',
                    color: docTab === 'aadhaar' ? '#2563eb' : '#475569',
                    fontSize: '12px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  🪪 Aadhaar Card Proof
                </button>
                <button
                  onClick={() => setDocTab('cert')}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '6px',
                    border: docTab === 'cert' ? '2px solid #2563eb' : '1px solid #cbd5e1',
                    backgroundColor: docTab === 'cert' ? '#eff6ff' : '#fff',
                    color: docTab === 'cert' ? '#2563eb' : '#475569',
                    fontSize: '12px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  🎓 Trade / ITI Certificate
                </button>
              </div>

              {/* Document Preview 1: Aadhaar Card */}
              {docTab === 'aadhaar' && (
                <div style={{
                  padding: '24px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #fef3c7 0%, #fee2e2 100%)',
                  border: '2px solid #fbbf24',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.08)',
                  marginBottom: '20px',
                  position: 'relative'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div>
                      <strong style={{ fontSize: '13px', color: '#78350f', letterSpacing: '1px' }}>GOVERNMENT OF INDIA</strong>
                      <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#1e293b', margin: '4px 0 0 0' }}>
                        Unique Identification Authority of India
                      </h4>
                    </div>
                    <span style={{ fontSize: '24px' }}>🇮🇳</span>
                  </div>

                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
                    <div style={{
                      width: '80px',
                      height: '96px',
                      backgroundColor: '#e2e8f0',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '32px'
                    }}>
                      👤
                    </div>
                    <div style={{ fontSize: '13px', color: '#1e293b' }}>
                      <p style={{ margin: '2px 0' }}><strong>Name:</strong> {inspectingItem.name}</p>
                      <p style={{ margin: '2px 0' }}><strong>DOB:</strong> 15/05/1988 • Gender: Male</p>
                      <p style={{ margin: '2px 0' }}><strong>Address:</strong> {inspectingItem.locality}, Rajahmundry, AP - 533103</p>
                    </div>
                  </div>

                  <div style={{
                    textAlign: 'center',
                    borderTop: '1px dashed #d97706',
                    paddingTop: '12px',
                    fontSize: '18px',
                    fontWeight: '800',
                    letterSpacing: '4px',
                    color: '#0f172a'
                  }}>
                    {inspectingItem.aadhaarNo}
                  </div>
                </div>
              )}

              {/* Document Preview 2: Trade Certificate */}
              {docTab === 'cert' && (
                <div style={{
                  padding: '24px',
                  borderRadius: '12px',
                  background: '#ffffff',
                  border: '2px solid #2563eb',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.08)',
                  marginBottom: '20px'
                }}>
                  <div style={{ textAlign: 'center', borderBottom: '2px solid #e2e8f0', paddingBottom: '12px', marginBottom: '16px' }}>
                    <Award size={36} color="#2563eb" style={{ margin: '0 auto 6px auto' }} />
                    <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                      NATIONAL TRADE CERTIFICATE (NTC)
                    </h4>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>
                      Government Industrial Training Institute (ITI) — Rajahmundry
                    </span>
                  </div>

                  <p style={{ fontSize: '13px', color: '#334155', lineHeight: 1.6 }}>
                    This is to certify that <strong>{inspectingItem.name}</strong> has successfully completed the prescribed training course in the trade of <strong>{inspectingItem.category}</strong> and passed the National Trade Test.
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', fontSize: '12px', color: '#64748b' }}>
                    <span>Reg No: <strong>{inspectingItem.certificateNo}</strong></span>
                    <span>Issued: Rajahmundry, Andhra Pradesh</span>
                  </div>
                </div>
              )}

              {/* Security Advisory */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 14px',
                backgroundColor: '#eff6ff',
                borderRadius: '8px',
                fontSize: '12px',
                color: '#1e40af',
                marginBottom: '20px'
              }}>
                <Lock size={15} />
                <span>Encrypted AWS S3 document token verified. Hash match confirmed.</span>
              </div>

              {/* Reject Form toggle */}
              {showRejectForm && (
                <div style={{
                  padding: '14px',
                  backgroundColor: '#fef2f2',
                  borderRadius: '8px',
                  border: '1px solid #fecaca',
                  marginBottom: '16px'
                }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#991b1b', marginBottom: '6px' }}>
                    Reason for Rejection:
                  </label>
                  <select
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', marginBottom: '10px' }}
                  >
                    <option value="Document photo is blurry / unreadable">Document photo is blurry / unreadable</option>
                    <option value="Name on Aadhaar does not match registered profile">Name on Aadhaar does not match registered profile</option>
                    <option value="Trade certificate is expired or unverified">Trade certificate is expired or unverified</option>
                    <option value="Address outside Rajahmundry operational territory">Address outside Rajahmundry operational territory</option>
                  </select>
                  <button
                    onClick={() => handleReject(inspectingItem.id, rejectReason || 'Document photo is blurry')}
                    className="btn btn-outline"
                    style={{ color: '#ef4444', borderColor: '#f87171', width: '100%', justifyContent: 'center' }}
                  >
                    Confirm Rejection & Notify Worker
                  </button>
                </div>
              )}

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => setShowRejectForm(!showRejectForm)}
                  className="btn btn-outline"
                  style={{ flex: 1, padding: '12px', justifyContent: 'center', color: '#ef4444', borderColor: '#fca5a5' }}
                >
                  <X size={16} /> Decline
                </button>
                <button
                  onClick={() => handleApprove(inspectingItem.id)}
                  className="btn btn-primary"
                  style={{ flex: 2, padding: '12px', justifyContent: 'center', backgroundColor: '#10b981', borderColor: '#10b981' }}
                >
                  <Check size={18} /> Approve & Issue Verified Badge
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
