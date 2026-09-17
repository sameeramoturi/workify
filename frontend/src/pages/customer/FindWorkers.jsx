import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { fetchWorkers, INITIAL_WORKERS } from '../../services/api';
import {
  Search,
  MapPin,
  Calendar,
  Filter,
  Star,
  ShieldCheck,
  Map as MapIcon,
  List,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';

export default function FindWorkers() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'Plumber');
  const [locationText, setLocationText] = useState(searchParams.get('city') || 'Rajahmundry');
  const [selectedAvailability, setSelectedAvailability] = useState('Anytime');
  const [workers, setWorkers] = useState(INITIAL_WORKERS);
  const [viewMode, setViewMode] = useState('both'); // 'both', 'list', 'map'

  useEffect(() => {
    fetchWorkers({ category: selectedCategory, city: locationText, availability: selectedAvailability }).then(setWorkers);
  }, [selectedCategory, locationText, selectedAvailability]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <Navbar activeCity={locationText} />

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
            <div>
              <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>
                Find the Right Worker
              </h1>
              <p style={{ fontSize: '14px', color: '#64748b' }}>
                Choose from verified and skilled professionals for all your home and business needs.
              </p>
            </div>
            <div style={{ fontSize: '40px' }}>👷‍♂️</div>
          </div>

          {/* Search & Filter Bar */}
          <div className="card" style={{ padding: '20px', marginBottom: '24px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr 1fr auto',
              gap: '16px',
              alignItems: 'center',
              marginBottom: '16px'
            }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: '#64748b', display: 'block', marginBottom: '6px' }}>
                  What service do you need?
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px' }}
                >
                  <option value="Plumber">🔧 Plumber</option>
                  <option value="Electrician">⚡ Electrician</option>
                  <option value="Carpenter">🪚 Carpenter</option>
                  <option value="Painter">🎨 Painter</option>
                  <option value="AC Technician">❄️ AC Technician</option>
                  <option value="Mechanic">⚙️ Mechanic</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: '#64748b', display: 'block', marginBottom: '6px' }}>
                  Location
                </label>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0 10px' }}>
                  <MapPin size={16} color="#64748b" />
                  <input
                    type="text"
                    value={locationText}
                    onChange={(e) => setLocationText(e.target.value)}
                    style={{ width: '100%', padding: '10px 8px', border: 'none', outline: 'none', fontSize: '14px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: '#64748b', display: 'block', marginBottom: '6px' }}>
                  Availability
                </label>
                <select
                  value={selectedAvailability}
                  onChange={(e) => setSelectedAvailability(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', backgroundColor: '#ffffff', cursor: 'pointer' }}
                >
                  <option value="Anytime">📅 Anytime</option>
                  <option value="Immediate">⚡ Immediate (Next 2 Hours)</option>
                  <option value="Today">🕒 Available Today</option>
                  <option value="Tomorrow">☀️ Tomorrow</option>
                  <option value="Day After Tomorrow">🗓️ Day After Tomorrow</option>
                  <option value="This Weekend">🌴 This Weekend (Sat & Sun)</option>
                  <option value="Next Week">📆 Next Week</option>
                </select>
              </div>

              <div style={{ paddingTop: '22px' }}>
                <button className="btn btn-primary" style={{ padding: '10px 24px', width: '100%' }}>
                  <Search size={16} /> Search
                </button>
              </div>
            </div>

            {/* Filter Pills */}
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid #f1f5f9' }}>
              <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '13px' }}>
                <Filter size={14} /> Filters
              </button>
              <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '13px' }}>
                ⭐ Rating
              </button>
              <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '13px' }}>
                💼 Experience
              </button>
              <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '13px' }}>
                ₹ Price Range
              </button>
              <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '13px' }}>
                📍 Distance
              </button>
              <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '13px', marginLeft: 'auto' }}>
                <SlidersHorizontal size={14} /> Sort By
              </button>
            </div>
          </div>

          {/* Main Content Grid: Workers List (Left) + Interactive Map & Perks (Right) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '24px', alignItems: 'start' }}>
            {/* Left Column: Worker Cards Grid */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b' }}>
                  Available Workers ({workers.length} found)
                </h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                {workers.map((worker) => (
                  <div key={worker.id} className="card" style={{ padding: '18px' }}>
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                      <div style={{
                        width: '56px', height: '56px', borderRadius: '12px',
                        backgroundColor: '#dbeafe', overflow: 'hidden', flexShrink: 0
                      }}>
                        <img
                          src={`https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=150`}
                          alt={worker.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>
                            {worker.name}
                          </h4>
                          {worker.is_verified && (
                            <span className="badge badge-verified">
                              <ShieldCheck size={12} /> Verified
                            </span>
                          )}
                        </div>
                        <p style={{ fontSize: '12px', color: '#64748b' }}>{worker.category}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '12px', fontWeight: '700', color: '#eab308' }}>
                            <Star size={12} fill="#eab308" /> {worker.rating}
                          </span>
                          <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                            ({worker.review_count} reviews)
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '12px',
                      color: '#475569',
                      padding: '8px 0',
                      borderTop: '1px solid #f1f5f9',
                      borderBottom: '1px solid #f1f5f9',
                      marginBottom: '10px'
                    }}>
                      <span>💼 {worker.experience_years} years exp</span>
                      <span style={{ fontWeight: '700', color: '#0f172a' }}>₹{worker.hourly_rate}/hr</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', marginBottom: '12px' }}>
                      <span style={{ color: '#64748b' }}>📍 {worker.distance_km} km away</span>
                      <span className="badge badge-available">
                        ● {selectedAvailability === 'Tomorrow' ? 'Available Tomorrow' :
                           selectedAvailability === 'Day After Tomorrow' ? 'Available Day After Tomorrow' :
                           selectedAvailability === 'This Weekend' ? 'Available Weekend' :
                           selectedAvailability === 'Immediate' ? 'Next 2 Hours' :
                           'Available'}
                      </span>
                    </div>

                    {/* Skills Chips */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '14px' }}>
                      {worker.skills.slice(0, 3).map(s => (
                        <span key={s} style={{
                          backgroundColor: '#f1f5f9',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '11px',
                          color: '#475569'
                        }}>
                          {s}
                        </span>
                      ))}
                    </div>

                    {/* View Profile CTA */}
                    <Link
                      to={`/workers/${worker.id}`}
                      className="btn btn-outline"
                      style={{ width: '100%', fontSize: '13px', padding: '8px' }}
                    >
                      View Profile
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Interactive Map Preview & Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Map View Toggle Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button className="btn btn-primary" style={{ padding: '6px 14px', fontSize: '13px' }}>
                  <MapIcon size={14} /> Map View
                </button>
                <button className="btn btn-outline" style={{ padding: '6px 14px', fontSize: '13px' }}>
                  <List size={14} /> List View
                </button>
              </div>

              {/* Stylized Map Card */}
              <div className="card" style={{ overflow: 'hidden' }}>
                <div style={{
                  height: '280px',
                  backgroundColor: '#e2e8f0',
                  position: 'relative',
                  backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
                  backgroundSize: '16px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {/* Stylized River graphic representing Godavari River in Rajahmundry */}
                  <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
                    <path
                      d="M 50 280 C 120 200, 200 150, 450 60"
                      fill="none"
                      stroke="#93c5fd"
                      strokeWidth="32"
                      strokeLinecap="round"
                    />
                    <text x="140" y="190" fill="#3b82f6" fontSize="12" fontWeight="bold" transform="rotate(-25 140 190)">
                      Godavari River
                    </text>
                  </svg>

                  {/* Worker Location Markers */}
                  {[
                    { top: '30%', left: '40%', name: 'Ramesh Das' },
                    { top: '45%', left: '60%', name: 'Amit Verma' },
                    { top: '65%', left: '35%', name: 'Suresh Yadav' },
                    { top: '25%', left: '75%', name: 'Vikas Sharma' },
                  ].map((pin, i) => (
                    <div
                      key={i}
                      style={{
                        position: 'absolute',
                        top: pin.top,
                        left: pin.left,
                        transform: 'translate(-50%, -50%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                      }}
                    >
                      <div style={{
                        backgroundColor: '#2563eb',
                        color: '#fff',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
                      }}>
                        📍
                      </div>
                    </div>
                  ))}

                  {/* Rajahmundry Center Badge */}
                  <div style={{
                    backgroundColor: '#ffffff',
                    padding: '6px 12px',
                    borderRadius: '9999px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    fontSize: '12px',
                    fontWeight: '700',
                    zIndex: 10
                  }}>
                    📍 Rajahmundry Center
                  </div>
                </div>
              </div>

              {/* Why Choose Workify */}
              <div className="card" style={{ padding: '20px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '14px' }}>Why Choose Workify?</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <ShieldCheck size={18} color="#2563eb" />
                    <div>
                      <strong style={{ display: 'block' }}>Verified Professionals</strong>
                      <span style={{ color: '#64748b' }}>All workers are background verified</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <Calendar size={18} color="#2563eb" />
                    <div>
                      <strong style={{ display: 'block' }}>Real-time Availability</strong>
                      <span style={{ color: '#64748b' }}>See who is available now</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Post Job Banner */}
              <div style={{
                backgroundColor: '#eff6ff',
                border: '1px solid #bfdbfe',
                borderRadius: '12px',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#1e3a8a' }}>Need a custom job?</h4>
                  <p style={{ fontSize: '12px', color: '#3b82f6' }}>Post your requirements & let workers bid</p>
                </div>
                <Link to="/post-job" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '13px' }}>
                  Post Job &gt;
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
