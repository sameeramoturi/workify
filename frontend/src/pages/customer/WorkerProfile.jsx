import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { getWorkerById, createBooking } from '../../services/api';
import {
  ArrowLeft,
  ShieldCheck,
  Star,
  MapPin,
  Calendar,
  Phone,
  MessageSquare,
  Clock,
  CheckCircle,
  Mail,
  User,
  BookOpen,
  X,
  Send,
  Copy,
  Check,
  Sparkles,
  ChevronRight,
  AlertCircle,
  Wrench,
  ThumbsUp,
  Map as MapIcon
} from 'lucide-react';

export default function WorkerProfile() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('Overview');
  
  // Modals state
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Booking Form State
  const [selectedService, setSelectedService] = useState('');
  const [selectedDateType, setSelectedDateType] = useState('Today');
  const [customDate, setCustomDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedSlot, setSelectedSlot] = useState('Morning (9:00 AM - 12:00 PM)');
  const [locality, setLocality] = useState('Danavaipeta');
  const [streetAddress, setStreetAddress] = useState('Door No. 4-12, Near Venkateswara Temple');
  const [customerPhone, setCustomerPhone] = useState('+91 98480 12345');
  const [problemNotes, setProblemNotes] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Chat State
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Dynamic worker data
  const worker = getWorkerById(id);

  // Initialize service choice and chat messages when worker loads
  useEffect(() => {
    if (worker.skills && worker.skills.length > 0) {
      setSelectedService(worker.skills[0]);
    }
    setChatMessages([
      {
        sender: 'worker',
        text: `Namaste! I am ${worker.name}, ${worker.category} in Rajahmundry. How can I help you today?`,
        time: 'Just now'
      }
    ]);
  }, [worker.id]);

  // Handle Booking Confirmation
  const handleConfirmBooking = (e) => {
    e.preventDefault();
    const finalDate = selectedDateType === 'Today' ? 'Today' :
                      selectedDateType === 'Tomorrow' ? 'Tomorrow' : customDate;

    const newBooking = createBooking({
      workerId: worker.id,
      workerName: worker.name,
      workerCategory: worker.category,
      workerPhoto: worker.photo,
      service: selectedService || worker.category,
      date: finalDate,
      timeSlot: selectedSlot,
      address: `${streetAddress}, ${locality}, Rajahmundry`,
      phone: customerPhone,
      notes: problemNotes,
      hourlyRate: worker.hourly_rate,
      totalEstimate: worker.hourly_rate + 69
    });

    setConfirmedBooking(newBooking);
  };

  // Handle Send Chat Message
  const handleSendMessage = (textToSend) => {
    const message = textToSend || inputMessage;
    if (!message.trim()) return;

    const userMsg = {
      sender: 'user',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Context-aware simulated response
    setTimeout(() => {
      let replyText = `Sure! I am available to handle ${worker.category.toLowerCase()} work in Rajahmundry. You can click 'Book Now' to reserve a slot.`;
      const lower = message.toLowerCase();

      if (lower.includes('available') || lower.includes('today') || lower.includes('tomorrow')) {
        replyText = `Yes! I am available ${worker.working_hours} across Rajahmundry. Would you like me to visit in the morning or afternoon slot?`;
      } else if (lower.includes('cost') || lower.includes('rate') || lower.includes('charge') || lower.includes('price') || lower.includes('fee')) {
        replyText = `My rate is ₹${worker.hourly_rate}/hour (Negotiable for larger jobs). Standard inspection fee is minimal and adjusted in the final bill!`;
      } else if (lower.includes('reach') || lower.includes('time') || lower.includes('fast') || lower.includes('soon') || lower.includes('where')) {
        replyText = `I am currently based around ${worker.city} and can reach locations like Danavaipeta, Kotipalli, or Morampudi in 20-35 minutes!`;
      } else if (lower.includes('tool') || lower.includes('part') || lower.includes('spare') || lower.includes('pipe') || lower.includes('wire')) {
        replyText = `Yes, I always carry standard professional tools and common spare fixtures in my toolkit. Specialized parts can be procured upon inspection.`;
      }

      setChatMessages(prev => [
        ...prev,
        {
          sender: 'worker',
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 800);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(worker.phone_number);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <Navbar />

      <div style={{ display: 'flex' }}>
        <Sidebar />

        <main style={{ flex: 1, padding: '24px 32px' }}>
          {/* Back button */}
          <Link
            to="/workers"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#2563eb',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '16px',
              textDecoration: 'none'
            }}
          >
            <ArrowLeft size={16} /> Back to Search
          </Link>

          {/* Top Profile Header Card */}
          <div className="card" style={{ padding: '28px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative' }}>
                <div style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  backgroundColor: '#dbeafe',
                  border: '2px solid #e2e8f0'
                }}>
                  <img
                    src={worker.photo}
                    alt={worker.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <span style={{
                  position: 'absolute',
                  bottom: '-8px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: '#10b981',
                  color: '#fff',
                  fontSize: '11px',
                  fontWeight: '700',
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                  ● {worker.availability_status || 'AVAILABLE'}
                </span>
              </div>

              <div style={{ flex: 1, minWidth: '280px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                    {worker.name}
                  </h1>
                  {worker.is_verified && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', backgroundColor: '#eff6ff', color: '#2563eb', padding: '2px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '700' }}>
                      <ShieldCheck size={16} /> Verified
                    </span>
                  )}
                </div>

                <p style={{ fontSize: '15px', color: '#475569', fontWeight: '600', marginBottom: '8px' }}>
                  🔧 {worker.category} Professional
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '13px', color: '#64748b', marginBottom: '12px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#0f172a', fontWeight: '700' }}>
                    <Star size={14} fill="#eab308" color="#eab308" /> {worker.rating}
                    <span style={{ color: '#64748b', fontWeight: '400' }}>({worker.review_count} reviews)</span>
                  </span>
                  <span>💼 {worker.experience_years} years experience</span>
                  <span>📍 {worker.city}, {worker.state}</span>
                  <span style={{ color: '#2563eb', fontWeight: '600' }}>⚡ {worker.distance_km} km away</span>
                </div>

                <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.5, maxWidth: '750px', margin: 0 }}>
                  {worker.about_me}
                </p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div style={{
              display: 'flex',
              gap: '28px',
              borderTop: '1px solid #f1f5f9',
              marginTop: '24px',
              paddingTop: '16px',
              fontSize: '14px',
              fontWeight: '600',
              overflowX: 'auto'
            }}>
              {['Overview', 'Skills & Services', 'Experience', 'Reviews', 'Location'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '6px 0',
                    cursor: 'pointer',
                    color: activeTab === tab ? '#2563eb' : '#64748b',
                    borderBottom: activeTab === tab ? '2px solid #2563eb' : '2px solid transparent',
                    fontWeight: activeTab === tab ? '700' : '500',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Content Layout: Details (Left) + Actions/Pricing (Right) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px', alignItems: 'start' }}>
            {/* Left Column: Tab Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'Overview' && (
                <>
                  {/* Profile Information */}
                  <div className="card" style={{ padding: '24px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', color: '#0f172a' }}>
                      👤 Profile Information
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', fontSize: '13px' }}>
                      <div>
                        <span style={{ color: '#64748b', display: 'block' }}>Full Name</span>
                        <strong style={{ color: '#0f172a' }}>{worker.name}</strong>
                      </div>
                      <div>
                        <span style={{ color: '#64748b', display: 'block' }}>Phone Number</span>
                        <strong style={{ color: '#0f172a' }}>{worker.phone_number}</strong>
                      </div>
                      <div>
                        <span style={{ color: '#64748b', display: 'block' }}>Email</span>
                        <strong style={{ color: '#0f172a' }}>{worker.email}</strong>
                      </div>
                      <div>
                        <span style={{ color: '#64748b', display: 'block' }}>Date of Birth</span>
                        <strong style={{ color: '#0f172a' }}>{worker.dob}</strong>
                      </div>
                      <div>
                        <span style={{ color: '#64748b', display: 'block' }}>Gender</span>
                        <strong style={{ color: '#0f172a' }}>{worker.gender}</strong>
                      </div>
                      <div>
                        <span style={{ color: '#64748b', display: 'block' }}>Languages</span>
                        <strong style={{ color: '#0f172a' }}>{(worker.languages || []).join(', ')}</strong>
                      </div>
                    </div>

                    <div style={{
                      marginTop: '18px',
                      padding: '12px 16px',
                      backgroundColor: '#eff6ff',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}>
                      <ShieldCheck size={20} color="#2563eb" />
                      <div>
                        <strong style={{ fontSize: '13px', color: '#1e3a8a' }}>Workify Verified Professional</strong>
                        <p style={{ fontSize: '12px', color: '#3b82f6', margin: 0 }}>
                          Identity, Aadhaar, criminal record, and trade skills verified.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Education & Certification */}
                  <div className="card" style={{ padding: '24px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px', color: '#0f172a' }}>
                      🎓 Education & Trade Certification
                    </h3>
                    <div style={{ borderLeft: '3px solid #10b981', paddingLeft: '14px' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', margin: 0 }}>
                        {worker.education}
                      </h4>
                      <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px', margin: 0 }}>
                        Certified technical vocational training recognized by State & Central councils.
                      </p>
                    </div>
                  </div>

                  {/* Work Gallery */}
                  <div className="card" style={{ padding: '24px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', color: '#0f172a' }}>
                      📷 Recent Work Gallery
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                      {(worker.gallery || []).map((imgUrl, i) => (
                        <div key={i} style={{ height: '100px', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#e2e8f0' }}>
                          <img
                            src={imgUrl}
                            alt="Work specimen"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* TAB 2: SKILLS & SERVICES */}
              {activeTab === 'Skills & Services' && (
                <div className="card" style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', color: '#0f172a' }}>
                    🛠️ Specialized Services Offered
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                    {(worker.skills || []).map((skill, idx) => (
                      <div key={idx} style={{
                        padding: '12px 14px',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0',
                        backgroundColor: '#f8fafc',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Wrench size={16} color="#2563eb" />
                          <span style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>{skill}</span>
                        </div>
                        <span style={{ fontSize: '12px', color: '#10b981', fontWeight: '700' }}>Available</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#f1f5f9', borderRadius: '8px' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', marginBottom: '6px' }}>
                      ⭐ Service Guarantee
                    </h4>
                    <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                      All services completed by {worker.name} come with a 7-day workmanship satisfaction warranty backed by Workify customer protection.
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 3: EXPERIENCE */}
              {activeTab === 'Experience' && (
                <div className="card" style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', color: '#0f172a' }}>
                    💼 Career & Experience Timeline
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {(worker.experiences || []).map((exp, i) => (
                      <div key={i} style={{ borderLeft: '3px solid #2563eb', paddingLeft: '16px', position: 'relative' }}>
                        <span style={{ fontSize: '12px', color: '#2563eb', fontWeight: '700' }}>{exp.year}</span>
                        <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a', margin: '4px 0' }}>{exp.role}</h4>
                        <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>{exp.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: REVIEWS */}
              {activeTab === 'Reviews' && (
                <div className="card" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div>
                      <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', margin: 0 }}>
                        💬 Customer Reviews & Feedback
                      </h3>
                      <p style={{ fontSize: '12px', color: '#64748b', margin: '4px 0 0 0' }}>
                        Authentic feedback from verified homeowners in Rajahmundry
                      </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Star size={18} fill="#eab308" color="#eab308" />
                      <strong style={{ fontSize: '18px', color: '#0f172a' }}>{worker.rating}</strong>
                      <span style={{ fontSize: '13px', color: '#64748b' }}>/ 5.0</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {(worker.reviews || []).map((rev, idx) => (
                      <div key={idx} style={{
                        padding: '16px',
                        borderRadius: '10px',
                        backgroundColor: '#f8fafc',
                        border: '1px solid #e2e8f0'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <div>
                            <strong style={{ fontSize: '14px', color: '#0f172a' }}>{rev.author}</strong>
                            <span style={{ fontSize: '12px', color: '#64748b', marginLeft: '8px' }}>📍 {rev.locality}</span>
                          </div>
                          <span style={{ fontSize: '12px', color: '#94a3b8' }}>{rev.date}</span>
                        </div>

                        <div style={{ display: 'flex', gap: '2px', color: '#eab308', marginBottom: '8px' }}>
                          {[...Array(Math.floor(rev.rating))].map((_, i) => (
                            <Star key={i} size={14} fill="#eab308" />
                          ))}
                        </div>

                        <p style={{ fontSize: '13px', color: '#334155', lineHeight: 1.5, margin: 0 }}>
                          "{rev.comment}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: LOCATION */}
              {activeTab === 'Location' && (
                <div className="card" style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px', color: '#0f172a' }}>
                    📍 Operational Areas & Coverage
                  </h3>
                  <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
                    {worker.name} operates across a 10 km radius covering major localities in Rajahmundry:
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px' }}>
                    {[
                      'Danavaipeta', 'Morampudi', 'Innespeta',
                      'Kotipalli Bus Stand', 'Aryapuram', 'Kambalapeta',
                      'Dowleswaram', 'Prakash Nagar', 'T-Nagar'
                    ].map(loc => (
                      <div key={loc} style={{
                        padding: '10px',
                        backgroundColor: '#eff6ff',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: '600',
                        color: '#1e40af',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        <MapPin size={14} /> {loc}
                      </div>
                    ))}
                  </div>

                  <div style={{
                    height: '160px',
                    backgroundColor: '#e2e8f0',
                    borderRadius: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    border: '1px solid #cbd5e1'
                  }}>
                    <MapIcon size={24} color="#2563eb" />
                    <strong style={{ fontSize: '14px', color: '#1e293b' }}>Godavari Riverfront Coverage Zone</strong>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>Average arrival time: 20 - 35 minutes</span>
                  </div>
                </div>
              )}

            </div>

            {/* Right Column: Pricing, Booking Action & Ratings */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Action Card */}
              <div className="card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div>
                    <span style={{ fontSize: '28px', fontWeight: '800', color: '#2563eb' }}>₹{worker.hourly_rate}</span>
                    <span style={{ fontSize: '14px', color: '#64748b' }}>/hr</span>
                  </div>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>(Negotiable)</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <button
                    onClick={() => { setShowBookingModal(true); setConfirmedBooking(null); }}
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '12px', fontSize: '14px', justifyContent: 'center' }}
                  >
                    <Calendar size={18} /> Book Now
                  </button>
                  <button
                    onClick={() => setShowChatModal(true)}
                    className="btn btn-outline"
                    style={{ width: '100%', padding: '12px', fontSize: '14px', justifyContent: 'center' }}
                  >
                    <MessageSquare size={18} /> Chat with Worker
                  </button>
                  <button
                    onClick={() => setShowCallModal(true)}
                    className="btn btn-outline"
                    style={{ width: '100%', padding: '12px', fontSize: '14px', justifyContent: 'center' }}
                  >
                    <Phone size={18} /> Call Now
                  </button>
                </div>
              </div>

              {/* Skills */}
              <div className="card" style={{ padding: '20px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px' }}>🔧 Skills</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {(worker.skills || []).map(s => (
                    <span key={s} style={{
                      backgroundColor: '#eff6ff',
                      color: '#2563eb',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Availability Calendar */}
              <div className="card" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: '700' }}>🕒 Availability</h4>
                  <span className="badge badge-available">● Available</span>
                </div>

                {/* Days of week */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center', marginBottom: '12px' }}>
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => {
                    const isAvailable = (worker.available_days || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']).includes(day);
                    return (
                      <div
                        key={day}
                        style={{
                          padding: '6px 0',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: '600',
                          backgroundColor: isAvailable ? '#ecfdf5' : '#f1f5f9',
                          color: isAvailable ? '#059669' : '#94a3b8'
                        }}
                      >
                        {day}
                      </div>
                    );
                  })}
                </div>

                <p style={{ fontSize: '12px', color: '#475569', margin: 0 }}>
                  <strong>Working hours:</strong> {worker.working_hours}
                </p>
              </div>

              {/* Ratings Breakdown */}
              <div className="card" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <span style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a' }}>{worker.rating}</span>
                  <div>
                    <div style={{ display: 'flex', gap: '2px', color: '#eab308' }}>
                      {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#eab308" />)}
                    </div>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>({worker.review_count} reviews)</span>
                  </div>
                </div>

                {[
                  { star: 5, pct: 85 },
                  { star: 4, pct: 10 },
                  { star: 3, pct: 3 },
                  { star: 2, pct: 1 },
                  { star: 1, pct: 1 },
                ].map(b => (
                  <div key={b.star} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', marginBottom: '4px' }}>
                    <span style={{ width: '12px' }}>{b.star}★</span>
                    <div style={{ flex: 1, height: '6px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${b.pct}%`, height: '100%', backgroundColor: '#2563eb' }} />
                    </div>
                    <span style={{ width: '24px', color: '#64748b' }}>{b.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* ============================================================== */}
      {/* 1. INTERACTIVE BOOKING MODAL */}
      {/* ============================================================== */}
      {showBookingModal && (
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
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '560px',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid #e2e8f0'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '20px 24px',
              borderBottom: '1px solid #f1f5f9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'sticky',
              top: 0,
              backgroundColor: '#fff',
              zIndex: 10
            }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                  Book {worker.name}
                </h3>
                <span style={{ fontSize: '12px', color: '#64748b' }}>
                  {worker.category} • ₹{worker.hourly_rate}/hr • {worker.city}
                </span>
              </div>
              <button
                onClick={() => setShowBookingModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            {!confirmedBooking ? (
              <form onSubmit={handleConfirmBooking} style={{ padding: '24px' }}>
                {/* 1. Service Type */}
                <div style={{ marginBottom: '18px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>
                    Select Service Required
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      backgroundColor: '#fff'
                    }}
                  >
                    {(worker.skills || []).map(sk => (
                      <option key={sk} value={sk}>{sk}</option>
                    ))}
                  </select>
                </div>

                {/* 2. Date Selection */}
                <div style={{ marginBottom: '18px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>
                    When do you need the service?
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '8px' }}>
                    {['Today', 'Tomorrow', 'Pick Date'].map(type => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setSelectedDateType(type)}
                        style={{
                          padding: '10px 0',
                          borderRadius: '8px',
                          border: selectedDateType === type ? '2px solid #2563eb' : '1px solid #cbd5e1',
                          backgroundColor: selectedDateType === type ? '#eff6ff' : '#fff',
                          color: selectedDateType === type ? '#2563eb' : '#334155',
                          fontWeight: selectedDateType === type ? '700' : '500',
                          fontSize: '13px',
                          cursor: 'pointer'
                        }}
                      >
                        {type === 'Today' ? '⚡ Today' : type === 'Tomorrow' ? '📅 Tomorrow' : '🗓️ Pick Date'}
                      </button>
                    ))}
                  </div>

                  {selectedDateType === 'Pick Date' && (
                    <input
                      type="date"
                      value={customDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setCustomDate(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '13px'
                      }}
                    />
                  )}
                </div>

                {/* 3. Time Slot */}
                <div style={{ marginBottom: '18px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>
                    Preferred Time Slot
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[
                      '🌅 Morning (9:00 AM - 12:00 PM)',
                      '☀️ Afternoon (1:00 PM - 4:00 PM)',
                      '🌇 Evening (4:00 PM - 7:00 PM)'
                    ].map(slot => (
                      <label
                        key={slot}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          border: selectedSlot === slot ? '1px solid #2563eb' : '1px solid #e2e8f0',
                          backgroundColor: selectedSlot === slot ? '#f0f7ff' : '#fff',
                          cursor: 'pointer',
                          fontSize: '13px',
                          fontWeight: selectedSlot === slot ? '600' : '400',
                          color: selectedSlot === slot ? '#1d4ed8' : '#334155'
                        }}
                      >
                        <input
                          type="radio"
                          name="timeSlot"
                          checked={selectedSlot === slot}
                          onChange={() => setSelectedSlot(slot)}
                        />
                        <span>{slot}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 4. Address Details in Rajahmundry */}
                <div style={{ marginBottom: '18px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>
                    Service Address in Rajahmundry
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '8px' }}>
                    <div>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>Locality</span>
                      <select
                        value={locality}
                        onChange={(e) => setLocality(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '8px 10px',
                          borderRadius: '6px',
                          border: '1px solid #cbd5e1',
                          fontSize: '13px'
                        }}
                      >
                        {[
                          'Danavaipeta', 'Morampudi', 'Innespeta',
                          'Kotipalli Bus Stand', 'Aryapuram', 'Kambalapeta',
                          'Dowleswaram', 'Prakash Nagar', 'T-Nagar'
                        ].map(loc => (
                          <option key={loc} value={loc}>{loc}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>Contact Phone</span>
                      <input
                        type="text"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '8px 10px',
                          borderRadius: '6px',
                          border: '1px solid #cbd5e1',
                          fontSize: '13px'
                        }}
                      />
                    </div>
                  </div>

                  <input
                    type="text"
                    placeholder="House/Door No, Apartment or Landmark"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '13px'
                    }}
                  />
                </div>

                {/* 5. Problem description */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#1e293b', marginBottom: '6px' }}>
                    Issue Notes / Problem Description (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="E.g., Kitchen sink tap leaking or need inverter socket check..."
                    value={problemNotes}
                    onChange={(e) => setProblemNotes(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '13px'
                    }}
                  />
                </div>

                {/* Fare Summary Card */}
                <div style={{
                  padding: '14px 16px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                  marginBottom: '20px',
                  fontSize: '13px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: '#475569' }}>
                    <span>First Hour Base Rate</span>
                    <strong>₹{worker.hourly_rate}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: '#475569' }}>
                    <span>Visiting & Safety Kit Fee</span>
                    <span>₹49</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#475569' }}>
                    <span>Workify Platform Guarantee</span>
                    <span>₹20</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingTop: '8px',
                    borderTop: '1px solid #e2e8f0',
                    fontSize: '15px',
                    fontWeight: '800',
                    color: '#0f172a'
                  }}>
                    <span>Estimated Total</span>
                    <span style={{ color: '#2563eb' }}>₹{worker.hourly_rate + 69}</span>
                  </div>
                  <p style={{ fontSize: '11px', color: '#64748b', margin: '8px 0 0 0' }}>
                    💡 Pay directly to {worker.name} via Cash or UPI after service completion.
                  </p>
                </div>

                {/* Form Buttons */}
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    type="button"
                    onClick={() => setShowBookingModal(false)}
                    className="btn btn-outline"
                    style={{ flex: 1, padding: '12px', justifyContent: 'center' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ flex: 2, padding: '12px', justifyContent: 'center', fontSize: '14px' }}
                  >
                    Confirm Booking (₹{worker.hourly_rate + 69})
                  </button>
                </div>
              </form>
            ) : (
              /* Booking Success Screen */
              <div style={{ padding: '36px 24px', textAlign: 'center' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: '#ecfdf5',
                  color: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px auto'
                }}>
                  <CheckCircle size={36} />
                </div>

                <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>
                  Booking Confirmed!
                </h3>
                <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px' }}>
                  Your request has been dispatched to <strong>{worker.name}</strong>.
                </p>

                {/* Booking Key Details Card */}
                <div style={{
                  backgroundColor: '#eff6ff',
                  border: '1px solid #bfdbfe',
                  borderRadius: '12px',
                  padding: '16px',
                  marginBottom: '20px',
                  textAlign: 'left'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>Booking Reference</span>
                    <strong style={{ fontSize: '13px', color: '#1e40af' }}>{confirmedBooking.id}</strong>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    border: '1px dashed #2563eb',
                    margin: '8px 0'
                  }}>
                    <div>
                      <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>SERVICE START OTP</span>
                      <strong style={{ fontSize: '20px', letterSpacing: '3px', color: '#2563eb' }}>
                        {confirmedBooking.otp}
                      </strong>
                    </div>
                    <span style={{ fontSize: '11px', color: '#475569', maxWidth: '200px', textAlign: 'right' }}>
                      Share this OTP with worker upon arrival.
                    </span>
                  </div>

                  <div style={{ fontSize: '12px', color: '#334155', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span>📅 <strong>When:</strong> {confirmedBooking.date} • {confirmedBooking.timeSlot}</span>
                    <span>📍 <strong>Location:</strong> {confirmedBooking.address}</span>
                    <span>💰 <strong>Estimated:</strong> ₹{confirmedBooking.totalEstimate} (Pay after service)</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowBookingModal(false)}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '12px', justifyContent: 'center' }}
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. INTERACTIVE LIVE CHAT MODAL */}
      {/* ============================================================== */}
      {showChatModal && (
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
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '500px',
            height: '620px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid #e2e8f0',
            overflow: 'hidden'
          }}>
            {/* Chat Header */}
            <div style={{
              padding: '16px 20px',
              backgroundColor: '#1e293b',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#334155' }}>
                  <img src={worker.photo} alt={worker.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: '700', margin: 0, color: '#f8fafc' }}>
                    {worker.name}
                  </h4>
                  <span style={{ fontSize: '11px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    ● Online now • {worker.category}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowChatModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Messages Stream */}
            <div style={{
              flex: 1,
              padding: '20px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              backgroundColor: '#f8fafc'
            }}>
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '80%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                  }}
                >
                  <div style={{
                    padding: '10px 14px',
                    borderRadius: '14px',
                    fontSize: '13px',
                    lineHeight: 1.4,
                    backgroundColor: msg.sender === 'user' ? '#2563eb' : '#ffffff',
                    color: msg.sender === 'user' ? '#ffffff' : '#0f172a',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.06)',
                    border: msg.sender === 'user' ? 'none' : '1px solid #e2e8f0',
                    borderBottomRightRadius: msg.sender === 'user' ? '2px' : '14px',
                    borderBottomLeftRadius: msg.sender === 'worker' ? '2px' : '14px'
                  }}>
                    {msg.text}
                  </div>
                  <span style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px', padding: '0 4px' }}>
                    {msg.time}
                  </span>
                </div>
              ))}

              {isTyping && (
                <div style={{
                  alignSelf: 'flex-start',
                  backgroundColor: '#ffffff',
                  padding: '8px 12px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  color: '#64748b',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.04)'
                }}>
                  {worker.name} is typing...
                </div>
              )}
            </div>

            {/* Quick Prompt Suggestion Chips */}
            <div style={{
              padding: '8px 16px',
              backgroundColor: '#ffffff',
              borderTop: '1px solid #f1f5f9',
              display: 'flex',
              gap: '6px',
              overflowX: 'auto'
            }}>
              {[
                "⚡ Are you available today?",
                "💰 What are your charges?",
                "📍 Can you reach soon?",
                "🔧 Do you bring tools?"
              ].map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  style={{
                    backgroundColor: '#eff6ff',
                    border: '1px solid #bfdbfe',
                    color: '#1d4ed8',
                    padding: '4px 10px',
                    borderRadius: '9999px',
                    fontSize: '11px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Chat Input */}
            <form
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
              style={{
                padding: '12px 16px',
                backgroundColor: '#ffffff',
                borderTop: '1px solid #e2e8f0',
                display: 'flex',
                gap: '8px'
              }}
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={`Message ${worker.name}...`}
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  borderRadius: '9999px',
                  border: '1px solid #cbd5e1',
                  fontSize: '13px',
                  outline: 'none'
                }}
              />
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. CALL NOW MODAL */}
      {/* ============================================================== */}
      {showCallModal && (
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
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '420px',
            padding: '24px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid #e2e8f0',
            textAlign: 'center'
          }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowCallModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              overflow: 'hidden',
              margin: '0 auto 12px auto',
              border: '3px solid #2563eb'
            }}>
              <img src={worker.photo} alt={worker.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', marginBottom: '2px' }}>
              {worker.name}
            </h3>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '18px' }}>
              Verified {worker.category} • {worker.city}
            </p>

            <div style={{
              padding: '16px',
              backgroundColor: '#f1f5f9',
              borderRadius: '12px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', letterSpacing: '0.5px' }}>
                {worker.phone_number}
              </span>
              <button
                onClick={handleCopyPhone}
                className="btn btn-outline"
                style={{ padding: '6px 12px', fontSize: '12px' }}
              >
                {copiedPhone ? (
                  <>
                    <Check size={14} color="#10b981" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy size={14} /> Copy
                  </>
                )}
              </button>
            </div>

            <a
              href={`tel:${worker.phone_number}`}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '14px',
                justifyContent: 'center',
                textDecoration: 'none',
                marginBottom: '10px'
              }}
            >
              <Phone size={18} /> Dial Direct Call
            </a>

            <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0 }}>
              🔒 Protected by Workify Safety & Privacy Guarantee
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
