import React, { useState, useEffect } from 'react';
import { Briefcase, Users, Calendar, CheckCircle2 } from 'lucide-react';

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
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group flex items-center gap-4">
      <div className={`p-3 rounded-xl ${color} bg-opacity-10 group-hover:scale-110 transition-transform`}>
        <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
      </div>
      <div>
        <p className="text-2xl font-black text-slate-900">{displayValue}</p>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</p>
      </div>
    </div>
  );
};

const JobStatsSummary = () => {
  const stats = [
    { label: 'Active Jobs', value: 8, icon: Briefcase, color: 'bg-teal-500', delay: 100 },
    { label: 'Total Applicants', value: 245, icon: Users, color: 'bg-blue-500', delay: 200 },
    { label: 'Interviews', value: 42, icon: Calendar, color: 'bg-amber-500', delay: 300 },
    { label: 'Jobs Filled', value: 15, icon: CheckCircle2, color: 'bg-emerald-500', delay: 400 },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default JobStatsSummary;
