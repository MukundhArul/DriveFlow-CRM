import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Phone, Mail, Calendar, Star, User, DollarSign, Car, Clock } from 'lucide-react';
import { useLeads } from '../context/LeadsContext';

function LeadDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { leads } = useLeads();
  const lead = leads.find(l => l.id === parseInt(id));

  if (!lead) {
    return (
      <div className="flex items-center justify-center h-64 text-sm text-gray-400">
        Lead not found
      </div>
    );
  }

  const handleCall = () => {
    // Click-to-call integration placeholder
  };

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-[1200px] mx-auto space-y-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={() => navigate('/leads')}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Leads
        </button>
        <button
          onClick={handleCall}
          className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg bg-primary-600 text-white text-[11px] sm:text-xs font-medium hover:bg-primary-700 transition-colors shadow-sm"
        >
          <Phone size={14} />
          <span className="hidden sm:inline">Click to </span>Call
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            {/* Avatar + Name */}
            <div className="flex items-center gap-4 pb-4 border-b border-gray-50">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-sm font-bold">
                {lead.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-base sm:text-lg font-bold text-gray-900">{lead.name}</h1>
                <div className="flex items-center gap-0.5 sm:gap-1 mt-0.5 flex-wrap">
                  {[...Array(10)].map((_, i) => (
                    <Star
                      key={i}
                      size={11}
                      fill={i < lead.leadScore ? '#f59e0b' : 'none'}
                      className={i < lead.leadScore ? 'text-amber-500' : 'text-gray-200'}
                    />
                  ))}
                  <span className="ml-1 text-[10px] font-semibold text-amber-600">
                    {lead.leadScore}/10
                  </span>
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-medium flex-shrink-0 ${getStatusStyle(lead.status)}`}>
                {lead.status}
              </span>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-4">
              <InfoItem icon={Phone} label="Phone" value={lead.phone} />
              <InfoItem icon={Mail} label="Email" value={lead.email} />
              <InfoItem icon={Car} label="Interest" value={lead.carInterest} />
              <InfoItem icon={DollarSign} label="Budget" value={lead.budget} />
              <InfoItem icon={User} label="Assigned" value={lead.assignedTo} />
              <InfoItem icon={Calendar} label="Added" value={lead.dateAdded} />
            </div>

            {/* Status Update */}
            <div className="pt-4 border-t border-gray-50">
              <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Update Status
              </label>
              <select
                defaultValue={lead.status}
                className="w-full h-9 px-3 text-xs border border-gray-100 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary-200 transition-all"
              >
                <option>New</option>
                <option>Contacted</option>
                <option>Test Drive Scheduled</option>
                <option>Negotiating</option>
                <option>Won</option>
                <option>Lost</option>
              </select>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Timeline */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2 mb-4">
              <Clock size={14} className="text-primary-600" />
              Timeline
            </h3>
            <div className="space-y-3">
              {lead.timeline.map((event, index) => (
                <div key={index} className="relative pl-5">
                  {index < lead.timeline.length - 1 && (
                    <div className="absolute left-[7px] top-5 bottom-0 w-px bg-gray-100" />
                  )}
                  <div className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 border-primary-200 bg-white flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-500"></div>
                  </div>
                  <div className="pb-3">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[11px] font-semibold text-gray-800">{event.action}</p>
                      {event.duration && (
                        <span className="text-[9px] font-medium text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full flex-shrink-0">
                          {event.duration}
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-gray-500 mt-0.5 leading-relaxed">{event.note}</p>
                    <p className="text-[9px] text-gray-300 mt-1">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg bg-primary-50 text-primary-600 text-xs font-medium hover:bg-primary-100 transition-colors">
                <Calendar size={14} />
                Schedule Test Drive
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg bg-primary-50 text-primary-600 text-xs font-medium hover:bg-primary-100 transition-colors">
                <Mail size={14} />
                Send Email
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg bg-gray-50 text-gray-600 text-xs font-medium hover:bg-gray-100 transition-colors">
                Add Note
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50/50">
      <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
        <Icon size={14} className="text-primary-500" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] text-gray-400 font-medium">{label}</p>
        <p className="text-[11px] font-semibold text-gray-800 truncate">{value}</p>
      </div>
    </div>
  );
}

export default LeadDetails;
