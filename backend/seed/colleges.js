require('dotenv').config();
const mongoose = require('mongoose');
const College = require('../models/college');

const colleges = [
  {
    name: "NIT Trichy",
    type: "NIT", state: "Tamil Nadu", city: "Tiruchirappalli",
    established: 1964, nirf_rank: 8,
    website: "https://www.nitt.edu",
    fees: { general: 550000, sc_st: 125000 },
    branches: ["CSE", "ECE", "Mechanical", "Civil", "Chemical", "Electrical"],
    cutoffs: [
      { branch: "CSE",        general: 1300,  obc: 3500,  sc: 8000,  st: 12000 },
      { branch: "ECE",        general: 3800,  obc: 9000,  sc: 18000, st: 25000 },
      { branch: "Mechanical", general: 7200,  obc: 18000, sc: 32000, st: 45000 },
      { branch: "Civil",      general: 9500,  obc: 24000, sc: 40000, st: 55000 },
    ],
    placements: { avg_salary: 1800000, median_salary: 1400000, max_salary: 7000000, placement_percent: 92, top_recruiters: ["Google", "Microsoft", "Amazon", "Wipro", "TCS"] },
    description: "NIT Trichy is consistently ranked as the top NIT in India.",
    facilities: ["Library", "Sports Complex", "Hostel", "Medical Center"],
  },
  {
    name: "NIT Warangal",
    type: "NIT", state: "Telangana", city: "Warangal",
    established: 1959, nirf_rank: 15,
    website: "https://www.nitw.ac.in",
    fees: { general: 520000, sc_st: 120000 },
    branches: ["CSE", "ECE", "Mechanical", "Civil", "Chemical", "Electrical"],
    cutoffs: [
      { branch: "CSE",        general: 2100,  obc: 5500,  sc: 12000, st: 18000 },
      { branch: "ECE",        general: 5500,  obc: 13000, sc: 24000, st: 35000 },
      { branch: "Mechanical", general: 9000,  obc: 22000, sc: 38000, st: 52000 },
      { branch: "Civil",      general: 12000, obc: 28000, sc: 48000, st: 65000 },
    ],
    placements: { avg_salary: 1600000, median_salary: 1200000, max_salary: 6500000, placement_percent: 90, top_recruiters: ["Microsoft", "Amazon", "Infosys", "L&T", "Qualcomm"] },
    description: "One of the oldest and most prestigious NITs in India.",
    facilities: ["Library", "Sports Complex", "Hostel", "Labs"],
  },
  {
    name: "NIT Surathkal",
    type: "NIT", state: "Karnataka", city: "Mangalore",
    established: 1960, nirf_rank: 18,
    website: "https://www.nitk.ac.in",
    fees: { general: 500000, sc_st: 115000 },
    branches: ["CSE", "ECE", "Mechanical", "Civil", "Chemical", "Electrical"],
    cutoffs: [
      { branch: "CSE",        general: 3600,  obc: 9000,  sc: 18000, st: 26000 },
      { branch: "ECE",        general: 7200,  obc: 17000, sc: 30000, st: 42000 },
      { branch: "Mechanical", general: 11000, obc: 26000, sc: 44000, st: 60000 },
      { branch: "Civil",      general: 14000, obc: 32000, sc: 55000, st: 72000 },
    ],
    placements: { avg_salary: 1500000, median_salary: 1100000, max_salary: 6000000, placement_percent: 88, top_recruiters: ["Amazon", "Flipkart", "Samsung", "Oracle", "Cisco"] },
    description: "NIT Surathkal is known for its strong technical programs.",
    facilities: ["Library", "Hostel", "Sports", "Medical"],
  },
  {
    name: "IIIT Hyderabad",
    type: "IIIT", state: "Telangana", city: "Hyderabad",
    established: 1998, nirf_rank: 24,
    website: "https://www.iiit.ac.in",
    fees: { general: 3200000, sc_st: 3200000 },
    branches: ["CSE", "ECE", "CS+MS", "CS+PhD"],
    cutoffs: [
      { branch: "CSE",   general: 600,  obc: 1800, sc: 5000,  st: 8000  },
      { branch: "ECE",   general: 2200, obc: 6000, sc: 12000, st: 18000 },
    ],
    placements: { avg_salary: 2200000, median_salary: 1800000, max_salary: 15000000, placement_percent: 95, top_recruiters: ["Google", "Microsoft", "Facebook", "Adobe", "Uber"] },
    description: "IIIT Hyderabad is one of the best CS colleges in India.",
    facilities: ["World-class Labs", "Research Centers", "Hostel", "Sports"],
  },
  {
    name: "IIIT Bangalore",
    type: "IIIT", state: "Karnataka", city: "Bangalore",
    established: 1999, nirf_rank: 30,
    website: "https://www.iiitb.ac.in",
    fees: { general: 2800000, sc_st: 2800000 },
    branches: ["CSE", "ECE", "Data Science"],
    cutoffs: [
      { branch: "CSE",          general: 1900, obc: 5000,  sc: 11000, st: 16000 },
      { branch: "ECE",          general: 4500, obc: 11000, sc: 22000, st: 32000 },
      { branch: "Data Science", general: 2800, obc: 7000,  sc: 14000, st: 20000 },
    ],
    placements: { avg_salary: 2000000, median_salary: 1600000, max_salary: 12000000, placement_percent: 93, top_recruiters: ["Amazon", "Google", "Walmart", "Cisco", "Accenture"] },
    description: "IIIT Bangalore is known for its industry connections.",
    facilities: ["Labs", "Hostel", "Library", "Cafeteria"],
  },
  {
    name: "NIT Calicut",
    type: "NIT", state: "Kerala", city: "Kozhikode",
    established: 1961, nirf_rank: 22,
    website: "https://www.nitc.ac.in",
    fees: { general: 480000, sc_st: 110000 },
    branches: ["CSE", "ECE", "Mechanical", "Civil", "Electrical"],
    cutoffs: [
      { branch: "CSE",        general: 4600,  obc: 11000, sc: 22000, st: 30000 },
      { branch: "ECE",        general: 8500,  obc: 20000, sc: 36000, st: 50000 },
      { branch: "Mechanical", general: 13000, obc: 30000, sc: 52000, st: 70000 },
    ],
    placements: { avg_salary: 1400000, median_salary: 1100000, max_salary: 5500000, placement_percent: 87, top_recruiters: ["TCS", "Infosys", "Wipro", "HCL", "Amazon"] },
    description: "NIT Calicut is a premier technical institution in South India.",
    facilities: ["Hostel", "Library", "Sports", "Medical Center"],
  },
  {
    name: "DTU Delhi",
    type: "GFTI", state: "Delhi", city: "New Delhi",
    established: 1941, nirf_rank: 35,
    website: "https://www.dtu.ac.in",
    fees: { general: 300000, sc_st: 80000 },
    branches: ["CSE", "ECE", "Mechanical", "Civil", "Software Engineering"],
    cutoffs: [
      { branch: "CSE",                  general: 3100,  obc: 8000,  sc: 15000, st: 22000 },
      { branch: "ECE",                  general: 6000,  obc: 14000, sc: 26000, st: 38000 },
      { branch: "Software Engineering", general: 4200,  obc: 10000, sc: 19000, st: 28000 },
      { branch: "Mechanical",           general: 10000, obc: 24000, sc: 42000, st: 58000 },
    ],
    placements: { avg_salary: 1800000, median_salary: 1400000, max_salary: 8000000, placement_percent: 91, top_recruiters: ["Google", "Microsoft", "Samsung", "Amazon", "Paytm"] },
    description: "DTU is one of the oldest and most reputed engineering colleges in Delhi.",
    facilities: ["Hostel", "Library", "Sports Complex", "Labs"],
  },
  {
    name: "NIT Rourkela",
    type: "NIT", state: "Odisha", city: "Rourkela",
    established: 1961, nirf_rank: 20,
    website: "https://www.nitrkl.ac.in",
    fees: { general: 450000, sc_st: 105000 },
    branches: ["CSE", "ECE", "Mechanical", "Civil", "Chemical"],
    cutoffs: [
      { branch: "CSE",        general: 5600,  obc: 14000, sc: 28000, st: 40000 },
      { branch: "ECE",        general: 9500,  obc: 23000, sc: 40000, st: 56000 },
      { branch: "Mechanical", general: 14000, obc: 33000, sc: 58000, st: 78000 },
    ],
    placements: { avg_salary: 1200000, median_salary: 950000, max_salary: 5000000, placement_percent: 85, top_recruiters: ["TCS", "Infosys", "Wipro", "Steel Authority", "L&T"] },
    description: "NIT Rourkela is known for its strong research programs.",
    facilities: ["Hostel", "Library", "Sports", "Medical"],
  },
  {
    name: "IIIT Delhi",
    type: "IIIT", state: "Delhi", city: "New Delhi",
    established: 2008, nirf_rank: 38,
    website: "https://www.iiitd.ac.in",
    fees: { general: 1400000, sc_st: 700000 },
    branches: ["CSE", "ECE", "Computational Biology", "Social Sciences"],
    cutoffs: [
      { branch: "CSE", general: 2800, obc: 7000,  sc: 14000, st: 20000 },
      { branch: "ECE", general: 5500, obc: 13000, sc: 25000, st: 36000 },
    ],
    placements: { avg_salary: 1900000, median_salary: 1500000, max_salary: 10000000, placement_percent: 92, top_recruiters: ["Microsoft", "Amazon", "Adobe", "Samsung", "Uber"] },
    description: "IIIT Delhi is known for its research and industry collaborations.",
    facilities: ["Modern Labs", "Hostel", "Library", "Cafeteria"],
  },
  {
    name: "NIT Allahabad",
    type: "NIT", state: "Uttar Pradesh", city: "Prayagraj",
    established: 1961, nirf_rank: 28,
    website: "https://www.mnnit.ac.in",
    fees: { general: 460000, sc_st: 108000 },
    branches: ["CSE", "ECE", "Mechanical", "Civil", "Electrical"],
    cutoffs: [
      { branch: "CSE",        general: 6500,  obc: 16000, sc: 30000, st: 42000 },
      { branch: "ECE",        general: 10500, obc: 25000, sc: 44000, st: 62000 },
      { branch: "Mechanical", general: 15000, obc: 35000, sc: 62000, st: 85000 },
    ],
    placements: { avg_salary: 1100000, median_salary: 850000, max_salary: 4500000, placement_percent: 83, top_recruiters: ["TCS", "Wipro", "Infosys", "HCL", "Capgemini"] },
    description: "MNNIT Allahabad is one of the 30 NITs in India.",
    facilities: ["Hostel", "Library", "Sports", "Medical Center"],
  },
  {
    name: "NIT Bhopal",
    type: "NIT", state: "Madhya Pradesh", city: "Bhopal",
    established: 1960, nirf_rank: 40,
    website: "https://www.manit.ac.in",
    fees: { general: 440000, sc_st: 102000 },
    branches: ["CSE", "ECE", "Mechanical", "Civil", "Chemical"],
    cutoffs: [
      { branch: "CSE",        general: 8000,  obc: 20000, sc: 38000, st: 54000 },
      { branch: "ECE",        general: 13000, obc: 31000, sc: 55000, st: 76000 },
      { branch: "Mechanical", general: 18000, obc: 42000, sc: 75000, st: 100000 },
    ],
    placements: { avg_salary: 1000000, median_salary: 800000, max_salary: 4000000, placement_percent: 80, top_recruiters: ["TCS", "Wipro", "Infosys", "BHEL", "NTPC"] },
    description: "MANIT Bhopal is a well-established NIT in central India.",
    facilities: ["Hostel", "Library", "Sports", "Medical"],
  },
  {
    name: "NSUT Delhi",
    type: "GFTI", state: "Delhi", city: "New Delhi",
    established: 1983, nirf_rank: 42,
    website: "https://www.nsut.ac.in",
    fees: { general: 280000, sc_st: 75000 },
    branches: ["CSE", "ECE", "Mechanical", "IT", "Electrical"],
    cutoffs: [
      { branch: "CSE",        general: 4200,  obc: 10000, sc: 19000, st: 28000 },
      { branch: "IT",         general: 5500,  obc: 13000, sc: 24000, st: 35000 },
      { branch: "ECE",        general: 7500,  obc: 18000, sc: 32000, st: 46000 },
      { branch: "Mechanical", general: 12000, obc: 28000, sc: 50000, st: 68000 },
    ],
    placements: { avg_salary: 1600000, median_salary: 1200000, max_salary: 7000000, placement_percent: 89, top_recruiters: ["Google", "Amazon", "Samsung", "Paytm", "Zomato"] },
    description: "NSUT is one of the top government engineering colleges in Delhi.",
    facilities: ["Hostel", "Library", "Sports Complex", "Labs"],
  },
  {
    name: "NIT Kurukshetra",
    type: "NIT", state: "Haryana", city: "Kurukshetra",
    established: 1963, nirf_rank: 44,
    website: "https://www.nitkkr.ac.in",
    fees: { general: 450000, sc_st: 105000 },
    branches: ["CSE", "ECE", "Mechanical", "Civil", "Electrical"],
    cutoffs: [
      { branch: "CSE",        general: 7200,  obc: 18000, sc: 34000, st: 48000 },
      { branch: "ECE",        general: 11500, obc: 27000, sc: 48000, st: 68000 },
      { branch: "Mechanical", general: 16000, obc: 38000, sc: 68000, st: 92000 },
    ],
    placements: { avg_salary: 1000000, median_salary: 800000, max_salary: 4200000, placement_percent: 81, top_recruiters: ["TCS", "Infosys", "Wipro", "HCL", "Tech Mahindra"] },
    description: "NIT Kurukshetra is a reputed NIT in North India.",
    facilities: ["Hostel", "Library", "Sports", "Medical"],
  },
  {
    name: "IIIT Allahabad",
    type: "IIIT", state: "Uttar Pradesh", city: "Prayagraj",
    established: 1999, nirf_rank: 46,
    website: "https://www.iiita.ac.in",
    fees: { general: 500000, sc_st: 250000 },
    branches: ["IT", "ECE", "Data Science", "Intelligent Systems"],
    cutoffs: [
      { branch: "IT",           general: 5000,  obc: 13000, sc: 25000, st: 36000 },
      { branch: "ECE",          general: 8500,  obc: 21000, sc: 38000, st: 54000 },
      { branch: "Data Science", general: 6500,  obc: 16000, sc: 30000, st: 43000 },
    ],
    placements: { avg_salary: 1400000, median_salary: 1100000, max_salary: 5500000, placement_percent: 86, top_recruiters: ["Amazon", "Microsoft", "Samsung", "Oracle", "Accenture"] },
    description: "IIIT Allahabad is one of the oldest IIITs in India.",
    facilities: ["Hostel", "Library", "Labs", "Sports"],
  },
  {
    name: "NIT Jaipur",
    type: "NIT", state: "Rajasthan", city: "Jaipur",
    established: 1963, nirf_rank: 48,
    website: "https://www.mnit.ac.in",
    fees: { general: 440000, sc_st: 102000 },
    branches: ["CSE", "ECE", "Mechanical", "Civil", "Chemical"],
    cutoffs: [
      { branch: "CSE",        general: 8500,  obc: 21000, sc: 40000, st: 56000 },
      { branch: "ECE",        general: 13500, obc: 32000, sc: 57000, st: 78000 },
      { branch: "Mechanical", general: 19000, obc: 44000, sc: 78000, st: 105000 },
    ],
    placements: { avg_salary: 950000, median_salary: 750000, max_salary: 3800000, placement_percent: 79, top_recruiters: ["TCS", "Infosys", "Wipro", "Capgemini", "L&T"] },
    description: "MNIT Jaipur is a well-known NIT in Rajasthan.",
    facilities: ["Hostel", "Library", "Sports", "Medical"],
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    await College.deleteMany({});
    console.log("🗑️  Cleared existing colleges");

    // Insert new data
    await College.insertMany(colleges);
    console.log(`✅ Seeded ${colleges.length} colleges successfully!`);

    process.exit(0);
  } catch (err) {
    console.error("❌ Seed error:", err.message);
    process.exit(1);
  }
};

seed();