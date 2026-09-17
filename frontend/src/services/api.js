const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
const ML_BASE_URL = import.meta.env.VITE_ML_URL || 'http://localhost:5001';

export const INITIAL_WORKERS = [
  // -------------------------------------------------------------
  // PLUMBERS
  // -------------------------------------------------------------
  {
    id: 1,
    name: "Ramesh Das",
    category: "Plumber",
    rating: 4.8,
    review_count: 124,
    experience_years: 7,
    hourly_rate: 450,
    is_price_negotiable: true,
    distance_km: 2.3,
    city: "Rajahmundry",
    state: "Andhra Pradesh",
    availability_status: "AVAILABLE",
    is_verified: true,
    phone_number: "+91 98765 43210",
    email: "ramesh.das@gmail.com",
    dob: "12 Jan 1990",
    gender: "Male",
    languages: ["English", "Telugu", "Hindi"],
    about_me: "Experienced and certified plumber with 7 years of experience in residential and commercial plumbing services. Quick, reliable, and customer-friendly.",
    skills: ["Bathroom Plumbing", "Pipe Repair", "Leak Fixing", "Water Heater Installation", "Drain Cleaning", "Installation"],
    available_days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    working_hours: "Today, 10:00 AM - 6:00 PM",
    rating_breakdown: { 5: 85, 4: 10, 3: 3, 2: 1, 1: 1 },
    education: "ITI (Plumbing) - Government Industrial Training Institute, Rajahmundry (2015 - 2017)",
    experiences: [
      { year: "2020 - Present", role: "Self Employed (Plumber)", desc: "Residential & Commercial Plumbing, Leak Fixing, Pipe Repair, Installation" },
      { year: "2017 - 2020", role: "ABC Plumbing Services (Junior Plumber)", desc: "Assisted senior plumber in installation and repair work." }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=300",
      "https://images.unsplash.com/photo-1505798577917-a65157d3320a?w=300",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300",
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=300"
    ]
  },
  {
    id: 7,
    name: "Rajesh Varma",
    category: "Plumber",
    rating: 4.7,
    review_count: 89,
    experience_years: 5,
    hourly_rate: 400,
    is_price_negotiable: true,
    distance_km: 3.4,
    city: "Rajahmundry",
    state: "Andhra Pradesh",
    availability_status: "AVAILABLE",
    is_verified: true,
    skills: ["Water Tank Cleaning", "Tap Repair", "Sanitary Fittings", "Clogged Drains"],
    available_days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    working_hours: "Today, 9:00 AM - 7:00 PM",
    languages: ["Telugu", "Hindi"],
    about_me: "Quick-response plumber for all residential pipeline clogs, motor installations, and modern bathroom fittings in Rajahmundry."
  },
  {
    id: 8,
    name: "K. Srinivasa Rao",
    category: "Plumber",
    rating: 4.9,
    review_count: 142,
    experience_years: 10,
    hourly_rate: 480,
    is_price_negotiable: true,
    distance_km: 1.8,
    city: "Rajahmundry",
    state: "Andhra Pradesh",
    availability_status: "AVAILABLE",
    is_verified: true,
    skills: ["Underground Piping", "Pressure Pump Repair", "Leak Detection", "Geyser Fitting"],
    available_days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    working_hours: "Today, 8:00 AM - 8:00 PM",
    languages: ["Telugu", "English"],
    about_me: "Senior plumbing technician with a decade of expertise in commercial complexes and high-rise apartments."
  },

  // -------------------------------------------------------------
  // ELECTRICIANS
  // -------------------------------------------------------------
  {
    id: 2,
    name: "Amit Verma",
    category: "Electrician",
    rating: 4.7,
    review_count: 98,
    experience_years: 6,
    hourly_rate: 400,
    is_price_negotiable: true,
    distance_km: 3.1,
    city: "Rajahmundry",
    state: "Andhra Pradesh",
    availability_status: "AVAILABLE",
    is_verified: true,
    skills: ["Electrical Wiring", "AC Repair", "Switch Board", "Inverter Setup", "MCB Tripping"],
    available_days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    working_hours: "Today, 9:00 AM - 7:00 PM",
    languages: ["English", "Telugu", "Hindi"],
    about_me: "Certified electrician providing dependable home wiring, switchboard fixing, and backup power solutions."
  },
  {
    id: 9,
    name: "Siva Prasad",
    category: "Electrician",
    rating: 4.8,
    review_count: 110,
    experience_years: 8,
    hourly_rate: 420,
    is_price_negotiable: true,
    distance_km: 2.1,
    city: "Rajahmundry",
    state: "Andhra Pradesh",
    availability_status: "AVAILABLE",
    is_verified: true,
    skills: ["Inverter Installation", "Ceiling Fan Repair", "Short Circuit Fixing", "LED Lighting"],
    available_days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    working_hours: "Today, 8:30 AM - 8:00 PM",
    languages: ["Telugu", "Hindi"],
    about_me: "Expert electrician for complete household wiring, inverter troubleshooting, and decorative LED light fittings."
  },
  {
    id: 10,
    name: "M. Venkata Ramana",
    category: "Electrician",
    rating: 4.6,
    review_count: 65,
    experience_years: 4,
    hourly_rate: 350,
    is_price_negotiable: true,
    distance_km: 4.7,
    city: "Rajahmundry",
    state: "Andhra Pradesh",
    availability_status: "AVAILABLE",
    is_verified: true,
    skills: ["Switchboard Upgrade", "Meter Connection", "Earthing Check", "Home Automation"],
    available_days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    working_hours: "Today, 10:00 AM - 6:00 PM",
    languages: ["Telugu"],
    about_me: "Affordable electrical contractor with safety certification, focused on Danavaipeta and surrounding areas."
  },

  // -------------------------------------------------------------
  // CARPENTERS
  // -------------------------------------------------------------
  {
    id: 3,
    name: "Suresh Yadav",
    category: "Carpenter",
    rating: 4.6,
    review_count: 76,
    experience_years: 7,
    hourly_rate: 380,
    is_price_negotiable: true,
    distance_km: 4.2,
    city: "Rajahmundry",
    state: "Andhra Pradesh",
    availability_status: "AVAILABLE",
    is_verified: true,
    skills: ["Wood Work", "Furniture Repair", "Polishing", "Door Locks", "Cabinet Making"],
    available_days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    working_hours: "Today, 10:00 AM - 5:00 PM",
    languages: ["Telugu", "Hindi"],
    about_me: "Experienced carpenter for custom furniture design, antique restoration, and modular setups."
  },
  {
    id: 11,
    name: "P. Satyanarayana",
    category: "Carpenter",
    rating: 4.8,
    review_count: 94,
    experience_years: 9,
    hourly_rate: 450,
    is_price_negotiable: true,
    distance_km: 2.8,
    city: "Rajahmundry",
    state: "Andhra Pradesh",
    availability_status: "AVAILABLE",
    is_verified: true,
    skills: ["Modular Kitchen", "Wardrobe Woodwork", "Door Frame Fitting", "Wood Polish"],
    available_days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    working_hours: "Today, 9:00 AM - 6:30 PM",
    languages: ["Telugu", "English"],
    about_me: "Specialized in contemporary modular kitchens, wardrobe hinges, and teak wood furniture polish."
  },

  // -------------------------------------------------------------
  // PAINTERS
  // -------------------------------------------------------------
  {
    id: 4,
    name: "Pankaj Mehta",
    category: "Painter",
    rating: 4.5,
    review_count: 64,
    experience_years: 5,
    hourly_rate: 350,
    is_price_negotiable: true,
    distance_km: 5.8,
    city: "Rajahmundry",
    state: "Andhra Pradesh",
    availability_status: "AVAILABLE",
    is_verified: true,
    skills: ["Interior Painting", "Exterior Painting", "Wall Design", "Waterproofing"],
    available_days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    working_hours: "Today, 8:00 AM - 5:00 PM",
    languages: ["Telugu", "Hindi"],
    about_me: "House and commercial wall painter with expertise in texture finishes and weather protection."
  },
  {
    id: 12,
    name: "Surya Prakash",
    category: "Painter",
    rating: 4.7,
    review_count: 82,
    experience_years: 6,
    hourly_rate: 380,
    is_price_negotiable: true,
    distance_km: 3.6,
    city: "Rajahmundry",
    state: "Andhra Pradesh",
    availability_status: "AVAILABLE",
    is_verified: true,
    skills: ["Waterproof Priming", "Texture Wall Stencil", "Royal Luxury Finish", "Damp Proofing"],
    available_days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    working_hours: "Today, 8:30 AM - 6:00 PM",
    languages: ["Telugu", "Hindi"],
    about_me: "Asian Paints certified professional painter, specialist in crack sealing and moisture-free wall textures."
  },

  // -------------------------------------------------------------
  // AC TECHNICIANS
  // -------------------------------------------------------------
  {
    id: 5,
    name: "Vikas Sharma",
    category: "AC Technician",
    rating: 4.7,
    review_count: 88,
    experience_years: 6,
    hourly_rate: 420,
    is_price_negotiable: true,
    distance_km: 6.4,
    city: "Rajahmundry",
    state: "Andhra Pradesh",
    availability_status: "AVAILABLE",
    is_verified: true,
    skills: ["AC Installation", "AC Repair", "Gas Filling", "Filter Cleaning"],
    available_days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    working_hours: "Today, 10:00 AM - 8:00 PM",
    languages: ["English", "Telugu", "Hindi"],
    about_me: "Fast AC diagnostic and gas charging services for Split, Inverter, and Window ACs."
  },
  {
    id: 13,
    name: "K. Anand Babu",
    category: "AC Technician",
    rating: 4.9,
    review_count: 118,
    experience_years: 8,
    hourly_rate: 450,
    is_price_negotiable: true,
    distance_km: 1.5,
    city: "Rajahmundry",
    state: "Andhra Pradesh",
    availability_status: "AVAILABLE",
    is_verified: true,
    skills: ["Inverter AC PCB Repair", "Coil Foam Cleaning", "Copper Piping", "Gas Leak Fix"],
    available_days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    working_hours: "Today, 9:00 AM - 9:00 PM",
    languages: ["Telugu", "English"],
    about_me: "Expert AC servicing for all major brands (Daikin, Voltas, LG, Samsung) with 100% cooling guarantee."
  },

  // -------------------------------------------------------------
  // MECHANICS
  // -------------------------------------------------------------
  {
    id: 6,
    name: "Mahesh Kumar",
    category: "Mechanic",
    rating: 4.4,
    review_count: 52,
    experience_years: 5,
    hourly_rate: 400,
    is_price_negotiable: true,
    distance_km: 7.1,
    city: "Rajahmundry",
    state: "Andhra Pradesh",
    availability_status: "AVAILABLE",
    is_verified: true,
    skills: ["Bike Repair", "Car Repair", "Engine Service", "Brake Overhaul"],
    available_days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    working_hours: "Today, 9:00 AM - 8:00 PM",
    languages: ["Telugu", "Hindi"],
    about_me: "Mechanic specialized in 2-wheelers and 4-wheelers service, periodic maintenance and emergency breakdowns."
  },
  {
    id: 14,
    name: "Sai Teja",
    category: "Mechanic",
    rating: 4.7,
    review_count: 73,
    experience_years: 6,
    hourly_rate: 380,
    is_price_negotiable: true,
    distance_km: 2.9,
    city: "Rajahmundry",
    state: "Andhra Pradesh",
    availability_status: "AVAILABLE",
    is_verified: true,
    skills: ["Doorstep Bike Service", "Puncture Repair", "Oil Change", "Clutch Plate"],
    available_days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    working_hours: "Today, 8:00 AM - 9:00 PM",
    languages: ["Telugu"],
    about_me: "Fast doorstep 2-wheeler mechanic. Instant battery jumpstarts and mobile breakdown service in Rajahmundry."
  },

  // -------------------------------------------------------------
  // CLEANERS & HOUSEKEEPING
  // -------------------------------------------------------------
  {
    id: 15,
    name: "Lakshmi Housekeeping",
    category: "Cleaner",
    rating: 4.8,
    review_count: 95,
    experience_years: 5,
    hourly_rate: 300,
    is_price_negotiable: true,
    distance_km: 2.0,
    city: "Rajahmundry",
    state: "Andhra Pradesh",
    availability_status: "AVAILABLE",
    is_verified: true,
    skills: ["Deep Cleaning", "Kitchen Degreasing", "Bathroom Sanitization", "Floor Scrubbing"],
    available_days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    working_hours: "Today, 8:00 AM - 6:00 PM",
    languages: ["Telugu"],
    about_me: "Thorough, hygienic home and office deep cleaning team with eco-friendly cleaning solutions."
  }
];

