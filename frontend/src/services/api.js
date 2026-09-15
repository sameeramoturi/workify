const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
const ML_BASE_URL = import.meta.env.VITE_ML_URL || 'http://localhost:5001';

export const INITIAL_WORKERS = [
  {
    id: 1,
    name: "Ramesh Das",
    category: "Plumber",
    rating: 4.8,
    review_count: 124,
    experience_years: 7,
    hourly_rate: 500,
    is_price_negotiable: true,
    distance_km: 2.5,
    city: "Rajahmundry",
    state: "Andhra Pradesh",
    availability_status: "AVAILABLE",
    is_verified: true,
    phone_number: "+91 98765 43210",
    email: "ramesh.das@gmail.com",
    dob: "12 Jan 1990",
    gender: "Male",
    languages: ["English", "Telugu", "Hindi"],
    about_me: "I am a professional plumber with over 7 years of experience in all types of plumbing services including bathroom fittings, pipe repairs, water tank installation, leak fixing and more. I am available for both residential and commercial projects.",
    skills: ["Bathroom Plumbing", "Pipe Repair", "Leak Fixing", "Water Heater Installation", "Drain Cleaning", "Installation"],
    available_days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    working_hours: "Today, 10:00 AM - 6:00 PM",
    rating_breakdown: { 5: 85, 4: 10, 3: 3, 2: 1, 1: 1 },
    education: "ITI (Plumbing) - Government Industrial Training Institute, Rajahmundry (2015 - 2017)",
    experiences: [
      { year: "2020 - Present", role: "Self Employed (Plumber)", desc: "Residential & Commercial Plumbing, Leak Fixing, Pipe Repair, Installation" },
      { year: "2017 - 2020", role: "ABC Plumbing Services (Junior Plumber)", desc: "Assisted senior plumber in installation and repair work. Gained hands-on experience in various plumbing systems." }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=300",
      "https://images.unsplash.com/photo-1505798577917-a65157d3320a?w=300",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300",
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=300"
    ]
  },
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
    skills: ["Electrical Wiring", "AC Repair", "Switch Board", "Inverter", "MCB Tripping"],
    available_days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    working_hours: "Today, 9:00 AM - 7:00 PM",
    languages: ["English", "Telugu", "Hindi"],
    about_me: "Certified electrician providing dependable home wiring, switchboard fixing, and backup power solutions."
  },
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
    skills: ["Wood Work", "Furniture Repair", "Polishing", "Door Lock", "Wardrobe"],
    available_days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    working_hours: "Today, 10:00 AM - 5:00 PM",
    languages: ["Telugu", "Hindi"],
    about_me: "Experienced carpenter for custom furniture design, antique restoration, and modular setups."
  },
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
  }
];

export async function fetchWorkers(filters = {}) {
  try {
    const params = new URLSearchParams();
    if (filters.category) params.append('category', filters.category);
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
