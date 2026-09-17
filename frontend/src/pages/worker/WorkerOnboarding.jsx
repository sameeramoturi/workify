import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { RAJAHMUNDRY_LOCALITIES } from '../../data/locations';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  User,
  Wrench,
  FileText,
  MapPin,
  UploadCloud,
  Check,
  Sparkles,
  Phone,
  CreditCard,
  Calendar,
  Clock,
  HelpCircle,
  Award,
  AlertTriangle,
  Lock
} from 'lucide-react';

const TRADE_PRESETS = [
  { id: 'Plumber', name: 'Plumber', icon: '🚰', desc: 'Pipes, leakage, bathroom fixtures & concealed lines', avgRate: 450 },
  { id: 'Electrician', name: 'Electrician', icon: '⚡', desc: 'Wiring, MCBs, fans, inverters & earthing', avgRate: 400 },
  { id: 'Carpenter', name: 'Carpenter', icon: '🪚', desc: 'Furniture, doors, modular kitchen & wood repair', avgRate: 500 },
  { id: 'AC Repair', name: 'AC Technician', icon: '❄️', desc: 'AC servicing, gas charging & compressor fix', avgRate: 550 },
  { id: 'Painter', name: 'Painter', icon: '🎨', desc: 'Interior, exterior, texture & damp proofing', avgRate: 350 },
  { id: 'Cleaner', name: 'Deep Cleaner', icon: '🧹', desc: 'Full home cleaning, sanitization & floor scrubbing', avgRate: 350 }
];

const SKILL_TAGS_MAP = {
  'Plumber': ['Concealed Pipe Fitting', 'Leak Detection', 'Bathroom Sanitary Fix', 'Water Tank Cleaning', 'Water Motor Repair'],
  'Electrician': ['Solar Inverter Setup', 'MCB Tripping Diagnosis', 'House Rewiring', 'Ceiling Fan Installation', 'Earthing Line'],
  'Carpenter': ['Modular Kitchen Woodwork', 'Door Lock & Hinges', 'Wardrobe Customization', 'Bed Repair', 'Wood Polishing'],
  'AC Repair': ['Split AC Installation', 'Gas Refilling & Leak Fix', 'Deep Jet Pump Servicing', 'Inverter PCB Board Repair'],
  'Painter': ['Royal Luxury Emulsion', 'Waterproofing & Wall Putty', 'Exterior Weather Coating', 'Wood & Metal Enamel'],
  'Cleaner': ['Deep Bathroom Scrubbing', 'Kitchen Chimney De-greasing', 'Sofa & Mattress Shampoo', 'Marble Floor Polishing']
};

const SAMPLE_AVATARS = [
  'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=160',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160'
];

