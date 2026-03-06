import React, { useState, useEffect } from 'react';
import { PlusCircle, Briefcase, Users, Calendar, CheckCircle2, TrendingUp, ChevronRight } from 'lucide-react';

const StatItem = ({ label, value, icon: Icon, color, delay }) => {
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
    <div className="flex flex-col items-center p-3 sm:p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all group">
      <div className={`p-3 rounded-xl ${color} bg-opacity-10 mb-3 group-hover:scale-110 transition-transform`}>
        <Icon className={`w-5 h-5 ${color.replace('bg-', 'text-')}`} />
      </div>
      <span className="text-xl sm:text-2xl font-black text-slate-900 mb-0.5">{displayValue}</span>
      <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest text-center">{label}</span>
    </div>
  );
};

const HiringOverviewCard = () => {
  const stats = [
    { label: 'Active Jobs', value: 12, icon: Briefcase, color: 'bg-teal-500', delay: 100 },
    { label: 'Total Applicants', value: 458, icon: Users, color: 'bg-blue-500', delay: 200 },
    { label: 'Interviews', value: 24, icon: Calendar, color: 'bg-amber-500', delay: 300 },
    { label: 'Hired', value: 8, icon: CheckCircle2, color: 'bg-emerald-500', delay: 400 },
  ];

  return (
    <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-xl shadow-slate-200/50 relative overflow-hidden group">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full -mr-32 -mt-32 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/5 rounded-full -ml-24 -mb-24 blur-3xl" />

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-teal-100 text-teal-600 rounded-lg">
                <TrendingUp className="w-4 h-4" />
              </div>
              <span className="text-xs font-black text-teal-600 uppercase tracking-[0.2em]">Live Statistics</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Your Hiring <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-400">Overview</span>
            </h2>
            <p className="text-slate-500 text-sm mt-1 font-medium">Track your performance and manage your talent pipeline.</p>
          </div>

          
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <StatItem key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HiringOverviewCard;
