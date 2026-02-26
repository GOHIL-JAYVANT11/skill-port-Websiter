import React from 'react';
import { Search, Filter, ArrowUpDown, BrainCircuit, Sparkles, TrendingUp } from 'lucide-react';

const ApplicationHeader = ({ activeTab, setActiveTab, searchQuery, setSearchType }) => {
  const tabs = ['All', 'Pending', 'Shortlisted', 'Interview', 'Rejected', 'Hired'];

  return (
    <div className="space-y-8 mb-8">
      {/* Title & Analytics Summary */}
      <div className="flex flex-col lg:flex-row gap-6 items-start justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">My Applications</h1>
          <p className="text-sm font-bold text-slate-500">Track and manage your professional journey with AI insights.</p>
        </div>

        <div className="flex flex-wrap gap-4 w-full lg:w-auto">
          {/* AI Insight Card */}
          <div className="flex-1 lg:w-64 bg-gradient-to-br from-teal-600 to-teal-800 rounded-3xl p-5 text-white shadow-xl shadow-teal-900/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-110 transition-transform duration-700" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-teal-300" />
                <span className="text-[10px] font-black uppercase tracking-widest text-teal-100">AI Application Stats</span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-2xl font-black leading-none mb-1">12 Jobs</p>
                  <p className="text-[10px] font-bold text-teal-100 uppercase tracking-wider">Applied this month</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black leading-none text-teal-300 mb-1">3</p>
                  <p className="text-[8px] font-bold text-teal-100 uppercase tracking-widest">Interviews</p>
                </div>
              </div>
            </div>
          </div>

          {/* Success Rate Card */}
          <div className="flex-1 lg:w-48 bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-emerald-50">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Shortlist Rate</span>
            </div>
            <div>
              <p className="text-2xl font-black text-slate-900 leading-none mb-1">42%</p>
              <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-1">
                <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
                Above Average
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Tabs */}
      <div className="bg-white rounded-3xl p-2 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-4">
        {/* Horizontal Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto custom-scrollbar w-full md:w-auto p-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                activeTab === tab 
                  ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' 
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
              placeholder="Search by job title or company..." 
              value={searchQuery}
              onChange={(e) => setSearchType(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold focus:outline-none focus:border-teal-500 focus:bg-white transition-all"
            />
          </div>
          <button className="p-3 bg-slate-50 border border-slate-100 rounded-2xl text-slate-600 hover:text-teal-600 transition-all">
            <Filter className="w-4 h-4" />
          </button>
          <button className="p-3 bg-slate-50 border border-slate-100 rounded-2xl text-slate-600 hover:text-teal-600 transition-all">
            <ArrowUpDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* AI Success Tip */}
      <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-3 flex items-center gap-3 animate-pulse">
        <div className="p-1.5 bg-white rounded-lg shadow-sm">
          <BrainCircuit className="w-4 h-4 text-amber-600" />
        </div>
        <p className="text-[11px] font-bold text-amber-800 tracking-tight">
          <span className="uppercase tracking-widest mr-2 opacity-70">AI Pro-Tip:</span>
          Applying to jobs within 24 hours of posting increases your shortlisting chances by <span className="text-emerald-600 font-black">40%</span>.
        </p>
      </div>
    </div>
  );
};

export default ApplicationHeader;
