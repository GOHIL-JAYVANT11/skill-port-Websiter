import React from 'react';
import { FileText, CheckCircle2, XCircle, TrendingUp } from 'lucide-react';

const AnalyticsCard = ({ label, value, icon: Icon, colorClass, trend }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-xl ${colorClass} group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-6 h-6" />
      </div>
      {trend && (
        <span className="flex items-center gap-1 text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
          <TrendingUp className="w-3 h-3" /> {trend}
        </span>
      )}
    </div>
    <div>
      <h3 className="text-3xl font-black text-slate-900 tracking-tight">{value}</h3>
      <p className="text-slate-500 text-sm font-semibold mt-1">{label}</p>
    </div>
  </div>
);

const ProposalAnalytics = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <AnalyticsCard 
        label="Total Proposals" 
        value={stats.total} 
        icon={FileText} 
        colorClass="bg-blue-50 text-blue-600" 
      />
      <AnalyticsCard 
        label="Accepted" 
        value={stats.accepted} 
        icon={CheckCircle2} 
        colorClass="bg-emerald-50 text-emerald-600" 
      />
      <AnalyticsCard 
        label="Rejected" 
        value={stats.rejected} 
        icon={XCircle} 
        colorClass="bg-red-50 text-red-600" 
      />
      <AnalyticsCard 
        label="Success Rate" 
        value={`${stats.successRate}%`} 
        icon={TrendingUp} 
        colorClass="bg-teal-50 text-teal-600" 
        trend="+5%"
      />
    </div>
  );
};

export default ProposalAnalytics;
