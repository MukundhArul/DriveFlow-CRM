// Mock data for leads
export const mockLeads = [
  {
    id: 1,
    name: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    phone: "+91 9876543210",
    source: "Facebook",
    status: "New",
    leadScore: 9,
    carInterest: "Toyota Fortuner (SUV)",
    budget: "₹35-40 Lakhs",
    dateAdded: "2024-03-06 10:30 AM",
    assignedTo: "Priya Sharma",
    timeline: [
      { date: "2024-03-06 10:30 AM", action: "Lead Created", note: "Interested in SUV, Budget 35-40L" }
    ]
  },
  {
    id: 2,
    name: "Priya Menon",
    email: "priya.menon@email.com",
    phone: "+91 9845672310",
    source: "Google Ads",
    status: "Contacted",
    leadScore: 8,
    carInterest: "Honda City (Sedan)",
    budget: "₹12-15 Lakhs",
    dateAdded: "2024-03-06 09:15 AM",
    assignedTo: "Amit Patel",
    timeline: [
      { date: "2024-03-06 09:15 AM", action: "Lead Created", note: "Looking for sedan" },
      { date: "2024-03-06 11:00 AM", action: "First Call Made", note: "Interested, wants to visit showroom this weekend", duration: "8 min" }
    ]
  },
  {
    id: 3,
    name: "Vikram Singh",
    email: "vikram.singh@email.com",
    phone: "+91 9923456789",
    source: "Website",
    status: "Test Drive Scheduled",
    leadScore: 10,
    carInterest: "BMW X5",
    budget: "₹70-80 Lakhs",
    dateAdded: "2024-03-05 03:20 PM",
    assignedTo: "Priya Sharma",
    timeline: [
      { date: "2024-03-05 03:20 PM", action: "Lead Created", note: "Premium SUV buyer" },
      { date: "2024-03-05 04:00 PM", action: "Called", note: "Very interested, booked test drive", duration: "12 min" },
      { date: "2024-03-06 10:00 AM", action: "Test Drive Scheduled", note: "Saturday 3 PM - BMW X5" }
    ]
  },
  {
    id: 4,
    name: "Anita Desai",
    email: "anita.desai@email.com",
    phone: "+91 9812345678",
    source: "Twitter",
    status: "Contacted",
    leadScore: 7,
    carInterest: "Maruti Swift (Hatchback)",
    budget: "₹6-8 Lakhs",
    dateAdded: "2024-03-05 02:45 PM",
    assignedTo: "Rahul Verma",
    timeline: [
      { date: "2024-03-05 02:45 PM", action: "Lead Created", note: "First-time car buyer" },
      { date: "2024-03-05 05:30 PM", action: "Called", note: "Needs more time to decide", duration: "5 min" }
    ]
  },
  {
    id: 5,
    name: "Suresh Iyer",
    email: "suresh.iyer@email.com",
    phone: "+91 9998887776",
    source: "Facebook",
    status: "Negotiating",
    leadScore: 9,
    carInterest: "Hyundai Creta",
    budget: "₹14-16 Lakhs",
    dateAdded: "2024-03-04 11:00 AM",
    assignedTo: "Amit Patel",
    timeline: [
      { date: "2024-03-04 11:00 AM", action: "Lead Created", note: "Comparing multiple brands" },
      { date: "2024-03-04 02:00 PM", action: "Called", note: "Interested in top variant", duration: "10 min" },
      { date: "2024-03-05 10:00 AM", action: "Test Drive Completed", note: "Loved the car, discussing price" },
      { date: "2024-03-06 09:00 AM", action: "Negotiation Started", note: "Offered ₹15.2L, customer wants ₹14.8L" }
    ]
  },
  {
    id: 6,
    name: "Meera Krishnan",
    email: "meera.k@email.com",
    phone: "+91 9876112233",
    source: "Google Ads",
    status: "Won",
    leadScore: 10,
    carInterest: "Tata Nexon EV",
    budget: "₹15-18 Lakhs",
    dateAdded: "2024-03-02 10:00 AM",
    assignedTo: "Priya Sharma",
    timeline: [
      { date: "2024-03-02 10:00 AM", action: "Lead Created", note: "Eco-conscious buyer" },
      { date: "2024-03-02 03:00 PM", action: "Called", note: "Very interested in EV", duration: "15 min" },
      { date: "2024-03-03 11:00 AM", action: "Test Drive Completed", note: "Wants to buy immediately" },
      { date: "2024-03-03 05:00 PM", action: "Deal Closed", note: "Purchased Nexon EV Max - ₹17.5L" }
    ]
  },
  {
    id: 7,
    name: "Karan Malhotra",
    email: "karan.m@email.com",
    phone: "+91 9765432100",
    source: "Website",
    status: "New",
    leadScore: 6,
    carInterest: "Mahindra Thar",
    budget: "₹12-15 Lakhs",
    dateAdded: "2024-03-06 11:45 AM",
    assignedTo: "Rahul Verma",
    timeline: [
      { date: "2024-03-06 11:45 AM", action: "Lead Created", note: "Adventure enthusiast" }
    ]
  },
  {
    id: 8,
    name: "Sneha Patel",
    email: "sneha.patel@email.com",
    phone: "+91 9823456789",
    source: "Facebook",
    status: "Lost",
    leadScore: 4,
    carInterest: "Kia Seltos",
    budget: "₹12-14 Lakhs",
    dateAdded: "2024-03-01 09:00 AM",
    assignedTo: "Amit Patel",
    timeline: [
      { date: "2024-03-01 09:00 AM", action: "Lead Created", note: "Interested in Seltos" },
      { date: "2024-03-01 02:00 PM", action: "Called", note: "Not reachable", duration: "0 min" },
      { date: "2024-03-02 10:00 AM", action: "Called Again", note: "Customer not interested anymore", duration: "2 min" },
      { date: "2024-03-02 10:05 AM", action: "Lead Marked Lost", note: "Bought from competitor" }
    ]
  },
  {
    id: 9,
    name: "Arjun Reddy",
    email: "arjun.reddy@email.com",
    phone: "+91 9912345678",
    source: "Google Ads",
    status: "Test Drive Scheduled",
    leadScore: 8,
    carInterest: "Volkswagen Virtus",
    budget: "₹11-13 Lakhs",
    dateAdded: "2024-03-05 04:30 PM",
    assignedTo: "Rahul Verma",
    timeline: [
      { date: "2024-03-05 04:30 PM", action: "Lead Created", note: "Premium sedan interest" },
      { date: "2024-03-06 10:30 AM", action: "Called", note: "Test drive scheduled for tomorrow", duration: "7 min" }
    ]
  },
  {
    id: 10,
    name: "Divya Nair",
    email: "divya.nair@email.com",
    phone: "+91 9845123456",
    source: "Twitter",
    status: "New",
    leadScore: 7,
    carInterest: "Renault Kiger",
    budget: "₹6-8 Lakhs",
    dateAdded: "2024-03-06 12:00 PM",
    assignedTo: "Amit Patel",
    timeline: [
      { date: "2024-03-06 12:00 PM", action: "Lead Created", note: "Budget-conscious buyer" }
    ]
  },
  {
    id: 11,
    name: "Rohan Kapoor",
    email: "rohan.kapoor@email.com",
    phone: "+91 9871234560",
    source: "Website",
    status: "Negotiating",
    leadScore: 9,
    carInterest: "Mercedes-Benz GLC",
    budget: "₹65-75 Lakhs",
    dateAdded: "2024-03-04 09:30 AM",
    assignedTo: "Priya Sharma",
    timeline: [
      { date: "2024-03-04 09:30 AM", action: "Lead Created", note: "Luxury SUV buyer, upgrading from GLA" },
      { date: "2024-03-04 11:00 AM", action: "Called", note: "Very interested in GLC 300, wants AMG line", duration: "18 min" },
      { date: "2024-03-05 02:00 PM", action: "Test Drive Completed", note: "Loved the drive, comparing with X3" },
      { date: "2024-03-06 10:00 AM", action: "Negotiation Started", note: "Quoted ₹72L, customer countered ₹68L" }
    ]
  },
  {
    id: 12,
    name: "Nisha Gupta",
    email: "nisha.gupta@email.com",
    phone: "+91 9934567812",
    source: "Google Ads",
    status: "Won",
    leadScore: 10,
    carInterest: "Skoda Slavia",
    budget: "₹14-17 Lakhs",
    dateAdded: "2024-03-01 02:15 PM",
    assignedTo: "Amit Patel",
    timeline: [
      { date: "2024-03-01 02:15 PM", action: "Lead Created", note: "Looking for sporty sedan" },
      { date: "2024-03-01 04:00 PM", action: "Called", note: "Wants to test drive Style variant", duration: "9 min" },
      { date: "2024-03-02 11:00 AM", action: "Test Drive Completed", note: "Impressed with turbo engine" },
      { date: "2024-03-03 03:00 PM", action: "Deal Closed", note: "Purchased Slavia Style 1.5 TSI - ₹16.2L" }
    ]
  },
  {
    id: 13,
    name: "Aditya Joshi",
    email: "aditya.joshi@email.com",
    phone: "+91 9856781234",
    source: "Facebook",
    status: "Test Drive Scheduled",
    leadScore: 8,
    carInterest: "MG Hector Plus",
    budget: "₹18-22 Lakhs",
    dateAdded: "2024-03-05 10:00 AM",
    assignedTo: "Rahul Verma",
    timeline: [
      { date: "2024-03-05 10:00 AM", action: "Lead Created", note: "Family of 6, needs 6-seater" },
      { date: "2024-03-05 01:30 PM", action: "Called", note: "Interested in Sharp variant, test drive booked", duration: "11 min" },
      { date: "2024-03-06 09:30 AM", action: "Test Drive Scheduled", note: "Sunday 11 AM - MG Hector Plus Sharp" }
    ]
  },
  {
    id: 14,
    name: "Lakshmi Rao",
    email: "lakshmi.rao@email.com",
    phone: "+91 9745612380",
    source: "Website",
    status: "Contacted",
    leadScore: 7,
    carInterest: "Toyota Innova Hycross",
    budget: "₹22-28 Lakhs",
    dateAdded: "2024-03-06 08:45 AM",
    assignedTo: "Priya Sharma",
    timeline: [
      { date: "2024-03-06 08:45 AM", action: "Lead Created", note: "Wants hybrid MPV for long drives" },
      { date: "2024-03-06 11:30 AM", action: "Called", note: "Interested in ZX(O) variant, comparing with Hycross", duration: "14 min" }
    ]
  },
  {
    id: 15,
    name: "Farhan Sheikh",
    email: "farhan.sheikh@email.com",
    phone: "+91 9867543210",
    source: "Twitter",
    status: "New",
    leadScore: 6,
    carInterest: "Tata Harrier",
    budget: "₹16-20 Lakhs",
    dateAdded: "2024-03-06 01:15 PM",
    assignedTo: "Amit Patel",
    timeline: [
      { date: "2024-03-06 01:15 PM", action: "Lead Created", note: "Saw review on social media, wants more info" }
    ]
  }
];

