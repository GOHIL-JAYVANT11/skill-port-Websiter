import React, { useState, useEffect } from 'react';
import { Users, Zap, CheckCircle, Calendar } from 'lucide-react';

const StatCard = ({ label, value, icon: Icon, color, delay }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      let start = 0;
      const duration = 1500;
      const increment = Math.ceil(value / (duration / 16));
      
      const counter = setInterval(() => {
        start += increment;
        if (start >= value) {
          setDisplayValue(value);
          clearInterval(counter);
        } else {
          setDisplayValue(start);
        }
      }, 16);
      
      return () => clearInterval(counter);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group flex items-center gap-4">
      <div className={`p-3 rounded-xl ${color} bg-opacity-10 group-hover:scale-110 transition-transform`}>
        <Icon className={`w-5 h-5 ${color.replace('bg-', 'text-')}`} />
      </div>
      <div>
        <p className="text-xl font-black text-slate-900 leading-none mb-1">{displayValue}+</p>
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.15em]">{label}</p>
      </div>
    </div>
  );
};

const CandidateStats = () => {
  const stats = [
    { label: 'Total Candidates', value: 1250, icon: Users, color: 'bg-teal-500', delay: 100 },
    { label: 'High Match (>90%)', value: 342, icon: Zap, color: 'bg-emerald-500', delay: 200 },
    { label: 'Shortlisted', value: 86, icon: CheckCircle, color: 'bg-blue-500', delay: 300 },
    { label: 'Interviews Scheduled', value: 24, icon: Calendar, color: 'bg-amber-500', delay: 400 },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default CandidateStats;
