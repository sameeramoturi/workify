import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RAJAHMUNDRY_LOCALITIES } from '../../data/locations';
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
  Map as MapIcon
} from 'lucide-react';

export default function LandingPage() {
  const [service, setService] = useState('');
  const [location, setLocation] = useState('Rajahmundry');
  const navigate = useNavigate();

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

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      {/* Top Navigation */}
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 48px',
        borderBottom: '1px solid #f1f5f9'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '50%',
            backgroundColor: '#2563eb', display: 'flex', alignItems: 'center',
            justifyContent: 'center', color: '#fff', fontWeight: 'bold'
          }}>⚡</div>
          <span style={{ fontSize: '24px', fontWeight: '800', color: '#1e293b' }}>Workify</span>
        </div>

        <div style={{ display: 'flex', gap: '28px', fontSize: '15px', fontWeight: '500', color: '#475569' }}>
          <Link to="/" style={{ color: '#2563eb', fontWeight: '600' }}>Home</Link>
          <Link to="/workers">Find Workers</Link>
          <a href="#how-it-works">How It Works</a>
          <a href="#about">About Us</a>
          <a href="#contact">Contact</a>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <Link to="/workers" className="btn btn-outline" style={{ padding: '8px 18px' }}>Login</Link>
          <Link to="/workers" className="btn btn-primary" style={{ padding: '8px 18px' }}>Sign Up</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(180deg, #f0f7ff 0%, #ffffff 100%)',
        padding: '60px 48px 40px',
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
              fontSize: '13px',
              fontWeight: '700',
              color: '#2563eb',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              YOUR TRUSTED SERVICE PARTNER
            </span>
            <h1 style={{
              fontSize: '48px',
              fontWeight: '800',
              color: '#0f172a',
              lineHeight: 1.15,
              margin: '16px 0 20px'
            }}>
              Find Skilled Workers <br />
              <span style={{ color: '#2563eb' }}>When You Need Them</span>
            </h1>
            <p style={{ fontSize: '16px', color: '#64748b', maxWidth: '520px', marginBottom: '32px' }}>
              Connect with verified and trusted professionals for all your home and business needs. Book, chat and get your work done with ease.
            </p>

            {/* Search Box */}
            <form onSubmit={handleSearch} style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#ffffff',
              padding: '8px 10px',
              borderRadius: '9999px',
              boxShadow: '0 10px 25px -5px rgba(0,0,0,0.08)',
              border: '1px solid #e2e8f0',
              maxWidth: '580px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', flex: 1, padding: '0 12px', gap: '8px' }}>
                <Search size={18} color="#94a3b8" />
                <input
                  type="text"
                  placeholder="Search for services..."
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
              <button type="submit" className="btn btn-primary" style={{ borderRadius: '9999px', padding: '10px 24px' }}>
                Search
              </button>
            </form>

            {/* Quick Locality Jump Chips */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '14px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>Popular Areas:</span>
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
                style={{ fontSize: '12px', color: '#059669', fontWeight: '700', marginLeft: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <MapIcon size={13} /> View Live Radar Map &gt;
              </Link>
            </div>

            {/* Popular Services Chips */}
            <div style={{ marginTop: '48px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#334155' }}>Popular Services</h3>
                <Link to="/workers" style={{ fontSize: '13px', color: '#2563eb', fontWeight: '600' }}>View All &gt;</Link>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '12px' }}>
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
                        padding: '16px 8px',
                        backgroundColor: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        textAlign: 'center'
                      }}
                    >
                      <div style={{
                        width: '40px', height: '40px', borderRadius: '50%',
                        backgroundColor: '#eff6ff', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', marginBottom: '8px'
                      }}>
                        <Icon size={20} color="#2563eb" />
                      </div>
                      <span style={{ fontSize: '12px', fontWeight: '600', color: '#1e293b' }}>
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
              width: '420px',
              height: '460px',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              backgroundColor: '#dbeafe'
            }}>
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600"
                alt="Skilled Worker"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Floating Badges */}
            <div style={{
              position: 'absolute',
              right: '-10px',
              top: '40px',
              backgroundColor: '#ffffff',
              padding: '12px 18px',
              borderRadius: '12px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldCheck size={18} color="#10b981" />
              </div>
              <div>
                <p style={{ fontSize: '12px', fontWeight: '700', margin: 0 }}>Verified</p>
                <p style={{ fontSize: '10px', color: '#64748b', margin: 0 }}>Professionals</p>
              </div>
            </div>

            <div style={{
              position: 'absolute',
              right: '-20px',
              top: '140px',
              backgroundColor: '#ffffff',
              padding: '12px 18px',
              borderRadius: '12px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                ⚡
              </div>
              <div>
                <p style={{ fontSize: '12px', fontWeight: '700', margin: 0 }}>Trusted by</p>
                <p style={{ fontSize: '10px', color: '#64748b', margin: 0 }}>10,000+ Customers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Banner */}
      <section style={{
        maxWidth: '1200px',
        margin: '30px auto 60px',
        padding: '0 24px',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px'
      }}>
        {[
          { title: "Verified Professionals", desc: "All workers are background verified", icon: ShieldCheck },
          { title: "Real-time Availability", desc: "See who is available and can work now", icon: Clock },
          { title: "Transparent Pricing", desc: "No hidden charges. Know before you book.", icon: CircleDollarSign },
          { title: "24/7 Support", desc: "We are always here to help you", icon: Headphones },
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
                <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.4 }}>
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
        margin: '0 auto 80px',
        padding: '0 24px',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
          How It Works
        </h2>
        <p style={{ fontSize: '15px', color: '#64748b', marginBottom: '40px' }}>
          Get your work done in just a few simple steps.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
          {[
            { step: '1. Search', desc: 'Find the right service and select your location.' },
            { step: '2. Choose', desc: 'Compare profiles, ratings and prices.' },
            { step: '3. Book', desc: 'Confirm your booking and get instant updates.' },
            { step: '4. Done', desc: 'Relax! Your work is in good hands.' },
          ].map((item, i) => (
            <div key={item.step} style={{ padding: '24px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '50%',
                backgroundColor: '#eff6ff', color: '#2563eb', fontWeight: '800',
                fontSize: '18px', display: 'flex', alignItems: 'center',
                justifyContent: 'center', margin: '0 auto 16px'
              }}>
                {i + 1}
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '6px' }}>{item.step}</h3>
              <p style={{ fontSize: '13px', color: '#64748b' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
