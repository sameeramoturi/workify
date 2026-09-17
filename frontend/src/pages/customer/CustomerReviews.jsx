import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { RAJAHMUNDRY_LOCALITIES } from '../../data/locations';
import {
  Star,
  ShieldCheck,
  MapPin,
  ThumbsUp,
  Filter,
  Search,
  Plus,
  Image,
  CheckCircle2,
  Calendar,
  User,
  Wrench,
  X,
  Sparkles,
  MessageSquare,
  Award
} from 'lucide-react';

const INITIAL_REVIEWS = [
  {
    id: 1,
    author: "K. Lakshmi Narayana",
    locality: "Danavaipeta",
    city: "Rajahmundry",
    workerName: "Ramesh Das",
    workerId: 1,
    category: "Plumber",
    rating: 5,
    date: "Yesterday",
    title: "Fast 20-minute response and clean bathroom pipeline fix!",
    comment: "Our concealed bathroom pipeline developed a heavy leak in the morning. Ramesh garu arrived in 20 minutes from Danavaipeta with all necessary cutting tools and spare joints. Fixed the leak without damaging unnecessary tiles. Very polite and transparent pricing.",
    helpfulCount: 34,
    tags: ["On-Time Arrival", "Brought Proper Tools", "Fair Pricing"],
    photos: [
      "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=300",
      "https://images.unsplash.com/photo-1505798577917-a65157d3320a?w=300"
    ]
  },
  {
    id: 2,
    author: "S. Swathi Rao",
    locality: "Prakash Nagar",
    city: "Rajahmundry",
    workerName: "Amit Verma",
    workerId: 2,
    category: "Electrician",
    rating: 5,
    date: "3 days ago",
    title: "Solved inverter tripping issue that two other electricians failed to diagnose",
    comment: "Our solar inverter was tripping every afternoon. Amit checked the circuit earthing, identified a neutral leakage near our garden line, and installed a dedicated MCB. Excellent technical knowledge and safe practices.",
    helpfulCount: 28,
    tags: ["Expert Workmanship", "Safety Compliant"],
    photos: [
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=300"
    ]
  },
  {
    id: 3,
    author: "V. Mohan Krishna",
    locality: "Morampudi",
    city: "Rajahmundry",
    workerName: "Suresh Yadav",
    workerId: 3,
    category: "Carpenter",
    rating: 4.8,
    date: "5 days ago",
    title: "Modular kitchen hydraulic hinges aligned perfectly",
    comment: "Suresh replaced 12 worn-out cabinet hinges with soft-close hydraulic fittings. He also planed our balcony wooden door so it closes smoothly. Work was completed within 2.5 hours.",
    helpfulCount: 19,
    tags: ["Quality Materials", "Neat Cleanup"],
    photos: [
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=300"
    ]
  },
  {
    id: 4,
    author: "G. Venkateswarlu",
    locality: "Dowleswaram",
    city: "Rajahmundry",
    workerName: "Vikas Sharma",
    workerId: 5,
    category: "AC Technician",
    rating: 5,
    date: "10 Sep 2026",
    title: "Jet foam wash made our Daikin AC cool like brand new",
    comment: "Booked AC deep servicing before summer peak. Vikas did indoor coil foam cleaning and checked compressor gas pressure. Verified the cooling temperature with a digital meter. Highly recommended technician in Godavari area.",
    helpfulCount: 42,
    tags: ["Digital Meter Check", "100% Cooling"],
    photos: [
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=300"
    ]
  },
  {
    id: 5,
    author: "Y. Sunitha Reddy",
    locality: "Innespeta",
    city: "Rajahmundry",
    workerName: "Lakshmi Housekeeping",
    workerId: 15,
    category: "Cleaner",
    rating: 5,
    date: "08 Sep 2026",
    title: "Housewarming 3BHK flat deep sanitization was spotless",
    comment: "Lakshmi and her team arrived with heavy vacuum machines and eco-friendly cleaning liquids. The kitchen degreasing and tile scrubbing were immaculate. Our family is extremely happy with their hard work.",
    helpfulCount: 25,
    tags: ["Team of 4", "Eco-Friendly Chemicals", "Hygienic"],
    photos: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300",
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=300"
    ]
  },
  {
    id: 6,
    author: "B. Satyanarayana",
    locality: "Lalacheruvu",
    city: "Rajahmundry",
    workerName: "Surya Prakash",
    workerId: 12,
    category: "Painter",
    rating: 4.9,
    date: "05 Sep 2026",
    title: "Waterproofing wall primer and royal luxury texture finish",
    comment: "Repaired dampness cracks on our living room wall with waterproof putty and painted a stunning geometric metallic stencil texture. Done with extreme precision and dust covers on all furniture.",
    helpfulCount: 16,
    tags: ["Wall Texture", "Furniture Dust Covers"],
    photos: [
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=300"
    ]
  }
];

