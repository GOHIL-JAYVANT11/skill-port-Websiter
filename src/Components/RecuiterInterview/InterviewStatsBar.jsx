import React from 'react';
import { Calendar, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ label, value, icon: Icon, color, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-xl hover:border-teal-100 transition-all duration-300 relative overflow-hidden"
  >
    <div className={`absolute top-0 right-0 w-24 h-24 ${color} opacity-5 rounded-full -mr-12 -mt-12 group-hover:scale-125 transition-transform duration-700`} />
    
    <div className="relative z-10">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
        {label}
      </p>
      <h3 className="text-3xl font-black text-slate-900 tracking-tight">
        {value}
      </h3>
    </div>
    
    <div className={`w-14 h-14 rounded-2xl ${color} bg-opacity-10 flex items-center justify-center relative z-10`}>
      <Icon className={`w-7 h-7 ${color.replace('bg-', 'text-')}`} />
    </div>
  </motion.div>
);

const InterviewStatsBar = ({ stats = {} }) => {
  const statItems = [
    { label: 'Total Scheduled', value: stats.total || 0, icon: Calendar, color: 'bg-teal-500', delay: 0.1 },
    { label: "Today's Interviews", value: stats.today || 0, icon: Clock, color: 'bg-blue-500', delay: 0.2 },
    { label: 'Completed', value: stats.completed || 0, icon: CheckCircle2, color: 'bg-emerald-500', delay: 0.3 },
    { label: 'Cancelled / Rejected', value: stats.cancelled || 0, icon: XCircle, color: 'bg-rose-500', delay: 0.4 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {statItems.map((stat, idx) => (
        <StatCard key={idx} {...stat} />
      ))}
    </div>
  );
};

export default InterviewStatsBar;
