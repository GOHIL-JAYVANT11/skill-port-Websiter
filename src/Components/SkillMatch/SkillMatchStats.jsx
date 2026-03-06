import React from 'react';
import { Users, Zap, BarChart3, PieChart } from 'lucide-react';

const SkillMatchStats = () => {
  const stats = [
    { label: 'Total Matched', value: 450, color: 'text-slate-900', bg: 'bg-slate-100' },
    { label: 'High Match (>90%)', value: 124, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Medium Match (70-89%)', value: 215, color: 'text-teal-600', bg: 'bg-teal-50' },
    { label: 'Low Match (<70%)', value: 111, color: 'text-slate-400', bg: 'bg-slate-50' },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-8">
      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Left: Donut Chart Visualization (CSS based) */}
        <div className="relative w-40 h-40 shrink-0">
          <svg className="w-full h-full transform -rotate-90">
            {/* Background Circle */}
            <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-50" />
            {/* Low Match */}
            <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="439.82" strokeDashoffset="0" strokeLinecap="round" className="text-slate-200" />
            {/* Medium Match */}
            <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="439.82" strokeDashoffset="131.94" strokeLinecap="round" className="text-teal-500" />
            {/* High Match */}
            <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="439.82" strokeDashoffset="307.87" strokeLinecap="round" className="text-emerald-500" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-black text-slate-900 leading-none">450</span>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Total</span>
          </div>
        </div>

        {/* Right: Grid Stats */}
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
          {stats.map((stat, idx) => (
            <div key={idx} className={`p-4 rounded-2xl ${stat.bg} border border-white/50 shadow-sm flex flex-col items-center text-center transition-transform hover:scale-105 duration-300`}>
              <span className={`text-xl font-black ${stat.color} leading-none mb-1`}>{stat.value}</span>
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-tight leading-tight">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* AI Insight Badge */}
        <div className="hidden xl:flex flex-col items-end gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-teal-500 to-teal-700 text-white rounded-xl shadow-lg shadow-teal-500/20">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span className="text-[10px] font-black uppercase tracking-widest">AI Distribution</span>
          </div>
          <p className="text-[10px] text-slate-400 font-bold text-right max-w-[120px] uppercase leading-relaxed">
            Real-time talent pool analysis for your active job.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SkillMatchStats;