export async function fetchWorkers(filters = {}) {
  try {
    const params = new URLSearchParams();
    if (filters.category && filters.category !== 'All') params.append('category', filters.category);
    if (filters.city) params.append('city', filters.city);
    if (filters.status) params.append('status', filters.status);

    const res = await fetch(`${API_BASE_URL}/workers/?${params.toString()}`);
    if (res.ok) {
      const data = await res.json();
      if (data && data.length > 0) return data;
    }
  } catch (err) {
    console.warn("Backend API not reachable, using mock catalog data:", err);
  }

  // Filter mock workers locally
  return INITIAL_WORKERS.filter(w => {
    if (filters.category && filters.category !== 'All' && w.category.toLowerCase() !== filters.category.toLowerCase()) {
      return false;
    }
    return true;
  });
}

export async function postNewJob(jobData) {
  try {
    const res = await fetch(`${API_BASE_URL}/jobs/posts/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jobData),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn("Backend API offline, mock success for job posting:", err);
  }
  return { id: Date.now(), ...jobData, status: "OPEN" };
}

// -------------------------------------------------------------
// PROFILE & BOOKING UTILITIES
// -------------------------------------------------------------
const TRADE_MEDIA = {
  Plumber: {
    photo: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=300",
    education: "ITI (Plumbing & Sanitation) - Govt Industrial Training Institute, Rajahmundry",
    gallery: [
      "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=300",
      "https://images.unsplash.com/photo-1505798577917-a65157d3320a?w=300",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300",
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=300"
    ],
    reviews: [
      { author: "K. Murali Krishna", locality: "Danavaipeta", rating: 5, date: "2 days ago", comment: "Arrived within 25 minutes! Fixed our main overhead tank pipe leakage quickly. Very clean work and polite." },
      { author: "P. Satyanarayana", locality: "Morampudi", rating: 5, date: "1 week ago", comment: "Excellent bathroom fitting work. Charged exactly as estimated without any hidden costs." },
      { author: "Sita Mahalakshmi", locality: "Innespeta", rating: 4.5, date: "2 weeks ago", comment: "Very professional plumber. Carried all necessary replacement washers and pipes." }
    ]
  },
  Electrician: {
    photo: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=300",
    education: "Diploma in Electrical & Electronics Engineering - Andhra Polytechnic, Kakinada",
    gallery: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=300",
      "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=300",
      "https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?w=300",
      "https://images.unsplash.com/photo-1498084393753-b411b2d26b34?w=300"
    ],
    reviews: [
      { author: "Rao V. S.", locality: "T-Nagar, Rajahmundry", rating: 5, date: "3 days ago", comment: "Diagnosed our inverter tripping issue in 10 minutes. Very skilled electrician." },
      { author: "B. Venkata Rao", locality: "Aryapuram", rating: 5, date: "5 days ago", comment: "Completed 3-bedroom apartment modular switch installation neatly. Highly recommended!" },
      { author: "Ch. Anitha", locality: "Danavaipeta", rating: 4.8, date: "2 weeks ago", comment: "Quick response for our MCB breaker change during power outage. Very trustworthy." }
    ]
  },
  Carpenter: {
    photo: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=300",
    education: "Vocational Certificate in Woodcraft & Carpentry - ITI Rajahmundry",
    gallery: [
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=300",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=300",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=300",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300"
    ],
    reviews: [
      { author: "G. Appa Rao", locality: "Kotipalli", rating: 5, date: "Yesterday", comment: "Fixed teak wood door hinges and built custom kitchen shelves. Outstanding craftsmanship." },
      { author: "M. Subrahmanyam", locality: "Prakash Nagar", rating: 5, date: "1 week ago", comment: "Restored our vintage dining table perfectly. Very reasonable pricing." }
    ]
  },
  Painter: {
    photo: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=300",
    education: "Certified Master Painter - Asian Paints Color Academy Certification",
    gallery: [
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=300",
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=300",
      "https://images.unsplash.com/photo-1574359411659-15573a27fd0c?w=300",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=300"
    ],
    reviews: [
      { author: "K. Haritha", locality: "Danavaipeta", rating: 5, date: "4 days ago", comment: "Flawless royal finish paint on our living room feature wall. Clean work without spills." },
      { author: "V. Srinivas", locality: "Kambalapeta", rating: 4.7, date: "1 week ago", comment: "Waterproofing and exterior putty work was done on time." }
    ]
  },
  "AC Technician": {
    photo: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=300",
    education: "HVAC & Air Conditioning Certification - ITI Andhra Pradesh",
    gallery: [
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=300",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300",
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=300",
      "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=300"
    ],
    reviews: [
      { author: "N. Ramakrishna", locality: "Morampudi", rating: 5, date: "2 days ago", comment: "Our split AC was not cooling in summer heat. Vikram refilled gas and cleaned foam filter in 40 mins. Super chill now!" },
      { author: "T. Bhavani", locality: "Aryapuram", rating: 5, date: "6 days ago", comment: "Very genuine technician. Didn't charge for unnecessary parts." }
    ]
  },
  Mechanic: {
    photo: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=300",
    education: "Automobile Engineering Diploma - Govt Polytechnic, Rajahmundry",
    gallery: [
      "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=300",
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=300",
      "https://images.unsplash.com/photo-1508974239320-0a029497e820?w=300",
      "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=300"
    ],
    reviews: [
      { author: "D. Prasad", locality: "Dowleswaram", rating: 5, date: "Yesterday", comment: "Bike broke down on Godavari bridge road. Arrived in 15 mins with mobile toolkit and fixed clutch wire!" },
      { author: "P. Ravi", locality: "Danavaipeta", rating: 4.8, date: "1 week ago", comment: "Car battery jumpstart and brake pad replacement done cleanly at doorstep." }
    ]
  },
  Cleaner: {
    photo: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300",
    education: "Certified Professional Housekeeping & Sanitization - AP Skill Council",
    gallery: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300",
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=300",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300",
      "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=300"
    ],
    reviews: [
      { author: "Y. Vijayalakshmi", locality: "Innespeta", rating: 5, date: "3 days ago", comment: "Lakshmi and team made our 3BHK flat look brand new before housewarming! Sparkling bathrooms and kitchen." },
      { author: "S. Mohan", locality: "Morampudi", rating: 4.9, date: "10 days ago", comment: "Thorough sofa cleaning and floor sanitization. Very polite and hard working." }
    ]
  }
};

export function getWorkerById(id) {
  const parsedId = parseInt(id || '1', 10);
  const found = INITIAL_WORKERS.find(w => w.id === parsedId) || INITIAL_WORKERS[0];
  const defaults = TRADE_MEDIA[found.category] || TRADE_MEDIA.Plumber;

  return {
    ...found,
    photo: found.photo || defaults.photo,
    education: found.education || defaults.education,
    gallery: found.gallery && found.gallery.length > 0 ? found.gallery : defaults.gallery,
    reviews: found.reviews && found.reviews.length > 0 ? found.reviews : defaults.reviews,
    phone_number: found.phone_number || `+91 ${Math.floor(9000000000 + (found.id * 54321) % 900000000)}`,
    email: found.email || `${found.name.toLowerCase().replace(/[^a-z]/g, '.')}@workify.in`,
    dob: found.dob || "15 May 1988",
    gender: found.gender || "Male",
    languages: found.languages || ["Telugu", "English", "Hindi"],
    experiences: found.experiences || [
      { year: `${2026 - found.experience_years} - Present`, role: `Senior ${found.category}`, desc: `Managing residential and commercial ${found.category.toLowerCase()} projects across Rajahmundry.` },
      { year: `${2026 - found.experience_years - 3} - ${2026 - found.experience_years}`, role: `Apprentice & Assistant ${found.category}`, desc: `Hands-on practical training under master technicians.` }
    ]
  };
}

export function createBooking(data) {
  try {
    const existing = JSON.parse(localStorage.getItem('workify_bookings') || '[]');
    const newBooking = {
      id: `WK-${Math.floor(100000 + Math.random() * 900000)}`,
      otp: Math.floor(1000 + Math.random() * 9000).toString(),
      createdAt: new Date().toISOString(),
      status: 'CONFIRMED',
      ...data
    };
    existing.unshift(newBooking);
    localStorage.setItem('workify_bookings', JSON.stringify(existing));
    return newBooking;
  } catch (err) {
    console.error("Error creating booking:", err);
    return {
      id: `WK-${Math.floor(100000 + Math.random() * 900000)}`,
      otp: "4829",
      createdAt: new Date().toISOString(),
      status: 'CONFIRMED',
      ...data
    };
  }
}

export function getBookings() {
  try {
    return JSON.parse(localStorage.getItem('workify_bookings') || '[]');
  } catch (err) {
    return [];
  }
}

