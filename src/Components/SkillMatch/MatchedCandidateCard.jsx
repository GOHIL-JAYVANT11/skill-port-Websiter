import React, { useState } from 'react';
import { User, MapPin, DollarSign, Zap, Star, MoreVertical, Calendar, CheckSquare, MessageSquare, BrainCircuit, Sparkles, AlertCircle, ChevronDown, ChevronUp, CheckCircle2, Video } from 'lucide-react';

const MatchedCandidateCard = ({ candidate, onSchedule, onJoinMeeting }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getMatchColor = (match) => {
    if (match >= 90) return 'text-emerald-600 bg-emerald-50 border-emerald-100';
    if (match >= 70) return 'text-teal-600 bg-teal-50 border-teal-100';
    return 'text-slate-400 bg-slate-50 border-slate-100';
  };

  const ringColor = candidate.match >= 90 ? '#10B981' : candidate.match >= 70 ? '#14B8A6' : '#94A3B8';

  return (
    <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100 hover:shadow-2xl hover:border-teal-100 transition-all duration-500 group relative overflow-hidden">
      {/* Premium Glow Effect for High Matches */}
      {candidate.match >= 95 && (
        <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/5 to-emerald-500/5 pointer-events-none" />
      )}

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Left: Progress Ring & Avatar */}
          <div className="flex flex-col items-center gap-4 shrink-0 mx-auto md:mx-0">
            <div className="relative w-24 h-24">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="48" cy="48" r="42" stroke="#F1F5F9" strokeWidth="6" fill="transparent" />
                <circle 
                  cx="48" cy="48" r="42" stroke={ringColor} strokeWidth="6" fill="transparent" 
                  strokeDasharray="263.89" strokeDashoffset={263.89 - (263.89 * candidate.match) / 100} 
                  strokeLinecap="round" className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center p-2">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 border-2 border-white shadow-md overflow-hidden">
                  {candidate.photo ? (
                    <img src={candidate.photo} alt={candidate.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-slate-700 to-slate-900 text-white text-xl font-black uppercase">
                      {(candidate.name || 'U').split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                </div>
              </div>
              {candidate.match >= 95 && (
                <div className="absolute -top-2 -right-2 bg-amber-500 text-white p-1.5 rounded-full shadow-lg animate-pulse">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
            <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getMatchColor(candidate.match)}`}>
              {candidate.match}% Match
            </div>
          </div>

          {/* Center: Details */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight group-hover:text-teal-700 transition-colors leading-none">
                    {candidate.name}
                  </h3>
                  {candidate.shortlisted && (
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full text-[8px] font-black uppercase tracking-widest border border-blue-100">Shortlisted</span>
                  )}
                </div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">{candidate.role}</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2.5 bg-slate-50 text-slate-400 rounded-2xl hover:bg-teal-50 hover:text-teal-600 transition-all border border-transparent hover:border-teal-100">
                  <MessageSquare className="w-4 h-4" />
                </button>
                <button className="p-2.5 bg-slate-50 text-slate-400 rounded-2xl hover:bg-teal-50 hover:text-teal-600 transition-all border border-transparent hover:border-teal-100">
                  <CheckSquare className="w-4 h-4" />
                </button>
                <button className="p-2.5 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all">
                  <MoreVertical className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Experience</span>
                <span className="text-xs font-bold text-slate-700">{candidate.experience}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Location</span>
                <span className="text-xs font-bold text-slate-700">{candidate.location}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Expectation</span>
                <span className="text-xs font-bold text-slate-700">{candidate.salary}</span>
              </div>
            </div>

            {/* Skill Comparison Section */}
            <div className="bg-slate-50/50 rounded-2xl p-4 border border-slate-50 mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                  <BrainCircuit className="w-3.5 h-3.5 text-teal-600" />
                  Skill Comparison
                </span>
                <button 
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-[10px] font-black text-teal-600 hover:underline uppercase tracking-widest flex items-center gap-1"
                >
                  {isExpanded ? 'Hide Gap Analysis' : 'Show Gap Analysis'}
                  {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {(candidate.skills?.matched || []).map((skill, i) => (
                  <span key={i} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-black rounded-xl border border-emerald-100 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3" />
                    {skill}
                  </span>
                ))}
                {!isExpanded && (candidate.skills?.missing?.length || 0) > 0 && (
                  <span className="px-3 py-1.5 bg-slate-100 text-slate-400 text-[10px] font-black rounded-xl border border-slate-200">
                    +{candidate.skills.missing.length} missing
                  </span>
                )}
              </div>

              {isExpanded && (
                <div className="mt-6 pt-6 border-t border-slate-100 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-[9px] font-black text-rose-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                        <AlertCircle className="w-3 h-3" />
                        Missing Skills
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {(candidate.skills?.missing || []).map((skill, i) => (
                          <span key={i} className="px-3 py-1.5 bg-rose-50 text-rose-600 text-[10px] font-black rounded-xl border border-rose-100">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-teal-100 shadow-sm">
                      <h5 className="text-[9px] font-black text-teal-600 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3" />
                        AI Upskilling Suggestion
                      </h5>
                      <p className="text-[11px] text-slate-600 font-medium leading-relaxed italic">
                        "Candidate shows high potential.Upskilling in <span className="font-bold text-slate-900">{candidate.skills?.missing?.[0] || 'required skills'}</span> would make them a perfect fit for this role."
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              {candidate.meetingStatus === "Scheduled" ? (
                <button 
                  onClick={() => onJoinMeeting?.(candidate.meetingLink)}
                  className="w-full sm:w-auto px-8 py-3.5 bg-teal-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-teal-700 transition-all active:scale-95 shadow-xl shadow-teal-600/20 flex items-center justify-center gap-2"
                >
                  <Video className="w-4 h-4" />
                  Join Meeting
                </button>
              ) : (
                <button 
                  onClick={() => onSchedule?.(candidate)}
                  className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-teal-600 transition-all active:scale-95 shadow-xl shadow-slate-900/10 flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Schedule Interview
                </button>
              )}
              <button className="w-full sm:w-auto px-8 py-3.5 bg-white border border-slate-200 text-slate-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-slate-50 transition-all active:scale-95 flex items-center justify-center gap-2">
                <User className="w-4 h-4" />
                View Full Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchedCandidateCard;
