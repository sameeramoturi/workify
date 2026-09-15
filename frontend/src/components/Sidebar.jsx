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
  User
} from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();

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
    </aside>
  );
}