export default function CustomerReviews() {
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem('workify_community_reviews');
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  const [selectedTrade, setSelectedTrade] = useState('All');
  const [selectedLocality, setSelectedLocality] = useState('All');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [votedReviews, setVotedReviews] = useState({});
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // New Review Form State
  const [formWorker, setFormWorker] = useState('Ramesh Das (Plumber)');
  const [formLocality, setFormLocality] = useState('Danavaipeta');
  const [formRating, setFormRating] = useState(5);
  const [formTitle, setFormTitle] = useState('');
  const [formComment, setFormComment] = useState('');
  const [formAuthor, setFormAuthor] = useState('Sameera Moturi');

  useEffect(() => {
    try {
      localStorage.setItem('workify_community_reviews', JSON.stringify(reviews));
    } catch (err) {
      console.warn("Storage failed", err);
    }
  }, [reviews]);

  const handleHelpfulClick = (reviewId) => {
    if (votedReviews[reviewId]) return;
    setVotedReviews(prev => ({ ...prev, [reviewId]: true }));
    setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, helpfulCount: r.helpfulCount + 1 } : r));
  };

  const handleCreateReview = (e) => {
    e.preventDefault();
    if (!formComment.trim()) return;

    const workerPart = formWorker.split(' (')[0];
    const catPart = formWorker.includes('(') ? formWorker.split('(')[1].replace(')', '') : 'Plumber';

    const newRev = {
      id: Date.now(),
      author: formAuthor || 'Verified Customer',
      locality: formLocality,
      city: 'Rajahmundry',
      workerName: workerPart,
      workerId: 1,
      category: catPart,
      rating: formRating,
      date: 'Just now',
      title: formTitle || `${catPart} service in ${formLocality}`,
      comment: formComment,
      helpfulCount: 0,
      tags: ['Verified Booking', 'Aadhaar Verified'],
      photos: [
        'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=300'
      ]
    };

    setReviews([newRev, ...reviews]);
    setShowWriteModal(false);
    setFormTitle('');
    setFormComment('');

    setToastMessage('🎉 Your review has been published to the Workify Rajahmundry community!');
    setTimeout(() => setToastMessage(null), 4000);
  };

  const filteredReviews = reviews.filter(r => {
    if (selectedTrade !== 'All' && r.category.toLowerCase() !== selectedTrade.toLowerCase()) return false;
    if (selectedLocality !== 'All' && !r.locality.toLowerCase().includes(selectedLocality.toLowerCase())) return false;
    if (searchKeyword) {
      const q = searchKeyword.toLowerCase();
      const match = r.author.toLowerCase().includes(q) ||
                    r.workerName.toLowerCase().includes(q) ||
                    r.comment.toLowerCase().includes(q) ||
                    r.locality.toLowerCase().includes(q) ||
                    r.title.toLowerCase().includes(q);
      if (!match) return false;
    }
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
          {/* Header Banner */}
          <div style={{
            marginBottom: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>Customer Reviews & Community Ratings</span>
                <span style={{ fontSize: '12px', fontWeight: '700', backgroundColor: '#fef3c7', color: '#b45309', padding: '2px 10px', borderRadius: '9999px' }}>
                  ★ 4.85 / 5.0 Average
                </span>
              </h1>
              <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
                Authentic feedback and before/after photos from verified homeowners in Rajahmundry localities.
              </p>
            </div>

            <button
              onClick={() => setShowWriteModal(true)}
              className="btn btn-primary"
              style={{ padding: '10px 20px', fontSize: '14px', gap: '8px' }}
            >
              <Plus size={18} /> Write a Review
            </button>
          </div>

          {/* Rating Summary Card with Star Breakdown */}
          <div className="card" style={{
            padding: '24px',
            marginBottom: '24px',
            display: 'grid',
            gridTemplateColumns: '260px 1fr 280px',
            gap: '32px',
            alignItems: 'center'
          }}>
            {/* Average Score */}
            <div style={{ textAlign: 'center', borderRight: '1px solid #f1f5f9', paddingRight: '20px' }}>
              <div style={{ fontSize: '48px', fontWeight: '900', color: '#0f172a', lineHeight: 1 }}>
                4.85
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', margin: '8px 0 4px 0' }}>
                {[1, 2, 3, 4, 5].map(s => (
                  <Star key={s} size={18} fill="#eab308" color="#eab308" />
                ))}
              </div>
              <span style={{ fontSize: '12px', color: '#64748b' }}>
                Based on <strong>1,420+</strong> verified local services
              </span>
            </div>

            {/* Progress Bars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                { stars: 5, pct: 82, count: 1164 },
                { stars: 4, pct: 14, count: 198 },
                { stars: 3, pct: 3, count: 42 },
                { stars: 2, pct: 1, count: 12 },
                { stars: 1, pct: 0, count: 4 }
              ].map(row => (
                <div key={row.stars} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px' }}>
                  <span style={{ width: '45px', color: '#475569', fontWeight: '600' }}>{row.stars} Stars</span>
                  <div style={{ flex: 1, height: '8px', backgroundColor: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{ width: `${row.pct}%`, height: '100%', backgroundColor: row.stars >= 4 ? '#10b981' : '#f59e0b', borderRadius: '9999px' }}></div>
                  </div>
                  <span style={{ width: '35px', textAlign: 'right', color: '#64748b', fontSize: '11px' }}>{row.pct}%</span>
                </div>
              ))}
            </div>

            {/* Quality Guarantees */}
            <div style={{
              backgroundColor: '#eff6ff',
              padding: '16px',
              borderRadius: '12px',
              border: '1px solid #bfdbfe',
              fontSize: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <strong style={{ color: '#1e40af', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={16} /> Workify Review Integrity
              </strong>
              <span style={{ color: '#3b82f6' }}>• Only verified customers with OTP completion can post ratings.</span>
              <span style={{ color: '#3b82f6' }}>• 100% genuine reviews from Danavaipeta, Morampudi & central hubs.</span>
              <span style={{ color: '#3b82f6' }}>• Workers with rating &lt; 4.0 undergo mandatory retraining.</span>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="card" style={{ padding: '16px 20px', marginBottom: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '16px', alignItems: 'center' }}>
              {/* Search Bar */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                padding: '0 10px',
                backgroundColor: '#ffffff'
              }}>
                <Search size={16} color="#94a3b8" />
                <input
                  type="text"
                  placeholder="Search reviews by worker, keyword, issue..."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  style={{ width: '100%', padding: '10px 8px', border: 'none', outline: 'none', fontSize: '13px' }}
                />
              </div>

              {/* Trade Filter */}
              <div>
                <select
                  value={selectedTrade}
                  onChange={(e) => setSelectedTrade(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '13px', backgroundColor: '#ffffff', cursor: 'pointer' }}
                >
                  <option value="All">🌟 All Trades (Plumber, Electrician, etc.)</option>
                  <option value="Plumber">🔧 Plumbers</option>
                  <option value="Electrician">⚡ Electricians</option>
                  <option value="Carpenter">🪚 Carpenters</option>
                  <option value="Painter">🎨 Painters</option>
                  <option value="AC Technician">❄️ AC Technicians</option>
                  <option value="Cleaner">🧹 Cleaners</option>
                </select>
              </div>

              {/* Locality Filter */}
              <div>
                <select
                  value={selectedLocality}
                  onChange={(e) => setSelectedLocality(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '13px', backgroundColor: '#ffffff', cursor: 'pointer' }}
                >
                  <option value="All">📍 All Rajahmundry Localities</option>
                  {RAJAHMUNDRY_LOCALITIES.map(l => (
                    <option key={l.id} value={l.name}>📍 {l.name} ({l.pincode})</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quick Locality Filter Chips */}
            <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', marginTop: '12px', paddingTop: '10px', borderTop: '1px solid #f1f5f9', scrollbarWidth: 'none' }}>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '3px' }}>
                <MapPin size={12} color="#2563eb" /> Quick Areas:
              </span>
              {['All', 'Danavaipeta', 'Morampudi', 'Prakash Nagar', 'Dowleswaram', 'Innespeta', 'Lalacheruvu'].map(loc => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => setSelectedLocality(loc)}
                  style={{
                    padding: '3px 10px',
                    borderRadius: '9999px',
                    fontSize: '11px',
                    fontWeight: selectedLocality === loc ? '700' : '500',
                    border: 'none',
                    backgroundColor: selectedLocality === loc ? '#2563eb' : '#f1f5f9',
                    color: selectedLocality === loc ? '#ffffff' : '#475569',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {loc === 'All' ? 'All Rajahmundry' : loc}
                </button>
              ))}
            </div>
          </div>

          {/* Reviews Stream Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredReviews.length === 0 ? (
              <div className="card" style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
                <p style={{ fontSize: '15px', color: '#0f172a', fontWeight: '700' }}>No reviews found matching your filters</p>
                <span style={{ fontSize: '13px' }}>Try selecting "All Trades" or "All Localities" to see community feedback.</span>
              </div>
            ) : (
              filteredReviews.map((rev) => (
                <div key={rev.id} className="card" style={{ padding: '20px 24px', transition: 'border-color 0.15s ease' }}>
                  {/* Top Row: Author, Verified Badge & Stars */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        backgroundColor: '#dbeafe',
                        color: '#1e40af',
                        fontWeight: '800',
                        fontSize: '15px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {rev.author[0]}
                      </div>

                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <strong style={{ fontSize: '15px', color: '#0f172a' }}>{rev.author}</strong>
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '3px',
                            backgroundColor: '#ecfdf5',
                            color: '#059669',
                            fontSize: '11px',
                            fontWeight: '700',
                            padding: '1px 6px',
                            borderRadius: '4px'
                          }}>
                            <ShieldCheck size={12} /> Verified Customer
                          </span>
                        </div>

                        <div style={{ fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span>📍 <strong>{rev.locality}</strong>, {rev.city}</span>
                          <span>•</span>
                          <span>{rev.date}</span>
                        </div>
                      </div>
                    </div>

                    {/* Hired Worker Tag */}
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end', marginBottom: '2px' }}>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={15}
                            fill={i < rev.rating ? "#eab308" : "#cbd5e1"}
                            color={i < rev.rating ? "#eab308" : "#cbd5e1"}
                          />
                        ))}
                      </div>
                      <span style={{ fontSize: '12px', color: '#475569' }}>
                        Hired: <Link to={`/workers/${rev.workerId || 1}`} style={{ color: '#2563eb', fontWeight: '700' }}>
                          {rev.workerName} ({rev.category})
                        </Link>
                      </span>
                    </div>
                  </div>

                  {/* Review Content */}
                  <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a', margin: '0 0 6px 0' }}>
                    "{rev.title}"
                  </h4>
                  <p style={{ fontSize: '13px', color: '#334155', lineHeight: 1.55, marginBottom: '14px' }}>
                    {rev.comment}
                  </p>

                  {/* Photo Attachments (if available) */}
                  {rev.photos && rev.photos.length > 0 && (
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '14px' }}>
                      {rev.photos.map((p, i) => (
                        <div
                          key={i}
                          style={{
                            width: '100px',
                            height: '70px',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            border: '1px solid #cbd5e1',
                            cursor: 'pointer'
                          }}
                        >
                          <img
                            src={p}
                            alt="Work proof"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tags & Helpful Vote Footer */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '12px',
                    borderTop: '1px solid #f1f5f9',
                    flexWrap: 'wrap',
                    gap: '10px'
                  }}>
                    {/* Highlight Tags */}
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {rev.tags?.map(t => (
                        <span key={t} style={{
                          backgroundColor: '#eff6ff',
                          color: '#2563eb',
                          fontSize: '11px',
                          fontWeight: '600',
                          padding: '2px 8px',
                          borderRadius: '4px'
                        }}>
                          ✓ {t}
                        </span>
                      ))}
                    </div>

                    {/* Helpful Button */}
                    <button
                      onClick={() => handleHelpfulClick(rev.id)}
                      type="button"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '4px 12px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        backgroundColor: votedReviews[rev.id] ? '#eff6ff' : '#ffffff',
                        color: votedReviews[rev.id] ? '#2563eb' : '#475569',
                        fontSize: '12px',
                        fontWeight: '600',
                        cursor: votedReviews[rev.id] ? 'default' : 'pointer'
                      }}
                    >
                      <ThumbsUp size={13} color={votedReviews[rev.id] ? '#2563eb' : '#64748b'} />
                      <span>Helpful ({rev.helpfulCount})</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* WRITE A REVIEW MODAL */}
          {showWriteModal && (
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
                maxWidth: '520px',
                padding: '28px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                animation: 'fadeIn 0.2s ease-out'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Plus size={20} color="#2563eb" /> Write a Home Service Review
                  </h3>
                  <button
                    onClick={() => setShowWriteModal(false)}
                    style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#64748b' }}
                  >
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleCreateReview}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '4px' }}>
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={formAuthor}
                        onChange={(e) => setFormAuthor(e.target.value)}
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '13px' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '4px' }}>
                        Your Rajahmundry Area
                      </label>
                      <select
                        value={formLocality}
                        onChange={(e) => setFormLocality(e.target.value)}
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '13px', backgroundColor: '#fff' }}
                      >
                        {RAJAHMUNDRY_LOCALITIES.map(l => (
                          <option key={l.id} value={l.name}>{l.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '4px' }}>
                      Select Worker & Service
                    </label>
                    <select
                      value={formWorker}
                      onChange={(e) => setFormWorker(e.target.value)}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '13px', backgroundColor: '#fff' }}
                    >
                      <option value="Ramesh Das (Plumber)">Ramesh Das (Plumber - Danavaipeta)</option>
                      <option value="Amit Verma (Electrician)">Amit Verma (Electrician - Prakash Nagar)</option>
                      <option value="Suresh Yadav (Carpenter)">Suresh Yadav (Carpenter - Morampudi)</option>
                      <option value="Vikas Sharma (AC Technician)">Vikas Sharma (AC Technician - Dowleswaram)</option>
                      <option value="Lakshmi Housekeeping (Cleaner)">Lakshmi Housekeeping (Cleaner - Alcot Gardens)</option>
                    </select>
                  </div>

                  {/* Interactive Star Rating Selector */}
                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '6px' }}>
                      Your Rating (1 to 5 Stars)
                    </label>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormRating(star)}
                          style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '2px' }}
                        >
                          <Star
                            size={28}
                            fill={star <= formRating ? "#eab308" : "#cbd5e1"}
                            color={star <= formRating ? "#eab308" : "#cbd5e1"}
                          />
                        </button>
                      ))}
                      <span style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a', marginLeft: '6px' }}>
                        {formRating === 5 ? '⭐ 5.0 (Excellent)' : formRating === 4 ? '⭐ 4.0 (Very Good)' : `⭐ ${formRating}.0`}
                      </span>
                    </div>
                  </div>

                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '4px' }}>
                      Review Headline
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Quick arrival and excellent plumbing workmanship"
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '13px' }}
                    />
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '4px' }}>
                      Detailed Feedback *
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell other Rajahmundry homeowners about punctuality, skill quality, fairness of price, and behavior..."
                      value={formComment}
                      onChange={(e) => setFormComment(e.target.value)}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '13px', resize: 'vertical' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '12px', fontSize: '14px', fontWeight: '800' }}
                  >
                    Submit Verified Review
                  </button>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
