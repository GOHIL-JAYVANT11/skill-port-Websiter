import React from 'react';
import { Star, Zap, Calendar, Award, TrendingUp } from 'lucide-react';

const SummaryCard = ({ label, value, icon: Icon, colorClass, trend }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-2xl ${colorClass} group-hover:scale-110 transition-transform duration-300`}>
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

const ShortlistSummaryCards = ({ shortlistedCount, highMatchCount }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <SummaryCard label="Total Shortlisted" value={shortlistedCount} icon={Star} colorClass="bg-teal-50 text-teal-600" trend="+12%" />
      <SummaryCard label="High Match (90%+)" value={highMatchCount} icon={Zap} colorClass="bg-amber-50 text-amber-600" />
      <SummaryCard label="Ready for Interview" value="8" icon={Calendar} colorClass="bg-blue-50 text-blue-600" />
      <SummaryCard label="Avg. Match Score" value="92%" icon={Award} colorClass="bg-indigo-50 text-indigo-600" />
    </div>
  );
};

export default ShortlistSummaryCards;
