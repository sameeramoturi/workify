import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Bell, User, ChevronDown, LogOut, Shield, Wrench, RefreshCw, LogIn } from 'lucide-react';
import LocationSelectorModal from './LocationSelectorModal';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ showSearch = true, activeCity = "Danavaipeta, Rajahmundry" }) {
  const navigate = useNavigate();
  const { currentUser, switchRole, logout } = useAuth();
  const [currentLocation, setCurrentLocation] = useState(() => {
    return localStorage.getItem('workify_location') || activeCity;
  });
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLocation = (loc) => {
    setCurrentLocation(loc.name);
    localStorage.setItem('workify_location', loc.name);
    localStorage.setItem('workify_locality', loc.locality || '');
    localStorage.setItem('workify_city', loc.city || 'Rajahmundry');
  };

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
      <LocationSelectorModal
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        selectedLocation={currentLocation}
        onSelectLocation={handleSelectLocation}
      />

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
            placeholder="Search for services, workers or skills in Rajahmundry..."
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.target.value.trim()) {
                navigate(`/workers?category=${encodeURIComponent(e.target.value.trim())}`);
              }
            }}
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
        {/* Location Selector Trigger */}
        <div
          onClick={() => setShowLocationModal(true)}
          title="Click to change location in Rajahmundry"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: '#1e40af',
            backgroundColor: '#eff6ff',
            padding: '6px 12px',
            borderRadius: '9999px',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
            border: '1px solid #bfdbfe',
            transition: 'all 0.15s ease'
          }}
        >
          <MapPin size={16} color="#2563eb" />
          <span style={{ maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {currentLocation}
          </span>
          <span style={{ fontSize: '10px', color: '#2563eb' }}>▼</span>
        </div>

        {/* Join as Worker CTA */}
        <Link
          to="/become-worker"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: '#92400e',
            backgroundColor: '#fffbeb',
            border: '1px solid #fde68a',
            padding: '6px 12px',
            borderRadius: '9999px',
            fontSize: '12px',
            fontWeight: '700',
            textDecoration: 'none',
            whiteSpace: 'nowrap'
          }}
        >
          <span>🔧</span>
          <span>Join as Worker</span>
        </Link>

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

        {/* User Profile & Role Switcher */}
        {currentUser ? (
          <div ref={menuRef} style={{ position: 'relative' }}>
            <div
              onClick={() => setShowUserMenu(!showUserMenu)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
                padding: '4px 8px 4px 4px',
                borderRadius: '9999px',
                backgroundColor: showUserMenu ? '#f1f5f9' : 'transparent',
                transition: 'background 0.15s ease'
              }}
            >
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#e0e7ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                border: '2px solid #2563eb'
              }}>
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <p style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a', margin: 0 }}>
                    {currentUser.name.split(' ')[0]}
                  </p>
                  <ChevronDown size={14} color="#64748b" />
                </div>
                <span style={{
                  fontSize: '10px',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  padding: '1px 6px',
                  borderRadius: '4px',
                  backgroundColor: currentUser.role === 'worker' ? '#fef3c7' : currentUser.role === 'admin' ? '#f3e8ff' : '#eff6ff',
                  color: currentUser.role === 'worker' ? '#b45309' : currentUser.role === 'admin' ? '#7e22ce' : '#1d4ed8'
                }}>
                  {currentUser.role}
                </span>
              </div>
            </div>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div style={{
                position: 'absolute',
                top: '48px',
                right: 0,
                width: '280px',
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)',
                padding: '14px',
                zIndex: 100,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                {/* Active User Card */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  paddingBottom: '12px',
                  borderBottom: '1px solid #f1f5f9'
                }}>
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <h4 style={{ margin: '0 0 2px 0', fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>
                      {currentUser.name}
                    </h4>
                    <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>
                      {currentUser.locality}, Rajahmundry
                    </p>
                    <span style={{ fontSize: '11px', color: '#2563eb', fontWeight: '600' }}>
                      {currentUser.phone}
                    </span>
                  </div>
                </div>

                {/* Quick Role Switcher Header */}
                <div>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Quick Switch Role
                  </span>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
                    {/* Customer */}
                    <button
                      type="button"
                      onClick={() => {
                        switchRole('customer');
                        setShowUserMenu(false);
                        navigate('/');
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 10px',
                        borderRadius: '8px',
                        border: currentUser.role === 'customer' ? '1px solid #bfdbfe' : '1px solid transparent',
                        backgroundColor: currentUser.role === 'customer' ? '#eff6ff' : 'transparent',
                        color: '#1e40af',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: '600',
                        textAlign: 'left'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>👤</span>
                        <span>Customer View</span>
                      </div>
                      {currentUser.role === 'customer' && <span style={{ fontSize: '11px', color: '#2563eb' }}>● Active</span>}
                    </button>

                    {/* Worker */}
                    <button
                      type="button"
                      onClick={() => {
                        switchRole('worker');
                        setShowUserMenu(false);
                        navigate('/worker-dashboard');
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 10px',
                        borderRadius: '8px',
                        border: currentUser.role === 'worker' ? '1px solid #fde68a' : '1px solid transparent',
                        backgroundColor: currentUser.role === 'worker' ? '#fffbeb' : 'transparent',
                        color: '#92400e',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: '600',
                        textAlign: 'left'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>🔧</span>
                        <span>Worker Dashboard</span>
                      </div>
                      {currentUser.role === 'worker' && <span style={{ fontSize: '11px', color: '#d97706' }}>● Active</span>}
                    </button>

                    {/* Admin */}
                    <button
                      type="button"
                      onClick={() => {
                        switchRole('admin');
                        setShowUserMenu(false);
                        navigate('/admin-dashboard');
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 10px',
                        borderRadius: '8px',
                        border: currentUser.role === 'admin' ? '1px solid #e9d5ff' : '1px solid transparent',
                        backgroundColor: currentUser.role === 'admin' ? '#faf5ff' : 'transparent',
                        color: '#6b21a8',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: '600',
                        textAlign: 'left'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>🛡️</span>
                        <span>Admin Dashboard</span>
                      </div>
                      {currentUser.role === 'admin' && <span style={{ fontSize: '11px', color: '#7c3aed' }}>● Active</span>}
                    </button>
                  </div>
                </div>

                {/* Footer Actions */}
                <div style={{
                  paddingTop: '10px',
                  borderTop: '1px solid #f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <Link
                    to="/login"
                    onClick={() => setShowUserMenu(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '12px',
                      color: '#2563eb',
                      fontWeight: '600',
                      textDecoration: 'none'
                    }}
                  >
                    <RefreshCw size={13} />
                    <span>Change Account</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setShowUserMenu(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontSize: '12px',
                      color: '#ef4444',
                      fontWeight: '600',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <LogOut size={13} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              backgroundColor: '#2563eb',
              color: '#ffffff',
              borderRadius: '9999px',
              fontSize: '13px',
              fontWeight: '700',
              textDecoration: 'none'
            }}
          >
            <LogIn size={15} />
            <span>Sign In</span>
          </Link>
        )}
      </div>
    </header>
  );
}
