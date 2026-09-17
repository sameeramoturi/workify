import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { getBookings } from '../../services/api';
import {
  Search,
  Send,
  Paperclip,
  Phone,
  MoreVertical,
  Check,
  CheckCheck,
  MapPin,
  Calendar,
  Clock,
  Mic,
  ShieldCheck,
  User,
  Wrench,
  X,
  PhoneCall,
  Smile,
  AlertCircle,
  FileText,
  Sparkles
} from 'lucide-react';

const INITIAL_CONVERSATIONS = [
  {
    id: 'c1',
    workerId: 1,
    name: 'Ramesh Das',
    category: 'Plumber',
    locality: 'Danavaipeta, Rajahmundry',
    photo: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=120',
    online: true,
    lastSeen: 'Online',
    unreadCount: 1,
    bookingId: 'WK-894215',
    otp: '4829',
    messages: [
      { id: 1, sender: 'system', text: 'Booking confirmed for Bathroom Leak Repair. Service OTP: 4829', time: '10:15 AM' },
      { id: 2, sender: 'customer', text: 'Namaste Ramesh garu! Are you available to come by 11 AM?', time: '10:16 AM', status: 'read' },
      { id: 3, sender: 'worker', text: 'Namaste madam! Yes, I am at Danavaipeta near Subrahmanya grounds. Packing my tool kit now.', time: '10:18 AM' },
      { id: 4, sender: 'customer', text: 'Please bring an extra 1/2 inch PVC pipe joint and Teflon tape if possible.', time: '10:20 AM', status: 'read' },
      { id: 5, sender: 'worker', text: 'Sure madam, I have all plumbing spares in my mobile kit. Starting now on my bike, will reach in 15 mins!', time: '10:22 AM' }
    ]
  },
  {
    id: 'c2',
    workerId: 2,
    name: 'Amit Verma',
    category: 'Electrician',
    locality: 'Prakash Nagar, Rajahmundry',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120',
    online: true,
    lastSeen: 'Online',
    unreadCount: 0,
    bookingId: 'WK-551902',
    otp: '7391',
    messages: [
      { id: 1, sender: 'system', text: 'Service scheduled: Inverter MCB Tripping Diagnostic', time: 'Yesterday' },
      { id: 2, sender: 'customer', text: 'Hi Amit, our inverter tripped twice after heavy rain.', time: 'Yesterday 3:30 PM', status: 'read' },
      { id: 3, sender: 'worker', text: 'Checked your details sir. It could be earthing leakage or battery terminal corrosion. I can inspect tomorrow morning.', time: 'Yesterday 3:45 PM' },
      { id: 4, sender: 'customer', text: 'Great, 10 AM works best for us.', time: 'Yesterday 4:00 PM', status: 'read' }
    ]
  },
  {
    id: 'c3',
    workerId: 3,
    name: 'Suresh Yadav',
    category: 'Carpenter',
    locality: 'Morampudi, Rajahmundry',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120',
    online: false,
    lastSeen: 'Last seen today at 9:15 AM',
    unreadCount: 0,
    bookingId: null,
    messages: [
      { id: 1, sender: 'customer', text: 'Hello Suresh, do you repair wardrobe hydraulic hinges?', time: 'Sep 15' },
      { id: 2, sender: 'worker', text: 'Yes sir, I carry Hafele and Ebco hydraulic hinges. Where is your location?', time: 'Sep 15' },
      { id: 3, sender: 'customer', text: 'Near Morampudi flyover, House 45.', time: 'Sep 15', status: 'read' },
      { id: 4, sender: 'worker', text: 'Noted sir! I can visit around 4 PM.', time: 'Sep 15' }
    ]
  },
  {
    id: 'c4',
    workerId: 5,
    name: 'Vikas Sharma',
    category: 'AC Technician',
    locality: 'Dowleswaram, Rajahmundry',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120',
    online: true,
    lastSeen: 'Online',
    unreadCount: 0,
    bookingId: 'WK-310948',
    otp: '9152',
    messages: [
      { id: 1, sender: 'system', text: 'Job Completed: Split AC Jet Foam Wash & Gas Top-up', time: 'Sep 14' },
      { id: 2, sender: 'worker', text: 'Service finished sir. Please share the 4-digit OTP to complete payment receipt.', time: 'Sep 14' },
      { id: 3, sender: 'customer', text: 'Shared OTP 9152. Cooling is excellent now, thank you!', time: 'Sep 14', status: 'read' },
      { id: 4, sender: 'worker', text: 'Thank you sir! Please rate us on Workify when you get time.', time: 'Sep 14' }
    ]
  },
  {
    id: 'c5',
    workerId: 15,
    name: 'Lakshmi Housekeeping',
    category: 'Cleaner',
    locality: 'Alcot Gardens, Rajahmundry',
    photo: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=120',
    online: false,
    lastSeen: 'Last seen yesterday',
    unreadCount: 0,
    bookingId: null,
    messages: [
      { id: 1, sender: 'customer', text: 'Hi Lakshmi garu, need full 3BHK flat deep cleaning before housewarming.', time: 'Sep 12' },
      { id: 2, sender: 'worker', text: 'Namaste madam! We have a 4-member professional team with German vacuum machines. 6 hours deep scrub.', time: 'Sep 12' },
      { id: 3, sender: 'customer', text: 'Sounds perfect. What is the total package quote?', time: 'Sep 12', status: 'read' },
      { id: 4, sender: 'worker', text: '₹2,400 all inclusive of chemicals, floor buffing and balcony wash madam.', time: 'Sep 12' }
    ]
  }
];

