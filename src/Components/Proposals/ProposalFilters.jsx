import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

const ProposalFilters = ({ 
  activeTab, 
  setActiveTab, 
  searchQuery, 
  setSearchQuery 
}) => {
  const tabs = ['All', 'Pending', 'Accepted', 'Rejected'];

  return (
    <div className="bg-white rounded-[24px] border border-slate-100 p-3 shadow-xl shadow-slate-200/50">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Tabs */}
        <div className="flex overflow-x-auto no-scrollbar p-1 gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap ${
                activeTab === tab 
                ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20' 
                : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="flex items-center gap-3 px-2 flex-1 lg:max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search freelancer by name or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-3.5 bg-slate-50 border-transparent rounded-2xl text-[11px] font-black uppercase tracking-widest focus:bg-white focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500 transition-all outline-none shadow-inner"
            />
          </div>
          <button className="p-3.5 rounded-2xl border border-slate-100 text-slate-400 hover:text-teal-600 hover:bg-teal-50 hover:border-teal-100 transition-all shadow-sm">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProposalFilters;
