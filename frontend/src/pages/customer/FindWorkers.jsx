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
  ChevronRight,
  ChevronDown,
  Check,
  RotateCcw,
  X
} from 'lucide-react';

export default function FindWorkers() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [locationText, setLocationText] = useState(searchParams.get('city') || 'Rajahmundry');
  const [selectedAvailability, setSelectedAvailability] = useState('Anytime');
  const [workers, setWorkers] = useState(INITIAL_WORKERS);
  const [viewMode, setViewMode] = useState('both'); // 'both', 'list', 'map'

  // Interactive Filter States
  const [minRating, setMinRating] = useState(0);
  const [minExperience, setMinExperience] = useState(0);
  const [priceFilter, setPriceFilter] = useState('All');
  const [maxDistance, setMaxDistance] = useState(10);
  const [sortBy, setSortBy] = useState('recommended');
  const [openDropdown, setOpenDropdown] = useState(null); // 'rating', 'experience', 'price', 'distance', 'sort'

  useEffect(() => {
    fetchWorkers({ category: selectedCategory, city: locationText, availability: selectedAvailability }).then(setWorkers);
  }, [selectedCategory, locationText, selectedAvailability]);

  // Compute filtered & sorted workers dynamically
  const filteredWorkers = workers.filter(w => {
    if (minRating > 0 && w.rating < minRating) return false;
    if (minExperience > 0 && w.experience_years < minExperience) return false;
    if (priceFilter === 'under-400' && w.hourly_rate >= 400) return false;
    if (priceFilter === '400-500' && (w.hourly_rate < 400 || w.hourly_rate > 500)) return false;
    if (priceFilter === 'above-500' && w.hourly_rate <= 500) return false;
    if (maxDistance < 10 && w.distance_km > maxDistance) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'distance') return a.distance_km - b.distance_km;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'price-asc') return a.hourly_rate - b.hourly_rate;
    if (sortBy === 'price-desc') return b.hourly_rate - a.hourly_rate;
    if (sortBy === 'experience') return b.experience_years - a.experience_years;
    return 0;
  });

  const hasActiveFilters = minRating > 0 || minExperience > 0 || priceFilter !== 'All' || maxDistance < 10 || sortBy !== 'recommended';

  const resetFilters = () => {
    setMinRating(0);
    setMinExperience(0);
    setPriceFilter('All');
    setMaxDistance(10);
    setSortBy('recommended');
    setOpenDropdown(null);
  };

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
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', backgroundColor: '#fff', cursor: 'pointer' }}
                >
                  <option value="All">🌟 All Services (All Available Workers)</option>
                  <option value="Plumber">🔧 Plumbers (Bathroom & Leak Repair)</option>
                  <option value="Electrician">⚡ Electricians (Wiring & Inverter)</option>
                  <option value="Carpenter">🪚 Carpenters (Furniture & Woodwork)</option>
                  <option value="Painter">🎨 Painters (Wall & Waterproofing)</option>
                  <option value="AC Technician">❄️ AC Technicians (Service & Gas)</option>
                  <option value="Mechanic">⚙️ Mechanics (Bike & Car Service)</option>
                  <option value="Cleaner">🧹 Cleaners (Deep Home & Office Cleaning)</option>
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

            {/* Filter Pills with Interactive Dropdowns */}
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid #f1f5f9', flexWrap: 'wrap', position: 'relative' }}>
              {/* Rating Dropdown */}
              <div style={{ position: 'relative' }}>
                <button
                  type="button"
                  onClick={() => setOpenDropdown(openDropdown === 'rating' ? null : 'rating')}
                  className="btn btn-outline"
                  style={{
                    padding: '6px 12px',
                    fontSize: '13px',
                    backgroundColor: minRating > 0 ? '#eff6ff' : '#fff',
                    borderColor: minRating > 0 ? '#2563eb' : '#cbd5e1',
                    color: minRating > 0 ? '#2563eb' : '#334155',
                    fontWeight: minRating > 0 ? '700' : '500'
                  }}
                >
                  ⭐ {minRating > 0 ? `${minRating}+ Stars` : 'Rating'} <ChevronDown size={14} />
                </button>
                {openDropdown === 'rating' && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    marginTop: '6px',
                    width: '190px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.12)',
                    zIndex: 100,
                    padding: '6px 0'
                  }}>
                    {[
                      { label: 'All Ratings', value: 0 },
                      { label: '⭐ 4.5+ (Top Rated)', value: 4.5 },
                      { label: '⭐ 4.0+ & Above', value: 4.0 },
                      { label: '⭐ 3.5+ & Above', value: 3.5 },
                    ].map(opt => (
                      <div
                        key={opt.value}
                        onClick={() => { setMinRating(opt.value); setOpenDropdown(null); }}
                        style={{
                          padding: '8px 14px',
                          fontSize: '13px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          backgroundColor: minRating === opt.value ? '#eff6ff' : 'transparent',
                          color: minRating === opt.value ? '#2563eb' : '#334155',
                          fontWeight: minRating === opt.value ? '700' : '400'
                        }}
                      >
                        <span>{opt.label}</span>
                        {minRating === opt.value && <Check size={14} color="#2563eb" />}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Experience Dropdown */}
              <div style={{ position: 'relative' }}>
                <button
                  type="button"
                  onClick={() => setOpenDropdown(openDropdown === 'experience' ? null : 'experience')}
                  className="btn btn-outline"
                  style={{
                    padding: '6px 12px',
                    fontSize: '13px',
                    backgroundColor: minExperience > 0 ? '#eff6ff' : '#fff',
                    borderColor: minExperience > 0 ? '#2563eb' : '#cbd5e1',
                    color: minExperience > 0 ? '#2563eb' : '#334155',
                    fontWeight: minExperience > 0 ? '700' : '500'
                  }}
                >
                  💼 {minExperience > 0 ? `${minExperience}+ Yrs Exp` : 'Experience'} <ChevronDown size={14} />
                </button>
                {openDropdown === 'experience' && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    marginTop: '6px',
                    width: '210px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.12)',
                    zIndex: 100,
                    padding: '6px 0'
                  }}>
                    {[
                      { label: 'Any Experience', value: 0 },
                      { label: '3+ Years Experience', value: 3 },
                      { label: '5+ Years (Senior)', value: 5 },
                      { label: '7+ Years (Master / Expert)', value: 7 },
                    ].map(opt => (
                      <div
                        key={opt.value}
                        onClick={() => { setMinExperience(opt.value); setOpenDropdown(null); }}
                        style={{
                          padding: '8px 14px',
                          fontSize: '13px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          backgroundColor: minExperience === opt.value ? '#eff6ff' : 'transparent',
                          color: minExperience === opt.value ? '#2563eb' : '#334155',
                          fontWeight: minExperience === opt.value ? '700' : '400'
                        }}
                      >
                        <span>{opt.label}</span>
                        {minExperience === opt.value && <Check size={14} color="#2563eb" />}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Range Dropdown */}
              <div style={{ position: 'relative' }}>
                <button
                  type="button"
                  onClick={() => setOpenDropdown(openDropdown === 'price' ? null : 'price')}
                  className="btn btn-outline"
                  style={{
                    padding: '6px 12px',
                    fontSize: '13px',
                    backgroundColor: priceFilter !== 'All' ? '#eff6ff' : '#fff',
                    borderColor: priceFilter !== 'All' ? '#2563eb' : '#cbd5e1',
                    color: priceFilter !== 'All' ? '#2563eb' : '#334155',
                    fontWeight: priceFilter !== 'All' ? '700' : '500'
                  }}
                >
                  ₹ {priceFilter === 'under-400' ? '< ₹400/hr' : priceFilter === '400-500' ? '₹400-500/hr' : priceFilter === 'above-500' ? '> ₹500/hr' : 'Price Range'} <ChevronDown size={14} />
                </button>
                {openDropdown === 'price' && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    marginTop: '6px',
                    width: '220px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.12)',
                    zIndex: 100,
                    padding: '6px 0'
                  }}>
                    {[
                      { label: 'All Prices', value: 'All' },
                      { label: 'Budget (Under ₹400/hr)', value: 'under-400' },
                      { label: 'Standard (₹400 - ₹500/hr)', value: '400-500' },
                      { label: 'Premium (Above ₹500/hr)', value: 'above-500' },
                    ].map(opt => (
                      <div
                        key={opt.value}
                        onClick={() => { setPriceFilter(opt.value); setOpenDropdown(null); }}
                        style={{
                          padding: '8px 14px',
                          fontSize: '13px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          backgroundColor: priceFilter === opt.value ? '#eff6ff' : 'transparent',
                          color: priceFilter === opt.value ? '#2563eb' : '#334155',
                          fontWeight: priceFilter === opt.value ? '700' : '400'
                        }}
                      >
                        <span>{opt.label}</span>
                        {priceFilter === opt.value && <Check size={14} color="#2563eb" />}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Distance Dropdown */}
              <div style={{ position: 'relative' }}>
                <button
                  type="button"
                  onClick={() => setOpenDropdown(openDropdown === 'distance' ? null : 'distance')}
                  className="btn btn-outline"
                  style={{
                    padding: '6px 12px',
                    fontSize: '13px',
                    backgroundColor: maxDistance < 10 ? '#eff6ff' : '#fff',
                    borderColor: maxDistance < 10 ? '#2563eb' : '#cbd5e1',
                    color: maxDistance < 10 ? '#2563eb' : '#334155',
                    fontWeight: maxDistance < 10 ? '700' : '500'
                  }}
                >
                  📍 {maxDistance < 10 ? `< ${maxDistance} km` : 'Distance'} <ChevronDown size={14} />
                </button>
                {openDropdown === 'distance' && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    marginTop: '6px',
                    width: '200px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.12)',
                    zIndex: 100,
                    padding: '6px 0'
                  }}>
                    {[
                      { label: 'Any Distance (Up to 10 km)', value: 10 },
                      { label: 'Nearby (Within 3 km)', value: 3 },
                      { label: 'Within 5 km', value: 5 },
                      { label: 'Within 7 km', value: 7 },
                    ].map(opt => (
                      <div
                        key={opt.value}
                        onClick={() => { setMaxDistance(opt.value); setOpenDropdown(null); }}
                        style={{
                          padding: '8px 14px',
                          fontSize: '13px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          backgroundColor: maxDistance === opt.value ? '#eff6ff' : 'transparent',
                          color: maxDistance === opt.value ? '#2563eb' : '#334155',
                          fontWeight: maxDistance === opt.value ? '700' : '400'
                        }}
                      >
                        <span>{opt.label}</span>
                        {maxDistance === opt.value && <Check size={14} color="#2563eb" />}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Reset All Filters Button */}
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="btn btn-outline"
                  style={{
                    padding: '6px 12px',
                    fontSize: '12px',
                    color: '#ef4444',
                    borderColor: '#fca5a5',
                    backgroundColor: '#fff5f5'
                  }}
                >
                  <RotateCcw size={13} /> Reset Filters
                </button>
              )}

              {/* Sort By Dropdown */}
              <div style={{ position: 'relative', marginLeft: 'auto' }}>
                <button
                  type="button"
                  onClick={() => setOpenDropdown(openDropdown === 'sort' ? null : 'sort')}
                  className="btn btn-outline"
                  style={{
                    padding: '6px 12px',
                    fontSize: '13px',
                    backgroundColor: sortBy !== 'recommended' ? '#eff6ff' : '#fff',
                    borderColor: sortBy !== 'recommended' ? '#2563eb' : '#cbd5e1',
                    color: sortBy !== 'recommended' ? '#2563eb' : '#334155',
                    fontWeight: sortBy !== 'recommended' ? '700' : '500'
                  }}
                >
                  <SlidersHorizontal size={14} /> Sort By: {
                    sortBy === 'distance' ? 'Nearest' :
                    sortBy === 'rating' ? 'Top Rated' :
                    sortBy === 'price-asc' ? 'Lowest Price' :
                    sortBy === 'price-desc' ? 'Highest Price' :
                    sortBy === 'experience' ? 'Most Exp' : 'AI Match'
                  } <ChevronDown size={14} />
                </button>
                {openDropdown === 'sort' && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '6px',
                    width: '230px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.12)',
                    zIndex: 100,
                    padding: '6px 0'
                  }}>
                    {[
                      { label: '✨ AI Match (Default)', value: 'recommended' },
                      { label: '📍 Distance: Nearest First', value: 'distance' },
                      { label: '⭐ Rating: High to Low', value: 'rating' },
                      { label: '💰 Price: Low to High', value: 'price-asc' },
                      { label: '💎 Price: High to Low', value: 'price-desc' },
                      { label: '💼 Experience: Most Experienced', value: 'experience' },
                    ].map(opt => (
                      <div
                        key={opt.value}
                        onClick={() => { setSortBy(opt.value); setOpenDropdown(null); }}
                        style={{
                          padding: '8px 14px',
                          fontSize: '13px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          backgroundColor: sortBy === opt.value ? '#eff6ff' : 'transparent',
                          color: sortBy === opt.value ? '#2563eb' : '#334155',
                          fontWeight: sortBy === opt.value ? '700' : '400'
                        }}
                      >
                        <span>{opt.label}</span>
                        {sortBy === opt.value && <Check size={14} color="#2563eb" />}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content Grid: Workers List (Left) + Interactive Map & Perks (Right) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '24px', alignItems: 'start' }}>
            {/* Left Column: Worker Cards Grid */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b' }}>
                  Available Workers ({filteredWorkers.length} found)
                </h3>
              </div>

              {filteredWorkers.length === 0 ? (
                <div className="card" style={{ padding: '36px', textAlign: 'center' }}>
                  <div style={{ fontSize: '36px', marginBottom: '10px' }}>🔍</div>
                  <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', marginBottom: '6px' }}>
                    No workers match your filter criteria
                  </h4>
                  <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
                    Try relaxing your rating, experience, or price filters to see more workers.
                  </p>
                  <button onClick={resetFilters} className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '13px' }}>
                    <RotateCcw size={14} /> Reset All Filters
                  </button>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                  {filteredWorkers.map((worker) => (
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
