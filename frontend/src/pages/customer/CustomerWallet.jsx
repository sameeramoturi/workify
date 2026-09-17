import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import {
  Wallet,
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
  Plus,
  CheckCircle2,
  Gift,
  Download,
  Copy,
  Check,
  Percent,
  ShieldCheck,
  Building,
  Smartphone,
  ChevronRight,
  X,
  FileText,
  Sparkles,
  Zap,
  Info
} from 'lucide-react';

const INITIAL_TRANSACTIONS = [
  {
    id: 'TXN-90214',
    title: 'Payment to Ramesh Das (Plumber)',
    subtitle: 'Booking #WK-894215 • Leak Repair at Danavaipeta',
    type: 'DEBIT',
    amount: 450,
    date: 'Today, 10:30 AM',
    paymentMethod: 'Workify Cash Wallet',
    status: 'COMPLETED',
    invoiceId: 'INV-2026-0812'
  },
  {
    id: 'TXN-88412',
    title: 'Wallet Top-Up via PhonePe UPI',
    subtitle: 'UPI Ref: 429104829104',
    type: 'CREDIT',
    amount: 1000,
    date: 'Yesterday, 2:15 PM',
    paymentMethod: 'PhonePe UPI (sameera@ybl)',
    status: 'COMPLETED',
    invoiceId: 'INV-2026-0799'
  },
  {
    id: 'TXN-84210',
    title: 'Payment to Amit Verma (Electrician)',
    subtitle: 'Booking #WK-551902 • Inverter Check at Prakash Nagar',
    type: 'DEBIT',
    amount: 400,
    date: '14 Sep 2026, 5:00 PM',
    paymentMethod: 'Workify Cash Wallet',
    status: 'COMPLETED',
    invoiceId: 'INV-2026-0754'
  },
  {
    id: 'TXN-81093',
    title: 'Godavari Festival Promo Cashback',
    subtitle: 'Reward from Rajahmundry Local Trade Program',
    type: 'CREDIT',
    amount: 100,
    date: '12 Sep 2026, 11:00 AM',
    paymentMethod: 'System Promotional Credit',
    status: 'COMPLETED',
    invoiceId: 'INV-2026-0711'
  },
  {
    id: 'TXN-76501',
    title: 'Payment to Vikas Sharma (AC Technician)',
    subtitle: 'Booking #WK-310948 • Jet Foam Wash at Dowleswaram',
    type: 'DEBIT',
    amount: 650,
    date: '10 Sep 2026, 4:20 PM',
    paymentMethod: 'Google Pay UPI',
    status: 'COMPLETED',
    invoiceId: 'INV-2026-0689'
  }
];

