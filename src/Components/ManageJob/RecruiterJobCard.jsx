import React, { useState } from 'react';
import { MapPin, Briefcase, IndianRupee, Star, FileText, Users, Edit3, Trash2, MoreVertical, Copy, XCircle, Eye, Zap, ArrowUpRight } from 'lucide-react';

const RecruiterJobCard = ({ job }) => {
  const [showOptions, setShowOptions] = useState(false);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
      case 'closed': return 'text-slate-600 bg-slate-50 border-slate-100';
      case 'draft': return 'text-amber-600 bg-amber-50 border-amber-100';
      case 'expired': return 'text-rose-600 bg-rose-50 border-rose-100';
      case 'filled': return 'text-blue-600 bg-blue-50 border-blue-100';
      default: return 'text-slate-600 bg-slate-50 border-slate-100';
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:border-teal-100 transition-all duration-300 group relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:scale-125 transition-transform duration-700" />
      
      <div className="flex flex-col sm:flex-row gap-5 relative z-10">
        {/* Left: Checkbox & Header Info */}
        <div className="flex gap-4 flex-1">
          <div className="pt-1.5">
            <input type="checkbox" className="w-5 h-5 rounded-lg border-2 border-slate-200 text-teal-600 focus:ring-teal-500 cursor-pointer" />
          </div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-teal-700 transition-colors tracking-tight leading-tight">
                    {job.title}
                  </h3>
                  <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusColor(job.status)}`}>
                    {job.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <span>{job.id || 'JOB-2026-001'}</span>
                  <span className="opacity-30">•</span>
                  <span>Posted {job.postedTime}</span>
                </div>
              </div>
              
              {/* Stats on Right */}
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-center px-4 py-2 bg-slate-50 rounded-2xl border border-slate-100 min-w-[80px]">
                  <span className="text-lg font-black text-slate-900 leading-none">{job.applicants}</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mt-1">Applicants</span>
                </div>
                <div className={`flex flex-col items-center px-4 py-2 rounded-2xl border min-w-[80px] ${job.matchPercentage >= 90 ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-amber-50 border-amber-100 text-amber-700'}`}>
                  <div className="flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    <span className="text-lg font-black leading-none">{job.matchPercentage}%</span>
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-tighter mt-1">Avg Match</span>
                </div>
              </div>
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-4">
              <div className="flex items-center gap-2 text-slate-500">
                <div className="p-1.5 bg-slate-50 rounded-lg">
                  <Briefcase className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold">{job.experience}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <div className="p-1.5 bg-slate-50 rounded-lg">
                  <IndianRupee className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold">{job.salary}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <div className="p-1.5 bg-slate-50 rounded-lg">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold">{job.location}</span>
              </div>
            </div>

            {/* Description Fragment */}
            <div className="flex items-start gap-2 mb-5 p-3 bg-slate-50/50 rounded-2xl border border-slate-50">
              <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-500 font-medium line-clamp-1 leading-relaxed italic">
                Focus on candidates with expertise in {job.skills[0]}, {job.skills[1]}, and {job.skills[2]}. AI suggests {job.matchPercentage >= 90 ? 'high-quality talent pool.' : 'optimizing skill set for better matches.'}
              </p>
            </div>

            {/* Bottom: Skills & Management Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-slate-50">
              <div className="flex flex-wrap gap-2">
                {job.skills.slice(0, 4).map((skill, index) => (
                  <span 
                    key={index} 
                    className="px-2.5 py-1 bg-white border border-slate-200 text-slate-500 text-[10px] font-bold rounded-lg uppercase tracking-tight group-hover:border-teal-200 group-hover:text-teal-700 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-teal-600 transition-all active:scale-95 shadow-lg shadow-slate-900/10">
                  <Users className="w-3.5 h-3.5" />
                  View Applicants
                </button>
                <div className="relative">
                  <button 
                    onClick={() => setShowOptions(!showOptions)}
                    className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-900 transition-all active:scale-95"
                  >
                    <MoreVertical className="w-4 h-4 text-slate-400" />
                  </button>
                  {showOptions && (
                    <div className="absolute right-0 bottom-full mb-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-2xl z-50 p-2 animate-in fade-in zoom-in-95 duration-200">
                      <button className="w-full flex items-center gap-3 px-3 py-2 text-[10px] font-bold text-slate-600 hover:bg-teal-50 hover:text-teal-600 rounded-xl transition-all">
                        <Edit3 className="w-4 h-4" /> Edit Job
                      </button>
                      <button className="w-full flex items-center gap-3 px-3 py-2 text-[10px] font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all">
                        <Copy className="w-4 h-4" /> Duplicate
                      </button>
                      <button className="w-full flex items-center gap-3 px-3 py-2 text-[10px] font-bold text-amber-600 hover:bg-amber-50 rounded-xl transition-all">
                        <XCircle className="w-4 h-4" /> Close Job
                      </button>
                      <div className="h-px bg-slate-50 my-2 mx-2" />
                      <button className="w-full flex items-center gap-3 px-3 py-2 text-[10px] font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-all">
                        <Trash2 className="w-4 h-4" /> Delete Post
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterJobCard;
