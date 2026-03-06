import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Phone, Star, Calendar } from 'lucide-react';
import { useLeads } from '../context/LeadsContext';

function LeadListing() {
  const navigate = useNavigate();
  const { leads: mockLeads } = useLeads();
  const [searchTerm, setSearchTerm] = useState('');
  const [sourceFilter, setSourceFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredLeads = mockLeads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSource = sourceFilter === 'All' || lead.source === sourceFilter;
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    return matchesSearch && matchesSource && matchesStatus;
  });

  const sources = ['All', ...new Set(mockLeads.map(lead => lead.source))];
  const statuses = ['All', 'New', 'Contacted', 'Test Drive Scheduled', 'Negotiating', 'Won', 'Lost'];

  const getStatusStyle = (status) => {
    const styles = {
      'New': 'bg-blue-50 text-blue-700',
      'Contacted': 'bg-purple-50 text-purple-700',
      'Test Drive Scheduled': 'bg-amber-50 text-amber-700',
      'Negotiating': 'bg-orange-50 text-orange-700',
      'Won': 'bg-green-50 text-green-700',
      'Lost': 'bg-gray-100 text-gray-500'
    };
    return styles[status] || 'bg-gray-100 text-gray-500';
  };

  const getSourceDot = (source) => {
    const styles = {
      'Facebook': 'bg-blue-500',
      'Google Ads': 'bg-red-500',
      'Website': 'bg-green-500',
      'Twitter': 'bg-sky-400'
    };
    return styles[source] || 'bg-gray-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-[1400px] mx-auto space-y-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Lead Management</h1>
          <p className="text-[13px] text-gray-400 mt-0.5">Track and manage all incoming leads</p>
        </div>
        <div className="text-xs text-gray-400">
          <span className="font-semibold text-gray-800">{filteredLeads.length}</span> of {mockLeads.length} leads
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-9 pl-9 pr-4 rounded-lg bg-gray-50 border border-gray-100 text-sm text-gray-600 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-primary-200 focus:border-primary-300 transition-all"
            />
          </div>
          <div className="flex gap-2 items-center">
            <Filter size={14} className="text-gray-400" />
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="h-9 px-3 text-xs border border-gray-100 rounded-lg bg-gray-50 text-gray-600 focus:outline-none focus:ring-1 focus:ring-primary-200 transition-all cursor-pointer"
            >
              {sources.map(s => <option key={s}>{s}</option>)}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-9 px-3 text-xs border border-gray-100 rounded-lg bg-gray-50 text-gray-600 focus:outline-none focus:ring-1 focus:ring-primary-200 transition-all cursor-pointer"
            >
              {statuses.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-2">
        {filteredLeads.map((lead, index) => (
          <motion.div
            key={lead.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.03 * index }}
            onClick={() => navigate(`/leads/${lead.id}`)}
            className="bg-white rounded-xl border border-gray-100 p-3.5 active:bg-gray-50 cursor-pointer transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-semibold text-gray-800 truncate">{lead.name}</span>
                  <div className="flex items-center gap-0.5 text-amber-500 flex-shrink-0">
                    <Star size={11} fill="#f59e0b" />
                    <span className="text-[10px] font-bold">{lead.leadScore}</span>
                  </div>
                </div>
                <p className="text-[11px] text-gray-500 mt-0.5">{lead.carInterest}</p>
              </div>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium flex-shrink-0 ml-2 ${getStatusStyle(lead.status)}`}>
                {lead.status}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-[10px] text-gray-400">
                <div className="flex items-center gap-1">
                  <div className={`w-1.5 h-1.5 rounded-full ${getSourceDot(lead.source)}`}></div>
                  <span>{lead.source}</span>
                </div>
                <span>{lead.phone}</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-gray-400">
                <Calendar size={10} />
                {lead.dateAdded.split(' ')[0]}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="px-4 py-3 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Score</th>
                <th className="px-4 py-3 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Contact</th>
                <th className="px-4 py-3 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Source</th>
                <th className="px-4 py-3 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Car Interest</th>
                <th className="px-4 py-3 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Assigned</th>
                <th className="px-4 py-3 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead, index) => (
                <motion.tr
                  key={lead.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.03 * index }}
                  onClick={() => navigate(`/leads/${lead.id}`)}
                  className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 cursor-pointer transition-colors group"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star size={12} fill="#f59e0b" />
                      <span className="text-[11px] font-semibold">{lead.leadScore}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-semibold text-gray-800 group-hover:text-primary-600 transition-colors">
                      {lead.name}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <div className="text-[11px] text-gray-700">{lead.phone}</div>
                      <div className="text-[10px] text-gray-400">{lead.email}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${getSourceDot(lead.source)}`}></div>
                      <span className="text-[11px] text-gray-600">{lead.source}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[11px] text-gray-600">{lead.carInterest}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${getStatusStyle(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[11px] text-gray-500">{lead.assignedTo}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 text-[10px] text-gray-400">
                      <Calendar size={10} />
                      {lead.dateAdded.split(' ')[0]}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-md bg-primary-50 text-primary-600 hover:bg-primary-100"
                    >
                      <Phone size={12} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

export default LeadListing;