export default function CustomerWallet() {
  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem('workify_wallet_balance');
    return saved !== null ? parseFloat(saved) : 1250.00;
  });

  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem('workify_wallet_transactions');
      return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
    } catch {
      return INITIAL_TRANSACTIONS;
    }
  });

  const [activeTab, setActiveTab] = useState('ALL'); // ALL, DEBIT, CREDIT
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false);
  const [addAmount, setAddAmount] = useState('500');
  const [selectedUpiApp, setSelectedUpiApp] = useState('phonepe');
  const [copiedCoupon, setCopiedCoupon] = useState(null);
  const [scratchRevealed, setScratchRevealed] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    localStorage.setItem('workify_wallet_balance', balance.toString());
  }, [balance]);

  useEffect(() => {
    try {
      localStorage.setItem('workify_wallet_transactions', JSON.stringify(transactions));
    } catch (err) {
      console.warn("Storage write failed", err);
    }
  }, [transactions]);

  const handleAddMoney = (e) => {
    e.preventDefault();
    const val = parseFloat(addAmount);
    if (isNaN(val) || val <= 0) return;

    const newBalance = balance + val;
    setBalance(newBalance);

    const newTxn = {
      id: `TXN-${Math.floor(10000 + Math.random() * 90000)}`,
      title: `Wallet Top-Up via ${selectedUpiApp.toUpperCase()} UPI`,
      subtitle: `UPI Transaction ID: ${Math.floor(100000000000 + Math.random() * 900000000000)}`,
      type: 'CREDIT',
      amount: val,
      date: 'Just now',
      paymentMethod: `${selectedUpiApp.toUpperCase()} UPI`,
      status: 'COMPLETED',
      invoiceId: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`
    };

    setTransactions([newTxn, ...transactions]);
    setShowAddMoneyModal(false);

    setToastMessage(`🎉 ₹${val} added to your Workify Wallet successfully!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleCopyCode = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCoupon(code);
    setTimeout(() => setCopiedCoupon(null), 2000);
  };

  const filteredTxns = transactions.filter(t => {
    if (activeTab === 'DEBIT') return t.type === 'DEBIT';
    if (activeTab === 'CREDIT') return t.type === 'CREDIT';
    return true;
  });

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <Navbar activeCity="Danavaipeta, Rajahmundry" />

      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '80px',
          right: '32px',
          backgroundColor: '#059669',
          color: '#ffffff',
          padding: '12px 20px',
          borderRadius: '10px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontWeight: '700',
          fontSize: '14px',
          animation: 'fadeIn 0.2s ease-out'
        }}>
          <CheckCircle2 size={18} /> {toastMessage}
        </div>
      )}

      <div style={{ display: 'flex' }}>
        <Sidebar />

        <main style={{ flex: 1, padding: '24px 32px' }}>
          {/* Top Title Banner */}
          <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>Customer Wallet & Digital Payments</span>
                <span style={{ fontSize: '12px', fontWeight: '700', backgroundColor: '#dcfce7', color: '#15803d', padding: '2px 10px', borderRadius: '9999px' }}>
                  100% Secure UPI & Cash
                </span>
              </h1>
              <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
                Instant doorstep service payments, Rajahmundry promotional cashback, and automated OTP escrow refunds.
              </p>
            </div>

            <button
              onClick={() => setShowAddMoneyModal(true)}
              className="btn btn-primary"
              style={{ padding: '10px 20px', fontSize: '14px', gap: '8px' }}
            >
              <Plus size={18} /> Add Money to Wallet
            </button>
          </div>

          {/* 3 Overview Metric Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '24px' }}>
            {/* 1. Wallet Balance */}
            <div className="card" style={{
              padding: '24px',
              background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 100%)',
              color: '#ffffff',
              borderRadius: '16px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <span style={{ fontSize: '13px', color: '#bfdbfe', fontWeight: '600' }}>Workify Cash Balance</span>
                  <div style={{ fontSize: '32px', fontWeight: '900', letterSpacing: '-0.5px', marginTop: '4px' }}>
                    ₹{balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </div>
                </div>
                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '50%',
                  width: '44px',
                  height: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Wallet size={22} color="#ffffff" />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '14px', borderTop: '1px solid rgba(255, 255, 255, 0.2)' }}>
                <span style={{ fontSize: '12px', color: '#dbeafe' }}>
                  Auto-Deduct on OTP Completion: <strong style={{ color: '#ffffff' }}>Active</strong>
                </span>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#bbf7d0' }}>
                  Instant Escrow
                </span>
              </div>
            </div>

            {/* 2. Rewards & Coins */}
            <div className="card" style={{
              padding: '24px',
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '600' }}>Workify Reward Points</span>
                  <div style={{ fontSize: '32px', fontWeight: '900', color: '#d97706', letterSpacing: '-0.5px', marginTop: '4px' }}>
                    420 Coins
                  </div>
                </div>
                <div style={{
                  backgroundColor: '#fef3c7',
                  borderRadius: '50%',
                  width: '44px',
                  height: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Gift size={22} color="#d97706" />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '14px', borderTop: '1px solid #f1f5f9', fontSize: '12px', color: '#64748b' }}>
                <span>Value: <strong>₹42.00 off</strong> next booking</span>
                <span style={{ color: '#2563eb', fontWeight: '700' }}>Earn 2x on UPI</span>
              </div>
            </div>

            {/* 3. Safety Escrow Guarantee */}
            <div className="card" style={{
              padding: '24px',
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '600' }}>Customer Protection</span>
                  <div style={{ fontSize: '20px', fontWeight: '800', color: '#059669', marginTop: '6px' }}>
                    100% Escrow Hold
                  </div>
                </div>
                <div style={{
                  backgroundColor: '#d1fae5',
                  borderRadius: '50%',
                  width: '44px',
                  height: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <ShieldCheck size={22} color="#059669" />
                </div>
              </div>

              <p style={{ fontSize: '12px', color: '#64748b', margin: 0, paddingTop: '10px', borderTop: '1px solid #f1f5f9' }}>
                Payment is only released to the worker after you verify the work and give them the 4-digit OTP.
              </p>
            </div>
          </div>

          {/* 2-Column Content Grid: Left (Payment Methods & Coupons) + Right (Transactions) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.35fr', gap: '24px', alignItems: 'start' }}>
            {/* LEFT COLUMN: PAYMENT MODES & OFFERS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Linked UPI & Payment Methods */}
              <div className="card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Smartphone size={18} color="#2563eb" />
                  Linked UPI & Payment Modes
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                  {/* Google Pay */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: '1px solid #e2e8f0',
                    backgroundColor: '#f8fafc'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold', color: '#4285f4' }}>
                        G
                      </div>
                      <div>
                        <strong style={{ fontSize: '13px', color: '#0f172a', display: 'block' }}>Google Pay UPI</strong>
                        <span style={{ fontSize: '11px', color: '#64748b' }}>sameera@oksbi • Primary</span>
                      </div>
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: '700', color: '#059669', backgroundColor: '#dcfce7', padding: '2px 8px', borderRadius: '4px' }}>
                      Verified
                    </span>
                  </div>

                  {/* PhonePe */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: '1px solid #e2e8f0',
                    backgroundColor: '#f8fafc'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold', color: '#5f259f' }}>
                        Pe
                      </div>
                      <div>
                        <strong style={{ fontSize: '13px', color: '#0f172a', display: 'block' }}>PhonePe UPI</strong>
                        <span style={{ fontSize: '11px', color: '#64748b' }}>9876543210@ybl</span>
                      </div>
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: '700', color: '#059669', backgroundColor: '#dcfce7', padding: '2px 8px', borderRadius: '4px' }}>
                      Active
                    </span>
                  </div>

                  {/* Saved Card */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: '1px solid #e2e8f0',
                    backgroundColor: '#f8fafc'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <CreditCard size={20} color="#2563eb" />
                      <div>
                        <strong style={{ fontSize: '13px', color: '#0f172a', display: 'block' }}>HDFC Bank Platinum Debit</strong>
                        <span style={{ fontSize: '11px', color: '#64748b' }}>•••• 4821 • Exp 08/28</span>
                      </div>
                    </div>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>VISA</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAddMoneyModal(true)}
                  className="btn btn-outline"
                  style={{ width: '100%', fontSize: '13px', padding: '8px' }}
                >
                  + Link Another UPI ID or Card
                </button>
              </div>

              {/* Interactive Scratch Card Widget */}
              <div className="card" style={{
                padding: '24px',
                background: 'linear-gradient(135deg, #fef3c7 0%, #fef9c3 100%)',
                border: '1px solid #fde047',
                borderRadius: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Sparkles size={18} color="#d97706" />
                  <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#92400e', margin: 0 }}>
                    Rajahmundry Homeowner Scratch Card
                  </h3>
                </div>
                <p style={{ fontSize: '12px', color: '#b45309', marginBottom: '14px' }}>
                  Tap the scratch card below to reveal your exclusive local service reward:
                </p>

                {!scratchRevealed ? (
                  <div
                    onClick={() => setScratchRevealed(true)}
                    style={{
                      height: '90px',
                      borderRadius: '12px',
                      backgroundColor: '#f59e0b',
                      backgroundImage: 'radial-gradient(#d97706 2px, transparent 2px)',
                      backgroundSize: '12px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(217, 119, 6, 0.25)',
                      transition: 'transform 0.15s ease'
                    }}
                  >
                    <span style={{ color: '#ffffff', fontWeight: '800', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      🎁 Tap Here to Scratch & Win!
                    </span>
                  </div>
                ) : (
                  <div style={{
                    padding: '16px',
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    border: '2px dashed #d97706',
                    textAlign: 'center',
                    animation: 'fadeIn 0.3s ease-out'
                  }}>
                    <span style={{ fontSize: '24px' }}>🎉</span>
                    <strong style={{ fontSize: '16px', color: '#92400e', display: 'block', marginTop: '4px' }}>
                      Flat ₹100 OFF on Plumbing & AC!
                    </strong>
                    <p style={{ fontSize: '12px', color: '#64748b', margin: '4px 0 10px 0' }}>
                      Valid on bookings across Danavaipeta, Morampudi & central areas.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                      <span style={{ backgroundColor: '#fef3c7', padding: '4px 12px', borderRadius: '6px', fontWeight: '800', color: '#b45309', fontSize: '13px', letterSpacing: '1px' }}>
                        GODAVARI100
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopyCode('GODAVARI100')}
                        className="btn btn-primary"
                        style={{ padding: '4px 10px', fontSize: '11px' }}
                      >
                        {copiedCoupon === 'GODAVARI100' ? 'Copied! ✓' : 'Copy'}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Promotional Discount Coupons */}
              <div className="card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '14px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Percent size={17} color="#2563eb" />
                  Available Promo Coupons
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { code: 'WELCOME50', desc: '50% OFF up to ₹150 on your first booking', tag: 'New User' },
                    { code: 'RAJAHMUNDRY10', desc: '10% Cashback up to ₹80 on all local trades', tag: 'Local Hero' },
                    { code: 'CLEANHOME', desc: 'Flat ₹200 OFF on Deep Cleaning over ₹1,000', tag: 'Housekeeping' }
                  ].map((coupon) => (
                    <div
                      key={coupon.code}
                      style={{
                        padding: '12px 14px',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0',
                        backgroundColor: '#f8fafc',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                          <strong style={{ fontSize: '13px', color: '#1e40af' }}>{coupon.code}</strong>
                          <span style={{ fontSize: '10px', backgroundColor: '#dbeafe', color: '#1e40af', padding: '1px 5px', borderRadius: '4px', fontWeight: '700' }}>
                            {coupon.tag}
                          </span>
                        </div>
                        <span style={{ fontSize: '11px', color: '#64748b' }}>{coupon.desc}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyCode(coupon.code)}
                        style={{
                          backgroundColor: '#ffffff',
                          border: '1px solid #cbd5e1',
                          borderRadius: '6px',
                          padding: '4px 10px',
                          fontSize: '11px',
                          fontWeight: '700',
                          color: copiedCoupon === coupon.code ? '#059669' : '#2563eb',
                          cursor: 'pointer'
                        }}
                      >
                        {copiedCoupon === coupon.code ? 'Copied ✓' : 'Copy'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: TRANSACTION HISTORY & INVOICES */}
            <div className="card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', margin: 0, color: '#0f172a' }}>
                  Transaction History & Invoices
                </h3>

                {/* Filter Tabs */}
                <div style={{ display: 'flex', gap: '6px', backgroundColor: '#f1f5f9', padding: '3px', borderRadius: '8px' }}>
                  {['ALL', 'DEBIT', 'CREDIT'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      type="button"
                      style={{
                        padding: '4px 12px',
                        fontSize: '12px',
                        fontWeight: '700',
                        borderRadius: '6px',
                        border: 'none',
                        backgroundColor: activeTab === tab ? '#2563eb' : 'transparent',
                        color: activeTab === tab ? '#ffffff' : '#64748b',
                        cursor: 'pointer'
                      }}
                    >
                      {tab === 'ALL' ? 'All' : tab === 'DEBIT' ? 'Payments' : 'Top-Ups'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Transactions List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {filteredTxns.length === 0 ? (
                  <div style={{ padding: '32px 0', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>
                    No transactions found in this filter category.
                  </div>
                ) : (
                  filteredTxns.map((txn) => {
                    const isDebit = txn.type === 'DEBIT';
                    return (
                      <div
                        key={txn.id}
                        style={{
                          padding: '14px 16px',
                          borderRadius: '10px',
                          border: '1px solid #e2e8f0',
                          backgroundColor: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '12px',
                          transition: 'border-color 0.15s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{
                            width: '38px',
                            height: '38px',
                            borderRadius: '50%',
                            backgroundColor: isDebit ? '#fee2e2' : '#dcfce7',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}>
                            {isDebit ? (
                              <ArrowUpRight size={18} color="#dc2626" />
                            ) : (
                              <ArrowDownLeft size={18} color="#16a34a" />
                            )}
                          </div>

                          <div>
                            <strong style={{ fontSize: '13px', color: '#0f172a', display: 'block' }}>
                              {txn.title}
                            </strong>
                            <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>
                              {txn.subtitle}
                            </span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px', fontSize: '10px', color: '#94a3b8' }}>
                              <span>{txn.date}</span>
                              <span>•</span>
                              <span>{txn.paymentMethod}</span>
                            </div>
                          </div>
                        </div>

                        {/* Amount & Invoice Button */}
                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                          <span style={{
                            fontSize: '15px',
                            fontWeight: '800',
                            color: isDebit ? '#dc2626' : '#16a34a',
                            display: 'block'
                          }}>
                            {isDebit ? '-' : '+'}₹{txn.amount.toLocaleString('en-IN')}
                          </span>
                          <button
                            type="button"
                            onClick={() => setSelectedInvoice(txn)}
                            style={{
                              border: 'none',
                              background: 'transparent',
                              color: '#2563eb',
                              fontSize: '11px',
                              fontWeight: '600',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '3px',
                              marginTop: '2px'
                            }}
                          >
                            <Download size={11} /> Invoice
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* ADD MONEY MODAL */}
          {showAddMoneyModal && (
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
              zIndex: 99999,
              padding: '20px'
            }}>
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                width: '100%',
                maxWidth: '460px',
                padding: '24px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Plus size={20} color="#2563eb" /> Top-Up Workify Wallet
                  </h3>
                  <button
                    onClick={() => setShowAddMoneyModal(false)}
                    style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#64748b' }}
                  >
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleAddMoney}>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '6px' }}>
                    Enter Amount (₹)
                  </label>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '2px solid #2563eb',
                    borderRadius: '10px',
                    padding: '8px 14px',
                    marginBottom: '12px'
                  }}>
                    <span style={{ fontSize: '20px', fontWeight: '800', color: '#2563eb', marginRight: '6px' }}>₹</span>
                    <input
                      type="number"
                      min="50"
                      max="10000"
                      value={addAmount}
                      onChange={(e) => setAddAmount(e.target.value)}
                      style={{ border: 'none', outline: 'none', width: '100%', fontSize: '20px', fontWeight: '800', color: '#0f172a' }}
                    />
                  </div>

                  {/* Preset Amount Chips */}
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                    {['200', '500', '1000', '2000'].map(amt => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setAddAmount(amt)}
                        style={{
                          flex: 1,
                          padding: '6px 0',
                          borderRadius: '6px',
                          border: addAmount === amt ? '2px solid #2563eb' : '1px solid #cbd5e1',
                          backgroundColor: addAmount === amt ? '#eff6ff' : '#ffffff',
                          color: addAmount === amt ? '#2563eb' : '#475569',
                          fontWeight: '700',
                          fontSize: '13px',
                          cursor: 'pointer'
                        }}
                      >
                        +₹{amt}
                      </button>
                    ))}
                  </div>

                  <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '8px' }}>
                    Select UPI App / Payment Source
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                    {[
                      { id: 'phonepe', name: 'PhonePe UPI', account: '9876543210@ybl' },
                      { id: 'gpay', name: 'Google Pay', account: 'sameera@oksbi' },
                      { id: 'paytm', name: 'Paytm UPI', account: 'sameera@paytm' }
                    ].map(app => (
                      <label
                        key={app.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          border: selectedUpiApp === app.id ? '2px solid #2563eb' : '1px solid #e2e8f0',
                          backgroundColor: selectedUpiApp === app.id ? '#eff6ff' : '#ffffff',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <input
                            type="radio"
                            name="upiApp"
                            checked={selectedUpiApp === app.id}
                            onChange={() => setSelectedUpiApp(app.id)}
                          />
                          <span style={{ fontSize: '13px', fontWeight: '600', color: '#0f172a' }}>{app.name}</span>
                        </div>
                        <span style={{ fontSize: '11px', color: '#64748b' }}>{app.account}</span>
                      </label>
                    ))}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '12px', fontSize: '14px', fontWeight: '800' }}
                  >
                    Pay ₹{addAmount} & Add to Wallet
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* INVOICE PREVIEW MODAL */}
          {selectedInvoice && (
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
              zIndex: 99999,
              padding: '20px'
            }}>
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                width: '100%',
                maxWidth: '480px',
                padding: '28px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', borderBottom: '1px solid #e2e8f0', paddingBottom: '14px' }}>
                  <div>
                    <div style={{ fontSize: '18px', fontWeight: '800', color: '#2563eb' }}>⚡ Workify Invoice</div>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>Rajahmundry Municipal Ward Hub, AP</span>
                  </div>
                  <button
                    onClick={() => setSelectedInvoice(null)}
                    style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#64748b' }}
                  >
                    <X size={20} />
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '12px', marginBottom: '16px' }}>
                  <div>
                    <span style={{ color: '#64748b' }}>Invoice No:</span>
                    <strong style={{ display: 'block', color: '#0f172a' }}>{selectedInvoice.invoiceId}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>Date & Time:</span>
                    <strong style={{ display: 'block', color: '#0f172a' }}>{selectedInvoice.date}</strong>
                  </div>
                </div>

                <div style={{ backgroundColor: '#f8fafc', padding: '14px', borderRadius: '10px', marginBottom: '16px', fontSize: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>{selectedInvoice.title}</span>
                    <strong>₹{selectedInvoice.amount}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#64748b' }}>
                    <span>Platform Insurance & GST (18%)</span>
                    <span>Included</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid #e2e8f0', fontWeight: '800', fontSize: '14px', color: '#0f172a' }}>
                    <span>Total Paid</span>
                    <span style={{ color: '#2563eb' }}>₹{selectedInvoice.amount}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => {
                      window.print();
                    }}
                    className="btn btn-primary"
                    style={{ flex: 1, padding: '10px', fontSize: '13px' }}
                  >
                    <Download size={14} /> Print / Save PDF
                  </button>
                  <button
                    onClick={() => setSelectedInvoice(null)}
                    className="btn btn-outline"
                    style={{ padding: '10px 18px', fontSize: '13px' }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
