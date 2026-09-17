import React, { useState } from 'react';
import { RAJAHMUNDRY_LOCALITIES, ANDHRA_PRADESH_CITIES } from '../data/locations';
import { Search, MapPin, Navigation, X, Check, Building, Sparkles } from 'lucide-react';

export default function LocationSelectorModal({ isOpen, onClose, selectedLocation, onSelectLocation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('LOCALITIES'); // 'LOCALITIES' or 'CITIES'
  const [detectingGps, setDetectingGps] = useState(false);

  if (!isOpen) return null;

  const filteredLocalities = RAJAHMUNDRY_LOCALITIES.filter(l =>
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.pincode.includes(searchQuery) ||
    l.landmarks.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCities = ANDHRA_PRADESH_CITIES.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.district.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSimulateGps = () => {
    setDetectingGps(true);
    setTimeout(() => {
      setDetectingGps(false);
      onSelectLocation({
        name: 'Danavaipeta, Rajahmundry',
        city: 'Rajahmundry',
        locality: 'Danavaipeta',
        pincode: '533103',
        lat: 16.9965,
        lng: 81.7885
      });
      onClose();
    }, 800);
  };

  const handlePickLocality = (loc) => {
    onSelectLocation({
      name: `${loc.name}, Rajahmundry`,
      city: 'Rajahmundry',
      locality: loc.name,
      pincode: loc.pincode,
      lat: loc.lat,
      lng: loc.lng
    });
    onClose();
  };

  const handlePickCity = (city) => {
    onSelectLocation({
      name: city.name,
      city: city.name,
      locality: 'All',
      pincode: city.pinCodePrefix,
      lat: city.lat,
      lng: city.lng
    });
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.65)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '680px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
        overflow: 'hidden',
        animation: 'fadeIn 0.2s ease-out'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#f8fafc'
        }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
              <MapPin size={20} color="#2563eb" />
              Select Service Location
            </h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
              Choose your locality in Rajahmundry or browse nearby Andhra Pradesh hubs
            </p>
          </div>
          <button
            onClick={onClose}
            type="button"
            style={{
              background: '#f1f5f9',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#64748b'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Search & GPS Detect */}
        <div style={{ padding: '18px 24px', borderBottom: '1px solid #f1f5f9' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#f1f5f9',
            borderRadius: '10px',
            padding: '10px 14px',
            gap: '10px',
            marginBottom: '12px'
          }}>
            <Search size={18} color="#94a3b8" />
            <input
              type="text"
              placeholder="Search locality, street, or pincode (e.g. Danavaipeta, Morampudi, 533103)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              style={{
                border: 'none',
                backgroundColor: 'transparent',
                outline: 'none',
                width: '100%',
                fontSize: '14px',
                color: '#1e293b'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                type="button"
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#94a3b8' }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* GPS Auto-Detect Button */}
          <button
            onClick={handleSimulateGps}
            disabled={detectingGps}
            type="button"
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '10px',
              backgroundColor: '#eff6ff',
              border: '1px dashed #3b82f6',
              borderRadius: '8px',
              color: '#2563eb',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            <Navigation size={15} />
            {detectingGps ? 'Detecting current GPS coordinates...' : 'Use My Current GPS Location (Danavaipeta Hub)'}
          </button>
        </div>

        {/* Tabs: Localities vs Nearby Cities */}
        <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', backgroundColor: '#ffffff' }}>
          <button
            onClick={() => setActiveTab('LOCALITIES')}
            type="button"
            style={{
              flex: 1,
              padding: '12px',
              fontSize: '14px',
              fontWeight: '700',
              border: 'none',
              backgroundColor: 'transparent',
              borderBottom: activeTab === 'LOCALITIES' ? '2px solid #2563eb' : '2px solid transparent',
              color: activeTab === 'LOCALITIES' ? '#2563eb' : '#64748b',
              cursor: 'pointer'
            }}
          >
            📍 Rajahmundry Localities ({filteredLocalities.length})
          </button>
          <button
            onClick={() => setActiveTab('CITIES')}
            type="button"
            style={{
              flex: 1,
              padding: '12px',
              fontSize: '14px',
              fontWeight: '700',
              border: 'none',
              backgroundColor: 'transparent',
              borderBottom: activeTab === 'CITIES' ? '2px solid #2563eb' : '2px solid transparent',
              color: activeTab === 'CITIES' ? '#2563eb' : '#64748b',
              cursor: 'pointer'
            }}
          >
            🏙️ Surrounding AP Cities ({filteredCities.length})
          </button>
        </div>

        {/* Scrollable Location List */}
        <div style={{
          padding: '18px 24px',
          overflowY: 'auto',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          {activeTab === 'LOCALITIES' ? (
            filteredLocalities.length > 0 ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '10px'
              }}>
                {filteredLocalities.map((loc) => {
                  const isSelected = selectedLocation?.toLowerCase().includes(loc.name.toLowerCase());
                  return (
                    <div
                      key={loc.id}
                      onClick={() => handlePickLocality(loc)}
                      style={{
                        padding: '12px 14px',
                        borderRadius: '10px',
                        border: isSelected ? '2px solid #2563eb' : '1px solid #e2e8f0',
                        backgroundColor: isSelected ? '#eff6ff' : '#ffffff',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '3px',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <strong style={{ fontSize: '14px', color: isSelected ? '#1e40af' : '#0f172a' }}>
                          {loc.name}
                        </strong>
                        <span style={{ fontSize: '11px', fontWeight: '700', backgroundColor: '#e2e8f0', color: '#475569', padding: '1px 6px', borderRadius: '4px' }}>
                          {loc.pincode}
                        </span>
                      </div>
                      <span style={{ fontSize: '12px', color: '#64748b' }}>{loc.landmarks}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px', fontSize: '11px', color: '#10b981', fontWeight: '600' }}>
                        <span>⚡ {loc.workerCount} available workers</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '32px 0', color: '#64748b' }}>
                <p>No localities matched "{searchQuery}". Try searching another area in Rajahmundry.</p>
              </div>
            )
          ) : (
            filteredCities.length > 0 ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '10px'
              }}>
                {filteredCities.map((city) => {
                  const isSelected = selectedLocation?.toLowerCase().includes(city.name.toLowerCase());
                  return (
                    <div
                      key={city.id}
                      onClick={() => handlePickCity(city)}
                      style={{
                        padding: '12px 14px',
                        borderRadius: '10px',
                        border: isSelected ? '2px solid #2563eb' : '1px solid #e2e8f0',
                        backgroundColor: isSelected ? '#eff6ff' : '#ffffff',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '3px',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <strong style={{ fontSize: '14px', color: isSelected ? '#1e40af' : '#0f172a' }}>
                          {city.name} {city.isPrimary && '🌟'}
                        </strong>
                        <span style={{ fontSize: '11px', color: '#2563eb', fontWeight: '700' }}>
                          {city.district}
                        </span>
                      </div>
                      <span style={{ fontSize: '12px', color: '#64748b' }}>{city.tagline}</span>
                      <span style={{ fontSize: '11px', color: '#059669', fontWeight: '600', marginTop: '4px' }}>
                        {city.activeWorkers}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '32px 0', color: '#64748b' }}>
                <p>No city matched "{searchQuery}".</p>
              </div>
            )
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '14px 24px',
          borderTop: '1px solid #e2e8f0',
          backgroundColor: '#f8fafc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '12px',
          color: '#64748b'
        }}>
          <span>Active Location: <strong style={{ color: '#0f172a' }}>{selectedLocation || 'Rajahmundry'}</strong></span>
          <button
            onClick={onClose}
            className="btn btn-primary"
            style={{ padding: '6px 16px', fontSize: '12px' }}
          >
            Confirm & Close
          </button>
        </div>
      </div>
    </div>
  );
}
