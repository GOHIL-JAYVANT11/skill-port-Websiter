import React from 'react';
import { Search, Calendar, Filter, Sparkles, LayoutGrid, List } from 'lucide-react';

const InterviewHeader = ({ activeTab, setActiveTab, searchQuery, setSearchQuery }) => {
  const tabs = ['All', 'Upcoming', 'Completed', 'Cancelled', 'Rescheduled'];

  return (
    <div className="space-y-8 mb-8">
      {/* Title & Weekly Insight */}
      <div className="flex flex-col lg:flex-row gap-6 items-start justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">My Interviews</h1>
          <p className="text-sm font-bold text-slate-500">Manage your schedule and prepare for your next big break.</p>
        </div>

       
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-3xl p-2 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-4">
        {/* Horizontal Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto custom-scrollbar w-full md:w-auto p-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                activeTab === tab 
                  ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/20' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="h-8 w-px bg-slate-100 hidden md:block" />

        {/* Search & Actions */}
        <div className="flex items-center gap-3 w-full md:flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by company or role..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold focus:outline-none focus:border-teal-500 focus:bg-white transition-all"
            />
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button className="p-3 bg-slate-50 border border-slate-100 rounded-2xl text-slate-600 hover:text-teal-600 transition-all">
              <Calendar className="w-4 h-4" />
            </button>
            <button className="p-3 bg-slate-50 border border-slate-100 rounded-2xl text-slate-600 hover:text-teal-600 transition-all">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewHeader;
