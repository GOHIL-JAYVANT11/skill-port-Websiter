import React from 'react';
import { motion } from 'framer-motion';

const tabs = [
  { id: 'All', label: 'All', count: 24 },
  { id: 'Upcoming', label: 'Upcoming', count: 8 },
  { id: 'Today', label: 'Today', count: 3 },
  { id: 'Completed', label: 'Completed', count: 12 },
  { id: 'Cancelled', label: 'Cancelled', count: 2 },
  { id: 'Rescheduled', label: 'Rescheduled', count: 1 },
];

const InterviewFilterTabs = ({ activeTab, onTabChange, counts = {} }) => {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-slate-100 pb-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`relative px-6 py-3 rounded-t-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-3 group
            ${activeTab === tab.id 
              ? 'text-teal-600' 
              : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
        >
          {tab.label}
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-black transition-all
            ${activeTab === tab.id 
              ? 'bg-teal-100 text-teal-700' 
              : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'}`}
          >
            {counts[tab.id] || 0}
          </span>
          
          {activeTab === tab.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-[-2px] left-0 right-0 h-[3px] bg-teal-600 rounded-full"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  );
};

export default InterviewFilterTabs;
