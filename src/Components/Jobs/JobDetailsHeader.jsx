import React from 'react';
import { Bookmark } from 'lucide-react';

const JobDetailsHeader = ({ job }) => {
  return (
    <div className="sticky top-16 z-40 bg-white border-b border-slate-100 shadow-sm">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 p-1.5 overflow-hidden">
            <img src={job.companyLogo || 'https://via.placeholder.com/40'} alt={job.companyName} className="w-full h-full object-contain" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">{job.title}</h2>
            <p className="text-xs sm:text-sm font-medium text-slate-500">{job.companyName}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors">
            
            <Bookmark className="w-4 h-4" />
            Save Your Job
          </button>
          <button className="px-6 py-2 bg-teal-600 text-white text-xs font-bold rounded-lg hover:bg-teal-700 transition-all active:scale-95 shadow-sm">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsHeader;
