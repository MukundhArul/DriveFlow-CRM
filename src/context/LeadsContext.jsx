import React, { createContext, useContext, useState } from 'react';
import { mockLeads as initialLeads } from '../data/mockData';

const LeadsContext = createContext();

export function LeadsProvider({ children }) {
  const [leads, setLeads] = useState(initialLeads);

  const addLead = (leadData) => {
    const newLead = {
      id: Math.max(...leads.map(l => l.id), 0) + 1,
      name: leadData.name,
      email: leadData.email || '',
      phone: leadData.phone,
      source: leadData.source || 'Website',
      status: 'New',
      leadScore: Math.floor(Math.random() * 4) + 5, // 5-8
      carInterest: leadData.carInterest || 'Not specified',
      budget: leadData.budget || 'Not specified',
      dateAdded: new Date().toLocaleString('en-IN', {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', hour12: true
      }),
      assignedTo: ['Priya Sharma', 'Amit Patel', 'Rahul Verma'][Math.floor(Math.random() * 3)],
      timeline: [
        {
          date: new Date().toLocaleString('en-IN', {
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', hour12: true
          }),
          action: 'Lead Created',
          note: leadData.carInterest ? `Interested in ${leadData.carInterest}` : 'New lead added'
        }
      ]
    };
    setLeads(prev => [newLead, ...prev]);
    return newLead;
  };

  const updateLeadStatus = (leadId, newStatus) => {
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
  };

  return (
    <LeadsContext.Provider value={{ leads, setLeads, addLead, updateLeadStatus }}>
      {children}
    </LeadsContext.Provider>
  );
}

export const useLeads = () => useContext(LeadsContext);
