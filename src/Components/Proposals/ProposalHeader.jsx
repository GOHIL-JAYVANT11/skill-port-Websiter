import React from 'react';
import { Sparkles, ChevronDown, Filter } from 'lucide-react';

const ProposalHeader = ({ jobs, selectedJobId, onJobChange }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-[11px] font-black text-teal-600 uppercase tracking-[0.2em]">
            Recruiter Workspace
          </span>
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">
          Freelance <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-400">Proposals</span>
        </h1>
        <p className="text-slate-500 text-sm mt-3 font-medium">
          Review skill-based evaluations and AI matches for your freelance projects.
        </p>
      </div>

      {/* Job Selector */}
      <div className="relative min-w-[300px]">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block px-1 flex items-center gap-2">
          <Filter className="w-3 h-3" /> Select Project
        </label>
        <div className="relative">
          <select 
            value={selectedJobId}
            onChange={(e) => onJobChange(e.target.value)}
            className="w-full bg-white border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500 appearance-none cursor-pointer shadow-xl shadow-slate-200/50 transition-all outline-none"
          >
            <option value="all">All Freelance Projects</option>
            {jobs?.map(job => (
              <option key={job._id} value={job._id}>{job.title}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default ProposalHeader;
