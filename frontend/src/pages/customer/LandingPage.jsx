import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RAJAHMUNDRY_LOCALITIES } from '../../data/locations';
import { useAuth } from '../../context/AuthContext';
import {
  Search,
  MapPin,
  ShieldCheck,
  Clock,
  CircleDollarSign,
  Headphones,
  Wrench,
  Zap,
  Hammer,
  Paintbrush,
  Snowflake,
  Sparkles,
  Settings,
  Grid,
  Map as MapIcon,
  CalendarPlus,
  Calendar,
  MessageSquare,
  Briefcase,
  Shield,
  ArrowRight,
  Phone,
  Mail,
  CheckCircle,
  ExternalLink,
  User,
  Star,
  Wallet,
  LogIn,
  UserPlus,
  ChevronRight,
  Layers,
  Award
} from 'lucide-react';

export default function LandingPage() {
  const [service, setService] = useState('');
  const [location, setLocation] = useState('Rajahmundry');
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/workers?category=${encodeURIComponent(service || 'Plumber')}&city=${encodeURIComponent(location)}`);
  };

  const categories = [
    { name: 'Plumber', icon: Wrench },
    { name: 'Electrician', icon: Zap },
    { name: 'Carpenter', icon: Hammer },
    { name: 'Painter', icon: Paintbrush },
    { name: 'AC Repair', icon: Snowflake },
    { name: 'Cleaner', icon: Sparkles },
    { name: 'Mechanic', icon: Settings },
    { name: 'More', icon: Grid },
  ];

  const quickLaunchPages = [
    {
      title: 'Find Workers & Live Map',
      desc: 'Browse 20+ verified tradesmen with live GPS Leaflet map & radar.',
      path: '/workers',
      icon: Search,
      badge: 'Interactive Map',
      badgeColor: '#2563eb',
      bgColor: '#eff6ff',
      borderColor: '#bfdbfe'
    },
    {
      title: 'Post a Job Requirement',
      desc: 'Post an urgent repair or installation with your budget & location.',
      path: '/post-job',
      icon: CalendarPlus,
      badge: 'Instant Dispatch',
      badgeColor: '#16a34a',
      bgColor: '#f0fdf4',
      borderColor: '#bbf7d0'
    },
    {
      title: 'My Bookings & OTP',
      desc: 'Track active appointments, OTP verification codes & service bills.',
      path: '/bookings',
      icon: Calendar,
      badge: 'Live Status',
      badgeColor: '#d97706',
      bgColor: '#fffbeb',
      borderColor: '#fde68a'
    },
    {
      title: 'Customer & Worker Chat',
      desc: 'Direct real-time messaging with Ramesh Das & assigned technicians.',
      path: '/messages',
      icon: MessageSquare,
      badge: 'Live Chat',
      badgeColor: '#7c3aed',
      bgColor: '#faf5ff',
      borderColor: '#e9d5ff'
    },
    {
      title: 'Worker Profile Showcase',
      desc: 'View comprehensive profiles with certificates, gallery & reviews.',
      path: '/workers/1',
      icon: User,
      badge: 'Ramesh Das (4.9 ★)',
      badgeColor: '#0284c7',
      bgColor: '#f0f9ff',
      borderColor: '#bae6fd'
    },
    {
      title: 'Worker Partner Dashboard',
      desc: 'Technician portal to accept jobs, toggle status & view earnings.',
      path: '/worker-dashboard',
      icon: Briefcase,
      badge: 'Tradesman Portal',
      badgeColor: '#ea580c',
      bgColor: '#fff7ed',
      borderColor: '#fed7aa'
    },
    {
      title: 'Admin Governance Portal',
      desc: 'Platform governance, KYC verification, compliance & analytics.',
      path: '/admin-dashboard',
      icon: Shield,
      badge: 'Admin Control',
      badgeColor: '#dc2626',
      bgColor: '#fef2f2',
      borderColor: '#fecaca'
    },
    {
      title: 'Customer Wallet & Balances',
      desc: 'Check wallet funds, review payment logs & recharge balance.',
      path: '/wallet',
      icon: Wallet,
      badge: 'Secure Payments',
      badgeColor: '#0891b2',
      bgColor: '#ecfeff',
      borderColor: '#a5f3fc'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', color: '#1e293b' }}>
      {/* Top Banner Bar */}
      <div style={{
        backgroundColor: '#0f172a',
        color: '#94a3b8',
        padding: '8px 48px',
        fontSize: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '8px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            backgroundColor: '#2563eb',
            color: '#fff',
            padding: '2px 8px',
            borderRadius: '9999px',
            fontWeight: '700',
            fontSize: '10px'
          }}>
            RAJAHMUNDRY
          </span>
          <span>⚡ Over 20+ verified skilled tradesmen available across Godavari district today!</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontWeight: '600' }}>
          <Link to="/post-job" style={{ color: '#60a5fa', textDecoration: 'none' }}>+ Post Job</Link>
          <span style={{ color: '#334155' }}>|</span>
          <Link to="/bookings" style={{ color: '#cbd5e1', textDecoration: 'none' }}>My Bookings</Link>
          <span style={{ color: '#334155' }}>|</span>
          <Link to="/messages" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Messages</Link>
          <span style={{ color: '#334155' }}>|</span>
          <Link to="/worker-dashboard" style={{ color: '#f59e0b', textDecoration: 'none' }}>Worker Portal</Link>
          <span style={{ color: '#334155' }}>|</span>
          <Link to="/admin-dashboard" style={{ color: '#c084fc', textDecoration: 'none' }}>Admin Portal</Link>
        </div>
      </div>

      {/* Main Top Navigation */}
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 48px',
        borderBottom: '1px solid #e2e8f0',
        backgroundColor: '#ffffff',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        {/* Brand */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{
            width: '38px', height: '38px', borderRadius: '50%',
            backgroundColor: '#2563eb', display: 'flex', alignItems: 'center',
            justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '20px'
          }}>⚡</div>
          <div>
            <span style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px' }}>
              Workify
            </span>
            <p style={{ fontSize: '10px', color: '#64748b', margin: 0, fontWeight: '500' }}>
              Skilled Workers. Better Tomorrow.
            </p>
          </div>
        </Link>

        {/* Center Nav Links */}
        <div style={{ display: 'flex', gap: '22px', fontSize: '14px', fontWeight: '600', color: '#475569' }}>
          <Link to="/" style={{ color: '#2563eb' }}>Home</Link>
          <Link to="/workers" style={{ color: '#475569' }}>Find Workers</Link>
          <Link to="/post-job" style={{ color: '#475569' }}>Post a Job</Link>
          <Link to="/bookings" style={{ color: '#475569' }}>Bookings</Link>
          <Link to="/messages" style={{ color: '#475569' }}>Messages</Link>
          <a href="#how-it-works" style={{ color: '#475569' }}>How It Works</a>
          <a href="#about" style={{ color: '#475569' }}>About Us</a>
          <a href="#contact" style={{ color: '#475569' }}>Contact</a>
        </div>

        {/* Right CTA / Auth Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Link
            to="/become-worker"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#92400e',
              backgroundColor: '#fffbeb',
              border: '1px solid #fde68a',
              padding: '7px 14px',
              borderRadius: '9999px',
              fontSize: '12px',
              fontWeight: '700',
              textDecoration: 'none'
            }}
          >
            <span>🔧</span>
            <span>Join as Worker</span>
          </Link>

          {currentUser ? (
            <Link
              to={currentUser.role === 'worker' ? '/worker-dashboard' : currentUser.role === 'admin' ? '/admin-dashboard' : '/bookings'}
              className="btn btn-outline"
              style={{ padding: '7px 14px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <User size={14} />
              <span>{(currentUser?.name || 'User').split(' ')[0]} ({currentUser?.role || 'Member'})</span>
            </Link>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline" style={{ padding: '7px 16px', fontSize: '13px' }}>
                <LogIn size={13} style={{ marginRight: '4px', verticalAlign: '-1px' }} />
                Login
              </Link>
              <Link to="/register" className="btn btn-primary" style={{ padding: '7px 16px', fontSize: '13px' }}>
                <UserPlus size={13} style={{ marginRight: '4px', verticalAlign: '-1px' }} />
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(180deg, #f0f7ff 0%, #ffffff 100%)',
        padding: '50px 48px 30px',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          alignItems: 'center',
          gap: '40px'
        }}>
          <div>
            <span style={{
              fontSize: '12px',
              fontWeight: '700',
              color: '#2563eb',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              backgroundColor: '#dbeafe',
              padding: '4px 10px',
              borderRadius: '9999px'
            }}>
              YOUR TRUSTED AP SERVICE PARTNER
            </span>
            <h1 style={{
              fontSize: '44px',
              fontWeight: '800',
              color: '#0f172a',
              lineHeight: 1.15,
              margin: '16px 0 16px'
            }}>
              Find Skilled Workers <br />
              <span style={{ color: '#2563eb' }}>When You Need Them</span>
            </h1>
            <p style={{ fontSize: '15px', color: '#64748b', maxWidth: '520px', marginBottom: '28px', lineHeight: 1.6 }}>
              Connect with verified plumbers, electricians, carpenters, and technicians across Rajahmundry. Compare ratings, track appointments with OTP, and get quality work done.
            </p>

            {/* Search Box */}
            <form onSubmit={handleSearch} style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#ffffff',
              padding: '8px 10px',
              borderRadius: '9999px',
              boxShadow: '0 10px 25px -5px rgba(0,0,0,0.08)',
              border: '1px solid #cbd5e1',
              maxWidth: '580px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', flex: 1, padding: '0 12px', gap: '8px' }}>
                <Search size={18} color="#94a3b8" />
                <input
                  type="text"
                  placeholder="Search for service (e.g. Plumber, Electrician)..."
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  style={{ border: 'none', outline: 'none', width: '100%', fontSize: '14px' }}
                />
              </div>
              <div style={{ height: '24px', width: '1px', backgroundColor: '#cbd5e1' }} />
              <div style={{ display: 'flex', alignItems: 'center', flex: 1, padding: '0 12px', gap: '8px' }}>
                <MapPin size={18} color="#2563eb" />
                <input
                  type="text"
                  list="rajahmundry-localities"
                  placeholder="Locality in Rajahmundry..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  style={{ border: 'none', outline: 'none', width: '100%', fontSize: '14px' }}
                />
                <datalist id="rajahmundry-localities">
                  {RAJAHMUNDRY_LOCALITIES.map(l => (
                    <option key={l.id} value={`${l.name}, Rajahmundry`} />
                  ))}
                </datalist>
              </div>
              <button type="submit" className="btn btn-primary" style={{ borderRadius: '9999px', padding: '10px 24px', fontWeight: '700' }}>
                Search
              </button>
            </form>

            {/* Quick Locality Jump Chips */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '14px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>Popular Localities:</span>
              {['Danavaipeta', 'Morampudi', 'Prakash Nagar', 'Aryapuram', 'Dowleswaram', 'Innespeta'].map(area => (
                <button
                  key={area}
                  type="button"
                  onClick={() => {
                    setLocation(`${area}, Rajahmundry`);
                    navigate(`/workers?city=${encodeURIComponent(area)}`);
                  }}
                  style={{
                    backgroundColor: '#eff6ff',
                    color: '#2563eb',
                    border: '1px solid #dbeafe',
                    padding: '3px 10px',
                    borderRadius: '9999px',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  📍 {area}
                </button>
              ))}
              <Link
                to="/workers"
                style={{ fontSize: '12px', color: '#059669', fontWeight: '700', marginLeft: '6px', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}
              >
                <MapIcon size={13} /> View Live Radar Map &gt;
              </Link>
            </div>

            {/* Popular Services Chips */}
            <div style={{ marginTop: '36px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#334155' }}>Popular Trade Services</h3>
                <Link to="/workers" style={{ fontSize: '13px', color: '#2563eb', fontWeight: '600', textDecoration: 'none' }}>
                  View All Services ({categories.length}) &gt;
                </Link>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '10px' }}>
                {categories.map((c) => {
                  const Icon = c.icon;
                  return (
                    <Link
                      key={c.name}
                      to={`/workers?category=${encodeURIComponent(c.name)}`}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '14px 6px',
                        backgroundColor: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        transition: 'all 0.2s ease',
                        textAlign: 'center',
                        textDecoration: 'none'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = '#2563eb'}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                    >
                      <div style={{
                        width: '38px', height: '38px', borderRadius: '50%',
                        backgroundColor: '#eff6ff', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', marginBottom: '6px'
                      }}>
                        <Icon size={18} color="#2563eb" />
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: '600', color: '#1e293b' }}>
                        {c.name}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Hero Image and Badges */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <div style={{
              width: '400px',
              height: '440px',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
              backgroundColor: '#dbeafe',
              position: 'relative'
            }}>
              <img
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800"
                alt="Skilled Worker - Electrician & Plumber"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />

              {/* Bottom Gradient Overlay with Trade Badges */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '24px 16px 16px',
                background: 'linear-gradient(to top, rgba(15,23,42,0.85) 0%, transparent 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  <span style={{ backgroundColor: 'rgba(37,99,235,0.9)', color: '#fff', fontSize: '11px', fontWeight: '700', padding: '3px 8px', borderRadius: '6px' }}>
                    🚰 Plumber
                  </span>
                  <span style={{ backgroundColor: 'rgba(217,119,6,0.9)', color: '#fff', fontSize: '11px', fontWeight: '700', padding: '3px 8px', borderRadius: '6px' }}>
                    ⚡ Electrician
                  </span>
                  <span style={{ backgroundColor: 'rgba(16,185,129,0.9)', color: '#fff', fontSize: '11px', fontWeight: '700', padding: '3px 8px', borderRadius: '6px' }}>
                    🪚 Carpenter
                  </span>
                </div>
                <span style={{ color: '#facc15', fontSize: '12px', fontWeight: '800' }}>
                  ★ 4.9 / 5.0
                </span>
              </div>
            </div>

            {/* Floating Badges */}
            <div style={{
              position: 'absolute',
              right: '-10px',
              top: '40px',
              backgroundColor: '#ffffff',
              padding: '10px 16px',
              borderRadius: '12px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldCheck size={18} color="#10b981" />
              </div>
              <div>
                <p style={{ fontSize: '12px', fontWeight: '700', margin: 0 }}>Verified</p>
                <p style={{ fontSize: '10px', color: '#64748b', margin: 0 }}>Aadhaar & ITI Certified</p>
              </div>
            </div>

            <div style={{
              position: 'absolute',
              right: '-15px',
              top: '130px',
              backgroundColor: '#ffffff',
              padding: '10px 16px',
              borderRadius: '12px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                ⚡
              </div>
              <div>
                <p style={{ fontSize: '12px', fontWeight: '700', margin: 0 }}>20 Min Arrival</p>
                <p style={{ fontSize: '10px', color: '#64748b', margin: 0 }}>Across Rajahmundry</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK EXPLORER: ALL SYSTEM PAGES GRID */}
      <section style={{
        maxWidth: '1200px',
        margin: '30px auto 40px',
        padding: '0 24px'
      }}>
        <div style={{
          backgroundColor: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '20px',
          padding: '28px 32px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                🚀 DIRECT SYSTEM NAVIGATION
              </span>
              <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', margin: '4px 0 0' }}>
                Explore All Workify Pages & Portals
              </h2>
            </div>
            <span style={{ fontSize: '13px', color: '#64748b' }}>
              Click any card below to instantly open that module:
            </span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px'
          }}>
            {quickLaunchPages.map((page) => {
              const Icon = page.icon;
              return (
                <Link
                  key={page.title}
                  to={page.path}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '14px',
                    padding: '18px',
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                    transition: 'all 0.2s ease',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = page.badgeColor;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.06)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.02)';
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <div style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        backgroundColor: page.bgColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Icon size={20} color={page.badgeColor} />
                      </div>
                      <span style={{
                        fontSize: '11px',
                        fontWeight: '700',
                        color: page.badgeColor,
                        backgroundColor: page.bgColor,
                        border: `1px solid ${page.borderColor}`,
                        padding: '2px 8px',
                        borderRadius: '6px'
                      }}>
                        {page.badge}
                      </span>
                    </div>

                    <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a', marginBottom: '6px' }}>
                      {page.title}
                    </h4>
                    <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
                      {page.desc}
                    </p>
                  </div>

                  <div style={{
                    marginTop: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '12px',
                    fontWeight: '700',
                    color: page.badgeColor
                  }}>
                    <span>Open Module</span>
                    <ArrowRight size={13} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature Highlights Banner */}
      <section style={{
        maxWidth: '1200px',
        margin: '20px auto 50px',
        padding: '0 24px',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px'
      }}>
        {[
          { title: "Verified Professionals", desc: "Aadhaar & ITI certificate verified tradesmen in AP", icon: ShieldCheck },
          { title: "Real-time Availability", desc: "Live green radar indicator for immediate arrival", icon: Clock },
          { title: "Transparent Pricing", desc: "Fixed hourly rate with negotiable option & no hidden fee", icon: CircleDollarSign },
          { title: "24/7 Rajahmundry Support", desc: "Local phone & WhatsApp emergency dispatch line", icon: Headphones },
        ].map((feat) => {
          const Icon = feat.icon;
          return (
            <div key={feat.title} style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '20px',
              display: 'flex',
              gap: '14px',
              alignItems: 'flex-start'
            }}>
              <div style={{
                width: '42px', height: '42px', borderRadius: '50%',
                backgroundColor: '#eff6ff', display: 'flex', alignItems: 'center',
                justifyContent: 'center', flexShrink: 0
              }}>
                <Icon size={20} color="#2563eb" />
              </div>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', marginBottom: '4px' }}>
                  {feat.title}
                </h4>
                <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.4, margin: 0 }}>
                  {feat.desc}
                </p>
              </div>
            </div>
          );
        })}
      </section>

      {/* How It Works */}
      <section id="how-it-works" style={{
        maxWidth: '1200px',
        margin: '0 auto 70px',
        padding: '0 24px',
        textAlign: 'center'
      }}>
        <span style={{ fontSize: '12px', fontWeight: '700', color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
          SIMPLE 4-STEP PROCESS
        </span>
        <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', margin: '6px 0 8px' }}>
          How Workify Works
        </h2>
        <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '36px' }}>
          From finding a nearby plumber to OTP-verified job completion in 4 easy steps:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {[
            {
              step: '1. Search',
              desc: 'Select your trade category and locality in Rajahmundry on the live map.',
              btnText: 'Find Workers',
              path: '/workers'
            },
            {
              step: '2. Choose',
              desc: 'Compare ratings, past reviews, experience years, and transparent hourly rates.',
              btnText: 'View Profiles',
              path: '/workers/1'
            },
            {
              step: '3. Book / Post',
              desc: 'Confirm preferred time slot or post a custom job requirement with budget.',
              btnText: 'Post a Job',
              path: '/post-job'
            },
            {
              step: '4. Done & OTP',
              desc: 'Share service OTP with worker upon arrival and relax with verified quality work.',
              btnText: 'Track Bookings',
              path: '/bookings'
            },
          ].map((item, i) => (
            <div key={item.step} style={{
              padding: '24px 20px',
              backgroundColor: '#ffffff',
              borderRadius: '14px',
              border: '1px solid #e2e8f0',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
            }}>
              <div>
                <div style={{
                  width: '46px', height: '46px', borderRadius: '50%',
                  backgroundColor: '#eff6ff', color: '#2563eb', fontWeight: '800',
                  fontSize: '18px', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', margin: '0 auto 16px'
                }}>
                  {i + 1}
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px', color: '#0f172a' }}>{item.step}</h3>
                <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, marginBottom: '20px' }}>{item.desc}</p>
              </div>

              <Link
                to={item.path}
                className="btn btn-outline"
                style={{ padding: '8px 14px', fontSize: '12px', fontWeight: '700', width: '100%', textDecoration: 'none' }}
              >
                {item.btnText} &gt;
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" style={{
        backgroundColor: '#f8fafc',
        padding: '60px 48px',
        borderTop: '1px solid #e2e8f0',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
              ABOUT WORKIFY
            </span>
            <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a', margin: '10px 0 16px' }}>
              Empowering Skilled Workers in Andhra Pradesh
            </h2>
            <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7, marginBottom: '14px' }}>
              Workify was founded to bridge the gap between skilled tradesmen (plumbers, electricians, carpenters, painters) and homeowners in the East Godavari region. Many hardworking technicians lack a digital presence, while customers struggle to find prompt, trustworthy help during household emergencies.
            </p>
            <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7, marginBottom: '24px' }}>
              Our platform guarantees Aadhaar-verified identity, ITI certification validation, real-time GPS proximity matching, and transparent standardized pricing without unorganized middleman markups.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '24px', fontWeight: '800', color: '#2563eb', display: 'block' }}>20+</span>
                <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>Localities in Rajahmundry</span>
              </div>
              <div style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '24px', fontWeight: '800', color: '#16a34a', display: 'block' }}>100%</span>
                <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>KYC Verified Workers</span>
              </div>
            </div>
          </div>

          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '32px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 10px 30px rgba(0,0,0,0.04)'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', marginBottom: '16px' }}>
              Why Workify is Different
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { title: 'Haversine & ELO Rating Algorithm', desc: 'Our ML dispatch engine recommends workers based on proximity and customer satisfaction history.' },
                { title: 'Secure OTP Handshake', desc: 'Work begins only after OTP verification between homeowner and worker, preventing fraudulent calls.' },
                { title: 'Pre-negotiated & Transparent Rates', desc: 'No surprise bills — know the estimated base rate before confirming the visit.' },
                { title: 'Direct Mobile & Chat Dispatch', desc: 'Communicate directly with the technician packed with his mobile toolkit.' }
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                    <CheckCircle size={14} />
                  </div>
                  <div>
                    <h5 style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a', margin: '0 0 2px' }}>{item.title}</h5>
                    <p style={{ fontSize: '12px', color: '#64748b', margin: 0, lineHeight: 1.4 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #f1f5f9' }}>
              <Link to="/workers" className="btn btn-primary" style={{ width: '100%', padding: '10px', fontSize: '13px', textDecoration: 'none' }}>
                Browse Verified Workers in Rajahmundry &gt;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" style={{
        maxWidth: '1200px',
        margin: '60px auto',
        padding: '0 24px'
      }}>
        <div style={{
          backgroundColor: '#0f172a',
          color: '#ffffff',
          borderRadius: '20px',
          padding: '40px 48px',
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '40px',
          alignItems: 'center'
        }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '1px' }}>
              LOCAL HELPLINE & DISPATCH
            </span>
            <h2 style={{ fontSize: '28px', fontWeight: '800', margin: '8px 0 12px' }}>
              Need Urgent Help or Have Questions?
            </h2>
            <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.6, marginBottom: '24px', maxWidth: '480px' }}>
              Our Rajahmundry local customer support team is available 7 days a week from 8:00 AM to 9:00 PM to assist with bookings, payments, and emergency dispatches.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MapPin size={18} color="#60a5fa" />
                <span>Danavaipeta & RTC Complex Hub, Rajahmundry, Andhra Pradesh - 533103</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={18} color="#4ade80" />
                <span>+91 98480 23456 / +91 98480 12345 (Toll-free / WhatsApp Dispatch)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={18} color="#f472b6" />
                <span>support@workify.in / dispatch.rjy@workify.in</span>
              </div>
            </div>
          </div>

          <div style={{
            backgroundColor: '#1e293b',
            borderRadius: '16px',
            padding: '28px',
            border: '1px solid #334155'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '14px', color: '#f8fafc' }}>
              Quick Action Shortcuts
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link
                to="/post-job"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  backgroundColor: '#2563eb',
                  color: '#ffffff',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: '600'
                }}
              >
                <span>Post Urgent Job Requirement</span>
                <ArrowRight size={14} />
              </Link>
              <Link
                to="/messages"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  backgroundColor: '#334155',
                  color: '#ffffff',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: '600'
                }}
              >
                <span>Live Chat with Support & Technicians</span>
                <ArrowRight size={14} />
              </Link>
              <Link
                to="/become-worker"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  backgroundColor: '#334155',
                  color: '#ffffff',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: '600'
                }}
              >
                <span>Register as Skilled Tradesman (Earn ₹25k+)</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Multi-Column Footer */}
      <footer style={{
        backgroundColor: '#0f172a',
        color: '#94a3b8',
        padding: '50px 48px 24px',
        borderTop: '1px solid #1e293b'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
          gap: '36px',
          marginBottom: '36px'
        }}>
          {/* Col 1: Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%',
                backgroundColor: '#2563eb', display: 'flex', alignItems: 'center',
                justifyContent: 'center', color: '#fff', fontWeight: 'bold'
              }}>⚡</div>
              <span style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff' }}>Workify</span>
            </div>
            <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#94a3b8', maxWidth: '300px' }}>
              Empowering skilled trade workers with transparent job requests, verified credentials, and digital bookings across Rajahmundry and Andhra Pradesh.
            </p>
            <div style={{ marginTop: '16px', fontSize: '12px', color: '#64748b' }}>
              📍 Danavaipeta, Rajahmundry, AP - 533103
            </div>
          </div>

          {/* Col 2: Customer Navigation */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#ffffff', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Customer Portals
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              <Link to="/workers" style={{ color: '#94a3b8', textDecoration: 'none' }}>🔍 Find Workers & Map</Link>
              <Link to="/post-job" style={{ color: '#94a3b8', textDecoration: 'none' }}>📋 Post a Job</Link>
              <Link to="/bookings" style={{ color: '#94a3b8', textDecoration: 'none' }}>📅 My Bookings & OTP</Link>
              <Link to="/messages" style={{ color: '#94a3b8', textDecoration: 'none' }}>💬 Customer Messages</Link>
              <Link to="/wallet" style={{ color: '#94a3b8', textDecoration: 'none' }}>💳 Wallet & Payments</Link>
              <Link to="/reviews" style={{ color: '#94a3b8', textDecoration: 'none' }}>⭐ Customer Reviews</Link>
            </div>
          </div>

          {/* Col 3: Worker & Admin Portals */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#ffffff', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Worker & Admin
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              <Link to="/become-worker" style={{ color: '#94a3b8', textDecoration: 'none' }}>🔧 Join as Worker</Link>
              <Link to="/worker-dashboard" style={{ color: '#94a3b8', textDecoration: 'none' }}>🛠️ Worker Dashboard</Link>
              <Link to="/workers/1" style={{ color: '#94a3b8', textDecoration: 'none' }}>👤 Worker Profile View</Link>
              <Link to="/admin-dashboard" style={{ color: '#94a3b8', textDecoration: 'none' }}>🛡️ Admin Governance</Link>
              <Link to="/login" style={{ color: '#94a3b8', textDecoration: 'none' }}>🔐 Login & Switch Role</Link>
              <Link to="/register" style={{ color: '#94a3b8', textDecoration: 'none' }}>📝 Register Account</Link>
            </div>
          </div>

          {/* Col 4: Top Trade Services */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#ffffff', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Services in Rajahmundry
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              <Link to="/workers?category=Plumber" style={{ color: '#94a3b8', textDecoration: 'none' }}>🚰 Plumber in Rajahmundry</Link>
              <Link to="/workers?category=Electrician" style={{ color: '#94a3b8', textDecoration: 'none' }}>⚡ Electrician in Rajahmundry</Link>
              <Link to="/workers?category=Carpenter" style={{ color: '#94a3b8', textDecoration: 'none' }}>🪚 Carpenter & Woodwork</Link>
              <Link to="/workers?category=Painter" style={{ color: '#94a3b8', textDecoration: 'none' }}>🎨 Home Painting & Putty</Link>
              <Link to="/workers?category=AC+Repair" style={{ color: '#94a3b8', textDecoration: 'none' }}>❄️ AC Repair & Gas Refill</Link>
              <Link to="/workers?category=Cleaner" style={{ color: '#94a3b8', textDecoration: 'none' }}>🧹 Deep Cleaning & Sanitization</Link>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          paddingTop: '20px',
          borderTop: '1px solid #1e293b',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px',
          fontSize: '12px',
          color: '#64748b'
        }}>
          <div>
            © {new Date().getFullYear()} Workify Technologies India. Built for Rajahmundry & Andhra Pradesh.
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Safety Guidelines</span>
            <span>Aadhaar Compliance</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
