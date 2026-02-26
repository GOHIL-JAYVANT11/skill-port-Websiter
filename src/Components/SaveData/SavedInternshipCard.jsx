import React from 'react';
import { MapPin, Calendar, IndianRupee, Heart, Briefcase } from 'lucide-react';

const SavedInternshipCard = ({ internship, onUnsave }) => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-md border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 p-2 overflow-hidden">
            {internship.companyLogo ? (
              <img src={internship.companyLogo} alt={internship.companyName} className="w-full h-full object-contain" />
            ) : (
              <Briefcase className="w-6 h-6 text-slate-300" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-600 transition-colors leading-tight">
              {internship.title}
            </h3>
            <p className="text-sm font-semibold text-slate-500">{internship.companyName}</p>
          </div>
        </div>
        <button 
          onClick={() => onUnsave(internship.id)}
          className="p-2 bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all bounce-on-click"
        >
          <Heart className="w-5 h-5 fill-current" />
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mb-5 text-slate-500 text-xs font-bold uppercase tracking-wider">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-teal-500" />
          {internship.location}
        </div>
        <div className="flex items-center gap-1.5">
          <IndianRupee className="w-3.5 h-3.5 text-teal-500" />
          {internship.stipend}
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-teal-500" />
          {internship.duration}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {internship.skills.map((skill, idx) => (
          <span key={idx} className="px-2 py-1 bg-slate-50 text-slate-600 text-[10px] font-bold rounded-lg border border-slate-100">
            {skill}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-end pt-4 border-t border-slate-50">
        <button className="px-5 py-2 bg-gradient-to-r from-[#14B8A6] to-[#0F766E] text-white rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-teal-500/30 transition-all active:scale-95 hover-glow">
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default SavedInternshipCard;
