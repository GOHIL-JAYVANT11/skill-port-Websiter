import React from 'react';
import { MapPin, Briefcase, IndianRupee, Heart, Star, Zap } from 'lucide-react';

const SavedJobCard = ({ job, onUnsave }) => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-md border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 p-2 overflow-hidden">
            {job.companyLogo ? (
              <img src={job.companyLogo} alt={job.companyName} className="w-full h-full object-contain" />
            ) : (
              <Briefcase className="w-6 h-6 text-slate-300" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-600 transition-colors leading-tight">
              {job.title}
            </h3>
            <p className="text-sm font-semibold text-slate-500">{job.companyName}</p>
          </div>
        </div>
        <button 
          onClick={() => onUnsave(job.id)}
          className="p-2 bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all bounce-on-click"
        >
          <Heart className="w-5 h-5 fill-current" />
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mb-5 text-slate-500 text-xs font-bold uppercase tracking-wider">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-teal-500" />
          {job.location}
        </div>
        <div className="flex items-center gap-1.5">
          <IndianRupee className="w-3.5 h-3.5 text-teal-500" />
          {job.salary}
        </div>
        <div className="flex items-center gap-1.5">
          <Briefcase className="w-3.5 h-3.5 text-teal-500" />
          {job.experience}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
        <div className="flex items-center gap-2">
          <div className="px-2.5 py-1 bg-teal-50 text-teal-700 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
            <Zap className="w-3 h-3 fill-teal-500" />
            {job.skillMatch}% Match
          </div>
        </div>
        <button className="px-5 py-2 bg-gradient-to-r from-[#14B8A6] to-[#0F766E] text-white rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-teal-500/30 transition-all active:scale-95 hover-glow">
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default SavedJobCard;
