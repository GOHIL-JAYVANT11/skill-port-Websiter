import React, { useEffect, useState } from 'react';
import { Inbox, Eye, Star, CalendarClock, XCircle } from 'lucide-react';

const SummaryCard = ({ label, value, icon: Icon, color, delay }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      let current = 0;
      const duration = 1400;
      const step = Math.max(1, Math.ceil(value / (duration / 16)));

      const id = setInterval(() => {
        current += step;
        if (current >= value) {
          setDisplayValue(value);
          clearInterval(id);
        } else {
          setDisplayValue(current);
        }
      }, 16);

      return () => clearInterval(id);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center gap-4 group">
      <div className={`p-3 rounded-xl bg-opacity-10 ${color} group-hover:scale-110 transition-transform`}>
        <Icon className={`w-5 h-5 ${color.replace('bg-', 'text-')}`} />
      </div>
      <div>
        <p className="text-2xl font-black text-slate-900 leading-none">{displayValue}</p>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.25em] mt-1">
          {label}
        </p>
      </div>
    </div>
  );
};

const ApplicationsSummaryCards = () => {
  const stats = [
    { label: 'Total Applications', value: 248, icon: Inbox, color: 'bg-teal-500', delay: 100 },
    { label: 'Under Review', value: 64, icon: Eye, color: 'bg-amber-500', delay: 150 },
    { label: 'Shortlisted', value: 32, icon: Star, color: 'bg-sky-500', delay: 200 },
    { label: 'Interview Scheduled', value: 18, icon: CalendarClock, color: 'bg-indigo-500', delay: 250 },
    { label: 'Rejected', value: 21, icon: XCircle, color: 'bg-slate-500', delay: 300 },
  ];

  return (
    <section className="mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {stats.map((stat, idx) => (
          <SummaryCard key={idx} {...stat} />
        ))}
      </div>
    </section>
  );
};

export default ApplicationsSummaryCards;

