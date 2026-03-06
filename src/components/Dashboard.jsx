import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, AreaChart, Area
} from 'recharts';
import {
  TrendingUp, Users, ArrowUpRight,
  Plus, Download, Phone, Clock, ChevronRight, X
} from 'lucide-react';
import { salesTeam, analyticsData } from '../data/mockData';
import { useLeads } from '../context/LeadsContext';

const fadeIn = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } }
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded-lg shadow-lg border border-gray-100 px-3 py-2 text-[11px]">
        <p className="font-medium text-gray-900 mb-0.5">{label}</p>
        {payload.map((entry, i) => (
          <p key={i} className="text-gray-500">
            {entry.name}: <span className="font-semibold" style={{ color: entry.color }}>{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

function Dashboard() {
  const navigate = useNavigate();
  const [showAddLead, setShowAddLead] = useState(false);
  const [newLead, setNewLead] = useState({ name: '', email: '', phone: '', source: 'Website', carInterest: '', budget: '' });

  const handleExport = () => {
    const headers = ['Name', 'Email', 'Phone', 'Source', 'Status', 'Car Interest', 'Budget', 'Lead Score', 'Assigned To', 'Date Added'];
    const rows = mockLeads.map(l => [
      l.name, l.email, l.phone, l.source, l.status, l.carInterest, l.budget, l.leadScore, l.assignedTo, l.dateAdded
    ]);
    const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `driveflow_leads_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const { leads: mockLeads, addLead } = useLeads();

  const handleAddLead = () => {
    if (!newLead.name || !newLead.phone) return;
    addLead(newLead);
    setNewLead({ name: '', email: '', phone: '', source: 'Website', carInterest: '', budget: '' });
    setShowAddLead(false);
    navigate('/leads');
  };

  const totalLeads = 1247;
  const conversionRate = 32.8;
  const activeLeads = 855;
  const wonLeads = 248;
  const revenue = '\u20B94.8 Cr';
  const sourceData = analyticsData.leadsBySource;

  const getGreeting = () => {
    const h = new Date().getHours();
    return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
  };

  const teamData = salesTeam.map(m => ({
    name: m.name.split(' ')[0],
    won: m.dealsWon,
    active: m.dealsInProgress,
  }));

  const weeklyData = [
    { day: 'Mon', leads: 32 },
    { day: 'Tue', leads: 45 },
    { day: 'Wed', leads: 28 },
    { day: 'Thu', leads: 56 },
    { day: 'Fri', leads: 41 },
    { day: 'Sat', leads: 18 },
    { day: 'Sun', leads: 12 },
  ];

  const trendData = [
    { month: 'Jan', leads: 156, won: 42 },
    { month: 'Feb', leads: 189, won: 58 },
    { month: 'Mar', leads: 201, won: 64 },
    { month: 'Apr', leads: 245, won: 78 },
    { month: 'May', leads: 232, won: 85 },
    { month: 'Jun', leads: 278, won: 96 },
  ];

  const statusCounts = {
    new: 287,
    contacted: 234,
    testDrive: 178,
    negotiating: 156,
    won: 248,
    lost: 144,
  };

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="max-w-[1400px] mx-auto space-y-5"
    >
      {/* Greeting Banner */}
      <motion.div variants={fadeIn} className="rounded-xl bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 p-5 text-white relative overflow-hidden">
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/5 rounded-full"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full"></div>
        <div className="absolute top-4 right-40 w-16 h-16 bg-white/5 rounded-full"></div>
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-bold">{getGreeting()}, Business Manager </h1>
            <p className="text-[13px] text-blue-100 mt-1">Here's what's happening across your dealership today</p>
          </div>
          <div className="flex items-center gap-5">
            <div className="hidden lg:flex items-center gap-5">
              <div className="text-center">
                <p className="text-xl font-bold">23</p>
                <p className="text-[10px] text-blue-200">New Today</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold">5</p>
                <p className="text-[10px] text-blue-200">Closing Soon</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold">2.4h</p>
                <p className="text-[10px] text-blue-200">Avg Response</p>
              </div>
              <div className="h-10 w-px bg-white/20"></div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAddLead(true)}
                className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-lg bg-white/15 hover:bg-white/25 text-white text-[11px] sm:text-xs font-medium transition-colors backdrop-blur-sm"
              >
                <Plus size={14} />
                <span className="hidden sm:inline">Add Lead</span>
                <span className="sm:hidden">Add</span>
              </button>
              <button
                onClick={handleExport}
                className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] sm:text-xs font-medium transition-colors backdrop-blur-sm"
              >
                <Download size={14} />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <motion.div variants={fadeIn} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Leads - blue gradient */}
        <div className="rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-white p-5 relative overflow-hidden">
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/5 rounded-full"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-medium text-blue-100">Total Leads</span>
              <div className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center">
                <Users size={14} />
              </div>
            </div>
            <p className="text-xl sm:text-[28px] font-bold leading-none">{totalLeads.toLocaleString()}</p>
            <p className="text-[10px] text-blue-200 mt-2 flex items-center gap-1">
              <TrendingUp size={10} />
              +12.5% from last month
            </p>
          </div>
        </div>

        <KPICard label="Conversion Rate" value={`${conversionRate}%`} change="+5.2% this quarter" />

        {/* Revenue - green gradient */}
        <div className="rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white p-5 relative overflow-hidden">
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/5 rounded-full"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-medium text-emerald-100">Revenue</span>
              <div className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center">
                <TrendingUp size={14} />
              </div>
            </div>
            <p className="text-xl sm:text-[28px] font-bold leading-none">{revenue}</p>
            <p className="text-[10px] text-emerald-200 mt-2 flex items-center gap-1">
              <TrendingUp size={10} />
              +18.3% from last month
            </p>
          </div>
        </div>

        <KPICard label="Active Pipeline" value={activeLeads.toLocaleString()} change="+23 this week" />
      </motion.div>

      {/* Middle Row: 3 panels */}
      <motion.div variants={fadeIn} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Weekly Analytics */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Lead Analytics</h3>
              <p className="text-[11px] text-gray-400 mt-0.5">This week&apos;s performance</p>
            </div>
            <span className="text-[10px] font-semibold text-primary-600 bg-primary-50 px-2 py-1 rounded-md">
              {weeklyData.reduce((a, b) => a + b.leads, 0)} total
            </span>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={weeklyData} barCategoryGap="25%">
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#9ca3af' }}
              />
              <Tooltip content={<CustomTooltip />} cursor={false} />
              <Bar
                dataKey="leads"
                fill="#2563eb"
                radius={[6, 6, 6, 6]}
                maxBarSize={32}
                opacity={0.85}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Activity */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {analyticsData.recentActivity.map((activity, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  i === 0 ? 'bg-blue-50 text-blue-500' :
                  i === 1 ? 'bg-amber-50 text-amber-500' :
                  i === 2 ? 'bg-green-50 text-green-500' :
                  'bg-purple-50 text-purple-500'
                }`}>
                  {i === 0 ? <Users size={14} /> :
                   i === 1 ? <Phone size={14} /> :
                   i === 2 ? <Clock size={14} /> :
                   <Users size={14} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-medium text-gray-700 leading-relaxed">{activity.action}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 rounded-lg bg-gray-50 text-gray-500 text-[11px] font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-1">
            View All
            <ChevronRight size={12} />
          </button>
        </div>

        {/* Pipeline Stages */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-900">Pipeline</h3>
            <button className="text-[10px] font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-md hover:bg-primary-100 transition-colors">
              + New
            </button>
          </div>
          <div className="space-y-1">
            {[
              { label: 'New Leads', count: statusCounts.new, dot: 'bg-blue-500' },
              { label: 'Contacted', count: statusCounts.contacted, dot: 'bg-purple-500' },
              { label: 'Test Drive', count: statusCounts.testDrive, dot: 'bg-amber-500' },
              { label: 'Negotiating', count: statusCounts.negotiating, dot: 'bg-orange-500' },
              { label: 'Won', count: statusCounts.won, dot: 'bg-green-500' },
              { label: 'Lost', count: statusCounts.lost, dot: 'bg-gray-400' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group">
                <div className={`w-2 h-2 rounded-full ${item.dot}`}></div>
                <span className="text-[11px] text-gray-600 flex-1">{item.label}</span>
                <span className="text-[11px] font-semibold text-gray-800">{item.count}</span>
                <ChevronRight size={12} className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Bottom Row: 2 panels */}
      <motion.div variants={fadeIn} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Team */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Team Performance</h3>
          <div className="space-y-2.5">
            {salesTeam.sort((a, b) => b.dealsWon - a.dealsWon).map((member, i) => (
              <div key={member.id} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-bold ${
                  i === 0 ? 'bg-gradient-to-br from-amber-400 to-orange-500' :
                  i === 1 ? 'bg-gradient-to-br from-gray-400 to-gray-500' :
                  'bg-gradient-to-br from-amber-600 to-amber-700'
                }`}>
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold text-gray-800">{member.name}</p>
                  <p className="text-[10px] text-gray-400">{member.dealsWon + member.dealsInProgress} total deals</p>
                </div>
                <span className="text-[10px] font-medium text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full whitespace-nowrap">
                  {member.dealsWon} won
                </span>
                <span className="text-[10px] font-medium text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full whitespace-nowrap hidden sm:inline-flex">
                  {member.dealsInProgress} active
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-50">
            <ResponsiveContainer width="100%" height={100}>
              <BarChart data={teamData} barCategoryGap="35%">
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} />
                <Tooltip content={<CustomTooltip />} cursor={false} />
                <Bar dataKey="won" fill="#22c55e" name="Won" radius={[4, 4, 0, 0]} maxBarSize={24} />
                <Bar dataKey="active" fill="#f59e0b" name="Active" radius={[4, 4, 0, 0]} maxBarSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sources & Trend */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Lead Sources & Progress</h3>

          {/* Donut + Source list */}
          <div className="flex flex-col sm:flex-row items-center gap-5 mb-4">
            <div className="relative flex-shrink-0">
              <ResponsiveContainer width={110} height={110}>
                <PieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={32}
                    outerRadius={48}
                    dataKey="value"
                    strokeWidth={2}
                    stroke="#fff"
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-sm font-bold text-gray-900">{totalLeads}</p>
              </div>
            </div>
            <div className="space-y-2 flex-1">
              {sourceData.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.color }}></div>
                  <span className="text-[11px] text-gray-500 flex-1">{item.name}</span>
                  <span className="text-[11px] font-semibold text-gray-800">{item.value}</span>
                  <div className="w-14 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${(item.value / totalLeads) * 100}%`, background: item.color }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 6-Month Trend */}
          <div className="pt-4 border-t border-gray-50">
            <p className="text-[11px] font-medium text-gray-500 mb-3">6-Month Trend</p>
            <ResponsiveContainer width="100%" height={110}>
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="leadGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity={0.12} />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="wonGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity={0.12} />
                    <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="leads" stroke="#2563eb" strokeWidth={1.5} fill="url(#leadGrad)" name="Leads" dot={false} activeDot={{ r: 3, strokeWidth: 0 }} />
                <Area type="monotone" dataKey="won" stroke="#22c55e" strokeWidth={1.5} fill="url(#wonGrad)" name="Won" dot={false} activeDot={{ r: 3, strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>

      {/* Add Lead Modal */}
      <AddLeadModal
        show={showAddLead}
        onClose={() => setShowAddLead(false)}
        lead={newLead}
        setLead={setNewLead}
        onSubmit={handleAddLead}
      />
    </motion.div>
  );
}

function AddLeadModal({ show, onClose, lead, setLead, onSubmit }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl border border-gray-100 shadow-xl w-full max-w-md"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Add New Lead</h3>
                <p className="text-[10px] text-gray-400 mt-0.5">Enter lead details below</p>
              </div>
              <button onClick={onClose} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors">
                <X size={16} />
              </button>
            </div>
            <div className="p-5 space-y-3">
              <ModalField label="Name *" value={lead.name} onChange={(v) => setLead({ ...lead, name: v })} placeholder="Full name" />
              <ModalField label="Phone *" value={lead.phone} onChange={(v) => setLead({ ...lead, phone: v })} placeholder="+91 9876543210" />
              <ModalField label="Email" value={lead.email} onChange={(v) => setLead({ ...lead, email: v })} placeholder="email@example.com" type="email" />
              <div>
                <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Source</label>
                <select
                  value={lead.source}
                  onChange={(e) => setLead({ ...lead, source: e.target.value })}
                  className="w-full h-9 px-3 text-xs border border-gray-100 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary-200 transition-all"
                >
                  <option>Website</option>
                  <option>Facebook</option>
                  <option>Google Ads</option>
                  <option>Twitter</option>
                  <option>Walk-in</option>
                  <option>Referral</option>
                </select>
              </div>
              <ModalField label="Car Interest" value={lead.carInterest} onChange={(v) => setLead({ ...lead, carInterest: v })} placeholder="Toyota Fortuner" />
              <ModalField label="Budget" value={lead.budget} onChange={(v) => setLead({ ...lead, budget: v })} placeholder="₹15-20 Lakhs" />
            </div>
            <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-gray-50">
              <button onClick={onClose} className="px-3.5 py-2 rounded-lg border border-gray-200 text-gray-600 text-xs font-medium hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button
                onClick={onSubmit}
                disabled={!lead.name || !lead.phone}
                className="px-3.5 py-2 rounded-lg bg-primary-600 text-white text-xs font-medium hover:bg-primary-700 transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Add Lead
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ModalField({ label, value, onChange, placeholder, type = 'text' }) {
  return (
    <div>
      <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-9 px-3 text-xs border border-gray-100 rounded-lg bg-gray-50 text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-1 focus:ring-primary-200 focus:border-primary-300 transition-all"
      />
    </div>
  );
}

function KPICard({ label, value, change, subtitle }) {
  return (
    <div className="rounded-xl bg-white border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-medium text-gray-400">{label}</span>
        <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
          <ArrowUpRight size={14} />
        </div>
      </div>
      <p className="text-xl sm:text-[28px] font-bold text-gray-900 leading-none">{value}</p>
      {change && (
        <p className="text-[10px] text-green-600 mt-2 flex items-center gap-0.5 font-medium">
          <TrendingUp size={10} />
          {change}
        </p>
      )}
      {subtitle && (
        <p className="text-[10px] text-gray-400 mt-2">{subtitle}</p>
      )}
    </div>
  );
}

export default Dashboard;
