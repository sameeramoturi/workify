import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import InteractiveMap from '../../components/InteractiveMap';
import { RAJAHMUNDRY_LOCALITIES, ANDHRA_PRADESH_CITIES } from '../../data/locations';
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
  Columns,
  SlidersHorizontal,
  ChevronRight,
  ChevronDown,
  Check,
  RotateCcw,
  Sparkles,
  X
} from 'lucide-react';

export default function FindWorkers() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [locationText, setLocationText] = useState(searchParams.get('city') || 'Rajahmundry');
  const [selectedLocality, setSelectedLocality] = useState('All');
  const [selectedAvailability, setSelectedAvailability] = useState('Anytime');
  const [workers, setWorkers] = useState(INITIAL_WORKERS);
  const [viewMode, setViewMode] = useState('both'); // 'both', 'list', 'map'
  const [hoveredWorkerId, setHoveredWorkerId] = useState(null);
  const [selectedWorkerId, setSelectedWorkerId] = useState(null);

  // Interactive Filter States
  const [minRating, setMinRating] = useState(0);
  const [minExperience, setMinExperience] = useState(0);
  const [priceFilter, setPriceFilter] = useState('All');
  const [maxDistance, setMaxDistance] = useState(10);
  const [sortBy, setSortBy] = useState('recommended');
  const [openDropdown, setOpenDropdown] = useState(null); // 'rating', 'experience', 'price', 'distance', 'sort'

  useEffect(() => {
    fetchWorkers({
      category: selectedCategory,
      city: locationText,
      locality: selectedLocality,
      availability: selectedAvailability
    }).then(setWorkers);
  }, [selectedCategory, locationText, selectedLocality, selectedAvailability]);

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
                  Location & Locality
                </label>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0 8px', backgroundColor: '#ffffff' }}>
                  <MapPin size={16} color="#2563eb" style={{ flexShrink: 0 }} />
                  <select
                    value={selectedLocality}
                    onChange={(e) => setSelectedLocality(e.target.value)}
                    style={{ width: '100%', padding: '10px 6px', border: 'none', outline: 'none', fontSize: '14px', backgroundColor: 'transparent', cursor: 'pointer' }}
                  >
                    <option value="All">📍 All Localities in Rajahmundry ({workers.length})</option>
                    <optgroup label="Popular Rajahmundry Localities">
                      {RAJAHMUNDRY_LOCALITIES.map(l => (
                        <option key={l.id} value={l.name}>📍 {l.name} ({l.pincode})</option>
                      ))}
                    </optgroup>
                    <optgroup label="Surrounding AP Cities">
                      {ANDHRA_PRADESH_CITIES.map(c => (
                        <option key={c.id} value={c.name}>🏙️ {c.name} ({c.district})</option>
                      ))}
                    </optgroup>
                  </select>
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

            {/* Quick Locality Filter Chips */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              overflowX: 'auto',
              paddingBottom: '10px',
              borderBottom: '1px solid #f1f5f9',
              marginBottom: '10px',
              scrollbarWidth: 'none'
            }}>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={13} color="#2563eb" /> Rajahmundry Localities:
              </span>
              <button
                type="button"
                onClick={() => setSelectedLocality('All')}
                style={{
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  fontSize: '11px',
                  fontWeight: selectedLocality === 'All' ? '700' : '500',
                  border: 'none',
                  backgroundColor: selectedLocality === 'All' ? '#2563eb' : '#f1f5f9',
                  color: selectedLocality === 'All' ? '#ffffff' : '#475569',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                All Localities ({workers.length})
              </button>
              {RAJAHMUNDRY_LOCALITIES.slice(0, 10).map(loc => {
                const isSelected = selectedLocality === loc.name;
                return (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => setSelectedLocality(loc.name)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '9999px',
                      fontSize: '11px',
                      fontWeight: isSelected ? '700' : '500',
                      border: 'none',
                      backgroundColor: isSelected ? '#2563eb' : '#f1f5f9',
                      color: isSelected ? '#ffffff' : '#475569',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {loc.name}
                  </button>
                );
              })}
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

          {/* View Mode Switcher Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>Available Workers</span>
                <span style={{ fontSize: '12px', fontWeight: '700', backgroundColor: '#dbeafe', color: '#1e40af', padding: '2px 8px', borderRadius: '9999px' }}>
                  {filteredWorkers.length} found in {selectedLocality === 'All' ? 'Rajahmundry' : selectedLocality}
                </span>
              </h3>
              <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
                Verified tradesmen near your locality with live GPS radar tracking
              </p>
            </div>

            {/* View Mode Switcher Buttons */}
            <div style={{ display: 'flex', gap: '6px', backgroundColor: '#ffffff', padding: '4px', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
              <button
                type="button"
                onClick={() => setViewMode('both')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  backgroundColor: viewMode === 'both' ? '#2563eb' : 'transparent',
                  color: viewMode === 'both' ? '#ffffff' : '#475569',
                  transition: 'all 0.15s ease'
                }}
              >
                <Columns size={15} /> Split View
              </button>

              <button
                type="button"
                onClick={() => setViewMode('map')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  backgroundColor: viewMode === 'map' ? '#2563eb' : 'transparent',
                  color: viewMode === 'map' ? '#ffffff' : '#475569',
                  transition: 'all 0.15s ease'
                }}
              >
                <MapIcon size={15} /> Full Map View
              </button>

              <button
                type="button"
                onClick={() => setViewMode('list')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  backgroundColor: viewMode === 'list' ? '#2563eb' : 'transparent',
                  color: viewMode === 'list' ? '#ffffff' : '#475569',
                  transition: 'all 0.15s ease'
                }}
              >
                <List size={15} /> List Only
              </button>
            </div>
          </div>

          {/* VIEW MODE: FULL MAP VIEW */}
          {viewMode === 'map' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <InteractiveMap
                workers={filteredWorkers}
                selectedWorkerId={hoveredWorkerId || selectedWorkerId}
                onSelectWorker={(w) => setSelectedWorkerId(w.id)}
                height="560px"
                showLocalityChips={true}
              />

              {/* Bottom Quick Worker Carousel */}
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '12px', color: '#1e293b' }}>
                  Quick Dispatch from Map ({filteredWorkers.length} Workers Available)
                </h4>
                <div style={{
                  display: 'flex',
                  gap: '16px',
                  overflowX: 'auto',
                  paddingBottom: '12px'
                }}>
                  {filteredWorkers.map(w => (
                    <div
                      key={w.id}
                      onClick={() => setSelectedWorkerId(w.id)}
                      onMouseEnter={() => setHoveredWorkerId(w.id)}
                      onMouseLeave={() => setHoveredWorkerId(null)}
                      className="card"
                      style={{
                        minWidth: '280px',
                        maxWidth: '280px',
                        padding: '16px',
                        cursor: 'pointer',
                        border: (selectedWorkerId === w.id || hoveredWorkerId === w.id) ? '2px solid #2563eb' : '1px solid #e2e8f0',
                        backgroundColor: (selectedWorkerId === w.id || hoveredWorkerId === w.id) ? '#eff6ff' : '#ffffff',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
                        <img
                          src={w.photo || 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=100'}
                          alt={w.name}
                          style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                        <div>
                          <strong style={{ fontSize: '14px', color: '#0f172a', display: 'block' }}>{w.name}</strong>
                          <span style={{ fontSize: '12px', color: '#2563eb', fontWeight: '600' }}>{w.category}</span>
                          <div style={{ fontSize: '11px', color: '#eab308', fontWeight: '700' }}>★ {w.rating} ({w.review_count})</div>
                        </div>
                      </div>
                      <div style={{ fontSize: '12px', color: '#475569', marginBottom: '8px' }}>
                        📍 <strong>{w.locality || 'Rajahmundry'}</strong> ({w.distance_km} km away)
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <span style={{ fontSize: '14px', fontWeight: '800', color: '#2563eb' }}>₹{w.hourly_rate}/hr</span>
                        <span className="badge badge-available">● {w.availability_status}</span>
                      </div>
                      <Link to={`/workers/${w.id}`} className="btn btn-primary" style={{ width: '100%', padding: '6px', fontSize: '12px' }}>
                        View Profile
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* VIEW MODE: SPLIT VIEW OR LIST VIEW */}
          {viewMode !== 'map' && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: viewMode === 'list' ? '1fr' : '1.35fr 1fr',
              gap: '24px',
              alignItems: 'start'
            }}>
              {/* Workers List Column */}
              <div>
                {filteredWorkers.length === 0 ? (
                  <div className="card" style={{ padding: '36px', textAlign: 'center' }}>
                    <div style={{ fontSize: '36px', marginBottom: '10px' }}>🔍</div>
                    <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', marginBottom: '6px' }}>
                      No workers found in this locality or criteria
                    </h4>
                    <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
                      Try selecting "All Localities in Rajahmundry" or resetting the filter options.
                    </p>
                    <button onClick={resetFilters} className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '13px' }}>
                      <RotateCcw size={14} /> Reset All Filters
                    </button>
                  </div>
                ) : (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: viewMode === 'list' ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)',
                    gap: '16px'
                  }}>
                    {filteredWorkers.map((worker) => {
                      const isHovered = hoveredWorkerId === worker.id || selectedWorkerId === worker.id;
                      return (
                        <div
                          key={worker.id}
                          className="card"
                          onMouseEnter={() => setHoveredWorkerId(worker.id)}
                          onMouseLeave={() => setHoveredWorkerId(null)}
                          onClick={() => setSelectedWorkerId(worker.id)}
                          style={{
                            padding: '18px',
                            cursor: 'pointer',
                            border: isHovered ? '2px solid #2563eb' : '1px solid #e2e8f0',
                            boxShadow: isHovered ? '0 8px 24px rgba(37, 99, 235, 0.16)' : '0 1px 3px rgba(0,0,0,0.04)',
                            transition: 'all 0.2s ease',
                            position: 'relative'
                          }}
                        >
                          <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                            <div style={{
                              width: '56px', height: '56px', borderRadius: '12px',
                              backgroundColor: '#dbeafe', overflow: 'hidden', flexShrink: 0
                            }}>
                              <img
                                src={worker.photo || `https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=150`}
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

                          {/* Location & Distance */}
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', marginBottom: '12px' }}>
                            <span style={{ color: '#1e40af', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '3px' }}>
                              <MapPin size={13} color="#2563eb" /> {worker.locality || 'Rajahmundry'} ({worker.distance_km} km)
                            </span>
                            <span className="badge badge-available">
                              ● Available
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

                          {/* CTA Row */}
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <Link
                              to={`/workers/${worker.id}`}
                              className="btn btn-outline"
                              style={{ flex: 1, fontSize: '13px', padding: '8px' }}
                            >
                              View Profile
                            </Link>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedWorkerId(worker.id);
                              }}
                              className="btn"
                              title="Focus worker on interactive map"
                              style={{
                                padding: '8px 10px',
                                backgroundColor: isHovered ? '#2563eb' : '#eff6ff',
                                color: isHovered ? '#ffffff' : '#2563eb',
                                border: '1px solid #bfdbfe'
                              }}
                            >
                              <MapPin size={15} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Right Column (Sticky Map & Perks) */}
              {viewMode === 'both' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'sticky', top: '80px' }}>
                  {/* Live Interactive Map Card */}
                  <div className="card" style={{ overflow: 'hidden' }}>
                    <div style={{
                      padding: '12px 16px',
                      backgroundColor: '#ffffff',
                      borderBottom: '1px solid #e2e8f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <MapIcon size={16} color="#2563eb" />
                        <span style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>
                          Live Map: Rajahmundry & Localities
                        </span>
                      </div>
                      <span style={{
                        fontSize: '11px',
                        color: '#059669',
                        fontWeight: '700',
                        backgroundColor: '#ecfdf5',
                        padding: '2px 8px',
                        borderRadius: '9999px'
                      }}>
                        ● {filteredWorkers.length} Workers Mapped
                      </span>
                    </div>

                    {/* High Performance OpenStreetMap Leaflet Map */}
                    <InteractiveMap
                      workers={filteredWorkers}
                      selectedWorkerId={hoveredWorkerId || selectedWorkerId}
                      onSelectWorker={(w) => setSelectedWorkerId(w.id)}
                      height="380px"
                      showLocalityChips={true}
                    />
                  </div>

                  {/* Why Choose Workify */}
                  <div className="card" style={{ padding: '20px' }}>
                    <h4 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '14px' }}>Why Choose Workify?</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <ShieldCheck size={18} color="#2563eb" />
                        <div>
                          <strong style={{ display: 'block' }}>Verified Professionals</strong>
                          <span style={{ color: '#64748b' }}>Aadhaar & Govt ITI verified tradesmen in AP</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <Calendar size={18} color="#2563eb" />
                        <div>
                          <strong style={{ display: 'block' }}>Real-time GPS Availability</strong>
                          <span style={{ color: '#64748b' }}>Direct dispatch within your neighborhood</span>
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
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
