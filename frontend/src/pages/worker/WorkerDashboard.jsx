import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { getDispatchedJobs, updateDispatchedJob, INITIAL_WORKERS } from '../../services/api';
import {
  Activity,
  CheckCircle,
  XCircle,
  Clock,
  CircleDollarSign,
  Briefcase,
  AlertTriangle,
  MapPin,
  Phone,
  Check,
  X,
  Zap,
  ShieldCheck,
  UserCheck,
  Lock,
  Sparkles,
  ChevronDown,
  Calendar,
  Wallet,
  ArrowUpRight,
  TrendingUp,
  Star,
  Award,
  Sliders,
  Building2,
  Send
} from 'lucide-react';

export default function WorkerDashboard() {
  // Current active worker profile in the portal
  const [activeWorker, setActiveWorker] = useState(INITIAL_WORKERS[0]); // Ramesh Das
  const [status, setStatus] = useState('AVAILABLE'); // AVAILABLE, BUSY, OFFLINE
  const [activeTab, setActiveTab] = useState('dispatches'); // dispatches, earnings, schedule, ratings
  const [jobs, setJobs] = useState([]);
  const [earnings, setEarnings] = useState(1850);
  const [completedCount, setCompletedCount] = useState(4);
  const [alertBanner, setAlertBanner] = useState(null);

  // OTP Verification Modal State
  const [otpModalJob, setOtpModalJob] = useState(null);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpError, setOtpError] = useState('');

  // Schedule / Radius State
  const [serviceRadius, setServiceRadius] = useState(10);
  const [workingDays, setWorkingDays] = useState(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('19:00');

  // Bank Withdrawal State
  const [withdrawing, setWithdrawing] = useState(false);
  const [withdrawnSuccess, setWithdrawnSuccess] = useState(false);

  // Load dispatched jobs on mount and poll/listen
  const loadJobs = () => {
    const all = getDispatchedJobs();
    setJobs(all);
  };

  useEffect(() => {
    loadJobs();
    const interval = setInterval(loadJobs, 2000);
    return () => clearInterval(interval);
  }, []);

  // Filter jobs by current worker category (or allow viewing all)
  const incomingJobs = jobs.filter(
    j => j.status === 'PENDING' && (!j.category || j.category.toLowerCase() === activeWorker.category.toLowerCase())
  );

  const activeJobs = jobs.filter(
    j => (j.status === 'ACCEPTED' || j.status === 'IN_PROGRESS') &&
         (!j.category || j.category.toLowerCase() === activeWorker.category.toLowerCase())
  );

  const completedJobs = jobs.filter(
    j => j.status === 'COMPLETED' &&
         (!j.category || j.category.toLowerCase() === activeWorker.category.toLowerCase())
  );

  // Accept a Job
  const handleAccept = (jobId) => {
    const updated = updateDispatchedJob(jobId, {
      status: 'ACCEPTED',
      acceptedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      assignedWorker: activeWorker.name
    });
    setJobs(updated);
    setAlertBanner({
      type: 'success',
      text: `Accepted Job #${jobId}! Customer has been notified. You can now start travel.`
    });
    setTimeout(() => setAlertBanner(null), 4000);
  };

  // Reject a Job
  const handleReject = (jobId) => {
    const updated = updateDispatchedJob(jobId, { status: 'REJECTED' });
    setJobs(updated);
    setAlertBanner({
      type: 'info',
      text: `Job #${jobId} declined. Re-routing dispatch to the next nearest available worker.`
    });
    setTimeout(() => setAlertBanner(null), 4000);
  };

  // Open OTP Completion Modal
  const openCompleteModal = (job) => {
    setOtpModalJob(job);
    setEnteredOtp('');
    setOtpError('');
  };

  // Submit OTP and Complete Job
  const handleVerifyOtpAndComplete = (e) => {
    e.preventDefault();
    if (!otpModalJob) return;

    if (enteredOtp.trim() !== otpModalJob.otp && enteredOtp.trim() !== '1234') {
      setOtpError(`Invalid OTP! Please ask customer for the correct 4-digit OTP.`);
      return;
    }

    const jobPay = otpModalJob.budget_amount || 650;
    const updated = updateDispatchedJob(otpModalJob.id, {
      status: 'COMPLETED',
      completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      amountEarned: jobPay
    });

    setJobs(updated);
    setEarnings(prev => prev + jobPay);
    setCompletedCount(prev => prev + 1);
    setAlertBanner({
      type: 'success',
      text: `🎉 Job #${otpModalJob.id} completed! ₹${jobPay} credited to your earnings.`
    });
    setOtpModalJob(null);
    setTimeout(() => setAlertBanner(null), 5000);
  };

  // Handle Instant Bank Payout
  const handleWithdrawPayout = () => {
    if (earnings <= 0) return;
    setWithdrawing(true);
    setTimeout(() => {
      setWithdrawing(false);
      setWithdrawnSuccess(true);
      setEarnings(0);
      setTimeout(() => setWithdrawnSuccess(false), 5000);
    }, 1200);
  };

  const toggleDay = (day) => {
    if (workingDays.includes(day)) {
      setWorkingDays(workingDays.filter(d => d !== day));
    } else {
      setWorkingDays([...workingDays, day]);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <Navbar />

      <div style={{ display: 'flex' }}>
        <Sidebar />

        <main style={{ flex: 1, padding: '24px 32px' }}>
          {/* Top Notification Banner */}
          {alertBanner && (
            <div style={{
              padding: '14px 20px',
              borderRadius: '10px',
              backgroundColor: alertBanner.type === 'success' ? '#ecfdf5' : '#eff6ff',
              border: alertBanner.type === 'success' ? '1px solid #a7f3d0' : '1px solid #bfdbfe',
              color: alertBanner.type === 'success' ? '#065f46' : '#1e40af',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
              fontWeight: '600',
              fontSize: '14px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
              <span>{alertBanner.text}</span>
              <button
                onClick={() => setAlertBanner(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}
              >
                <X size={16} />
              </button>
            </div>
          )}

          {/* Header with Worker Switcher & Live Status */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                  Worker Portal
                </h1>
                <span className="badge badge-verified">
                  <ShieldCheck size={13} /> {activeWorker.category}
                </span>
              </div>

              {/* Worker Account Switcher */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                <span style={{ fontSize: '13px', color: '#64748b' }}>Logged in as:</span>
                <select
                  value={activeWorker.id}
                  onChange={(e) => {
                    const sel = INITIAL_WORKERS.find(w => w.id === parseInt(e.target.value));
                    if (sel) setActiveWorker(sel);
                  }}
                  style={{
                    fontSize: '13px',
                    fontWeight: '700',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    backgroundColor: '#fff',
                    color: '#0f172a'
                  }}
                >
                  {INITIAL_WORKERS.slice(0, 7).map(w => (
                    <option key={w.id} value={w.id}>
                      {w.name} ({w.category}) — ₹{w.hourly_rate}/hr
                    </option>
                  ))}
                </select>
              </div>
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
                      padding: '6px 14px',
                      borderRadius: '6px',
                      border: status === s.value ? `2px solid ${s.color}` : '1px solid #e2e8f0',
                      backgroundColor: status === s.value ? s.bg : '#fff',
                      color: status === s.value ? s.color : '#475569',
                      fontSize: '12px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    ● {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Status Alert if not Available */}
          {status !== 'AVAILABLE' && (
            <div style={{
              backgroundColor: '#fffbeb',
              border: '1px solid #fde68a',
              color: '#92400e',
              padding: '12px 16px',
              borderRadius: '8px',
              marginBottom: '20px',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <AlertTriangle size={16} />
              <span>You are currently <strong>{status}</strong>. Switch to <strong>AVAILABLE</strong> to receive new instant customer leads in Rajahmundry.</span>
            </div>
          )}

          {/* Quick Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
            <div className="card" style={{ padding: '18px' }}>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Today's Earnings</span>
              <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#2563eb', marginTop: '4px' }}>
                ₹{earnings.toLocaleString()}
              </h3>
            </div>
            <div className="card" style={{ padding: '18px' }}>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Jobs Delivered</span>
              <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', marginTop: '4px' }}>
                {completedCount} Completed
              </h3>
            </div>
            <div className="card" style={{ padding: '18px' }}>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Elo Skill Rating</span>
              <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#10b981', marginTop: '4px' }}>
                1,680 <span style={{ fontSize: '12px', color: '#10b981' }}>(Diamond Tier)</span>
              </h3>
            </div>
            <div className="card" style={{ padding: '18px' }}>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Customer Feedback</span>
              <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#eab308', marginTop: '4px' }}>
                {activeWorker.rating} ★
              </h3>
            </div>
          </div>

          {/* Dedicated Worker Feature Tabs */}
          <div style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '20px',
            borderBottom: '1px solid #e2e8f0',
            paddingBottom: '12px',
            overflowX: 'auto'
          }}>
            {[
              { id: 'dispatches', label: `⚡ Live Dispatches & Jobs (${incomingJobs.length + activeJobs.length})`, icon: Zap },
              { id: 'earnings', label: `💰 Earnings & Payout Ledger`, icon: Wallet },
              { id: 'schedule', label: `🕒 Availability & Service Radius`, icon: Sliders },
              { id: 'ratings', label: `⭐ Elo Skill & Reviews`, icon: Award },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: isActive ? '#2563eb' : '#ffffff',
                    color: isActive ? '#ffffff' : '#475569',
                    fontSize: '13px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: isActive ? '0 4px 6px -1px rgba(37, 99, 235, 0.2)' : '0 1px 2px rgba(0,0,0,0.05)',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Icon size={16} /> {tab.label}
                </button>
              );
            })}
          </div>

          {/* ============================================================== */}
          {/* TAB 1: LIVE DISPATCHES & JOBS */}
          {/* ============================================================== */}
          {activeTab === 'dispatches' && (
            <>
              {/* SECTION 1: INCOMING DISPATCH ALERTS */}
              <div className="card" style={{ padding: '24px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                      ⚡ Incoming Job Alerts (Within 10 km Radius)
                    </h3>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>
                      Real-time leads from customer postings in Rajahmundry
                    </span>
                  </div>
                  <span className="badge badge-verified">
                    ● Live Dispatch Active ({incomingJobs.length} New)
                  </span>
                </div>

                {incomingJobs.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '32px 16px', color: '#64748b' }}>
                    <Clock size={32} style={{ margin: '0 auto 8px auto', opacity: 0.5 }} />
                    <p style={{ fontSize: '14px', fontWeight: '600', color: '#334155', margin: '4px 0' }}>
                      No pending incoming dispatches right now
                    </p>
                    <p style={{ fontSize: '12px', margin: 0 }}>
                      Stay online to receive instant job requests from customers in Danavaipeta, Kotipalli, and Morampudi.
                    </p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {incomingJobs.map(job => (
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
                          gap: '16px',
                          flexWrap: 'wrap'
                        }}
                      >
                        <div style={{ flex: 1, minWidth: '280px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                            <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#1e3a8a', margin: 0 }}>
                              #{job.id} • {job.service}
                            </h4>
                            <span style={{
                              backgroundColor: job.priority === 'HIGH' || job.priority === 'URGENT' ? '#fee2e2' : '#e0e7ff',
                              color: job.priority === 'HIGH' || job.priority === 'URGENT' ? '#ef4444' : '#4338ca',
                              fontSize: '11px',
                              fontWeight: '800',
                              padding: '2px 8px',
                              borderRadius: '4px'
                            }}>
                              {job.priority} PRIORITY
                            </span>
                          </div>

                          <p style={{ fontSize: '13px', color: '#334155', margin: '4px 0 6px 0' }}>
                            "{job.description}"
                          </p>

                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '12px', color: '#475569' }}>
                            <span>👤 Customer: <strong>{job.customer}</strong></span>
                            <span>📍 Location: <strong>{job.location} ({job.distance_km} km away)</strong></span>
                            <span>🕒 Scheduled: <strong>{job.time}</strong></span>
                            <span>💰 Budget: <strong style={{ color: '#2563eb' }}>{job.budget}</strong></span>
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button
                            onClick={() => handleAccept(job.id)}
                            className="btn btn-primary"
                            style={{ padding: '10px 20px', fontSize: '13px' }}
                          >
                            <CheckCircle size={16} /> Accept Job
                          </button>
                          <button
                            onClick={() => handleReject(job.id)}
                            className="btn btn-outline"
                            style={{ padding: '10px 16px', fontSize: '13px', color: '#ef4444', borderColor: '#fca5a5' }}
                          >
                            <XCircle size={16} /> Decline
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* SECTION 2: ACTIVE JOBS IN PROGRESS */}
              <div className="card" style={{ padding: '24px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                      🚀 Active Work in Progress ({activeJobs.length})
                    </h3>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>
                      Jobs you have accepted — travel to site and verify OTP upon arrival
                    </span>
                  </div>
                </div>

                {activeJobs.length === 0 ? (
                  <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                    No ongoing jobs in progress. Accept an alert above to start!
                  </p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {activeJobs.map(job => (
                      <div
                        key={job.id}
                        style={{
                          backgroundColor: '#f0fdf4',
                          border: '1px solid #bbf7d0',
                          borderRadius: '12px',
                          padding: '18px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '16px',
                          flexWrap: 'wrap'
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <span style={{ backgroundColor: '#10b981', color: '#fff', fontSize: '11px', fontWeight: '700', padding: '2px 8px', borderRadius: '4px' }}>
                              ● IN PROGRESS
                            </span>
                            <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#065f46', margin: 0 }}>
                              #{job.id} • {job.service}
                            </h4>
                          </div>

                          <p style={{ fontSize: '13px', color: '#334155', margin: '4px 0' }}>
                            Customer: <strong>{job.customer}</strong> • 📍 {job.location}
                          </p>

                          <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: '#475569' }}>
                            <span>Accepted at: <strong>{job.acceptedAt || 'Recent'}</strong></span>
                            <span>Agreed Fare: <strong style={{ color: '#059669' }}>{job.budget}</strong></span>
                            <span>Phone: <strong>{job.customerPhone}</strong></span>
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '10px' }}>
                          <a
                            href={`tel:${job.customerPhone}`}
                            className="btn btn-outline"
                            style={{ padding: '8px 14px', fontSize: '12px', textDecoration: 'none' }}
                          >
                            <Phone size={14} /> Call Customer
                          </a>
                          <button
                            onClick={() => openCompleteModal(job)}
                            className="btn btn-primary"
                            style={{ padding: '8px 18px', fontSize: '13px', backgroundColor: '#059669', borderColor: '#059669' }}
                          >
                            <Check size={16} /> Verify OTP & Complete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* SECTION 3: RECENT COMPLETED JOBS */}
              <div className="card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', marginBottom: '14px' }}>
                  ✅ Delivered Jobs History Today
                </h3>

                {completedJobs.length === 0 ? (
                  <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                    No completed jobs recorded yet today. Complete active jobs to see them here!
                  </p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {completedJobs.map(job => (
                      <div
                        key={job.id}
                        style={{
                          padding: '12px 16px',
                          borderRadius: '8px',
                          backgroundColor: '#f8fafc',
                          border: '1px solid #e2e8f0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <div>
                          <strong style={{ fontSize: '13px', color: '#0f172a' }}>
                            #{job.id} — {job.service}
                          </strong>
                          <span style={{ fontSize: '12px', color: '#64748b', marginLeft: '12px' }}>
                            Delivered to {job.customer} ({job.location})
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span style={{ fontSize: '12px', color: '#10b981', fontWeight: '700' }}>
                            +₹{job.amountEarned || job.budget_amount || 650}
                          </span>
                          <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                            {job.completedAt || 'Today'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {/* ============================================================== */}
          {/* TAB 2: EARNINGS & PAYOUT LEDGER */}
          {/* ============================================================== */}
          {activeTab === 'earnings' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Earnings Overview Card */}
              <div className="card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
                  <div>
                    <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '600' }}>Available Payout Balance</span>
                    <h2 style={{ fontSize: '36px', fontWeight: '800', color: '#0f172a', margin: '4px 0' }}>
                      ₹{earnings.toLocaleString()}
                    </h2>
                    <span style={{ fontSize: '12px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}>
                      <TrendingUp size={14} /> +18.4% more earnings than last week in Rajahmundry
                    </span>
                  </div>

                  {/* Bank & Payout Details */}
                  <div style={{
                    padding: '16px 20px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    minWidth: '280px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <Building2 size={16} color="#2563eb" />
                      <strong style={{ fontSize: '13px', color: '#0f172a' }}>Linked Bank Account</strong>
                    </div>
                    <p style={{ fontSize: '12px', color: '#475569', margin: '2px 0' }}>
                      State Bank of India — Rajahmundry Main
                    </p>
                    <p style={{ fontSize: '11px', color: '#64748b', margin: '0 0 10px 0' }}>
                      A/C: *******4821 • UPI: {activeWorker.name.toLowerCase().replace(/\s+/g, '')}@sbi
                    </p>

                    <button
                      onClick={handleWithdrawPayout}
                      disabled={withdrawing || earnings <= 0}
                      className="btn btn-primary"
                      style={{
                        width: '100%',
                        padding: '10px',
                        fontSize: '13px',
                        justifyContent: 'center',
                        backgroundColor: earnings > 0 ? '#10b981' : '#94a3b8',
                        borderColor: earnings > 0 ? '#10b981' : '#94a3b8'
                      }}
                    >
                      <ArrowUpRight size={16} />
                      {withdrawing ? 'Transferring...' : `Instant Withdraw (₹${earnings.toLocaleString()})`}
                    </button>
                  </div>
                </div>

                {withdrawnSuccess && (
                  <div style={{
                    backgroundColor: '#ecfdf5',
                    border: '1px solid #a7f3d0',
                    color: '#065f46',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    fontSize: '13px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <CheckCircle size={16} color="#10b981" />
                    <span><strong>Payout Transferred!</strong> Funds successfully sent to your linked bank account via IMPS.</span>
                  </div>
                )}

                {/* Weekly Earnings Bar Chart Simulation */}
                <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', marginBottom: '12px' }}>
                  Weekly Income Trend (Mon - Sun)
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '12px', alignItems: 'flex-end', height: '140px', padding: '16px 0', borderBottom: '1px solid #f1f5f9' }}>
                  {[
                    { day: 'Mon', amt: 1800, ht: '60%' },
                    { day: 'Tue', amt: 2400, ht: '80%' },
                    { day: 'Wed', amt: 2100, ht: '70%' },
                    { day: 'Thu', amt: 1900, ht: '65%' },
                    { day: 'Fri', amt: 2600, ht: '85%' },
                    { day: 'Sat', amt: 3200, ht: '100%' },
                    { day: 'Sun', amt: earnings, ht: `${Math.min(100, Math.max(20, (earnings / 3000) * 100))}%` },
                  ].map(b => (
                    <div key={b.day} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                      <span style={{ fontSize: '10px', color: '#64748b', marginBottom: '4px' }}>₹{b.amt}</span>
                      <div style={{
                        width: '100%',
                        maxWidth: '36px',
                        height: b.ht,
                        backgroundColor: b.day === 'Sun' ? '#2563eb' : '#93c5fd',
                        borderRadius: '6px 6px 0 0'
                      }} />
                      <span style={{ fontSize: '11px', fontWeight: '700', color: '#475569', marginTop: '6px' }}>{b.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Transactions History Ledger */}
              <div className="card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', marginBottom: '16px' }}>
                  🧾 Detailed Payout Ledger
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { id: 'TXN-9021', date: 'Today, 2:45 PM', desc: 'Pipe Repair & Leak Fixing (Job #101)', amount: '+₹650', status: 'Credited' },
                    { id: 'TXN-8942', date: 'Yesterday, 5:10 PM', desc: 'Overhead Tank Connection', amount: '+₹1,200', status: 'Settled' },
                    { id: 'TXN-8820', date: '15 Sep 2026', desc: 'Weekly Automated Bank Withdrawal', amount: '-₹8,400', status: 'Bank Transfer' },
                    { id: 'TXN-8711', date: '14 Sep 2026', desc: 'Bathroom Sanitary Fitting Installation', amount: '+₹950', status: 'Settled' }
                  ].map(t => (
                    <div
                      key={t.id}
                      style={{
                        padding: '12px 16px',
                        borderRadius: '8px',
                        backgroundColor: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div>
                        <strong style={{ fontSize: '13px', color: '#0f172a' }}>{t.desc}</strong>
                        <p style={{ fontSize: '11px', color: '#64748b', margin: '2px 0 0 0' }}>
                          Ref: {t.id} • {t.date}
                        </p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{
                          fontSize: '14px',
                          fontWeight: '800',
                          color: t.amount.startsWith('+') ? '#10b981' : '#ef4444'
                        }}>
                          {t.amount}
                        </span>
                        <span style={{ display: 'block', fontSize: '11px', color: '#64748b' }}>
                          {t.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 3: AVAILABILITY & SERVICE RADIUS */}
          {/* ============================================================== */}
          {activeTab === 'schedule' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                  🕒 Working Schedule & Service Radius
                </h3>
                <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px' }}>
                  Configure your service hours, working days, and distance radius in Rajahmundry.
                </p>

                {/* 1. Working Days */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>
                    Active Working Days
                  </label>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => {
                      const selected = workingDays.includes(day);
                      return (
                        <button
                          key={day}
                          onClick={() => toggleDay(day)}
                          style={{
                            padding: '8px 16px',
                            borderRadius: '8px',
                            border: selected ? '2px solid #2563eb' : '1px solid #cbd5e1',
                            backgroundColor: selected ? '#eff6ff' : '#fff',
                            color: selected ? '#2563eb' : '#475569',
                            fontWeight: selected ? '700' : '500',
                            fontSize: '13px',
                            cursor: 'pointer'
                          }}
                        >
                          {day} {selected && '✓'}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Daily Shift Timing */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#1e293b', marginBottom: '6px' }}>
                      Shift Start Time
                    </label>
                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#1e293b', marginBottom: '6px' }}>
                      Shift End Time
                    </label>
                    <input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                </div>

                {/* 3. Service Distance Radius Slider */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>
                      Service Coverage Radius (Rajahmundry & Surrounding)
                    </label>
                    <strong style={{ fontSize: '14px', color: '#2563eb' }}>{serviceRadius} km radius</strong>
                  </div>
                  <input
                    type="range"
                    min={3}
                    max={25}
                    value={serviceRadius}
                    onChange={(e) => setServiceRadius(parseInt(e.target.value))}
                    style={{ width: '100%', cursor: 'pointer' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b', marginTop: '4px' }}>
                    <span>3 km (Locality only)</span>
                    <span>10 km (Standard Rajahmundry)</span>
                    <span>25 km (Includes Kovvur & Dowleswaram)</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setAlertBanner({ type: 'success', text: 'Working schedule and operational radius updated successfully!' });
                    setTimeout(() => setAlertBanner(null), 3000);
                  }}
                  className="btn btn-primary"
                  style={{ padding: '10px 24px', fontSize: '13px' }}
                >
                  Save Schedule Settings
                </button>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 4: ELO SKILL & REVIEWS */}
          {/* ============================================================== */}
          {activeTab === 'ratings' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                      ⭐ Elo Skill Rating & Quality Metrics
                    </h3>
                    <p style={{ fontSize: '12px', color: '#64748b', margin: '4px 0 0 0' }}>
                      Based on AI matchmaking calculations, customer behavior scores, and completion punctuality
                    </p>
                  </div>
                  <span style={{
                    padding: '6px 14px',
                    borderRadius: '20px',
                    backgroundColor: '#fef3c7',
                    color: '#92400e',
                    fontSize: '12px',
                    fontWeight: '800',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <Award size={16} /> Diamond Pro Worker
                  </span>
                </div>

                {/* Score Breakdown Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ padding: '16px', backgroundColor: '#eff6ff', borderRadius: '10px', border: '1px solid #bfdbfe' }}>
                    <span style={{ fontSize: '12px', color: '#1e40af', fontWeight: '600' }}>Overall Elo Score</span>
                    <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#1d4ed8', margin: '4px 0' }}>1,680</h3>
                    <span style={{ fontSize: '11px', color: '#3b82f6' }}>Top 5% among all {activeWorker.category}s</span>
                  </div>
                  <div style={{ padding: '16px', backgroundColor: '#f0fdf4', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
                    <span style={{ fontSize: '12px', color: '#166534', fontWeight: '600' }}>On-Time Arrival Rate</span>
                    <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#15803d', margin: '4px 0' }}>98.2%</h3>
                    <span style={{ fontSize: '11px', color: '#22c55e' }}>Average arrival under 25 mins</span>
                  </div>
                  <div style={{ padding: '16px', backgroundColor: '#fefce8', borderRadius: '10px', border: '1px solid #fef08a' }}>
                    <span style={{ fontSize: '12px', color: '#854d0e', fontWeight: '600' }}>Job Completion Ratio</span>
                    <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#a16207', margin: '4px 0' }}>99.4%</h3>
                    <span style={{ fontSize: '11px', color: '#eab308' }}>Zero abandoned jobs</span>
                  </div>
                </div>

                {/* Customer Reviews List */}
                <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', marginBottom: '12px' }}>
                  Recent Customer Testimonials in Rajahmundry
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { name: 'K. Murali Krishna', locality: 'Danavaipeta', rating: 5, date: 'Yesterday', text: 'Arrived very quickly with proper toolkit and repaired the bathroom pipe leakage cleanly. Polite and professional!' },
                    { name: 'P. Satyanarayana', locality: 'Morampudi', rating: 5, date: '3 days ago', text: 'Excellent workmanship and fair billing. Explained the issue clearly before fixing.' },
                    { name: 'Sita Mahalakshmi', locality: 'Innespeta', rating: 4.8, date: '1 week ago', text: 'Clean job done on kitchen sink and tap installation. Highly recommended.' }
                  ].map((r, i) => (
                    <div key={i} style={{ padding: '14px', borderRadius: '8px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <div>
                          <strong style={{ fontSize: '13px', color: '#0f172a' }}>{r.name}</strong>
                          <span style={{ fontSize: '11px', color: '#64748b', marginLeft: '8px' }}>📍 {r.locality}</span>
                        </div>
                        <span style={{ fontSize: '11px', color: '#94a3b8' }}>{r.date}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '2px', color: '#eab308', marginBottom: '6px' }}>
                        {[...Array(5)].map((_, idx) => (
                          <Star key={idx} size={12} fill="#eab308" />
                        ))}
                      </div>
                      <p style={{ fontSize: '12px', color: '#334155', margin: 0 }}>"{r.text}"</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ============================================================== */}
      {/* OTP COMPLETION MODAL */}
      {/* ============================================================== */}
      {otpModalJob && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.65)',
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
            maxWidth: '440px',
            padding: '24px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Lock size={18} color="#2563eb" />
                <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                  Service Completion OTP
                </h3>
              </div>
              <button
                onClick={() => setOtpModalJob(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={18} />
              </button>
            </div>

            <p style={{ fontSize: '13px', color: '#475569', marginBottom: '16px' }}>
              Ask customer <strong>{otpModalJob.customer}</strong> for their 4-digit Service OTP to verify completion and release payout.
            </p>

            <form onSubmit={handleVerifyOtpAndComplete}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#1e293b', marginBottom: '6px' }}>
                  Enter 4-Digit OTP
                </label>
                <input
                  type="text"
                  maxLength={4}
                  value={enteredOtp}
                  onChange={(e) => { setEnteredOtp(e.target.value); setOtpError(''); }}
                  placeholder="e.g. 5912"
                  autoFocus
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: otpError ? '2px solid #ef4444' : '1px solid #cbd5e1',
                    fontSize: '20px',
                    fontWeight: '800',
                    letterSpacing: '6px',
                    textAlign: 'center',
                    outline: 'none'
                  }}
                />
                {otpError && (
                  <p style={{ fontSize: '12px', color: '#ef4444', marginTop: '6px', margin: 0 }}>
                    {otpError}
                  </p>
                )}

                {/* Helpful Demo Hint */}
                <div style={{
                  marginTop: '10px',
                  padding: '8px 12px',
                  backgroundColor: '#f1f5f9',
                  borderRadius: '6px',
                  fontSize: '11px',
                  color: '#64748b'
                }}>
                  💡 <strong>Demo Helper:</strong> Customer OTP for this job is <strong>{otpModalJob.otp || '5912'}</strong> (or use <strong>1234</strong>).
                </div>
              </div>

              <div style={{
                padding: '12px',
                backgroundColor: '#eff6ff',
                borderRadius: '8px',
                marginBottom: '18px',
                fontSize: '12px',
                color: '#1e40af',
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <span>Payout for Job #{otpModalJob.id}:</span>
                <strong>₹{otpModalJob.budget_amount || 650} (Direct Credit)</strong>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setOtpModalJob(null)}
                  className="btn btn-outline"
                  style={{ flex: 1, padding: '10px', justifyContent: 'center' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ flex: 2, padding: '10px', justifyContent: 'center' }}
                >
                  Verify & Finish Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
