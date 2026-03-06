import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, Star } from 'lucide-react';
import { useLeads } from '../context/LeadsContext';

function Pipeline() {
  const navigate = useNavigate();
  const { leads, setLeads } = useLeads();
  const [draggedLead, setDraggedLead] = useState(null);
  const [toast, setToast] = useState(null);
  const [dragOverStatus, setDragOverStatus] = useState(null);

  const statuses = ['New', 'Contacted', 'Test Drive Scheduled', 'Negotiating', 'Won', 'Lost'];

  const getLeadsByStatus = (status) => leads.filter(lead => lead.status === status);

  const handleDragStart = (e, leadId) => {
    setDraggedLead(leadId);
    e.dataTransfer.setData('leadId', leadId);
  };

  const handleDragOver = (e, status) => {
    e.preventDefault();
    setDragOverStatus(status);
  };

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    const leadId = parseInt(e.dataTransfer.getData('leadId'));
    const lead = leads.find(l => l.id === leadId);
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
    setDraggedLead(null);
    setDragOverStatus(null);
    if (lead) {
      setToast({ name: lead.name, status: newStatus });
      setTimeout(() => setToast(null), 2500);
    }
  };

  const getStatusDot = (status) => {
    const colors = {
      'New': 'bg-blue-500',
      'Contacted': 'bg-purple-500',
      'Test Drive Scheduled': 'bg-amber-500',
      'Negotiating': 'bg-orange-500',
      'Won': 'bg-green-500',
      'Lost': 'bg-gray-400'
    };
    return colors[status] || 'bg-gray-400';
  };

  const getStatusBg = (status) => {
    const colors = {
      'New': 'bg-blue-50',
      'Contacted': 'bg-purple-50',
      'Test Drive Scheduled': 'bg-amber-50',
      'Negotiating': 'bg-orange-50',
      'Won': 'bg-green-50',
      'Lost': 'bg-gray-50'
    };
    return colors[status] || 'bg-gray-50';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Sales Pipeline</h1>
          <p className="text-[13px] text-gray-400 mt-0.5">Drag and drop to update lead status</p>
        </div>
        <div className="text-xs text-gray-400">
          {leads.length} total leads
        </div>
      </div>

      <div className="overflow-x-auto -mx-3 sm:-mx-5 lg:-mx-6 px-3 sm:px-5 lg:px-6 pb-2">
        <div className="grid grid-cols-6 gap-3 min-w-[900px]">
        {statuses.map((status) => {
          const statusLeads = getLeadsByStatus(status);
          return (
            <div key={status} className="flex flex-col min-h-[350px] lg:min-h-[500px]">
              {/* Column Header */}
              <div className={`rounded-t-xl ${getStatusBg(status)} px-3 py-3 border border-b-0 border-gray-100`}>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getStatusDot(status)}`}></div>
                  <h3 className="text-[11px] font-semibold text-gray-700">{status}</h3>
                  <span className="ml-auto text-[10px] font-medium text-gray-400 bg-white px-1.5 py-0.5 rounded-full">
                    {statusLeads.length}
                  </span>
                </div>
              </div>

              {/* Column Content */}
              <div
                onDragOver={(e) => handleDragOver(e, status)}
                onDrop={(e) => handleDrop(e, status)}
                onDragLeave={() => setDragOverStatus(null)}
                className={`flex-1 rounded-b-xl border border-t-0 p-2 space-y-2 transition-all duration-200 ${
                  dragOverStatus === status
                    ? 'bg-primary-50/40 border-primary-300 ring-2 ring-primary-200/50'
                    : 'bg-gray-50/50 border-gray-100'
                }`}
              >
                <AnimatePresence>
                  {statusLeads.map((lead) => (
                    <motion.div
                      key={lead.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: draggedLead === lead.id ? 0.5 : 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      draggable
                      onDragStart={(e) => handleDragStart(e, lead.id)}
                      onDragEnd={() => { setDraggedLead(null); setDragOverStatus(null); }}
                      onClick={() => navigate(`/leads/${lead.id}`)}
                      className="group bg-white rounded-lg p-3 border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all cursor-move"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-[11px] font-semibold text-gray-800 leading-tight pr-4">
                          {lead.name}
                        </h4>
                        <div className="flex items-center gap-0.5 text-amber-500 flex-shrink-0">
                          <Star size={10} fill="#f59e0b" />
                          <span className="text-[10px] font-bold">{lead.leadScore}</span>
                        </div>
                      </div>

                      <p className="text-[10px] text-gray-400 mb-2">{lead.carInterest}</p>

                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-semibold text-gray-600">{lead.budget}</span>
                      </div>

                      {/* Quick Actions */}
                      <div className="flex gap-1.5 mt-2 pt-2 border-t border-gray-50 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 flex items-center justify-center gap-1 py-1 rounded text-[10px] text-gray-500 hover:bg-gray-50 transition-colors"
                        >
                          <Phone size={10} /> Call
                        </button>
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 flex items-center justify-center gap-1 py-1 rounded text-[10px] text-gray-500 hover:bg-gray-50 transition-colors"
                        >
                          <Mail size={10} /> Email
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {statusLeads.length === 0 && (
                  <div className="flex items-center justify-center py-8 text-[10px] text-gray-300">
                    No leads
                  </div>
                )}
              </div>
            </div>
          );
        })}
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-4 py-2.5 rounded-xl shadow-lg text-xs font-medium flex items-center gap-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
            <span>{toast.name}</span>
            <span className="text-gray-400 dark:text-gray-500">moved to</span>
            <span className="text-primary-300 dark:text-primary-600 font-semibold">{toast.status}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Pipeline;
