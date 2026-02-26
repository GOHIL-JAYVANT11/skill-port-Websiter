import React from 'react';
import { FileText, CheckCircle2, Calendar, UserCheck, ChevronRight, BarChart3 } from 'lucide-react';

const StatCard = ({ label, value, icon: Icon, color, bg, border }) => {
  return (
    <div className={`bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-all group cursor-pointer relative overflow-hidden`}>
      <div className={`absolute top-0 right-0 w-16 h-16 ${bg} opacity-10 rounded-full -mr-8 -mt-8 group-hover:scale-125 transition-transform duration-500`} />
      
      <div className="flex items-center gap-4 relative z-10">
        <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center p-2.5 ${color} transition-transform group-hover:scale-110`}>
          <Icon className="w-full h-full" />
        </div>
        <div>
          <p className="text-2xl font-bold text-slate-800 tracking-tight">{value}</p>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</p>
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-between text-[10px] font-bold text-slate-400 group-hover:text-teal-600 transition-colors uppercase tracking-widest relative z-10">
        View Details
        <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
};

const ApplicationStatus = () => {
  const stats = [
    {
      label: 'Applied',
      value: '24',
      icon: FileText,
      color: 'text-blue-600',
      bg: 'bg-blue-500'
    },
    {
      label: 'Shortlisted',
      value: '08',
      icon: CheckCircle2,
      color: 'text-teal-600',
      bg: 'bg-teal-500'
    },
    {
      label: 'Interviews',
      value: '03',
      icon: Calendar,
      color: 'text-amber-600',
      bg: 'bg-amber-500'
    },
    {
      label: 'Hired',
      value: '01',
      icon: UserCheck,
      color: 'text-emerald-600',
      bg: 'bg-emerald-500'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-slate-100 rounded-lg">
            <BarChart3 className="w-5 h-5 text-slate-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Application <span className="text-slate-400 font-medium">Insights</span></h3>
        </div>
        <button className="text-sm font-bold text-slate-500 hover:text-teal-600 transition-colors flex items-center gap-1 group">
          Performance Report <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    </div>
  );
};

export default ApplicationStatus;
