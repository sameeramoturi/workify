import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth, PRESET_USERS } from '../../context/AuthContext';
import { RAJAHMUNDRY_LOCALITIES } from '../../data/locations';
import {
  ShieldCheck,
  Phone,
  KeyRound,
  ArrowRight,
  User,
  Wrench,
  Shield,
  CheckCircle2,
  Sparkles,
  MapPin,
  HelpCircle,
  Clock,
  Briefcase
} from 'lucide-react';

export default function Login({ initialTab = 'login' }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, loginWithRole, loginWithOtp, registerUser } = useAuth();

  const [activeTab, setActiveTab] = useState(initialTab === 'register' ? 'register' : 'otp'); // 'otp' | 'roles' | 'register'
  
  // Mobile OTP States
  const [phoneNumber, setPhoneNumber] = useState('9848023456');
  const [otpSent, setOtpSent] = useState(false);
  const [otpDigits, setOtpDigits] = useState(['7', '3', '9', '2']);
  const [countdown, setCountdown] = useState(30);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Register Form States
  const [regRole, setRegRole] = useState('customer'); // 'customer' | 'worker'
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regLocality, setRegLocality] = useState(RAJAHMUNDRY_LOCALITIES[0]?.name || 'Danavaipeta');
  const [regCategory, setRegCategory] = useState('Plumber');
  const [regRate, setRegRate] = useState(400);

  const DEMO_OTP = '7392';

  // Handle OTP Send
  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }
    setErrorMsg('');
    setOtpSent(true);
    setCountdown(30);

    // Auto countdown
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Handle OTP Verification
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const enteredOtp = otpDigits.join('');
    if (enteredOtp.length < 4) {
      setErrorMsg('Please enter the 4-digit code.');
      return;
    }
    setIsVerifying(true);
    setErrorMsg('');

    setTimeout(() => {
      setIsVerifying(false);
      loginWithOtp(`+91 ${phoneNumber}`, enteredOtp);
      navigate('/');
    }, 600);
  };

  // Quick 1-Click Role Switch & Redirect
  const handleSelectRole = (roleKey) => {
    loginWithRole(roleKey);
    if (roleKey === 'worker') {
      navigate('/worker-dashboard');
    } else if (roleKey === 'admin') {
      navigate('/admin-dashboard');
    } else {
      navigate('/');
    }
  };

  // Handle Registration
  const handleRegister = (e) => {
    e.preventDefault();
    if (!regName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!regPhone || regPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    registerUser({
      name: regName.trim(),
      phone: `+91 ${regPhone}`,
      role: regRole,
      locality: regLocality,
      category: regCategory,
      hourlyRate: Number(regRate)
    });

    if (regRole === 'worker') {
      navigate('/worker-dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Top Simple Header */}
      <header style={{
        height: '70px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        padding: '0 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{
            backgroundColor: '#2563eb',
            color: '#fff',
            fontWeight: '900',
            fontSize: '20px',
            width: '38px',
            height: '38px',
            borderRadius: '9px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(37,99,235,0.3)'
          }}>
            W
          </div>
          <div>
            <span style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px' }}>
              Workify
            </span>
            <span style={{ fontSize: '11px', color: '#2563eb', display: 'block', fontWeight: '600' }}>
              Rajahmundry Edition
            </span>
          </div>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '13px', color: '#64748b' }}>
            Current Active User: <strong style={{ color: '#0f172a' }}>{currentUser?.name || 'Guest'}</strong>
          </span>
          <span style={{
            padding: '4px 10px',
            borderRadius: '9999px',
            fontSize: '11px',
            fontWeight: '700',
            textTransform: 'uppercase',
            backgroundColor: currentUser?.role === 'worker' ? '#fef3c7' : currentUser?.role === 'admin' ? '#f3e8ff' : '#eff6ff',
            color: currentUser?.role === 'worker' ? '#b45309' : currentUser?.role === 'admin' ? '#7e22ce' : '#1d4ed8'
          }}>
            {currentUser?.role || 'Guest'}
          </span>
          <Link
            to="/"
            style={{
              marginLeft: '8px',
              fontSize: '13px',
              color: '#2563eb',
              textDecoration: 'none',
              fontWeight: '600'
            }}
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1020px',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 20px 40px -15px rgba(0,0,0,0.07), 0 0 0 1px #e2e8f0',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr'
        }}>
          {/* Left Panel: Auth Forms */}
          <div style={{ padding: '36px 40px' }}>
            {/* Title & Subtitle */}
            <div style={{ marginBottom: '24px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', margin: '0 0 6px 0' }}>
                Welcome to Workify
              </h1>
              <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                Sign in with mobile OTP or instantly switch roles across Rajahmundry.
              </p>
            </div>

            {/* Tab Selector */}
            <div style={{
              display: 'flex',
              backgroundColor: '#f1f5f9',
              borderRadius: '10px',
              padding: '4px',
              marginBottom: '28px'
            }}>
              <button
                type="button"
                onClick={() => { setActiveTab('otp'); setErrorMsg(''); }}
                style={{
                  flex: 1,
                  padding: '9px 12px',
                  borderRadius: '7px',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  border: 'none',
                  backgroundColor: activeTab === 'otp' ? '#ffffff' : 'transparent',
                  color: activeTab === 'otp' ? '#2563eb' : '#64748b',
                  boxShadow: activeTab === 'otp' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                📱 Mobile OTP
              </button>
              <button
                type="button"
                onClick={() => { setActiveTab('roles'); setErrorMsg(''); }}
                style={{
                  flex: 1,
                  padding: '9px 12px',
                  borderRadius: '7px',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  border: 'none',
                  backgroundColor: activeTab === 'roles' ? '#ffffff' : 'transparent',
                  color: activeTab === 'roles' ? '#2563eb' : '#64748b',
                  boxShadow: activeTab === 'roles' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                ⚡ 1-Click Roles
              </button>
              <button
                type="button"
                onClick={() => { setActiveTab('register'); setErrorMsg(''); }}
                style={{
                  flex: 1,
                  padding: '9px 12px',
                  borderRadius: '7px',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  border: 'none',
                  backgroundColor: activeTab === 'register' ? '#ffffff' : 'transparent',
                  color: activeTab === 'register' ? '#2563eb' : '#64748b',
                  boxShadow: activeTab === 'register' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                ✨ Register
              </button>
            </div>

            {/* Error Banner */}
            {errorMsg && (
              <div style={{
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                color: '#b91c1c',
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '13px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <HelpCircle size={16} />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* TAB 1: Mobile OTP Login */}
            {activeTab === 'otp' && (
              <div>
                {!otpSent ? (
                  <form onSubmit={handleSendOtp}>
                    <div style={{ marginBottom: '20px' }}>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>
                        Enter Mobile Number (ఇక్కడ మీ మొబైల్ నంబర్ ఇవ్వండి)
                      </label>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        border: '1px solid #cbd5e1',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        backgroundColor: '#ffffff',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                      }}>
                        <span style={{
                          padding: '12px 14px',
                          backgroundColor: '#f8fafc',
                          color: '#475569',
                          fontWeight: '700',
                          fontSize: '14px',
                          borderRight: '1px solid #cbd5e1',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          🇮🇳 +91
                        </span>
                        <input
                          type="tel"
                          maxLength="10"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                          placeholder="98480 23456"
                          style={{
                            flex: 1,
                            padding: '12px 14px',
                            border: 'none',
                            outline: 'none',
                            fontSize: '15px',
                            fontWeight: '600',
                            letterSpacing: '1px'
                          }}
                        />
                      </div>
                      <span style={{ fontSize: '12px', color: '#64748b', display: 'block', marginTop: '6px' }}>
                        💡 Preset demo number: <strong>9848023456</strong> (Sameera - Customer)
                      </span>
                    </div>

                    <button
                      type="submit"
                      style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: '#2563eb',
                        color: '#ffffff',
                        fontWeight: '700',
                        fontSize: '14px',
                        borderRadius: '10px',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        transition: 'background 0.15s ease'
                      }}
                    >
                      <span>Get 4-Digit OTP</span>
                      <ArrowRight size={17} />
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp}>
                    {/* OTP Banner Box */}
                    <div style={{
                      backgroundColor: '#eff6ff',
                      border: '1px solid #bfdbfe',
                      borderRadius: '10px',
                      padding: '12px 16px',
                      marginBottom: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <div>
                        <div style={{ fontSize: '12px', color: '#1e40af', fontWeight: '600' }}>
                          SMS Sent to +91 {phoneNumber}
                        </div>
                        <div style={{ fontSize: '13px', color: '#1d4ed8', fontWeight: '700' }}>
                          ⚡ Demo Test OTP: <span style={{ textDecoration: 'underline' }}>{DEMO_OTP}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setOtpDigits(['7', '3', '9', '2'])}
                        style={{
                          backgroundColor: '#2563eb',
                          color: '#ffffff',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: '700',
                          cursor: 'pointer'
                        }}
                      >
                        Auto-Fill
                      </button>
                    </div>

                    {/* 4 Digit Boxes */}
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>
                      Enter 4-Digit Verification Code
                    </label>
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', justifyContent: 'center' }}>
                      {otpDigits.map((digit, idx) => (
                        <input
                          key={idx}
                          id={`otp-box-${idx}`}
                          type="text"
                          maxLength="1"
                          value={digit}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '');
                            const newDigits = [...otpDigits];
                            newDigits[idx] = val;
                            setOtpDigits(newDigits);
                            if (val && idx < 3) {
                              document.getElementById(`otp-box-${idx + 1}`)?.focus();
                            }
                          }}
                          style={{
                            width: '56px',
                            height: '56px',
                            textAlign: 'center',
                            fontSize: '22px',
                            fontWeight: '800',
                            borderRadius: '10px',
                            border: '2px solid #cbd5e1',
                            outline: 'none',
                            backgroundColor: '#ffffff',
                            color: '#0f172a'
                          }}
                        />
                      ))}
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '20px',
                      fontSize: '12px',
                      color: '#64748b'
                    }}>
                      <span>
                        {countdown > 0 ? (
                          `Resend OTP in ${countdown}s`
                        ) : (
                          <button
                            type="button"
                            onClick={() => { setCountdown(30); setErrorMsg(''); }}
                            style={{ background: 'none', border: 'none', color: '#2563eb', fontWeight: '700', cursor: 'pointer', padding: 0 }}
                          >
                            Resend SMS OTP
                          </button>
                        )}
                      </span>
                      <button
                        type="button"
                        onClick={() => setOtpSent(false)}
                        style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', textDecoration: 'underline' }}
                      >
                        Change Number
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={isVerifying}
                      style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: '#16a34a',
                        color: '#ffffff',
                        fontWeight: '700',
                        fontSize: '14px',
                        borderRadius: '10px',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                      }}
                    >
                      <CheckCircle2 size={18} />
                      <span>{isVerifying ? 'Verifying...' : 'Verify OTP & Continue'}</span>
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* TAB 2: 1-Click Role Switcher */}
            {activeTab === 'roles' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 4px 0' }}>
                  Select any persona to test the platform instantly without entering OTP:
                </p>

                {/* Persona: Customer */}
                <div
                  onClick={() => handleSelectRole('customer')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    border: currentUser?.role === 'customer' ? '2px solid #2563eb' : '1px solid #e2e8f0',
                    backgroundColor: currentUser?.role === 'customer' ? '#eff6ff' : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <img
                      src={PRESET_USERS.customer.avatar}
                      alt="Customer"
                      style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>
                          {PRESET_USERS.customer.name}
                        </span>
                        <span style={{
                          fontSize: '10px',
                          backgroundColor: '#dbeafe',
                          color: '#1e40af',
                          fontWeight: '700',
                          padding: '2px 6px',
                          borderRadius: '4px'
                        }}>
                          CUSTOMER
                        </span>
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                        Homeowner in {PRESET_USERS.customer.locality}, Rajahmundry • ₹{PRESET_USERS.customer.walletBalance} Wallet
                      </div>
                    </div>
                  </div>
                  <ArrowRight size={18} color="#2563eb" />
                </div>

                {/* Persona: Worker */}
                <div
                  onClick={() => handleSelectRole('worker')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    border: currentUser?.role === 'worker' ? '2px solid #d97706' : '1px solid #e2e8f0',
                    backgroundColor: currentUser?.role === 'worker' ? '#fffbeb' : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <img
                      src={PRESET_USERS.worker.avatar}
                      alt="Worker"
                      style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>
                          {PRESET_USERS.worker.name}
                        </span>
                        <span style={{
                          fontSize: '10px',
                          backgroundColor: '#fef3c7',
                          color: '#92400e',
                          fontWeight: '700',
                          padding: '2px 6px',
                          borderRadius: '4px'
                        }}>
                          WORKER
                        </span>
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                        Plumber (5★) in {PRESET_USERS.worker.locality} • ₹{PRESET_USERS.worker.hourlyRate}/hr • Live Dispatches
                      </div>
                    </div>
                  </div>
                  <ArrowRight size={18} color="#d97706" />
                </div>

                {/* Persona: Admin */}
                <div
                  onClick={() => handleSelectRole('admin')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    border: currentUser?.role === 'admin' ? '2px solid #7c3aed' : '1px solid #e2e8f0',
                    backgroundColor: currentUser?.role === 'admin' ? '#faf5ff' : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <img
                      src={PRESET_USERS.admin.avatar}
                      alt="Admin"
                      style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>
                          {PRESET_USERS.admin.name}
                        </span>
                        <span style={{
                          fontSize: '10px',
                          backgroundColor: '#f3e8ff',
                          color: '#6b21a8',
                          fontWeight: '700',
                          padding: '2px 6px',
                          borderRadius: '4px'
                        }}>
                          SUPER ADMIN
                        </span>
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                        KYC Approval Queue, Disputes & AWS Infrastructure Monitor
                      </div>
                    </div>
                  </div>
                  <ArrowRight size={18} color="#7c3aed" />
                </div>
              </div>
            )}

            {/* TAB 3: Register New User */}
            {activeTab === 'register' && (
              <form onSubmit={handleRegister}>
                {/* Role Switch */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>
                    I WANT TO JOIN AS:
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <button
                      type="button"
                      onClick={() => setRegRole('customer')}
                      style={{
                        padding: '10px',
                        borderRadius: '8px',
                        border: regRole === 'customer' ? '2px solid #2563eb' : '1px solid #cbd5e1',
                        backgroundColor: regRole === 'customer' ? '#eff6ff' : '#ffffff',
                        color: regRole === 'customer' ? '#1d4ed8' : '#475569',
                        fontWeight: '700',
                        fontSize: '13px',
                        cursor: 'pointer'
                      }}
                    >
                      🏠 Customer (Hire)
                    </button>
                    <button
                      type="button"
                      onClick={() => setRegRole('worker')}
                      style={{
                        padding: '10px',
                        borderRadius: '8px',
                        border: regRole === 'worker' ? '2px solid #d97706' : '1px solid #cbd5e1',
                        backgroundColor: regRole === 'worker' ? '#fffbeb' : '#ffffff',
                        color: regRole === 'worker' ? '#b45309' : '#475569',
                        fontWeight: '700',
                        fontSize: '13px',
                        cursor: 'pointer'
                      }}
                    >
                      🔧 Skilled Worker
                    </button>
                  </div>
                </div>

                {/* Name */}
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '4px' }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g. Venkata Rao"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>

                {/* Phone */}
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '4px' }}>
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength="10"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="98480 12345"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>

                {/* Locality Dropdown */}
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '4px' }}>
                    Rajahmundry Locality
                  </label>
                  <select
                    value={regLocality}
                    onChange={(e) => setRegLocality(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      outline: 'none',
                      backgroundColor: '#ffffff'
                    }}
                  >
                    {RAJAHMUNDRY_LOCALITIES.map(loc => (
                      <option key={loc.id} value={loc.name}>
                        {loc.name} ({loc.pincode}) - {loc.type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Worker Specific Fields */}
                {regRole === 'worker' && (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1.2fr 1fr',
                    gap: '12px',
                    marginBottom: '14px',
                    backgroundColor: '#fffbeb',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #fde68a'
                  }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#92400e', marginBottom: '4px' }}>
                        PRIMARY TRADE
                      </label>
                      <select
                        value={regCategory}
                        onChange={(e) => setRegCategory(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '8px',
                          borderRadius: '6px',
                          border: '1px solid #fcd34d',
                          fontSize: '13px',
                          backgroundColor: '#ffffff'
                        }}
                      >
                        <option value="Plumber">Plumber</option>
                        <option value="Electrician">Electrician</option>
                        <option value="Carpenter">Carpenter</option>
                        <option value="AC Repair">AC Repair Technician</option>
                        <option value="Painter">Painter</option>
                        <option value="House Cleaning">House Cleaning Specialist</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#92400e', marginBottom: '4px' }}>
                        HOURLY RATE (₹)
                      </label>
                      <input
                        type="number"
                        min="200"
                        step="50"
                        value={regRate}
                        onChange={(e) => setRegRate(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '8px',
                          borderRadius: '6px',
                          border: '1px solid #fcd34d',
                          fontSize: '13px',
                          backgroundColor: '#ffffff'
                        }}
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#2563eb',
                    color: '#ffffff',
                    fontWeight: '700',
                    fontSize: '14px',
                    borderRadius: '10px',
                    border: 'none',
                    cursor: 'pointer',
                    marginTop: '8px'
                  }}
                >
                  Complete Registration & Join
                </button>
              </form>
            )}
          </div>

          {/* Right Panel: Value Proposition & Godavari Trust Guarantee */}
          <div style={{
            backgroundColor: '#0f172a',
            color: '#ffffff',
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundImage: 'linear-gradient(145deg, #0f172a 0%, #1e293b 100%)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Background Accent Glow */}
            <div style={{
              position: 'absolute',
              top: '-40px',
              right: '-40px',
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              backgroundColor: '#2563eb',
              filter: 'blur(70px)',
              opacity: 0.35
            }} />

            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(37, 99, 235, 0.2)',
                border: '1px solid rgba(59, 130, 246, 0.4)',
                padding: '6px 14px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: '600',
                color: '#93c5fd',
                marginBottom: '24px'
              }}>
                <Sparkles size={14} color="#60a5fa" />
                <span>Rajahmundry's #1 Worker Platform</span>
              </div>

              <h2 style={{ fontSize: '24px', fontWeight: '800', lineHeight: 1.3, marginBottom: '14px', color: '#f8fafc' }}>
                Skilled Workers. <br />
                <span style={{ color: '#60a5fa' }}>Better Tomorrow.</span>
              </h2>

              <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.6, marginBottom: '28px' }}>
                Join thousands of verified homeowners and skilled tradesmen along the Godavari riverfront.
              </p>

              {/* Trust Points */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{
                    backgroundColor: 'rgba(34, 197, 94, 0.15)',
                    padding: '8px',
                    borderRadius: '8px',
                    color: '#4ade80'
                  }}>
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 2px 0', fontSize: '13px', fontWeight: '700', color: '#f1f5f9' }}>
                      100% Aadhaar & ITI Verified
                    </h4>
                    <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8' }}>
                      Every tradesman undergoes thorough police & vocational certificate vetting.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{
                    backgroundColor: 'rgba(59, 130, 246, 0.15)',
                    padding: '8px',
                    borderRadius: '8px',
                    color: '#60a5fa'
                  }}>
                    <KeyRound size={18} />
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 2px 0', fontSize: '13px', fontWeight: '700', color: '#f1f5f9' }}>
                      4-Digit Doorstep Service OTP
                    </h4>
                    <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8' }}>
                      Jobs start and funds release only when you confirm arrival with your secret PIN.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{
                    backgroundColor: 'rgba(234, 179, 8, 0.15)',
                    padding: '8px',
                    borderRadius: '8px',
                    color: '#facc15'
                  }}>
                    <Clock size={18} />
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 2px 0', fontSize: '13px', fontWeight: '700', color: '#f1f5f9' }}>
                      20-Minute Local Dispatch
                    </h4>
                    <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8' }}>
                      Instant matching with nearest workers across 20+ Rajahmundry localities.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Local Trust Stats */}
            <div style={{
              marginTop: '36px',
              paddingTop: '20px',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontSize: '18px', fontWeight: '800', color: '#60a5fa' }}>10,400+</div>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>Rajahmundry Homes</div>
              </div>
              <div>
                <div style={{ fontSize: '18px', fontWeight: '800', color: '#4ade80' }}>500+</div>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>Verified Tradesmen</div>
              </div>
              <div>
                <div style={{ fontSize: '18px', fontWeight: '800', color: '#facc15' }}>4.85 ★</div>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>Customer Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
