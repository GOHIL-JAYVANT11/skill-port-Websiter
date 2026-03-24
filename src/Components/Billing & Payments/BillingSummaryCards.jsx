import React from 'react';
import { DollarSign, Clock, CheckCircle2, Users, TrendingUp } from 'lucide-react';

const SummaryCard = ({ label, value, icon: Icon, colorClass, trend }) => (
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

const BillingSummaryCards = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <SummaryCard 
        label="Total Spending" 
        value={`₹${stats.totalSpending.toLocaleString()}`} 
        icon={DollarSign} 
        colorClass="bg-teal-50 text-teal-600" 
        trend="+15.4%" 
      />
      <SummaryCard 
        label="Pending Payments" 
        value={`₹${stats.pendingAmount.toLocaleString()}`} 
        icon={Clock} 
        colorClass="bg-amber-50 text-amber-600" 
      />
      <SummaryCard 
        label="Paid Amount" 
        value={`₹${stats.paidAmount.toLocaleString()}`} 
        icon={CheckCircle2} 
        colorClass="bg-emerald-50 text-emerald-600" 
      />
      <SummaryCard 
        label="Total Hires" 
        value={stats.totalHires} 
        icon={Users} 
        colorClass="bg-blue-50 text-blue-600" 
      />
    </div>
  );
};

export default BillingSummaryCards;
