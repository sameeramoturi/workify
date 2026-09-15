import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Bell, User } from 'lucide-react';

export default function Navbar({ showSearch = true, activeCity = "Rajahmundry" }) {
  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 32px',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      {/* Brand Logo */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          backgroundColor: '#2563eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontWeight: 'bold',
          fontSize: '20px'
        }}>
          ⚡
        </div>
        <div>
          <span style={{ fontSize: '22px', fontWeight: '800', color: '#1e293b', letterSpacing: '-0.5px' }}>
            Workify
          </span>
          <p style={{ fontSize: '10px', color: '#64748b', marginTop: '-4px' }}>
            Skilled Workers. Better Tomorrow.
          </p>
        </div>
      </Link>

      {/* Global Search Bar */}
      {showSearch && (
        <div style={{
          flex: '0 1 500px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center'
        }}>
          <Search size={18} style={{ position: 'absolute', left: '16px', color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Search for services, workers or skills..."
            style={{
              width: '100%',
              padding: '10px 16px 10px 44px',
              borderRadius: '9999px',
              border: '1px solid #cbd5e1',
              outline: 'none',
              fontSize: '14px',
              backgroundColor: '#f8fafc'
            }}
          />
        </div>
      )}

      {/* Right Controls: Location, Notifications & Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {/* Location Selector */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          color: '#334155',
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer'
        }}>
          <MapPin size={18} color="#2563eb" />
          <span>{activeCity}</span>
          <span style={{ fontSize: '10px', color: '#94a3b8' }}>▼</span>
        </div>

        {/* Notifications */}
        <div style={{ position: 'relative', cursor: 'pointer' }}>
          <Bell size={20} color="#475569" />
          <span style={{
            position: 'absolute',
            top: '-6px',
            right: '-6px',
            backgroundColor: '#ef4444',
            color: '#fff',
            fontSize: '10px',
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold'
          }}>
            3
          </span>
        </div>

        {/* User Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#e0e7ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
              alt="Sameera"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div>
            <p style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a', margin: 0 }}>Sameera</p>
            <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>Customer</p>
          </div>
        </div>
      </div>
    </header>
  );
}
