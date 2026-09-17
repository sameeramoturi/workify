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