// Sales team members
export const salesTeam = [
  { id: 1, name: "Priya Sharma", dealsWon: 45, dealsInProgress: 12 },
  { id: 2, name: "Amit Patel", dealsWon: 38, dealsInProgress: 9 },
  { id: 3, name: "Rahul Verma", dealsWon: 29, dealsInProgress: 11 }
];

// Dashboard analytics data
export const analyticsData = {
  leadsBySource: [
    { name: "Facebook", value: 342, color: "#4267B2" },
    { name: "Google Ads", value: 408, color: "#DB4437" },
    { name: "Website", value: 298, color: "#0F9D58" },
    { name: "Twitter", value: 199, color: "#1DA1F2" }
  ],
  conversionFunnel: [
    { stage: "New", count: 287, percentage: 100 },
    { stage: "Contacted", count: 234, percentage: 82 },
    { stage: "Test Drive", count: 178, percentage: 62 },
    { stage: "Negotiating", count: 156, percentage: 54 },
    { stage: "Won", count: 248, percentage: 86 }
  ],
  recentActivity: [
    { time: "2 min ago", action: "New lead from Facebook \u2014 Rajesh Kumar interested in Fortuner" },
    { time: "8 min ago", action: "Priya Sharma closed \u20B917.5L deal with Meera Krishnan" },
    { time: "25 min ago", action: "Test drive scheduled \u2014 Vikram Singh, BMW X5 at 3 PM" },
    { time: "1 hour ago", action: "Amit Patel moved Suresh Iyer to Negotiating stage" }
  ]
};
