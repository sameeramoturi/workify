import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { postNewJob } from '../../services/api';
import {
  FilePlus,
  MapPin,
  Calendar,
  Clock,
  CircleDollarSign,
  AlertCircle,
  UploadCloud,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export default function PostJob() {
  const navigate = useNavigate();
  const [category, setCategory] = useState('Plumber');
  const [subcategory, setSubcategory] = useState('Pipe Repair');
  const [description, setDescription] = useState(
    'Need a plumber to fix the leaking pipe in my bathroom. It is a small leak and needs immediate attention.'
  );
  const [address, setAddress] = useState('House No. 123, Danavaipeta, Rajahmundry');
  const [city, setCity] = useState('Rajahmundry');
  const [preferredDate, setPreferredDate] = useState('2025-05-25');
  const [preferredTime, setPreferredTime] = useState('10:00 AM - 12:00 PM');
  const [budget, setBudget] = useState('₹500 - 800');
  const [priority, setPriority] = useState('Normal');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postNewJob({
      category,
      subcategory,
      description,
      address,
      city,
      preferred_date: preferredDate,
      preferred_time: preferredTime,
      budget_min: 500,
      budget_max: 800,
      priority: priority.toUpperCase()
    });
    setSubmitted(true);
    setTimeout(() => {
      navigate('/workers');
    }, 2500);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <Navbar />

      <div style={{ display: 'flex' }}>
        <Sidebar />

        <main style={{ flex: 1, padding: '24px 32px' }}>
          {/* Header Banner */}
          <div style={{
            backgroundColor: '#eff6ff',
            borderRadius: '16px',
            padding: '24px 32px',
            marginBottom: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: '1px solid #dbeafe'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '12px',
                backgroundColor: '#2563eb', display: 'flex', alignItems: 'center',
                justifyContent: 'center', color: '#fff'
              }}>
                <FilePlus size={24} />
              </div>
              <div>
                <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                  Post a New Job
                </h1>
                <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0' }}>
                  Tell us what services you need and get matched with the best workers.
                </p>
              </div>
            </div>
          </div>

          {submitted && (
            <div style={{
              backgroundColor: '#ecfdf5',
              border: '1px solid #a7f3d0',
              padding: '16px',
              borderRadius: '8px',
              marginBottom: '20px',
              color: '#065f46',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <CheckCircle2 size={20} color="#10b981" />
              <span><strong>Job successfully posted!</strong> AI matchmaking engine is now dispatching alerts to nearby qualified workers in {city}. Redirecting...</span>
            </div>
          )}

          {/* 2-Column Grid: Form (Left) + Summary & Tips (Right) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px', alignItems: 'start' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Step 1: Service Details */}
              <div className="card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <span style={{
                    width: '24px', height: '24px', borderRadius: '50%',
                    backgroundColor: '#2563eb', color: '#fff', fontSize: '12px',
                    fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    1
                  </span>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', margin: 0 }}>
                    Service Details
                  </h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '6px' }}>
                      Service Category *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px' }}
                    >
                      <option value="Plumber">🔧 Plumber</option>
                      <option value="Electrician">⚡ Electrician</option>
                      <option value="Carpenter">🪚 Carpenter</option>
                      <option value="Painter">🎨 Painter</option>
                      <option value="AC Technician">❄️ AC Technician</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '6px' }}>
                      Subcategory *
                    </label>
                    <select
                      value={subcategory}
                      onChange={(e) => setSubcategory(e.target.value)}
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px' }}
                    >
                      <option value="Pipe Repair">Pipe Repair</option>
                      <option value="Leak Fixing">Leak Fixing</option>
                      <option value="Bathroom Fitting">Bathroom Fitting</option>
                      <option value="Water Tank Installation">Water Tank Installation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569' }}>Description *</label>
                    <span style={{ fontSize: '11px', color: '#94a3b8' }}>{description.length}/500</span>
                  </div>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px' }}
                  />
                </div>
              </div>

              {/* Step 2: Job Location */}
              <div className="card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <span style={{
                    width: '24px', height: '24px', borderRadius: '50%',
                    backgroundColor: '#2563eb', color: '#fff', fontSize: '12px',
                    fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    2
                  </span>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', margin: 0 }}>
                    Job Location
                  </h3>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '6px' }}>
                    Address *
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '6px' }}>
                      City *
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px' }}
                    >
                      <option value="Rajahmundry">Rajahmundry</option>
                      <option value="Kakinada">Kakinada</option>
                      <option value="Vijayawada">Vijayawada</option>
                      <option value="Visakhapatnam">Visakhapatnam</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '6px' }}>
                      Location (Map) *
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0 10px' }}>
                      <MapPin size={16} color="#2563eb" />
                      <input
                        type="text"
                        value={city}
                        readOnly
                        style={{ width: '100%', padding: '10px 8px', border: 'none', outline: 'none', fontSize: '14px' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Map Preview Thumbnail */}
                <div style={{
                  height: '140px',
                  backgroundColor: '#e2e8f0',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <span style={{
                    backgroundColor: '#fff',
                    padding: '6px 14px',
                    borderRadius: '9999px',
                    fontSize: '12px',
                    fontWeight: '700',
                    color: '#0f172a',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                  }}>
                    📍 {city} Pinpoint
                  </span>
                </div>
              </div>

              {/* Step 3: Schedule & Budget */}
              <div className="card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <span style={{
                    width: '24px', height: '24px', borderRadius: '50%',
                    backgroundColor: '#2563eb', color: '#fff', fontSize: '12px',
                    fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    3
                  </span>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', margin: 0 }}>
                    Schedule & Budget
                  </h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '6px' }}>
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '6px' }}>
                      Preferred Time *
                    </label>
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px' }}
                    >
                      <option>10:00 AM - 12:00 PM</option>
                      <option>12:00 PM - 02:00 PM</option>
                      <option>02:00 PM - 04:00 PM</option>
                      <option>04:00 PM - 06:00 PM</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '6px' }}>
                      Expected Budget (₹) *
                    </label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px' }}
                    >
                      <option>₹300 - 500</option>
                      <option>₹500 - 800</option>
                      <option>₹800 - 1500</option>
                      <option>₹1500+</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 4: Additional Information */}
              <div className="card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <span style={{
                    width: '24px', height: '24px', borderRadius: '50%',
                    backgroundColor: '#2563eb', color: '#fff', fontSize: '12px',
                    fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    4
                  </span>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', margin: 0 }}>
                    Additional Information
                  </h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'center' }}>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '8px' }}>
                      Priority
                    </label>
                    <div style={{ display: 'flex', gap: '16px' }}>
                      {['Low', 'Normal', 'High'].map((p) => (
                        <label key={p} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                          <input
                            type="radio"
                            name="priority"
                            checked={priority === p}
                            onChange={() => setPriority(p)}
                          />
                          {p}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '6px' }}>
                      Attach Image (optional)
                    </label>
                    <div style={{
                      border: '2px dashed #cbd5e1',
                      borderRadius: '8px',
                      padding: '16px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      backgroundColor: '#f8fafc'
                    }}>
                      <UploadCloud size={20} color="#2563eb" style={{ margin: '0 auto 4px' }} />
                      <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>Click to upload or drag & drop</p>
                      <span style={{ fontSize: '10px', color: '#94a3b8' }}>JPG, PNG (Max 5MB)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', padding: '14px', fontSize: '16px', borderRadius: '10px' }}
              >
                🚀 Post Job
              </button>
            </form>

            {/* Right Column: Sticky Job Summary & AI Card */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'sticky', top: '80px' }}>
              {/* Job Summary Card */}
              <div className="card" style={{ padding: '24px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', color: '#0f172a' }}>
                  📋 Job Summary
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Service</span>
                    <strong style={{ color: '#0f172a' }}>{category} - {subcategory}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Location</span>
                    <strong style={{ color: '#0f172a' }}>{city}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Date</span>
                    <strong style={{ color: '#0f172a' }}>{preferredDate}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Time</span>
                    <strong style={{ color: '#0f172a' }}>{preferredTime}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Budget</span>
                    <strong style={{ color: '#2563eb' }}>{budget}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Priority</span>
                    <span className="badge badge-verified">{priority}</span>
                  </div>
                </div>
              </div>

              {/* Tips for Better Results */}
              <div className="card" style={{ padding: '20px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: '#0f172a' }}>
                  💡 Tips for better results
                </h4>
                <ul style={{ fontSize: '12px', color: '#64748b', paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <li>Be clear and specific about the problem.</li>
                  <li>Add a photo if possible to help worker bring right tools.</li>
                  <li>Mention your preferred time and budget.</li>
                  <li>Choose the right subcategory for faster matching.</li>
                </ul>
              </div>

              {/* AI Matching System Promo Box */}
              <div style={{
                backgroundColor: '#eff6ff',
                border: '1px solid #bfdbfe',
                borderRadius: '12px',
                padding: '20px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Sparkles size={18} color="#2563eb" />
                  <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#1e3a8a', margin: 0 }}>
                    Get the best worker
                  </h4>
                </div>
                <p style={{ fontSize: '12px', color: '#3b82f6', lineHeight: 1.5, margin: 0 }}>
                  Our <strong>AI matching system</strong> will find the most suitable workers based on skills, location within 10 km radius, experience, Elo rating and real-time availability.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
