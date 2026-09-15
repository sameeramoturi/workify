import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { INITIAL_WORKERS } from '../../services/api';
import {
  ArrowLeft,
  ShieldCheck,
  Star,
  MapPin,
  Calendar,
  Phone,
  MessageSquare,
  Clock,
  CheckCircle,
  Mail,
  User,
  BookOpen
} from 'lucide-react';

export default function WorkerProfile() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('Overview');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Find worker or default to Ramesh Das (ID: 1)
  const worker = INITIAL_WORKERS.find(w => w.id === parseInt(id || '1')) || INITIAL_WORKERS[0];

  const handleBooking = () => {
    setBookingSuccess(true);
    setTimeout(() => setBookingSuccess(false), 4000);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <Navbar />

      <div style={{ display: 'flex' }}>
        <Sidebar />

        <main style={{ flex: 1, padding: '24px 32px' }}>
          {/* Back button */}
          <Link
            to="/workers"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#2563eb',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '16px'
            }}
          >
            <ArrowLeft size={16} /> Back to Search
          </Link>

          {bookingSuccess && (
            <div style={{
              backgroundColor: '#ecfdf5',
              border: '1px solid #a7f3d0',
              color: '#065f46',
              padding: '12px 16px',
              borderRadius: '8px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <CheckCircle size={18} color="#10b981" />
              <span><strong>Booking Request Sent!</strong> Ramesh Das will accept shortly. You can track this in My Bookings.</span>
            </div>
          )}

          {/* Top Profile Header Card */}
          <div className="card" style={{ padding: '28px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
              <div style={{ position: 'relative' }}>
                <div style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  backgroundColor: '#dbeafe'
                }}>
                  <img
                    src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=300"
                    alt={worker.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <span style={{
                  position: 'absolute',
                  bottom: '-8px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: '#10b981',
                  color: '#fff',
                  fontSize: '11px',
                  fontWeight: '700',
                  padding: '2px 8px',
                  borderRadius: '9999px'
                }}>
                  ● Online
                </span>
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                    {worker.name}
                  </h1>
                  <ShieldCheck size={20} color="#2563eb" />
                </div>

                <p style={{ fontSize: '15px', color: '#475569', fontWeight: '600', marginBottom: '8px' }}>
                  🔧 {worker.category}
                </p>

                <div style={{ display: 'flex', gap: '20px', fontSize: '13px', color: '#64748b', marginBottom: '12px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#0f172a', fontWeight: '700' }}>
                    <Star size={14} fill="#eab308" color="#eab308" /> {worker.rating}
                    <span style={{ color: '#64748b', fontWeight: '400' }}>({worker.review_count} reviews)</span>
                  </span>
                  <span>💼 {worker.experience_years} years experience</span>
                  <span>📍 {worker.city}, {worker.state}</span>
                  <span style={{ color: '#2563eb', fontWeight: '600' }}>⚡ {worker.distance_km} km away</span>
                </div>

                <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.5, maxWidth: '750px' }}>
                  {worker.about_me}
                </p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div style={{
              display: 'flex',
              gap: '32px',
              borderTop: '1px solid #f1f5f9',
              marginTop: '24px',
              paddingTop: '16px',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              {['Overview', 'Skills & Services', 'Experience', 'Reviews', 'Location'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '6px 0',
                    cursor: 'pointer',
                    color: activeTab === tab ? '#2563eb' : '#64748b',
                    borderBottom: activeTab === tab ? '2px solid #2563eb' : '2px solid transparent',
                    fontWeight: activeTab === tab ? '700' : '500'
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Content Layout: Details (Left) + Actions/Pricing (Right) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px' }}>
            {/* Left Column: Tab Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Profile Information */}
              <div className="card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', color: '#0f172a' }}>
                  👤 Profile Information
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', fontSize: '13px' }}>
                  <div>
                    <span style={{ color: '#64748b', display: 'block' }}>Full Name</span>
                    <strong style={{ color: '#0f172a' }}>{worker.name}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b', display: 'block' }}>Phone Number</span>
                    <strong style={{ color: '#0f172a' }}>{worker.phone_number || "+91 98765 43210"}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b', display: 'block' }}>Email</span>
                    <strong style={{ color: '#0f172a' }}>{worker.email || "ramesh.das@gmail.com"}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b', display: 'block' }}>Date of Birth</span>
                    <strong style={{ color: '#0f172a' }}>{worker.dob || "12 Jan 1990"}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b', display: 'block' }}>Gender</span>
                    <strong style={{ color: '#0f172a' }}>{worker.gender || "Male"}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b', display: 'block' }}>Languages</span>
                    <strong style={{ color: '#0f172a' }}>{(worker.languages || []).join(', ')}</strong>
                  </div>
                </div>

                <div style={{
                  marginTop: '16px',
                  padding: '12px',
                  backgroundColor: '#eff6ff',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <ShieldCheck size={20} color="#2563eb" />
                  <div>
                    <strong style={{ fontSize: '13px', color: '#1e3a8a' }}>Verified Professional</strong>
                    <p style={{ fontSize: '11px', color: '#3b82f6', margin: 0 }}>Identity, phone and background verified by Workify</p>
                  </div>
                </div>
              </div>

              {/* Work Experience */}
              <div className="card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', color: '#0f172a' }}>
                  💼 Work Experience
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {(worker.experiences || []).map((exp, i) => (
                    <div key={i} style={{ borderLeft: '2px solid #2563eb', paddingLeft: '14px' }}>
                      <span style={{ fontSize: '12px', color: '#2563eb', fontWeight: '700' }}>{exp.year}</span>
                      <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>{exp.role}</h4>
                      <p style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>{exp.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px', color: '#0f172a' }}>
                  🎓 Education
                </h3>
                <div style={{ borderLeft: '2px solid #10b981', paddingLeft: '14px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>
                    {worker.education || "ITI (Plumbing) - Govt ITI Rajahmundry"}
                  </h4>
                </div>
              </div>

              {/* Work Gallery */}
              <div className="card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', color: '#0f172a' }}>
                  📷 Work Gallery
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                  {(worker.gallery || [
                    "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=300",
                    "https://images.unsplash.com/photo-1505798577917-a65157d3320a?w=300",
                    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300",
                    "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=300"
                  ]).map((imgUrl, i) => (
                    <div key={i} style={{ height: '90px', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#e2e8f0' }}>
                      <img src={imgUrl} alt="Work specimen" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Pricing, Booking Action & Ratings */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Action Card */}
              <div className="card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div>
                    <span style={{ fontSize: '28px', fontWeight: '800', color: '#2563eb' }}>₹{worker.hourly_rate}</span>
                    <span style={{ fontSize: '14px', color: '#64748b' }}>/hr</span>
                  </div>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>(Negotiable)</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <button onClick={handleBooking} className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>
                    <Calendar size={18} /> Book Now
                  </button>
                  <button className="btn btn-outline" style={{ width: '100%', padding: '12px' }}>
                    <MessageSquare size={18} /> Chat with Worker
                  </button>
                  <button className="btn btn-outline" style={{ width: '100%', padding: '12px' }}>
                    <Phone size={18} /> Call Now
                  </button>
                </div>
              </div>

              {/* Skills */}
              <div className="card" style={{ padding: '20px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px' }}>🔧 Skills</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {worker.skills.map(s => (
                    <span key={s} style={{
                      backgroundColor: '#eff6ff',
                      color: '#2563eb',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Availability Calendar */}
              <div className="card" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: '700' }}>🕒 Availability</h4>
                  <span className="badge badge-available">● Available</span>
                </div>

                {/* Days of week */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center', marginBottom: '12px' }}>
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => {
                    const isAvailable = (worker.available_days || []).includes(day);
                    return (
                      <div
                        key={day}
                        style={{
                          padding: '6px 0',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: '600',
                          backgroundColor: isAvailable ? '#ecfdf5' : '#f1f5f9',
                          color: isAvailable ? '#059669' : '#94a3b8'
                        }}
                      >
                        {day}
                      </div>
                    );
                  })}
                </div>

                <p style={{ fontSize: '12px', color: '#475569', margin: 0 }}>
                  <strong>Next available time:</strong> {worker.working_hours}
                </p>
              </div>

              {/* Ratings Breakdown */}
              <div className="card" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <span style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a' }}>{worker.rating}</span>
                  <div>
                    <div style={{ display: 'flex', gap: '2px', color: '#eab308' }}>
                      {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#eab308" />)}
                    </div>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>({worker.review_count} reviews)</span>
                  </div>
                </div>

                {/* Progress bars */}
                {[
                  { star: 5, pct: 85 },
                  { star: 4, pct: 10 },
                  { star: 3, pct: 3 },
                  { star: 2, pct: 1 },
                  { star: 1, pct: 1 },
                ].map(b => (
                  <div key={b.star} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', marginBottom: '4px' }}>
                    <span style={{ width: '12px' }}>{b.star}★</span>
                    <div style={{ flex: 1, height: '6px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${b.pct}%`, height: '100%', backgroundColor: '#2563eb' }} />
                    </div>
                    <span style={{ width: '24px', color: '#64748b' }}>{b.pct}%</span>
                  </div>
                ))}
              </div>

              {/* Service Area Map */}
              <div className="card" style={{ padding: '20px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '6px' }}>📍 Service Area</h4>
                <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '12px' }}>
                  {worker.city} and nearby areas (up to 10 km radius)
                </p>
                <div style={{
                  height: '110px',
                  backgroundColor: '#e2e8f0',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  color: '#2563eb',
                  fontWeight: '600'
                }}>
                  📍 Radius Coverage: 10 km
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