export default function WorkerOnboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    teluguName: '',
    phone: '',
    otpVerified: false,
    otpInput: '',
    locality: 'Danavaipeta',
    streetAddress: '',
    avatar: SAMPLE_AVATARS[0],
    category: 'Plumber',
    experienceYears: 5,
    hourlyRate: 450,
    emergencyService: true,
    selectedSkills: ['Concealed Pipe Fitting', 'Leak Detection'],
    aadhaarNo: 'XXXX-XXXX-4829',
    rawAadhaar: '548291048291',
    hasAadhaarPhoto: true,
    hasCertificatePhoto: true,
    certificateType: 'Govt ITI Rajahmundry Trade Certificate',
    certificateNo: 'ITI-RJY-2018-842',
    policeClearanceAccepted: true,
    serviceRadius: 10,
    payoutMode: 'bank',
    bankAccount: '984810294821',
    ifscCode: 'SBIN0000904',
    bankName: 'State Bank of India, Main Branch Rajahmundry',
    upiId: 'worker@sbi',
    workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    workHours: '8:00 AM - 7:00 PM'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedApplication, setSubmittedApplication] = useState(null);
  const [stepError, setStepError] = useState('');

  // Handle skill toggle
  const toggleSkill = (skill) => {
    setFormData(prev => {
      const exists = prev.selectedSkills.includes(skill);
      if (exists) {
        return { ...prev, selectedSkills: prev.selectedSkills.filter(s => s !== skill) };
      } else {
        return { ...prev, selectedSkills: [...prev.selectedSkills, skill] };
      }
    });
  };

  // Step validation
  const validateAndNext = () => {
    setStepError('');
    if (currentStep === 1) {
      if (!formData.name.trim()) {
        setStepError('Please enter your full name.');
        return;
      }
      if (!formData.phone || formData.phone.length < 10) {
        setStepError('Please enter a valid 10-digit mobile number.');
        return;
      }
    } else if (currentStep === 2) {
      if (formData.selectedSkills.length === 0) {
        setStepError('Please select at least one specialized skill.');
        return;
      }
      if (!formData.hourlyRate || formData.hourlyRate < 200) {
        setStepError('Please enter a reasonable hourly rate (minimum ₹200/hr).');
        return;
      }
    } else if (currentStep === 3) {
      if (!formData.rawAadhaar || formData.rawAadhaar.length < 12) {
        setStepError('Please enter your 12-digit Aadhaar card number.');
        return;
      }
      if (!formData.policeClearanceAccepted) {
        setStepError('Please confirm the safety and criminal record declaration.');
        return;
      }
    }
    setCurrentStep(prev => prev + 1);
  };

  // Submit Application
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const refId = `APP-RJY-${Math.floor(1000 + Math.random() * 9000)}`;
    const maskedAadhaar = `XXXX-XXXX-${formData.rawAadhaar.slice(-4)}`;

    const newWorkerApplication = {
      id: Date.now(),
      refId: refId,
      name: formData.name,
      teluguName: formData.teluguName || formData.name,
      category: formData.category,
      city: 'Rajahmundry',
      locality: formData.locality,
      phone: `+91 ${formData.phone}`,
      docType: `${formData.certificateType}`,
      aadhaarNo: maskedAadhaar,
      certificateNo: formData.certificateNo,
      submittedAt: 'Just Now',
      status: 'PENDING',
      experience: `${formData.experienceYears} years`,
      hourlyRate: formData.hourlyRate,
      avatar: formData.avatar,
      selectedSkills: formData.selectedSkills,
      serviceRadius: formData.serviceRadius
    };

    setTimeout(() => {
      try {
        const existing = JSON.parse(localStorage.getItem('workify_pending_workers') || '[]');
        localStorage.setItem('workify_pending_workers', JSON.stringify([newWorkerApplication, ...existing]));
      } catch (err) {
        console.error('Error saving worker application:', err);
      }

      setIsSubmitting(false);
      setSubmittedApplication(newWorkerApplication);
    }, 900);
  };

  const stepsList = [
    { num: 1, title: 'Personal', icon: User },
    { num: 2, title: 'Trade & Rates', icon: Wrench },
    { num: 3, title: 'Govt KYC', icon: FileText },
    { num: 4, title: 'Radius & Payout', icon: MapPin },
    { num: 5, title: 'Review & Submit', icon: CheckCircle2 }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
      <Navbar showSearch={false} />

      <main style={{ flex: 1, padding: '32px 20px', maxWidth: '980px', margin: '0 auto', width: '100%' }}>
        {/* Top Header Banner */}
        <div style={{
          backgroundColor: '#0f172a',
          color: '#ffffff',
          borderRadius: '16px',
          padding: '28px 32px',
          marginBottom: '28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 10px 25px rgba(15,23,42,0.1)'
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(59,130,246,0.2)',
              color: '#93c5fd',
              fontSize: '12px',
              fontWeight: '700',
              padding: '4px 12px',
              borderRadius: '9999px',
              marginBottom: '10px'
            }}>
              <Sparkles size={14} />
              <span>Workify Rajahmundry • Worker Onboarding Portal</span>
            </div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 6px 0' }}>
              Join as a Verified Skilled Worker (కార్మికునిగా చేరండి)
            </h1>
            <p style={{ margin: 0, fontSize: '14px', color: '#94a3b8' }}>
              Earn ₹25,000 to ₹60,000/month with direct customer requests, weekly bank payouts & zero platform commission for 30 days!
            </p>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '6px'
          }}>
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>Already Registered?</span>
            <Link
              to="/worker-dashboard"
              style={{
                backgroundColor: '#2563eb',
                color: '#ffffff',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '700',
                textDecoration: 'none'
              }}
            >
              Open Worker Dashboard →
            </Link>
          </div>
        </div>

        {/* Progress Stepper Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '16px 24px',
          border: '1px solid #e2e8f0',
          marginBottom: '24px'
        }}>
          {stepsList.map((st, idx) => {
            const Icon = st.icon;
            const isDone = currentStep > st.num;
            const isActive = currentStep === st.num;
            return (
              <React.Fragment key={st.num}>
                <div
                  onClick={() => { if (st.num < currentStep) setCurrentStep(st.num); }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    cursor: st.num < currentStep ? 'pointer' : 'default',
                    opacity: isActive || isDone ? 1 : 0.5
                  }}
                >
                  <div style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    backgroundColor: isDone ? '#16a34a' : isActive ? '#2563eb' : '#e2e8f0',
                    color: isDone || isActive ? '#ffffff' : '#64748b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700',
                    fontSize: '13px'
                  }}>
                    {isDone ? <Check size={16} /> : st.num}
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '600' }}>STEP {st.num}</div>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: isActive ? '#2563eb' : '#1e293b' }}>
                      {st.title}
                    </div>
                  </div>
                </div>
                {idx < stepsList.length - 1 && (
                  <div style={{
                    flex: 1,
                    height: '2px',
                    backgroundColor: currentStep > idx + 1 ? '#16a34a' : '#e2e8f0',
                    margin: '0 12px'
                  }} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Step Error Notification */}
        {stepError && (
          <div style={{
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#b91c1c',
            padding: '12px 16px',
            borderRadius: '10px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '14px',
            fontWeight: '600'
          }}>
            <AlertTriangle size={18} />
            <span>{stepError}</span>
          </div>
        )}

        {/* Wizard Form Card */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '32px',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)'
        }}>
          {/* STEP 1: Personal & Contact */}
          {currentStep === 1 && (
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', marginBottom: '4px' }}>
                Step 1: Personal Details & Contact (వ్యక్తిగత వివరాలు)
              </h2>
              <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '24px' }}>
                Enter your official name and contact info as it appears on your government identification.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                    Full Legal Name (పూర్తి పేరు) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Srinivas Rao Moturi"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                    Telugu Display Name (తెలుగులో పేరు - Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="ఉదా: శ్రీనివాస రావు"
                    value={formData.teluguName}
                    onChange={(e) => setFormData({ ...formData, teluguName: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* Mobile Phone + OTP Simulation */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                  Mobile Phone Number (ఫోన్ నంబర్) *
                </label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    flex: 1
                  }}>
                    <span style={{ padding: '0 12px', backgroundColor: '#f1f5f9', color: '#475569', fontWeight: '700', fontSize: '13px' }}>
                      +91
                    </span>
                    <input
                      type="tel"
                      maxLength="10"
                      placeholder="98480 98765"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                      style={{
                        flex: 1,
                        padding: '11px 14px',
                        border: 'none',
                        outline: 'none',
                        fontSize: '14px',
                        fontWeight: '600'
                      }}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (formData.phone.length >= 10) {
                        setFormData({ ...formData, otpVerified: true });
                      } else {
                        setStepError('Enter 10 digits before verifying.');
                      }
                    }}
                    style={{
                      padding: '0 20px',
                      backgroundColor: formData.otpVerified ? '#16a34a' : '#2563eb',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: '700',
                      fontSize: '13px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    {formData.otpVerified ? (
                      <>
                        <Check size={16} />
                        <span>OTP Verified ✓</span>
                      </>
                    ) : (
                      <span>Verify Mobile</span>
                    )}
                  </button>
                </div>
              </div>

              {/* Locality & Address */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                    Home Locality in Rajahmundry (నివాస ప్రాంతం) *
                  </label>
                  <select
                    value={formData.locality}
                    onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      backgroundColor: '#ffffff'
                    }}
                  >
                    {RAJAHMUNDRY_LOCALITIES.map(loc => (
                      <option key={loc.id} value={loc.name}>
                        {loc.name} ({loc.pincode}) — {loc.type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                    Door No / Street Landmark (చిరునామా)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. D.No 4-21, Near Subrahmanya Grounds"
                    value={formData.streetAddress}
                    onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* Avatar Selector */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '8px' }}>
                  Select Profile Avatar (ప్రొఫైల్ ఫోటో)
                </label>
                <div style={{ display: 'flex', gap: '16px' }}>
                  {SAMPLE_AVATARS.map((url, idx) => (
                    <div
                      key={idx}
                      onClick={() => setFormData({ ...formData, avatar: url })}
                      style={{
                        position: 'relative',
                        cursor: 'pointer',
                        borderRadius: '50%',
                        padding: '3px',
                        border: formData.avatar === url ? '3px solid #2563eb' : '2px solid #e2e8f0',
                        boxShadow: formData.avatar === url ? '0 0 0 2px rgba(37,99,235,0.2)' : 'none'
                      }}
                    >
                      <img
                        src={url}
                        alt="Avatar Option"
                        style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      {formData.avatar === url && (
                        <div style={{
                          position: 'absolute',
                          bottom: 0,
                          right: 0,
                          backgroundColor: '#2563eb',
                          color: '#fff',
                          borderRadius: '50%',
                          width: '18px',
                          height: '18px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '10px'
                        }}>
                          ✓
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Trade Skills & Rates */}
          {currentStep === 2 && (
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', marginBottom: '4px' }}>
                Step 2: Trade Specialization & Pricing (నైపుణ్యం & గంట చార్జ్)
              </h2>
              <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '24px' }}>
                Select your primary trade and check the specific services you can independently deliver.
              </p>

              {/* Trade Selection Cards */}
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '10px' }}>
                Choose Primary Trade (ప్రధాన వృత్తి) *
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '24px' }}>
                {TRADE_PRESETS.map((t) => {
                  const isSelected = formData.category === t.id;
                  return (
                    <div
                      key={t.id}
                      onClick={() => {
                        setFormData({
                          ...formData,
                          category: t.id,
                          hourlyRate: t.avgRate,
                          selectedSkills: SKILL_TAGS_MAP[t.id] ? [SKILL_TAGS_MAP[t.id][0], SKILL_TAGS_MAP[t.id][1]] : []
                        });
                      }}
                      style={{
                        padding: '16px',
                        borderRadius: '12px',
                        border: isSelected ? '2px solid #2563eb' : '1px solid #e2e8f0',
                        backgroundColor: isSelected ? '#eff6ff' : '#ffffff',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ fontSize: '26px', marginBottom: '6px' }}>{t.icon}</div>
                      <div style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>{t.name}</div>
                      <p style={{ fontSize: '11px', color: '#64748b', margin: '4px 0 8px 0', lineHeight: 1.4 }}>{t.desc}</p>
                      <div style={{ fontSize: '12px', fontWeight: '700', color: '#2563eb' }}>
                        Avg in RJY: ₹{t.avgRate}/hr
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Sub-Skills Checkboxes */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '8px' }}>
                  Specialized Skills in {formData.category} (ఎంచుకున్న నైపుణ్యాలు) *
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {(SKILL_TAGS_MAP[formData.category] || []).map((skill) => {
                    const active = formData.selectedSkills.includes(skill);
                    return (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => toggleSkill(skill)}
                        style={{
                          padding: '8px 14px',
                          borderRadius: '9999px',
                          border: active ? '1px solid #2563eb' : '1px solid #cbd5e1',
                          backgroundColor: active ? '#2563eb' : '#f8fafc',
                          color: active ? '#ffffff' : '#334155',
                          fontSize: '13px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        {active && <Check size={14} />}
                        <span>{skill}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Experience & Hourly Rate */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                    Years of Field Experience (అనుభవం) *
                  </label>
                  <select
                    value={formData.experienceYears}
                    onChange={(e) => setFormData({ ...formData, experienceYears: Number(e.target.value) })}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      backgroundColor: '#ffffff'
                    }}
                  >
                    <option value={2}>2 Years</option>
                    <option value={4}>4 Years</option>
                    <option value={6}>6 Years</option>
                    <option value={8}>8 Years</option>
                    <option value={10}>10+ Years (Senior Master)</option>
                    <option value={15}>15+ Years (Expert Veteran)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                    Hourly Rate (గంట రేటు - ₹) *
                  </label>
                  <input
                    type="number"
                    min="200"
                    max="1500"
                    step="50"
                    value={formData.hourlyRate}
                    onChange={(e) => setFormData({ ...formData, hourlyRate: Number(e.target.value) })}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      outline: 'none',
                      fontWeight: '700'
                    }}
                  />
                  <span style={{ fontSize: '11px', color: '#64748b', display: 'block', marginTop: '4px' }}>
                    💡 Platform standard visiting & safety fee: ₹49 added transparently to customers.
                  </span>
                </div>
              </div>

              {/* Night & Emergency Service Toggle */}
              <div style={{
                backgroundColor: '#fffbeb',
                border: '1px solid #fde68a',
                padding: '14px 18px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <h4 style={{ margin: '0 0 2px 0', fontSize: '14px', fontWeight: '700', color: '#92400e' }}>
                    Available for Emergency & Night Calls? (రాత్రి అత్యవసర సేవలు)
                  </h4>
                  <p style={{ margin: 0, fontSize: '12px', color: '#b45309' }}>
                    Earn +25% surge payment for emergency repairs dispatched after 8:00 PM.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.emergencyService}
                  onChange={(e) => setFormData({ ...formData, emergencyService: e.target.checked })}
                  style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: '#d97706' }}
                />
              </div>
            </div>
          )}

          {/* STEP 3: Govt KYC & Skill Certification */}
          {currentStep === 3 && (
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', marginBottom: '4px' }}>
                Step 3: Identity Verification & Certifications (ఆధార్ & ITI ధృవీకరణ)
              </h2>
              <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '24px' }}>
                Workify ensures 100% safety for Rajahmundry families. All documents are securely stored in encrypted AWS S3 storage.
              </p>

              {/* Aadhaar Input */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                  Government Aadhaar Card Number (12 అంకెల ఆధార్ నంబర్) *
                </label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input
                    type="text"
                    maxLength="12"
                    placeholder="548291048291"
                    value={formData.rawAadhaar}
                    onChange={(e) => setFormData({ ...formData, rawAadhaar: e.target.value.replace(/\D/g, '') })}
                    style={{
                      flex: 1,
                      padding: '11px 14px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '15px',
                      fontWeight: '700',
                      letterSpacing: '2px'
                    }}
                  />
                  <div style={{
                    padding: '0 16px',
                    backgroundColor: '#eff6ff',
                    border: '1px solid #bfdbfe',
                    borderRadius: '8px',
                    color: '#1d4ed8',
                    fontSize: '13px',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <Lock size={14} />
                    <span>UIDAI Compliant</span>
                  </div>
                </div>
              </div>

              {/* Document Previews / Upload Simulation */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                {/* Aadhaar Upload Box */}
                <div style={{
                  border: '2px dashed #cbd5e1',
                  borderRadius: '12px',
                  padding: '20px',
                  textAlign: 'center',
                  backgroundColor: '#f8fafc'
                }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: '#dcfce7',
                    color: '#16a34a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 10px auto'
                  }}>
                    <ShieldCheck size={22} />
                  </div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>
                    Aadhaar Card (Front & Back)
                  </h4>
                  <span style={{
                    display: 'inline-block',
                    backgroundColor: '#dcfce7',
                    color: '#15803d',
                    fontSize: '11px',
                    fontWeight: '700',
                    padding: '3px 8px',
                    borderRadius: '9999px',
                    marginBottom: '8px'
                  }}>
                    ● Scanned & Verified
                  </span>
                  <p style={{ margin: 0, fontSize: '11px', color: '#64748b' }}>
                    Masked: XXXX-XXXX-{formData.rawAadhaar.slice(-4)}
                  </p>
                </div>

                {/* ITI Certificate Box */}
                <div style={{
                  border: '2px dashed #cbd5e1',
                  borderRadius: '12px',
                  padding: '20px',
                  textAlign: 'center',
                  backgroundColor: '#f8fafc'
                }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: '#e0e7ff',
                    color: '#2563eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 10px auto'
                  }}>
                    <Award size={22} />
                  </div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>
                    ITI / Trade License
                  </h4>
                  <span style={{
                    display: 'inline-block',
                    backgroundColor: '#e0e7ff',
                    color: '#1d4ed8',
                    fontSize: '11px',
                    fontWeight: '700',
                    padding: '3px 8px',
                    borderRadius: '9999px',
                    marginBottom: '8px'
                  }}>
                    ● ITI Rajahmundry Attached
                  </span>
                  <p style={{ margin: 0, fontSize: '11px', color: '#64748b' }}>
                    Ref: {formData.certificateNo}
                  </p>
                </div>
              </div>

              {/* Certificate Type & No */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                    Certification Issuing Institute (ధృవీకరణ సంస్థ)
                  </label>
                  <select
                    value={formData.certificateType}
                    onChange={(e) => setFormData({ ...formData, certificateType: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      backgroundColor: '#ffffff'
                    }}
                  >
                    <option value="Govt ITI Rajahmundry Trade Certificate">Govt ITI Rajahmundry (AP State)</option>
                    <option value="AP State Skill Development Corp (APSSDC)">AP State Skill Development Corp (APSSDC)</option>
                    <option value="National Council for Vocational Training (NCVT)">National Council for Vocational Training (NCVT)</option>
                    <option value="Apprenticeship Certificate (Local Contractor)">Apprenticeship Certificate (Senior Contractor)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                    Certificate Serial / Roll No
                  </label>
                  <input
                    type="text"
                    value={formData.certificateNo}
                    onChange={(e) => setFormData({ ...formData, certificateNo: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px'
                    }}
                  />
                </div>
              </div>

              {/* Police Clearance Declaration */}
              <div style={{
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                padding: '14px 18px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px'
              }}>
                <input
                  type="checkbox"
                  id="police_check"
                  checked={formData.policeClearanceAccepted}
                  onChange={(e) => setFormData({ ...formData, policeClearanceAccepted: e.target.checked })}
                  style={{ width: '18px', height: '18px', marginTop: '2px', accentColor: '#2563eb', cursor: 'pointer' }}
                />
                <label htmlFor="police_check" style={{ fontSize: '13px', color: '#334155', lineHeight: 1.5, cursor: 'pointer' }}>
                  I solemnly declare that I have no criminal record, and I agree to background verification by Workify Operations in Rajahmundry, East Godavari District. (నేర చరిత్ర లేదని మరియు వర్కిఫై పరిశీలనకు అంగీకరిస్తున్నాను).
                </label>
              </div>
            </div>
          )}

          {/* STEP 4: Service Radius & Payout Setup */}
          {currentStep === 4 && (
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', marginBottom: '4px' }}>
                Step 4: Operational Radius & Payout Setup (పని పరిధి & బ్యాంక్ ఖాతా)
              </h2>
              <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '24px' }}>
                Configure your travel distance around Rajahmundry and your bank or UPI details for weekly direct earnings deposits.
              </p>

              {/* Service Radius Slider */}
              <div style={{
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '24px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div>
                    <h4 style={{ margin: '0 0 2px 0', fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>
                      Service Coverage Radius (సేవా పరిధి): <span style={{ color: '#2563eb' }}>{formData.serviceRadius} km</span>
                    </h4>
                    <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>
                      Centering from {formData.locality}, Rajahmundry
                    </p>
                  </div>
                  <span style={{
                    backgroundColor: '#dbeafe',
                    color: '#1e40af',
                    fontWeight: '800',
                    fontSize: '14px',
                    padding: '6px 14px',
                    borderRadius: '9999px'
                  }}>
                    {formData.serviceRadius} km Radius
                  </span>
                </div>

                <input
                  type="range"
                  min="3"
                  max="25"
                  step="1"
                  value={formData.serviceRadius}
                  onChange={(e) => setFormData({ ...formData, serviceRadius: Number(e.target.value) })}
                  style={{ width: '100%', accentColor: '#2563eb', cursor: 'pointer' }}
                />

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8', marginTop: '6px' }}>
                  <span>3 km (Walking / Bicycle)</span>
                  <span>10 km (Standard Motorcycle)</span>
                  <span>25 km (Greater Rajahmundry & Riverfront)</span>
                </div>
              </div>

              {/* Direct Weekly Payout Setup */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '8px' }}>
                  Weekly Earnings Payout Mode (వారపు సంపాదన చెల్లింపు విధానం) *
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, payoutMode: 'bank' })}
                    style={{
                      padding: '12px',
                      borderRadius: '8px',
                      border: formData.payoutMode === 'bank' ? '2px solid #2563eb' : '1px solid #cbd5e1',
                      backgroundColor: formData.payoutMode === 'bank' ? '#eff6ff' : '#ffffff',
                      color: formData.payoutMode === 'bank' ? '#1d4ed8' : '#334155',
                      fontWeight: '700',
                      fontSize: '13px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    <CreditCard size={16} />
                    <span>Direct Bank Transfer (SBI / HDFC)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, payoutMode: 'upi' })}
                    style={{
                      padding: '12px',
                      borderRadius: '8px',
                      border: formData.payoutMode === 'upi' ? '2px solid #2563eb' : '1px solid #cbd5e1',
                      backgroundColor: formData.payoutMode === 'upi' ? '#eff6ff' : '#ffffff',
                      color: formData.payoutMode === 'upi' ? '#1d4ed8' : '#334155',
                      fontWeight: '700',
                      fontSize: '13px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    <span>⚡ Instant UPI (PhonePe / GPay)</span>
                  </button>
                </div>

                {formData.payoutMode === 'bank' ? (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '4px' }}>
                        Account Number
                      </label>
                      <input
                        type="text"
                        value={formData.bankAccount}
                        onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          fontSize: '14px',
                          fontWeight: '600'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '4px' }}>
                        IFSC Code (SBI Rajahmundry)
                      </label>
                      <input
                        type="text"
                        value={formData.ifscCode}
                        onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          fontSize: '14px',
                          fontWeight: '600'
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '4px' }}>
                      UPI ID (Virtual Payment Address)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 9848098765@ybl"
                      value={formData.upiId}
                      onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '14px',
                        fontWeight: '600'
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 5: Review & Submit */}
          {currentStep === 5 && (
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', marginBottom: '4px' }}>
                Step 5: Review Your Application (ధరఖాస్తు సమీక్ష)
              </h2>
              <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '24px' }}>
                Please check all your details before submitting to the Rajahmundry Admin KYC queue.
              </p>

              {/* Summary Card */}
              <div style={{
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                padding: '24px',
                marginBottom: '24px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                  <img
                    src={formData.avatar}
                    alt={formData.name}
                    style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #2563eb' }}
                  />
                  <div>
                    <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>
                      {formData.name} {formData.teluguName && `(${formData.teluguName})`}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{
                        backgroundColor: '#dbeafe',
                        color: '#1e40af',
                        fontSize: '12px',
                        fontWeight: '700',
                        padding: '2px 8px',
                        borderRadius: '4px'
                      }}>
                        {formData.category}
                      </span>
                      <span style={{ fontSize: '13px', color: '#64748b' }}>
                        📍 {formData.locality}, Rajahmundry
                      </span>
                      <span style={{ fontSize: '13px', color: '#64748b' }}>
                        • {formData.experienceYears} Years Exp
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '20px' }}>
                  <div style={{ backgroundColor: '#ffffff', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '600' }}>HOURLY RATE</div>
                    <div style={{ fontSize: '16px', fontWeight: '800', color: '#16a34a' }}>₹{formData.hourlyRate} / hour</div>
                  </div>

                  <div style={{ backgroundColor: '#ffffff', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '600' }}>SERVICE RADIUS</div>
                    <div style={{ fontSize: '16px', fontWeight: '800', color: '#2563eb' }}>{formData.serviceRadius} km</div>
                  </div>

                  <div style={{ backgroundColor: '#ffffff', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '600' }}>AADHAAR VERIFICATION</div>
                    <div style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a' }}>XXXX-XXXX-{formData.rawAadhaar.slice(-4)}</div>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>
                    VERIFIED SKILL SPECIALIZATIONS:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {formData.selectedSkills.map(s => (
                      <span
                        key={s}
                        style={{
                          backgroundColor: '#eff6ff',
                          color: '#1d4ed8',
                          fontSize: '12px',
                          fontWeight: '600',
                          padding: '3px 10px',
                          borderRadius: '6px'
                        }}
                      >
                        ✓ {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <div style={{
                backgroundColor: '#eff6ff',
                border: '1px solid #bfdbfe',
                padding: '14px',
                borderRadius: '8px',
                fontSize: '12px',
                color: '#1e40af',
                lineHeight: 1.5,
                marginBottom: '20px'
              }}>
                ℹ️ Once submitted, your application will be instantly visible in the Rajahmundry Admin verification console. Typical approval turnaround is under 24 hours.
              </div>
            </div>
          )}

          {/* Bottom Action Buttons */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '24px',
            borderTop: '1px solid #e2e8f0',
            marginTop: '24px'
          }}>
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => { setStepError(''); setCurrentStep(prev => prev - 1); }}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #cbd5e1',
                  color: '#475569',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <ArrowLeft size={16} />
                <span>Previous Step</span>
              </button>
            ) : <div />}

            {currentStep < 5 ? (
              <button
                type="button"
                onClick={validateAndNext}
                style={{
                  padding: '10px 24px',
                  backgroundColor: '#2563eb',
                  border: 'none',
                  color: '#ffffff',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>Continue to Step {currentStep + 1}</span>
                <ArrowRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleSubmit}
                style={{
                  padding: '12px 28px',
                  backgroundColor: '#16a34a',
                  border: 'none',
                  color: '#ffffff',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <CheckCircle2 size={18} />
                <span>{isSubmitting ? 'Submitting Application...' : 'Submit Application & Join'}</span>
              </button>
            )}
          </div>
        </div>
      </main>

      {/* Celebratory Success Confirmation Modal */}
      {submittedApplication && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
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
            maxWidth: '520px',
            padding: '32px',
            textAlign: 'center',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
            animation: 'fadeIn 0.2s ease-out'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#dcfce7',
              color: '#16a34a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto'
            }}>
              <CheckCircle2 size={36} />
            </div>

            <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a', margin: '0 0 6px 0' }}>
              Application Submitted Successfully!
            </h2>
            <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 20px 0' }}>
              అభినందనలు! మీ దరఖాస్తు వర్కిఫై అడ్మిన్ టీమ్‌కు చేరింది.
            </p>

            {/* Reference Box */}
            <div style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '24px',
              textAlign: 'left'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Application Reference:</span>
                <span style={{ fontSize: '13px', fontWeight: '800', color: '#2563eb' }}>{submittedApplication.refId}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Worker Name:</span>
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>{submittedApplication.name}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Trade Category:</span>
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>{submittedApplication.category} ({submittedApplication.locality})</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', color: '#64748b' }}>KYC Verification Status:</span>
                <span style={{
                  fontSize: '11px',
                  fontWeight: '800',
                  backgroundColor: '#fef3c7',
                  color: '#b45309',
                  padding: '2px 8px',
                  borderRadius: '4px'
                }}>
                  ● PENDING ADMIN REVIEW
                </span>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                type="button"
                onClick={() => navigate('/admin-dashboard')}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#7c3aed',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: '700',
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <span>🛡️ Open Admin KYC Queue to Inspect & Approve</span>
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                onClick={() => navigate('/worker-dashboard')}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#2563eb',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: '700',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                Go to Worker Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