export default function CustomerMessages() {
  const [conversations, setConversations] = useState(() => {
    try {
      const saved = localStorage.getItem('workify_chat_conversations');
      return saved ? JSON.parse(saved) : INITIAL_CONVERSATIONS;
    } catch {
      return INITIAL_CONVERSATIONS;
    }
  });

  const [activeChatId, setActiveChatId] = useState('c1');
  const [searchQuery, setSearchQuery] = useState('');
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [filterTab, setFilterTab] = useState('ALL'); // ALL, UNREAD, ACTIVE
  const messagesEndRef = useRef(null);

  const activeConversation = conversations.find(c => c.id === activeChatId) || conversations[0];

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages, isTyping]);

  // Persist conversations
  useEffect(() => {
    try {
      localStorage.setItem('workify_chat_conversations', JSON.stringify(conversations));
    } catch (err) {
      console.warn("Storage quota exceeded", err);
    }
  }, [conversations]);

  // Handle Send Message
  const handleSendMessage = (textToSend) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const newMessage = {
      id: Date.now(),
      sender: 'customer',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };

    setConversations(prev => prev.map(c => {
      if (c.id === activeChatId) {
        return {
          ...c,
          messages: [...c.messages, newMessage]
        };
      }
      return c;
    }));

    setInputText('');

    // Simulate double ticks after 400ms
    setTimeout(() => {
      setConversations(prev => prev.map(c => {
        if (c.id === activeChatId) {
          return {
            ...c,
            messages: c.messages.map(m => m.id === newMessage.id ? { ...m, status: 'read' } : m)
          };
        }
        return c;
      }));
    }, 400);

    // Simulate intelligent worker auto-reply after 1.2s
    triggerWorkerAutoReply(text, activeConversation);
  };

  const triggerWorkerAutoReply = (customerText, conversation) => {
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let reply = `Sure! I have noted this. I am available across Rajahmundry. You can count on my on-time service.`;

      const q = customerText.toLowerCase();
      if (q.includes('price') || q.includes('charge') || q.includes('cost') || q.includes('rate')) {
        reply = `My standard rate is ₹${conversation.category === 'Cleaner' ? 300 : conversation.category === 'Plumber' ? 450 : 400}/hr with zero hidden charges. Any spare materials are billed as per actual MRP store bills.`;
      } else if (q.includes('where') || q.includes('time') || q.includes('reach') || q.includes('late') || q.includes('way')) {
        reply = `I am currently in ${conversation.locality.split(',')[0]} and traveling via main road. I will arrive in approximately 15 to 20 minutes!`;
      } else if (q.includes('otp') || q.includes('code')) {
        reply = `Yes madam/sir, upon reaching your doorstep, I will ask for the 4-digit OTP (${conversation.otp || '4829'}) to commence the work safely.`;
      } else if (q.includes('tool') || q.includes('spare') || q.includes('pipe') || q.includes('wire')) {
        reply = `Don't worry, my toolkit is fully equipped with testing meters, spare fittings, seals and professional heavy-duty equipment.`;
      } else if (q.includes('namaste') || q.includes('hi') || q.includes('hello')) {
        reply = `Namaste! Good to connect with you. How can I assist you with your ${conversation.category.toLowerCase()} job today?`;
      }

      const workerReplyMsg = {
        id: Date.now() + 1,
        sender: 'worker',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setConversations(prev => prev.map(c => {
        if (c.id === conversation.id) {
          return {
            ...c,
            messages: [...c.messages, workerReplyMsg]
          };
        }
        return c;
      }));
    }, 1200);
  };

  const filteredConversations = conversations.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.locality.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (filterTab === 'UNREAD') return c.unreadCount > 0;
    if (filterTab === 'ACTIVE') return !!c.bookingId;
    return true;
  });

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <Navbar activeCity="Danavaipeta, Rajahmundry" />

      <div style={{ display: 'flex' }}>
        <Sidebar />

        <main style={{ flex: 1, padding: '24px 32px', display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>Messages & Live Dispatch Chat</span>
                <span style={{ fontSize: '12px', fontWeight: '700', backgroundColor: '#dbeafe', color: '#1e40af', padding: '2px 10px', borderRadius: '9999px' }}>
                  Live Chat Hub
                </span>
              </h1>
              <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
                Chat directly with assigned workers in Rajahmundry, share arrival instructions, and view quotes.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <Link to="/workers" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '13px' }}>
                + Find New Worker
              </Link>
            </div>
          </div>

          {/* Main 2-Pane Chat Container */}
          <div className="card" style={{
            height: 'calc(100vh - 190px)',
            minHeight: '560px',
            display: 'grid',
            gridTemplateColumns: '340px 1fr',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
          }}>
            {/* LEFT PANE: CONVERSATIONS LIST */}
            <div style={{
              borderRight: '1px solid #e2e8f0',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#ffffff'
            }}>
              {/* Search & Tabs */}
              <div style={{ padding: '16px', borderBottom: '1px solid #f1f5f9' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#f1f5f9',
                  borderRadius: '10px',
                  padding: '8px 12px',
                  gap: '8px',
                  marginBottom: '12px'
                }}>
                  <Search size={16} color="#94a3b8" />
                  <input
                    type="text"
                    placeholder="Search chats by name, trade, locality..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      border: 'none',
                      backgroundColor: 'transparent',
                      outline: 'none',
                      width: '100%',
                      fontSize: '13px',
                      color: '#1e293b'
                    }}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#94a3b8' }}
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* Filter Pills */}
                <div style={{ display: 'flex', gap: '6px' }}>
                  {['ALL', 'ACTIVE', 'UNREAD'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setFilterTab(tab)}
                      type="button"
                      style={{
                        flex: 1,
                        padding: '6px 0',
                        fontSize: '11px',
                        fontWeight: '700',
                        borderRadius: '6px',
                        border: 'none',
                        backgroundColor: filterTab === tab ? '#2563eb' : '#f8fafc',
                        color: filterTab === tab ? '#ffffff' : '#64748b',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {tab === 'ALL' ? 'All Chats' : tab === 'ACTIVE' ? 'Active Jobs' : 'Unread'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Conversations Scrollable List */}
              <div style={{ flex: 1, overflowY: 'auto' }}>
                {filteredConversations.length === 0 ? (
                  <div style={{ padding: '32px 16px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>
                    No conversations match your search.
                  </div>
                ) : (
                  filteredConversations.map(conv => {
                    const isCurrent = conv.id === activeChatId;
                    const lastMsg = conv.messages[conv.messages.length - 1];
                    return (
                      <div
                        key={conv.id}
                        onClick={() => {
                          setActiveChatId(conv.id);
                          // Clear unread
                          setConversations(prev => prev.map(c => c.id === conv.id ? { ...c, unreadCount: 0 } : c));
                        }}
                        style={{
                          display: 'flex',
                          gap: '12px',
                          padding: '14px 16px',
                          cursor: 'pointer',
                          backgroundColor: isCurrent ? '#eff6ff' : '#ffffff',
                          borderLeft: isCurrent ? '4px solid #2563eb' : '4px solid transparent',
                          borderBottom: '1px solid #f1f5f9',
                          transition: 'background-color 0.15s ease'
                        }}
                      >
                        {/* Worker Avatar with online dot */}
                        <div style={{ position: 'relative', flexShrink: 0 }}>
                          <img
                            src={conv.photo}
                            alt={conv.name}
                            style={{ width: '46px', height: '46px', borderRadius: '50%', objectFit: 'cover' }}
                          />
                          {conv.online && (
                            <span style={{
                              position: 'absolute',
                              bottom: 0,
                              right: 0,
                              width: '12px',
                              height: '12px',
                              borderRadius: '50%',
                              backgroundColor: '#10b981',
                              border: '2px solid #ffffff'
                            }}></span>
                          )}
                        </div>

                        {/* Conv Details */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                            <strong style={{ fontSize: '14px', color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {conv.name}
                            </strong>
                            <span style={{ fontSize: '11px', color: '#94a3b8', flexShrink: 0 }}>
                              {lastMsg?.time || '10:00 AM'}
                            </span>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                            <span style={{ fontSize: '11px', color: '#2563eb', fontWeight: '700' }}>
                              {conv.category}
                            </span>
                            <span style={{ fontSize: '10px', color: '#94a3b8' }}>•</span>
                            <span style={{ fontSize: '11px', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {conv.locality.split(',')[0]}
                            </span>
                          </div>

                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <p style={{
                              fontSize: '12px',
                              color: isCurrent ? '#1e40af' : '#64748b',
                              margin: 0,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              fontWeight: conv.unreadCount > 0 ? '700' : '400'
                            }}>
                              {lastMsg?.sender === 'customer' && 'You: '}
                              {lastMsg?.text || 'Started conversation'}
                            </p>

                            {conv.unreadCount > 0 && (
                              <span style={{
                                backgroundColor: '#2563eb',
                                color: '#ffffff',
                                fontSize: '10px',
                                fontWeight: '800',
                                width: '18px',
                                height: '18px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                marginLeft: '6px'
                              }}>
                                {conv.unreadCount}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* RIGHT PANE: ACTIVE CHAT STREAM */}
            <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc' }}>
              {/* Active Chat Header */}
              <div style={{
                padding: '12px 20px',
                backgroundColor: '#ffffff',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ position: 'relative' }}>
                    <img
                      src={activeConversation.photo}
                      alt={activeConversation.name}
                      style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    {activeConversation.online && (
                      <span style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: '#10b981',
                        border: '2px solid #ffffff'
                      }}></span>
                    )}
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <strong style={{ fontSize: '15px', color: '#0f172a' }}>
                        {activeConversation.name}
                      </strong>
                      <span style={{ color: '#2563eb', fontSize: '14px' }}>✓</span>
                      <span style={{
                        fontSize: '11px',
                        backgroundColor: '#eff6ff',
                        color: '#1e40af',
                        padding: '1px 6px',
                        borderRadius: '4px',
                        fontWeight: '700'
                      }}>
                        {activeConversation.category}
                      </span>
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ color: activeConversation.online ? '#10b981' : '#94a3b8', fontWeight: '600' }}>
                        ● {activeConversation.lastSeen}
                      </span>
                      <span>•</span>
                      <span>📍 {activeConversation.locality}</span>
                    </div>
                  </div>
                </div>

                {/* Header Action Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={() => setShowCallModal(true)}
                    type="button"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 14px',
                      backgroundColor: '#eff6ff',
                      color: '#2563eb',
                      border: '1px solid #bfdbfe',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    <Phone size={14} /> Direct Call
                  </button>

                  <Link
                    to={`/workers/${activeConversation.workerId}`}
                    style={{
                      padding: '8px 14px',
                      backgroundColor: '#ffffff',
                      color: '#475569',
                      border: '1px solid #cbd5e1',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: '600',
                      textDecoration: 'none'
                    }}
                  >
                    View Profile
                  </Link>
                </div>
              </div>

              {/* Sticky Service Context Banner (if active booking exists) */}
              {activeConversation.bookingId && (
                <div style={{
                  backgroundColor: '#fefce8',
                  borderBottom: '1px solid #fef08a',
                  padding: '8px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '12px',
                  color: '#854d0e'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ShieldCheck size={16} color="#ca8a04" />
                    <span>
                      Active Booking: <strong>#{activeConversation.bookingId}</strong> • Share OTP upon worker arrival:
                    </span>
                    <span style={{
                      backgroundColor: '#ca8a04',
                      color: '#ffffff',
                      fontWeight: '800',
                      fontSize: '11px',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      letterSpacing: '1px'
                    }}>
                      OTP: {activeConversation.otp}
                    </span>
                  </div>
                  <Link to="/bookings" style={{ color: '#2563eb', fontWeight: '700', textDecoration: 'none' }}>
                    View Booking Details &gt;
                  </Link>
                </div>
              )}

              {/* Chat Message Stream */}
              <div style={{
                flex: 1,
                padding: '20px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                {/* Date Divider */}
                <div style={{ textAlign: 'center', margin: '4px 0 10px 0' }}>
                  <span style={{
                    backgroundColor: '#e2e8f0',
                    color: '#64748b',
                    fontSize: '11px',
                    fontWeight: '600',
                    padding: '3px 12px',
                    borderRadius: '9999px'
                  }}>
                    Today • Rajahmundry Local Service
                  </span>
                </div>

                {activeConversation.messages.map((msg) => {
                  if (msg.sender === 'system') {
                    return (
                      <div key={msg.id} style={{
                        alignSelf: 'center',
                        backgroundColor: '#f1f5f9',
                        border: '1px solid #e2e8f0',
                        padding: '6px 14px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        color: '#475569',
                        textAlign: 'center',
                        maxWidth: '85%'
                      }}>
                        ℹ️ {msg.text}
                      </div>
                    );
                  }

                  const isMe = msg.sender === 'customer';
                  return (
                    <div
                      key={msg.id}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignSelf: isMe ? 'flex-end' : 'flex-start',
                        maxWidth: '70%'
                      }}
                    >
                      <div style={{
                        backgroundColor: isMe ? '#2563eb' : '#ffffff',
                        color: isMe ? '#ffffff' : '#1e293b',
                        padding: '10px 14px',
                        borderRadius: isMe ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                        border: isMe ? 'none' : '1px solid #e2e8f0',
                        fontSize: '13px',
                        lineHeight: 1.45
                      }}>
                        {msg.text}
                      </div>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '10px',
                        color: '#94a3b8',
                        marginTop: '3px',
                        alignSelf: isMe ? 'flex-end' : 'flex-start'
                      }}>
                        <span>{msg.time}</span>
                        {isMe && (
                          <span>
                            {msg.status === 'read' ? (
                              <CheckCheck size={13} color="#3b82f6" />
                            ) : (
                              <Check size={13} />
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Worker Typing Indicator */}
                {isTyping && (
                  <div style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>{activeConversation.name} is typing...</span>
                    <div style={{ display: 'flex', gap: '3px' }}>
                      <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#2563eb', animation: 'ping 1s infinite' }}></span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Suggestion Chips */}
              <div style={{
                padding: '8px 20px',
                backgroundColor: '#ffffff',
                borderTop: '1px solid #f1f5f9',
                display: 'flex',
                gap: '8px',
                overflowX: 'auto',
                scrollbarWidth: 'none'
              }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Sparkles size={12} color="#2563eb" /> Quick Reply:
                </span>
                {[
                  "Are you on the way?",
                  "How long will it take?",
                  "Please bring all necessary tools.",
                  "What is the estimated price?",
                  "Call me when you reach the gate."
                ].map(chip => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => handleSendMessage(chip)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '9999px',
                      fontSize: '11px',
                      fontWeight: '600',
                      border: '1px solid #dbeafe',
                      backgroundColor: '#eff6ff',
                      color: '#2563eb',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* Input Area */}
              <div style={{
                padding: '14px 20px',
                backgroundColor: '#ffffff',
                borderTop: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                {/* Send Location Button */}
                <button
                  type="button"
                  onClick={() => handleSendMessage(`📍 My exact service location: House No. 123, Danavaipeta, Rajahmundry (Near Subrahmanya Grounds)`)}
                  title="Send Location Pin"
                  style={{
                    backgroundColor: '#f8fafc',
                    border: '1px solid #cbd5e1',
                    borderRadius: '50%',
                    width: '38px',
                    height: '38px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#64748b'
                  }}
                >
                  <MapPin size={17} color="#2563eb" />
                </button>

                {/* Input Textbox */}
                <div style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#f1f5f9',
                  borderRadius: '9999px',
                  padding: '8px 16px'
                }}>
                  <input
                    type="text"
                    placeholder={`Type a message to ${activeConversation.name}...`}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSendMessage();
                    }}
                    style={{
                      border: 'none',
                      backgroundColor: 'transparent',
                      outline: 'none',
                      width: '100%',
                      fontSize: '14px',
                      color: '#1e293b'
                    }}
                  />
                </div>

                {/* Send Button */}
                <button
                  type="button"
                  onClick={() => handleSendMessage()}
                  disabled={!inputText.trim()}
                  style={{
                    backgroundColor: inputText.trim() ? '#2563eb' : '#94a3b8',
                    border: 'none',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: inputText.trim() ? 'pointer' : 'not-allowed',
                    color: '#ffffff',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Direct Call Simulation Modal */}
          {showCallModal && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(15, 23, 42, 0.7)',
              backdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 99999
            }}>
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                padding: '28px',
                width: '100%',
                maxWidth: '400px',
                textAlign: 'center',
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
              }}>
                <img
                  src={activeConversation.photo}
                  alt={activeConversation.name}
                  style={{ width: '72px', height: '72px', borderRadius: '50%', margin: '0 auto 12px', objectFit: 'cover', border: '3px solid #2563eb' }}
                />
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', margin: '0 0 4px 0' }}>
                  Calling {activeConversation.name}...
                </h3>
                <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 16px 0' }}>
                  {activeConversation.category} • {activeConversation.locality}
                </p>

                <div style={{
                  padding: '12px',
                  backgroundColor: '#eff6ff',
                  borderRadius: '10px',
                  marginBottom: '20px',
                  border: '1px dashed #3b82f6'
                }}>
                  <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>Verified Phone Line</span>
                  <strong style={{ fontSize: '16px', color: '#2563eb' }}>+91 98765 43210</strong>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <a
                    href="tel:+919876543210"
                    className="btn btn-primary"
                    style={{ flex: 1, padding: '10px', fontSize: '13px' }}
                  >
                    Open Phone Dialer
                  </a>
                  <button
                    onClick={() => setShowCallModal(false)}
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
