import React, { useState } from 'react';
import { MapPin, Briefcase, IndianRupee, FileText, CheckSquare, XCircle, Calendar, MoreVertical, Mail, MessageSquare, Download, BrainCircuit } from 'lucide-react';

const ApplicationCard = ({ application, onViewProfile }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Under Review': return 'text-amber-600 bg-amber-50 border-amber-100';
      case 'Shortlisted': return 'text-teal-600 bg-teal-50 border-teal-100';
      case 'Interview Scheduled': return 'text-sky-600 bg-sky-50 border-sky-100';
      case 'Rejected': return 'text-slate-500 bg-slate-100 border-slate-200';
      case 'Hired': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
      default: return 'text-slate-600 bg-slate-50 border-slate-100';
    }
  };

  const getMatchColor = (match) => {
    if (match >= 90) return 'text-emerald-600 bg-emerald-50 border-emerald-100';
    if (match >= 70) return 'text-teal-600 bg-teal-50 border-teal-100';
    return 'text-slate-500 bg-slate-50 border-slate-100';
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
                    {application.candidateName}
                  </h3>
                  <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusColor(application.status)}`}>
                    {application.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <span>{application.jobTitle}</span>
                  <span className="opacity-30">•</span>
                  <span>Applied {application.appliedDate}</span>
                </div>
              </div>

              {/* Stats on Right */}
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-center px-4 py-2 bg-slate-50 rounded-2xl border border-slate-100 min-w-[80px]">
                  <span className="text-lg font-black text-slate-900 leading-none">{application.rating}</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mt-1">Rating</span>
                </div>
                <div className={`flex flex-col items-center px-4 py-2 rounded-2xl border min-w-[80px] ${getMatchColor(application.matchScore)}`}>
                  <div className="flex items-center gap-1">
                    <BrainCircuit className="w-3.5 h-3.5 fill-current" />
                    <span className="text-lg font-black leading-none">{application.matchScore}%</span>
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-tighter mt-1">AI Match</span>
                </div>
              </div>
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-4">
              <div className="flex items-center gap-2 text-slate-500">
                <div className="p-1.5 bg-slate-50 rounded-lg">
                  <Briefcase className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold">{application.experience} Exp</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <div className="p-1.5 bg-slate-50 rounded-lg">
                  <FileText className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold">{application.roleTitle}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                 <div className="p-1.5 bg-slate-50 rounded-lg">
                   <Calendar className="w-3.5 h-3.5" />
                 </div>
                 <span className="text-xs font-bold">{application.interviewStatus || 'No Interview'}</span>
               </div>
            </div>

            {/* Description Fragment */}
            <div className="flex items-start gap-2 mb-5 p-3 bg-slate-50/50 rounded-2xl border border-slate-50">
              <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-500 font-medium line-clamp-1 leading-relaxed italic">
                {application.skills.join(', ')} • {application.education}
              </p>
            </div>

            {/* Bottom: Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-slate-50">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => onViewProfile(application)}
                  className="px-4 py-2 bg-slate-900 text-white text-[10px] font-black rounded-xl shadow-sm hover:bg-teal-600 transition-all uppercase tracking-widest"
                >
                  View Profile
                </button>
                <button className="p-2 border border-slate-200 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-all" title="Shortlist">
                  <CheckSquare className="w-4 h-4" />
                </button>
                <button className="p-2 border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all" title="Reject">
                  <XCircle className="w-4 h-4" />
                </button>
                <button className="p-2 border border-slate-200 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-xl transition-all" title="Schedule Interview">
                  <Calendar className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all">
                  <Mail className="w-4 h-4" />
                </button>
                <button className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all">
                  <MessageSquare className="w-4 h-4" />
                </button>
                <button className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all">
                  <Download className="w-4 h-4" />
                </button>
                <button className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;
