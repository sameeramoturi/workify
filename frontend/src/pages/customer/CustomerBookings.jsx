import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { getBookings, getDispatchedJobs } from '../../services/api';
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Star,
  ArrowRight,
  X,
  User,
  Wrench,
  RefreshCw,
  Plus,
  Check
} from 'lucide-react';

export default function CustomerBookings() {
  const [activeTab, setActiveTab] = useState('ALL'); // ALL, ACTIVE, COMPLETED
  const [bookings, setBookings] = useState([]);
  const [reviewModalJob, setReviewModalJob] = useState(null);
  const [ratingVal, setRatingVal] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Load bookings and dispatched customer jobs
  const loadCustomerData = () => {
    const directBookings = getBookings();
    const dispatched = getDispatchedJobs().map(j => ({
      id: `JOB-${j.id}`,
      workerName: j.assignedWorker || `${j.category} Specialist`,
      workerCategory: j.category,
      workerPhoto: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=150",
      service: j.service,
      date: j.time?.split(',')[0] || 'Today',
      timeSlot: j.time?.split(',')[1] || '10:00 AM - 12:00 PM',
      address: j.location,
      totalEstimate: j.budget_amount || 650,
      otp: j.otp || '5912',
      status: j.status === 'COMPLETED' ? 'COMPLETED' : 'CONFIRMED'
    }));

    // Merge both types of customer bookings
    const combined = [...directBookings, ...dispatched];
    setBookings(combined);
  };

  useEffect(() => {
    loadCustomerData();
  }, []);

  const filteredBookings = bookings.filter(b => {
    if (activeTab === 'ACTIVE') return b.status === 'CONFIRMED' || b.status === 'PENDING';
    if (activeTab === 'COMPLETED') return b.status === 'COMPLETED';
    return true;
  });

  const handleCancelBooking = (bookingId) => {
    setBookings(prev => prev.filter(b => b.id !== bookingId));
    setToastMessage(`Booking ${bookingId} has been cancelled.`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSaveReview = (e) => {
    e.preventDefault();
    setReviewSubmitted(true);
    setTimeout(() => {
      setReviewSubmitted(false);
      setReviewModalJob(null);
      setToastMessage(`⭐ Thank you for rating ${reviewModalJob.workerName}! Your review has been published.`);
      setTimeout(() => setToastMessage(null), 4000);
    }, 1000);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <Navbar />

      <div style={{ display: 'flex' }}>
        <Sidebar />

        <main style={{ flex: 1, padding: '24px 32px' }}>
          {/* Toast Alert */}
          {toastMessage && (
            <div style={{
              padding: '14px 20px',
              borderRadius: '10px',
              backgroundColor: '#eff6ff',
              border: '1px solid #bfdbfe',
              color: '#1e40af',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
              fontSize: '14px',
              fontWeight: '600',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
              <span>{toastMessage}</span>
              <button
                onClick={() => setToastMessage(null)}
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
              <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                My Bookings & Service Requests
              </h1>
              <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
                Track your active appointments, view worker arrival OTP, and review completed home services in Rajahmundry.
              </p>
            </div>

            <Link
              to="/workers"
              className="btn btn-primary"
              style={{ padding: '10px 18px', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}
            >
              <Plus size={16} /> Book Another Worker
            </Link>
          </div>

          {/* Filter Tabs */}
          <div style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '24px',
            borderBottom: '1px solid #e2e8f0',
            paddingBottom: '12px'
          }}>
            {[
              { id: 'ALL', label: `All Bookings (${bookings.length})` },
              { id: 'ACTIVE', label: `Active / In Progress (${bookings.filter(b => b.status !== 'COMPLETED').length})` },
              { id: 'COMPLETED', label: `Completed History (${bookings.filter(b => b.status === 'COMPLETED').length})` },
            ].map(tab => {
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
                    boxShadow: isActive ? '0 4px 6px -1px rgba(37, 99, 235, 0.2)' : '0 1px 2px rgba(0,0,0,0.05)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Bookings List */}
          {filteredBookings.length === 0 ? (
            <div className="card" style={{ padding: '48px', textAlign: 'center', color: '#64748b' }}>
              <Calendar size={48} color="#94a3b8" style={{ margin: '0 auto 12px auto' }} />
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>
                No bookings found
              </h3>
              <p style={{ fontSize: '13px', marginBottom: '20px' }}>
                You haven't booked any workers yet. Browse our verified plumbers, electricians, carpenters, and more!
              </p>
              <Link
                to="/workers"
                className="btn btn-primary"
                style={{ padding: '10px 24px', fontSize: '14px', textDecoration: 'none', display: 'inline-flex' }}
              >
                Find Skilled Workers in Rajahmundry
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {filteredBookings.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="card"
                  style={{
                    padding: '22px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    border: item.status === 'COMPLETED' ? '1px solid #e2e8f0' : '1px solid #bfdbfe',
                    backgroundColor: item.status === 'COMPLETED' ? '#ffffff' : '#fcfdff'
                  }}
                >
                  {/* Top Row: Header & Status Badge */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '12px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '54px',
                        height: '54px',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        backgroundColor: '#dbeafe',
                        border: '2px solid #e2e8f0'
                      }}>
                        <img
                          src={item.workerPhoto || "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=150"}
                          alt={item.workerName}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>

                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                            {item.workerName}
                          </h3>
                          <span className="badge badge-verified">
                            <ShieldCheck size={12} /> Verified {item.workerCategory}
                          </span>
                        </div>
                        <span style={{ fontSize: '12px', color: '#64748b' }}>
                          Booking Ref: <strong>#{item.id}</strong> • Service: <strong>{item.service}</strong>
                        </span>
                      </div>
                    </div>

                    <div>
                      {item.status === 'COMPLETED' ? (
                        <span style={{
                          backgroundColor: '#ecfdf5',
                          color: '#059669',
                          padding: '6px 14px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '800',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          <CheckCircle2 size={14} /> Service Completed
                        </span>
                      ) : (
                        <span style={{
                          backgroundColor: '#eff6ff',
                          color: '#2563eb',
                          padding: '6px 14px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '800',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          ● Confirmed / Arriving Soon
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Middle Row: Date, Address, Price, and OTP */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '16px',
                    padding: '16px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '10px',
                    fontSize: '13px'
                  }}>
                    <div>
                      <span style={{ color: '#64748b', fontSize: '11px', display: 'block' }}>SCHEDULED TIME</span>
                      <strong style={{ color: '#0f172a' }}>{item.date}</strong>
                      <div style={{ fontSize: '12px', color: '#475569' }}>{item.timeSlot}</div>
                    </div>

                    <div>
                      <span style={{ color: '#64748b', fontSize: '11px', display: 'block' }}>SERVICE LOCATION</span>
                      <strong style={{ color: '#0f172a' }}>{item.address}</strong>
                      <div style={{ fontSize: '12px', color: '#2563eb' }}>📍 Rajahmundry Hub</div>
                    </div>

                    <div>
                      <span style={{ color: '#64748b', fontSize: '11px', display: 'block' }}>ESTIMATED AMOUNT</span>
                      <strong style={{ fontSize: '16px', color: '#059669' }}>₹{item.totalEstimate}</strong>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>Pay via Cash / UPI</div>
                    </div>

                    {/* Prominent OTP Display for Customer */}
                    <div style={{
                      backgroundColor: '#ffffff',
                      border: '1px dashed #2563eb',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      textAlign: 'center'
                    }}>
                      <span style={{ fontSize: '10px', color: '#64748b', fontWeight: '700', display: 'block' }}>
                        SERVICE START OTP
                      </span>
                      <strong style={{ fontSize: '18px', letterSpacing: '2px', color: '#2563eb' }}>
                        {item.otp || '4829'}
                      </strong>
                      <span style={{ fontSize: '9px', color: '#64748b', display: 'block' }}>
                        Share with worker upon arrival
                      </span>
                    </div>
                  </div>

                  {/* Bottom Row: Actions */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '10px',
                    borderTop: '1px solid #f1f5f9',
                    paddingTop: '12px'
                  }}>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>
                      Need changes? Free cancellation up to 30 mins before appointment.
                    </span>

                    <div style={{ display: 'flex', gap: '10px' }}>
                      {item.status === 'COMPLETED' ? (
                        <button
                          onClick={() => setReviewModalJob(item)}
                          className="btn btn-primary"
                          style={{ padding: '8px 16px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}
                        >
                          <Star size={15} /> Rate & Review Worker
                        </button>
                      ) : (
                        <>
                          <Link
                            to="/workers/1"
                            className="btn btn-outline"
                            style={{ padding: '8px 14px', fontSize: '13px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
                          >
                            <MessageSquare size={15} /> Chat
                          </Link>
                          <a
                            href="tel:+919876543210"
                            className="btn btn-outline"
                            style={{ padding: '8px 14px', fontSize: '13px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
                          >
                            <Phone size={15} /> Call Worker
                          </a>
                          <button
                            onClick={() => handleCancelBooking(item.id)}
                            className="btn btn-outline"
                            style={{ padding: '8px 14px', fontSize: '13px', color: '#ef4444', borderColor: '#fca5a5' }}
                          >
                            Cancel
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* ============================================================== */}
      {/* REVIEW & FEEDBACK MODAL */}
      {/* ============================================================== */}
      {reviewModalJob && (
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
            maxWidth: '460px',
            padding: '24px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                  Rate {reviewModalJob.workerName}
                </h3>
                <span style={{ fontSize: '12px', color: '#64748b' }}>
                  {reviewModalJob.service} • {reviewModalJob.address}
                </span>
              </div>
              <button
                onClick={() => setReviewModalJob(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={18} />
              </button>
            </div>

            {reviewSubmitted ? (
              <div style={{ textAlign: 'center', padding: '24px' }}>
                <CheckCircle2 size={40} color="#10b981" style={{ margin: '0 auto 10px auto' }} />
                <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>Review Published!</h4>
                <p style={{ fontSize: '13px', color: '#64748b' }}>Your feedback helps other homeowners in Rajahmundry.</p>
              </div>
            ) : (
              <form onSubmit={handleSaveReview}>
                {/* Star rating selector */}
                <div style={{ textAlign: 'center', margin: '16px 0' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star
                        key={star}
                        size={32}
                        onClick={() => setRatingVal(star)}
                        fill={star <= ratingVal ? '#eab308' : 'none'}
                        color={star <= ratingVal ? '#eab308' : '#cbd5e1'}
                        style={{ transition: 'transform 0.1s ease' }}
                      />
                    ))}
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a', display: 'block', marginTop: '6px' }}>
                    {ratingVal === 5 ? '⭐⭐⭐⭐⭐ Outstanding Service!' :
                     ratingVal === 4 ? '⭐⭐⭐⭐ Very Good Experience' :
                     ratingVal === 3 ? '⭐⭐⭐ Average Experience' : 'Needs Improvement'}
                  </span>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#1e293b', marginBottom: '6px' }}>
                    Write your review
                  </label>
                  <textarea
                    rows={3}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="E.g., Ramesh arrived punctually in Danavaipeta and fixed the pipeline leak with clean work..."
                    required
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setReviewModalJob(null)}
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
                    Submit Feedback
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
