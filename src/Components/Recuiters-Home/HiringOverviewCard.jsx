import React, { useState, useEffect, useRef } from 'react';
import { Briefcase, Users, Calendar, CheckCircle2, TrendingUp } from 'lucide-react';

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

const StatItem = ({ label, value, icon: Icon, colorClass, iconBg, iconColor, barColor, delay, barPct }) => {
  const [display, setDisplay] = useState(0);
  const [entered, setEntered] = useState(false);
  const [barW, setBarW] = useState('0%');

  useEffect(() => {
    const t1 = setTimeout(() => {
      setEntered(true);
      const dur = 1200;
      const start = performance.now();
      function tick(now) {
        const p = Math.min((now - start) / dur, 1);
        setDisplay(Math.round(easeOutCubic(p) * value));
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      setTimeout(() => setBarW(barPct + '%'), 100);
    }, delay);
    return () => clearTimeout(t1);
  }, [value, delay]);

  return (
    <div
      className={`relative flex flex-col items-start p-5 rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden
        transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-slate-200
        ${entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
      style={{ transition: entered ? 'opacity 0.5s ease, transform 0.5s ease' : 'none' }}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${iconBg}`}>
        <Icon className={`w-4.5 h-4.5 ${iconColor}`} strokeWidth={2} size={18} />
      </div>
      <span className="text-3xl font-extrabold text-slate-900 leading-none mb-1 tabular-nums">{display}</span>
      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">{label}</span>
      <div className="absolute bottom-0 left-0 h-[2.5px] rounded-b-2xl transition-all duration-[1400ms] ease-out" 
           style={{ width: barW, background: barColor }} />
    </div>
  );
};

const HiringOverviewCard = () => {
  const stats = [
    { label: 'Active Jobs',       value: 12,  icon: Briefcase,    iconBg: 'bg-teal-50',   iconColor: 'text-teal-700',   barColor: '#14b8a6', delay: 80,  barPct: 80 },
    { label: 'Total Applicants',  value: 458, icon: Users,        iconBg: 'bg-blue-50',   iconColor: 'text-blue-700',   barColor: '#3b82f6', delay: 200, barPct: 92 },
    { label: 'Interviews',        value: 24,  icon: Calendar,     iconBg: 'bg-amber-50',  iconColor: 'text-amber-700',  barColor: '#f59e0b', delay: 320, barPct: 55 },
    { label: 'Hired',             value: 8,   icon: CheckCircle2, iconBg: 'bg-green-50',  iconColor: 'text-green-700',  barColor: '#22c55e', delay: 440, barPct: 35 },
  ];

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm max-w-3xl">
      <div className="inline-flex items-center gap-1.5 bg-teal-50 text-teal-700 text-[11px] font-bold uppercase tracking-[0.12em] px-3 py-1.5 rounded-full mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
        Live Statistics
      </div>
      <h2 className="text-[28px] font-extrabold text-slate-900 leading-tight mb-1">
        Your Hiring{' '}
        <span className="bg-gradient-to-r from-teal-600 to-teal-400 bg-clip-text text-transparent">
          Overview
        </span>
      </h2>
      <p className="text-sm text-slate-400 mb-7">Track your performance and manage your talent pipeline.</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        {stats.map(s => <StatItem key={s.label} {...s} />)}
      </div>
    </div>
  );
};

export default HiringOverviewCard;