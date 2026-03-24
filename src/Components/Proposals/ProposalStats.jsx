import React from 'react';
import { Users, Star, Calendar, Zap } from 'lucide-react';

const AnalyticsCard = ({ label, value, icon: Icon, colorClass }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-xl ${colorClass}`}>
        <Icon className="w-6 h-6" />
      </div>
      <span className="text-slate-400 font-bold text-xs uppercase tracking-wider">Total</span>
    </div>
    <div>
      <h3 className="text-3xl font-black text-slate-900 tracking-tight">{value}</h3>
      <p className="text-slate-500 text-sm font-medium mt-1">{label}</p>
    </div>
  </div>
);

const ProposalStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <AnalyticsCard 
        label="Total Proposals" 
        value={stats.total} 
        icon={Users} 
        colorClass="bg-blue-50 text-blue-600" 
      />
      <AnalyticsCard 
        label="Pending" 
        value={stats.pending} 
        icon={Calendar} 
        colorClass="bg-amber-50 text-amber-600" 
      />
      <AnalyticsCard 
        label="Accepted" 
        value={stats.accepted} 
        icon={Star} 
        colorClass="bg-teal-50 text-teal-600" 
      />
      <AnalyticsCard 
        label="Rejected" 
        value={stats.rejected} 
        icon={Zap} 
        colorClass="bg-rose-50 text-rose-600" 
      />
    </div>
  );
};

export default ProposalStats;
