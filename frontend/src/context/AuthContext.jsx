import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const PRESET_USERS = {
  customer: {
    id: 'cust_01',
    name: 'Sameera Moturi',
    phone: '+91 98480 23456',
    role: 'customer',
    roleLabel: 'Homeowner / Customer',
    locality: 'Danavaipeta',
    city: 'Rajahmundry',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120',
    email: 'sameera@workify.local',
    memberSince: 'Jan 2024',
    walletBalance: 850
  },
  worker: {
    id: 'worker_01',
    name: 'Ramesh Das',
    phone: '+91 98480 11223',
    role: 'worker',
    roleLabel: 'Verified Tradesman (Plumber)',
    category: 'Plumber',
    locality: 'Danavaipeta',
    city: 'Rajahmundry',
    avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=120',
    email: 'ramesh.plumber@workify.local',
    memberSince: 'Mar 2023',
    rating: 4.9,
    hourlyRate: 450,
    isVerified: true
  },
  admin: {
    id: 'admin_01',
    name: 'Admin Operations',
    phone: '+91 98480 99999',
    role: 'admin',
    roleLabel: 'Super Admin / Platform Governance',
    locality: 'RTC Complex Hub',
    city: 'Rajahmundry',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120',
    email: 'admin.rjy@workify.local',
    memberSince: 'Aug 2022'
  }
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('workify_auth_user');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading saved auth user:', e);
    }
    return PRESET_USERS.customer;
  });

  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('workify_auth_user', JSON.stringify(currentUser));
    } catch (e) {
      console.error('Error saving auth user:', e);
    }
  }, [currentUser]);

  const showToast = (msg) => {
    setNotificationMessage(msg);
    setTimeout(() => {
      setNotificationMessage(null);
    }, 4000);
  };

  // Instant login by role key (customer | worker | admin)
  const loginWithRole = (roleKey) => {
    const user = PRESET_USERS[roleKey] || PRESET_USERS.customer;
    setCurrentUser(user);
    showToast(`Logged in as ${user.name} (${user.role.toUpperCase()})`);
    return user;
  };

  // Login with Mobile Phone and OTP simulation
  const loginWithOtp = (phone, otp) => {
    // Determine user role or create dynamic session
    let matchedUser = Object.values(PRESET_USERS).find(u => u.phone.replace(/\s+/g, '') === phone.replace(/\s+/g, ''));
    
    if (!matchedUser) {
      // Dynamic customer user
      matchedUser = {
        id: `user_${Date.now().toString().slice(-4)}`,
        name: 'Rajahmundry Resident',
        phone: phone,
        role: 'customer',
        roleLabel: 'Homeowner / Customer',
        locality: 'Danavaipeta',
        city: 'Rajahmundry',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120',
        email: `${phone.slice(-6)}@workify.local`,
        memberSince: 'Just Now',
        walletBalance: 200
      };
    }
    
    setCurrentUser(matchedUser);
    showToast(`Welcome back, ${matchedUser.name}!`);
    return matchedUser;
  };

  // Register new user
  const registerUser = (userData) => {
    const newUser = {
      id: `usr_${Date.now().toString().slice(-4)}`,
      name: userData.name || 'New User',
      phone: userData.phone || '+91 98480 00000',
      role: userData.role || 'customer',
      roleLabel: userData.role === 'worker' ? `Skilled ${userData.category || 'Worker'}` : 'Homeowner / Customer',
      category: userData.category || '',
      locality: userData.locality || 'Danavaipeta',
      city: 'Rajahmundry',
      avatar: userData.role === 'worker'
        ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120'
        : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120',
      email: `${userData.name.toLowerCase().replace(/\s+/g, '')}@workify.local`,
      memberSince: 'Today',
      rating: userData.role === 'worker' ? 5.0 : undefined,
      hourlyRate: userData.role === 'worker' ? (userData.hourlyRate || 400) : undefined,
      isVerified: userData.role === 'worker' ? false : true,
      walletBalance: 250
    };

    setCurrentUser(newUser);
    showToast(`Account created! Welcome to Workify, ${newUser.name}.`);
    return newUser;
  };

  // Switch role quickly
  const switchRole = (roleKey) => {
    return loginWithRole(roleKey);
  };

  const logout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('workify_auth_user');
    } catch (e) {}
    showToast('Logged out successfully.');
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loginWithRole,
        loginWithOtp,
        registerUser,
        switchRole,
        logout,
        notificationMessage
      }}
    >
      {children}
      {/* Global Auth Toast */}
      {notificationMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          backgroundColor: '#0f172a',
          color: '#ffffff',
          padding: '12px 20px',
          borderRadius: '10px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          fontSize: '14px',
          fontWeight: '600',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          borderLeft: '4px solid #22c55e',
          animation: 'fadeIn 0.2s ease-out'
        }}>
          <span>🛡️</span>
          <span>{notificationMessage}</span>
        </div>
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
