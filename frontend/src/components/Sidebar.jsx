import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Users,
  CalendarPlus,
  Calendar,
  MessageSquare,
  Star,
  Wallet,
  User,
  Shield,
  Briefcase,
  ArrowRightLeft
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const location = useLocation();
  const { currentUser, switchRole } = useAuth();

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Find Workers', path: '/workers', icon: Users },
    { label: 'Post Job', path: '/post-job', icon: CalendarPlus },
    { label: 'My Bookings', path: '/bookings', icon: Calendar },
    { label: 'Messages', path: '/messages', icon: MessageSquare, badge: 3 },
    { label: 'Reviews', path: '/reviews', icon: Star },
    { label: 'Wallet', path: '/wallet', icon: Wallet },
    { label: 'Profile', path: '/workers/1', icon: User },
  ];

  return (
    <aside style={{
      width: '240px',
      backgroundColor: '#ffffff',
      borderRight: '1px solid #e2e8f0',
      minHeight: 'calc(100vh - 65px)',
      padding: '20px 12px',
      display: 'flex',
      flexDirection: 'column',
      gap: '6px'
    }}>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.label}
            to={item.path}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 16px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: isActive ? '600' : '500',
              color: isActive ? '#2563eb' : '#475569',
              backgroundColor: isActive ? '#eff6ff' : 'transparent',
              transition: 'all 0.15s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Icon size={19} color={isActive ? '#2563eb' : '#64748b'} />
              <span>{item.label}</span>
            </div>
            {item.badge && (
              <span style={{
                backgroundColor: '#ef4444',
                color: '#fff',
                fontSize: '11px',
                padding: '2px 7px',
                borderRadius: '9999px',
                fontWeight: 'bold'
              }}>
                {item.badge}
              </span>
            )}
          </Link>
        );
      })}

      {/* Role Switcher Widget at Bottom of Sidebar */}
      <div style={{
        marginTop: 'auto',
        paddingTop: '16px',
        borderTop: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        {currentUser && (
          <div style={{
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                  {currentUser.name}
                </div>
                <div style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', color: currentUser.role === 'worker' ? '#b45309' : currentUser.role === 'admin' ? '#7e22ce' : '#2563eb' }}>
                  ● {currentUser.role}
                </div>
              </div>
            </div>

            {/* Quick Switch Links */}
            <div style={{ display: 'flex', gap: '6px' }}>
              {currentUser.role !== 'worker' ? (
                <button
                  type="button"
                  onClick={() => switchRole('worker')}
                  style={{
                    flex: 1,
                    padding: '6px',
                    backgroundColor: '#fffbeb',
                    border: '1px solid #fde68a',
                    color: '#92400e',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px'
                  }}
                >
                  <Wrench size={12} />
                  <span>Worker</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => switchRole('customer')}
                  style={{
                    flex: 1,
                    padding: '6px',
                    backgroundColor: '#eff6ff',
                    border: '1px solid #bfdbfe',
                    color: '#1d4ed8',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px'
                  }}
                >
                  <User size={12} />
                  <span>Customer</span>
                </button>
              )}

              {currentUser.role !== 'admin' && (
                <button
                  type="button"
                  onClick={() => switchRole('admin')}
                  style={{
                    flex: 1,
                    padding: '6px',
                    backgroundColor: '#faf5ff',
                    border: '1px solid #e9d5ff',
                    color: '#6b21a8',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px'
                  }}
                >
                  <Shield size={12} />
                  <span>Admin</span>
                </button>
              )}
            </div>
          </div>
        )}

        <Link
          to="/login"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            padding: '8px',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: '600',
            color: '#64748b',
            textDecoration: 'none',
            backgroundColor: '#f1f5f9'
          }}
        >
          <ArrowRightLeft size={13} />
          <span>Login / Switch Account</span>
        </Link>
      </div>
    </aside>
  );
}
