import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import InteractiveMap from '../../components/InteractiveMap';
import { RAJAHMUNDRY_LOCALITIES, ANDHRA_PRADESH_CITIES } from '../../data/locations';
import { postNewJob, dispatchJob } from '../../services/api';
import {
  FilePlus,
  MapPin,
  Calendar,
  Clock,
  CircleDollarSign,
  AlertCircle,
  UploadCloud,
  CheckCircle2,
  Sparkles,
  Zap,
  ArrowRight,
  ShieldCheck,
  Check,
  X,
  Repeat,
  CalendarRange
} from 'lucide-react';

export default function PostJob() {
  const navigate = useNavigate();
  const [category, setCategory] = useState('Plumber');
  const [subcategory, setSubcategory] = useState('Pipe Repair');
  const [description, setDescription] = useState(
    'Need a plumber to fix the leaking pipe in my bathroom. It is a small leak and needs immediate attention.'
  );
  const [address, setAddress] = useState('House No. 123, Danavaipeta Main Road');
  const [locality, setLocality] = useState('Danavaipeta');
  const [city, setCity] = useState('Rajahmundry');
  const [coords, setCoords] = useState({ lat: 16.9965, lng: 81.7885 });
  
  // Schedule & Recurrence States
  const [jobType, setJobType] = useState('ONE_TIME'); // 'ONE_TIME' | 'RECURRING'
  const [recurrencePattern, setRecurrencePattern] = useState('DAILY'); // 'DAILY' | 'WEEKDAYS' | 'ALTERNATE_DAYS' | 'WEEKLY' | 'MONTHLY'
  const [durationPreset, setDurationPreset] = useState('1_MONTH'); // '1_WEEK', '1_MONTH', '3_MONTHS', 'CUSTOM'
  
  const todayStr = new Date().toISOString().split('T')[0];
  const [startDate, setStartDate] = useState(todayStr);

  const calculateEndDate = (start, preset) => {
    const d = new Date(start || todayStr);
    if (preset === '1_WEEK') d.setDate(d.getDate() + 7);
    else if (preset === '1_MONTH') d.setDate(d.getDate() + 30);
    else if (preset === '3_MONTHS') d.setDate(d.getDate() + 90);
    return d.toISOString().split('T')[0];
  };

  const [endDate, setEndDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().split('T')[0];
  });

  const [preferredDate, setPreferredDate] = useState('Today');
  const [preferredTime, setPreferredTime] = useState('10:00 AM - 12:00 PM');
  const [billingCycle, setBillingCycle] = useState('MONTHLY'); // 'PER_VISIT', 'WEEKLY', 'MONTHLY'
  const [budget, setBudget] = useState('₹500 - 800');
  const [priority, setPriority] = useState('Normal');
  const [submitted, setSubmitted] = useState(false);

  // Handle duration preset click
  const handleDurationPreset = (preset) => {
    setDurationPreset(preset);
    if (preset !== 'CUSTOM') {
      setEndDate(calculateEndDate(startDate, preset));
    }
  };

  // AI Matchmaking & Dispatch Modal State
  const [showDispatchModal, setShowDispatchModal] = useState(false);
  const [dispatchStep, setDispatchStep] = useState(1);
  const [dispatchedJob, setDispatchedJob] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isRecurring = jobType === 'RECURRING';
    const payload = {
      category,
      subcategory,
      description,
      address,
      city,
      preferred_date: isRecurring ? startDate : preferredDate,
      preferred_time: preferredTime,
      budget,
      budget_min: isRecurring ? 4500 : 500,
      budget_max: isRecurring ? 7500 : 800,
      priority: priority.toUpperCase(),
      job_type: jobType,
      recurrence_pattern: isRecurring ? recurrencePattern : 'NONE',
      end_date: isRecurring ? endDate : null,
      billing_cycle: isRecurring ? billingCycle : 'PER_VISIT'
    };

    // Call backend API if active
    postNewJob(payload).catch(err => console.warn("Backend API sync:", err));

    const job = dispatchJob(payload);
    setDispatchedJob(job);
    setShowDispatchModal(true);
    setDispatchStep(1);

    // Simulate real-time matchmaking steps
    setTimeout(() => setDispatchStep(2), 700);
    setTimeout(() => setDispatchStep(3), 1400);
    setTimeout(() => setDispatchStep(4), 2100);
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
                      City / Region *
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', backgroundColor: '#fff', cursor: 'pointer' }}
                    >
                      <option value="Rajahmundry">Rajahmundry (Primary Hub)</option>
                      {ANDHRA_PRADESH_CITIES.filter(c => c.name !== 'Rajahmundry').map(c => (
                        <option key={c.id} value={c.name}>{c.name} ({c.district})</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '6px' }}>
                      Locality in Rajahmundry *
                    </label>
                    <select
                      value={locality}
                      onChange={(e) => {
                        const newLocName = e.target.value;
                        setLocality(newLocName);
                        const matched = RAJAHMUNDRY_LOCALITIES.find(l => l.name === newLocName);
                        if (matched) {
                          setCoords({ lat: matched.lat, lng: matched.lng });
                          setAddress(`Near ${matched.landmarks}, ${matched.name}`);
                        }
                      }}
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', backgroundColor: '#fff', cursor: 'pointer' }}
                    >
                      {RAJAHMUNDRY_LOCALITIES.map(l => (
                        <option key={l.id} value={l.name}>
                          📍 {l.name} ({l.pincode})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Real Live Map Preview of Target Service Location */}
                <div style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid #cbd5e1', marginTop: '10px' }}>
                  <div style={{ padding: '8px 12px', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', fontSize: '12px', display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                    <span><strong>Service Dispatch Pin:</strong> {locality}, {city}</span>
                    <span style={{ color: '#2563eb', fontWeight: '700' }}>GPS Live</span>
                  </div>
                  <InteractiveMap
                    height="190px"
                    center={[coords.lat, coords.lng]}
                    zoom={14}
                    showLocalityChips={false}
                    showControls={false}
                    singlePin={{
                      lat: coords.lat,
                      lng: coords.lng,
                      title: `${locality} Service Location`,
                      subtitle: `${address}, ${city}`
                    }}
                  />
                </div>
              </div>

              {/* Step 3: Schedule & Budget */}
              <div className="card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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

                  <span style={{ fontSize: '12px', color: '#64748b' }}>
                    Step 3 of 4
                  </span>
                </div>

                {/* SCHEDULE TYPE SELECTOR CARDS */}
                <div style={{ marginBottom: '22px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '8px' }}>
                    Select Service Schedule Type *
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    {/* Option 1: One-Time */}
                    <div
                      onClick={() => {
                        setJobType('ONE_TIME');
                        setBudget('₹500 - 800');
                      }}
                      style={{
                        padding: '16px',
                        borderRadius: '12px',
                        border: jobType === 'ONE_TIME' ? '2px solid #2563eb' : '1px solid #cbd5e1',
                        backgroundColor: jobType === 'ONE_TIME' ? '#eff6ff' : '#ffffff',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        boxShadow: jobType === 'ONE_TIME' ? '0 4px 6px -1px rgba(37, 99, 235, 0.15)' : 'none'
                      }}
                    >
                      <input
                        type="radio"
                        name="jobTypeRadio"
                        checked={jobType === 'ONE_TIME'}
                        onChange={() => {
                          setJobType('ONE_TIME');
                          setBudget('₹500 - 800');
                        }}
                        style={{ marginTop: '3px', cursor: 'pointer' }}
                      />
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          ⚡ One-Time Task
                        </div>
                        <p style={{ fontSize: '12px', color: '#64748b', margin: '4px 0 0 0', lineHeight: 1.4 }}>
                          Single visit for emergency repair, fixture replacement, or one-off task.
                        </p>
                      </div>
                    </div>

                    {/* Option 2: Recurring Subscription */}
                    <div
                      onClick={() => {
                        setJobType('RECURRING');
                        setBudget('₹6,000 / month (₹200/day)');
                      }}
                      style={{
                        padding: '16px',
                        borderRadius: '12px',
                        border: jobType === 'RECURRING' ? '2px solid #2563eb' : '1px solid #cbd5e1',
                        backgroundColor: jobType === 'RECURRING' ? '#eff6ff' : '#ffffff',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: jobType === 'RECURRING' ? '0 4px 6px -1px rgba(37, 99, 235, 0.15)' : 'none'
                      }}
                    >
                      <span style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        backgroundColor: '#10b981',
                        color: '#fff',
                        fontSize: '10px',
                        fontWeight: '800',
                        padding: '2px 8px',
                        borderBottomLeftRadius: '8px'
                      }}>
                        NEW • DAILY PLAN
                      </span>
                      <input
                        type="radio"
                        name="jobTypeRadio"
                        checked={jobType === 'RECURRING'}
                        onChange={() => {
                          setJobType('RECURRING');
                          setBudget('₹6,000 / month (₹200/day)');
                        }}
                        style={{ marginTop: '3px', cursor: 'pointer' }}
                      />
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Repeat size={15} color="#2563eb" /> Daily / Recurring Subscription
                        </div>
                        <p style={{ fontSize: '12px', color: '#64748b', margin: '4px 0 0 0', lineHeight: 1.4 }}>
                          Routine daily visits (maid work, water motor checks, maintenance). <strong>No daily re-posting needed!</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CONDITIONAL SCHEDULE FIELDS */}
                {jobType === 'ONE_TIME' ? (
                  /* Standard One-Time Form */
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
                ) : (
                  /* Recurring Subscription Form */
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {/* Advantage Banner */}
                    <div style={{
                      backgroundColor: '#eff6ff',
                      border: '1px solid #bfdbfe',
                      borderRadius: '10px',
                      padding: '12px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontSize: '13px',
                      color: '#1e40af'
                    }}>
                      <CalendarRange size={20} color="#2563eb" />
                      <span>
                        <strong>Subscription Mode Active:</strong> You post once, and your matched worker is automatically booked every scheduled day. You can cancel or pause visits at any time.
                      </span>
                    </div>

                    {/* Row 1: Recurrence Frequency & Daily Time */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '16px' }}>
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '6px' }}>
                          Recurrence Frequency *
                        </label>
                        <select
                          value={recurrencePattern}
                          onChange={(e) => setRecurrencePattern(e.target.value)}
                          style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', backgroundColor: '#fff' }}
                        >
                          <option value="DAILY">📅 Every Day (7 Days / Week) — Daily Service</option>
                          <option value="WEEKDAYS">💼 Weekdays Only (Mon to Fri)</option>
                          <option value="ALTERNATE_DAYS">🔄 Alternate Days (Mon, Wed, Fri)</option>
                          <option value="WEEKLY">🗓️ Weekly (1 Day / Week)</option>
                          <option value="MONTHLY">📋 Full Month Routine Contract</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '6px' }}>
                          Preferred Daily Slot *
                        </label>
                        <select
                          value={preferredTime}
                          onChange={(e) => setPreferredTime(e.target.value)}
                          style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', backgroundColor: '#fff' }}
                        >
                          <option>06:30 AM - 08:00 AM (Early Morning Routine)</option>
                          <option>07:30 AM - 09:00 AM (Morning Chores)</option>
                          <option>09:30 AM - 11:30 AM (Mid Morning)</option>
                          <option>02:00 PM - 04:00 PM (Afternoon)</option>
                          <option>05:00 PM - 07:00 PM (Evening Routine)</option>
                        </select>
                      </div>
                    </div>

                    {/* Row 2: Duration Presets & Date Range */}
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569' }}>
                          Subscription Term / Duration *
                        </label>
                        <span style={{ fontSize: '11px', color: '#2563eb', fontWeight: '700' }}>
                          Valid until {endDate}
                        </span>
                      </div>

                      {/* Quick Presets */}
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                        {[
                          { id: '1_WEEK', label: '1 Week (7 Days)' },
                          { id: '1_MONTH', label: '1 Month (30 Days) ★' },
                          { id: '3_MONTHS', label: '3 Months (Quarterly)' },
                          { id: 'CUSTOM', label: 'Custom Date' }
                        ].map((preset) => (
                          <button
                            key={preset.id}
                            type="button"
                            onClick={() => handleDurationPreset(preset.id)}
                            style={{
                              padding: '6px 12px',
                              borderRadius: '6px',
                              border: durationPreset === preset.id ? '2px solid #2563eb' : '1px solid #cbd5e1',
                              backgroundColor: durationPreset === preset.id ? '#eff6ff' : '#ffffff',
                              color: durationPreset === preset.id ? '#1e40af' : '#475569',
                              fontSize: '12px',
                              fontWeight: '700',
                              cursor: 'pointer'
                            }}
                          >
                            {preset.label}
                          </button>
                        ))}
                      </div>

                      {/* Start Date & End Date Inputs */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div>
                          <label style={{ fontSize: '11px', color: '#64748b', display: 'block', marginBottom: '4px' }}>
                            Start Date
                          </label>
                          <input
                            type="date"
                            value={startDate}
                            onChange={(e) => {
                              const newStart = e.target.value;
                              setStartDate(newStart);
                              if (durationPreset !== 'CUSTOM') {
                                setEndDate(calculateEndDate(newStart, durationPreset));
                              }
                            }}
                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px' }}
                          />
                        </div>

                        <div>
                          <label style={{ fontSize: '11px', color: '#64748b', display: 'block', marginBottom: '4px' }}>
                            End Date
                          </label>
                          <input
                            type="date"
                            value={endDate}
                            onChange={(e) => {
                              setEndDate(e.target.value);
                              setDurationPreset('CUSTOM');
                            }}
                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px' }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 3: Billing Cycle & Subscription Budget */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '16px' }}>
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '6px' }}>
                          Billing & Settlement Cycle *
                        </label>
                        <select
                          value={billingCycle}
                          onChange={(e) => {
                            const newCycle = e.target.value;
                            setBillingCycle(newCycle);
                            if (newCycle === 'PER_VISIT') setBudget('₹250 / visit (Daily OTP)');
                            else if (newCycle === 'WEEKLY') setBudget('₹1,500 / week');
                            else setBudget('₹6,000 / month (₹200/day)');
                          }}
                          style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', backgroundColor: '#fff' }}
                        >
                          <option value="MONTHLY">💳 Monthly Consolidated (Save 15% - Best Value)</option>
                          <option value="WEEKLY">🗓️ Weekly Settlement (Every Sunday)</option>
                          <option value="PER_VISIT">💵 Pay Daily / Per Visit (Upon OTP verification)</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '6px' }}>
                          Proposed Subscription Budget *
                        </label>
                        <select
                          value={budget}
                          onChange={(e) => setBudget(e.target.value)}
                          style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', backgroundColor: '#fff' }}
                        >
                          {billingCycle === 'MONTHLY' ? (
                            <>
                              <option>₹4,500 / month (₹150/day)</option>
                              <option>₹6,000 / month (₹200/day)</option>
                              <option>₹7,500 / month (₹250/day)</option>
                              <option>₹10,000 / month (Custom)</option>
                            </>
                          ) : billingCycle === 'WEEKLY' ? (
                            <>
                              <option>₹1,200 / week</option>
                              <option>₹1,500 / week</option>
                              <option>₹2,000 / week</option>
                            </>
                          ) : (
                            <>
                              <option>₹200 / visit (Daily OTP)</option>
                              <option>₹250 / visit (Daily OTP)</option>
                              <option>₹350 / visit (Daily OTP)</option>
                              <option>₹500 / visit (Daily OTP)</option>
                            </>
                          )}
                        </select>
                      </div>
                    </div>
                  </div>
                )}
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
                {jobType === 'RECURRING' ? '🔄 Post Recurring Subscription' : '🚀 Post Job'}
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
                    <span style={{ color: '#64748b' }}>Plan Type</span>
                    <strong style={{ color: jobType === 'RECURRING' ? '#2563eb' : '#0f172a' }}>
                      {jobType === 'RECURRING' ? '🔄 Recurring Plan' : '⚡ One-Time Task'}
                    </strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Service</span>
                    <strong style={{ color: '#0f172a' }}>{category} - {subcategory}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Location</span>
                    <strong style={{ color: '#0f172a' }}>{city}</strong>
                  </div>
                  {jobType === 'RECURRING' ? (
                    <>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#64748b' }}>Frequency</span>
                        <strong style={{ color: '#0f172a' }}>{recurrencePattern}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#64748b' }}>Duration</span>
                        <strong style={{ color: '#0f172a' }}>{startDate} to {endDate}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#64748b' }}>Billing</span>
                        <span className="badge badge-verified">{billingCycle}</span>
                      </div>
                    </>
                  ) : (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#64748b' }}>Date</span>
                      <strong style={{ color: '#0f172a' }}>{preferredDate}</strong>
                    </div>
                  )}
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

      {/* ============================================================== */}
      {/* AI MATCHMAKING & DISPATCH MODAL */}
      {/* ============================================================== */}
      {showDispatchModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.7)',
          backdropFilter: 'blur(5px)',
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
            maxWidth: '520px',
            padding: '28px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid #e2e8f0',
            textAlign: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
              <Sparkles size={24} color="#2563eb" />
              <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                AI Matchmaking & Dispatch
              </h3>
            </div>

            {/* Live Progress Steps */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              textAlign: 'left',
              marginBottom: '24px',
              backgroundColor: '#f8fafc',
              padding: '18px',
              borderRadius: '12px',
              border: '1px solid #e2e8f0'
            }}>
              {/* Step 1 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
                <span style={{
                  width: '24px', height: '24px', borderRadius: '50%',
                  backgroundColor: dispatchStep >= 1 ? '#2563eb' : '#cbd5e1',
                  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '11px', fontWeight: 'bold'
                }}>
                  {dispatchStep > 1 ? '✓' : '1'}
                </span>
                <span style={{ color: dispatchStep >= 1 ? '#0f172a' : '#94a3b8', fontWeight: dispatchStep === 1 ? '700' : '500' }}>
                  Scanning verified {category}s across Rajahmundry...
                </span>
              </div>

              {/* Step 2 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
                <span style={{
                  width: '24px', height: '24px', borderRadius: '50%',
                  backgroundColor: dispatchStep >= 2 ? '#2563eb' : '#cbd5e1',
                  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '11px', fontWeight: 'bold'
                }}>
                  {dispatchStep > 2 ? '✓' : '2'}
                </span>
                <span style={{ color: dispatchStep >= 2 ? '#0f172a' : '#94a3b8', fontWeight: dispatchStep === 2 ? '700' : '500' }}>
                  Applying Haversine 10 km radius filter & Elo ranking...
                </span>
              </div>

              {/* Step 3 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
                <span style={{
                  width: '24px', height: '24px', borderRadius: '50%',
                  backgroundColor: dispatchStep >= 3 ? '#2563eb' : '#cbd5e1',
                  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '11px', fontWeight: 'bold'
                }}>
                  {dispatchStep > 3 ? '✓' : '3'}
                </span>
                <span style={{ color: dispatchStep >= 3 ? '#0f172a' : '#94a3b8', fontWeight: dispatchStep === 3 ? '700' : '500' }}>
                  Optimal worker candidate matched in {city}!
                </span>
              </div>

              {/* Step 4 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
                <span style={{
                  width: '24px', height: '24px', borderRadius: '50%',
                  backgroundColor: dispatchStep >= 4 ? '#10b981' : '#cbd5e1',
                  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '11px', fontWeight: 'bold'
                }}>
                  {dispatchStep >= 4 ? '✓' : '4'}
                </span>
                <span style={{ color: dispatchStep >= 4 ? '#059669' : '#94a3b8', fontWeight: dispatchStep === 4 ? '700' : '500' }}>
                  {dispatchStep >= 4 ? 'Dispatched! Live job alert sent to worker device.' : 'Dispatching job to worker portal...'}
                </span>
              </div>
            </div>

            {/* If Dispatch Complete (Step 4) */}
            {dispatchStep >= 4 && dispatchedJob && (
              <>
                <div style={{
                  backgroundColor: '#eff6ff',
                  border: '1px solid #bfdbfe',
                  borderRadius: '12px',
                  padding: '16px',
                  marginBottom: '20px',
                  textAlign: 'left'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>Dispatched Job ID</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {dispatchedJob.job_type === 'RECURRING' && (
                        <span style={{
                          backgroundColor: '#ecfdf5',
                          color: '#059669',
                          fontSize: '11px',
                          fontWeight: '800',
                          padding: '2px 8px',
                          borderRadius: '4px'
                        }}>
                          🔄 {dispatchedJob.recurrence_pattern} SUBSCRIPTION
                        </span>
                      )}
                      <strong style={{ fontSize: '13px', color: '#1e40af' }}>#{dispatchedJob.id}</strong>
                    </div>
                  </div>
                  <div style={{ fontSize: '13px', color: '#1e293b', marginBottom: '4px' }}>
                    <strong>{dispatchedJob.service}</strong> ({category})
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>
                    📍 {dispatchedJob.location} • {dispatchedJob.time}
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    backgroundColor: '#fff',
                    borderRadius: '6px',
                    fontSize: '12px'
                  }}>
                    <span>Budget: <strong style={{ color: '#2563eb' }}>{dispatchedJob.budget}</strong></span>
                    <span className="badge badge-verified">Priority: {priority}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <button
                    onClick={() => navigate('/worker-dashboard')}
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '12px', fontSize: '14px', justifyContent: 'center' }}
                  >
                    <Zap size={18} /> View in Worker Portal (See Live Alert)
                  </button>
                  <button
                    onClick={() => navigate('/workers')}
                    className="btn btn-outline"
                    style={{ width: '100%', padding: '10px', fontSize: '13px', justifyContent: 'center' }}
                  >
                    Browse All Workers
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

