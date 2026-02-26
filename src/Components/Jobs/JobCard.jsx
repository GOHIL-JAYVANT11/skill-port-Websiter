import React from 'react';
import { MapPin, Briefcase, IndianRupee, Bookmark, Star, EyeOff, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const JobCard = ({ job, isLoggedIn }) => {
  const navigate = useNavigate();

  const handleCardClick = (e) => {
    if (e.target.closest('.action-button')) return;
    navigate(`/jobs/${job.id}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 cursor-pointer group relative"
    >
      <div className="flex gap-4">
        {/* Checkbox (Optional, matching screenshot) */}
        <div className="pt-1">
          <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500 action-button" onClick={(e) => e.stopPropagation()} />
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-teal-600 transition-colors leading-tight mb-1">
                {job.title}
              </h3>
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-slate-700">{job.companyName}</p>
                <div className="flex items-center gap-1 text-xs font-bold text-slate-400">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{job.companyRating || '4.0'}</span>
                  <span className="font-medium">| 100+ Reviews</span>
                </div>
              </div>
            </div>
            
            {/* Company Logo on Right */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 p-1.5 overflow-hidden shrink-0">
              {job.companyLogo ? (
                <img src={job.companyLogo} alt={job.companyName} className="w-full h-full object-contain" />
              ) : (
                <Briefcase className="w-5 h-5 text-slate-300" />
              )}
            </div>
          </div>

          {/* Icons Row */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-4 text-slate-500">
            <div className="flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-slate-400" />
              <span className="text-xs sm:text-sm font-medium">{job.experience}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <IndianRupee className="w-4 h-4 text-slate-400" />
              <span className="text-xs sm:text-sm font-medium">{job.salary}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span className="text-xs sm:text-sm font-medium">{job.location}</span>
            </div>
          </div>

          {/* Brief Description / Requirements */}
          <div className="flex items-start gap-2 mb-4">
            <FileText className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-slate-500 line-clamp-1 font-medium">
              Proficiency in programming languages such as {job.skills[0]} or {job.skills[1]}, with experience in {job.industry || 'Software Development'}...
            </p>
          </div>

          {/* Skill Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {job.skills.slice(0, 4).map((skill, index) => (
              <span 
                key={index} 
                className="text-[11px] font-medium text-slate-500 hover:text-slate-900 transition-colors"
              >
                {skill} {index < 3 && <span className="ml-1 opacity-30">•</span>}
              </span>
            ))}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-50">
            <span className="text-[11px] font-medium text-slate-400">
              {job.postedTime}
            </span>
            <div className="flex items-center gap-4">
              <button className="action-button flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors">
                <EyeOff className="w-4 h-4" />
                Hide
              </button>
              <button className="action-button flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-teal-600 transition-colors">
                <Bookmark className="w-4 h-4" />
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* AI Match Badge (Floating) */}
      {isLoggedIn && job.matchPercentage && (
        <div className="absolute -top-2 -right-2 px-2.5 py-1 bg-emerald-500 text-white rounded-lg text-[10px] font-bold shadow-lg shadow-emerald-500/20 border border-emerald-400">
          {job.matchPercentage}% AI Match
        </div>
      )}
    </div>
  );
};

export default JobCard;
