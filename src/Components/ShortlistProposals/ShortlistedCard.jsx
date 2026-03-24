import React from 'react';
import { MapPin, Briefcase, Eye, Check } from 'lucide-react';

const ShortlistedCard = ({ proposal, onViewProfile, onSchedule, onReject, onHire, isSelected, onToggleSelect, proposalNumber }) => {
  const getAIRanking = (score) => {
    if (score >= 95) return { label: 'Top Candidate', icon: '🏆', class: 'bg-amber-50 text-amber-700 border-amber-100' };
    if (score >= 90) return { label: 'Strong Match', icon: '💎', class: 'bg-slate-50 text-slate-700 border-slate-200' };
    return { label: 'Good Fit', icon: '✅', class: 'bg-teal-50 text-teal-700 border-teal-100' };
  };

  const ranking = getAIRanking(proposal.matchScore);

  const getInitials = (name) => {
    if (!name) return '??';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className={`bg-white rounded-[32px] border p-6 transition-all duration-300 group relative overflow-hidden ${
      isSelected ? 'border-teal-500 ring-4 ring-teal-500/10 shadow-2xl' : 'border-slate-100 shadow-md hover:shadow-2xl hover:-translate-y-1'
    }`}>
      {/* Select Toggle */}
      {onToggleSelect && (
        <button 
          onClick={() => onToggleSelect(proposal.id)}
          className={`absolute top-6 right-6 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
            isSelected ? 'bg-teal-600 border-teal-600' : 'bg-white border-slate-200 hover:border-teal-400'
          }`}
        >
          {isSelected && <Check className="w-4 h-4 text-white" />}
        </button>
      )}

      <div className="flex flex-col gap-6">
        <div className="flex items-start gap-5">
          <div className="relative shrink-0">
            <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl font-black text-slate-400 border border-slate-200 shadow-sm overflow-hidden">
              {proposal.profilePic ? (
                <img src={proposal.profilePic} className="w-full h-full object-cover" alt="" />
              ) : (
                getInitials(proposal.candidateName)
              )}
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-teal-500 text-white text-[10px] font-black flex items-center justify-center rounded-full shadow-lg border-4 border-white">
              {proposal.matchScore}%
            </div>
          </div>
          
          <div className="min-w-0 pr-8">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-black text-slate-900 truncate">{proposal.candidateName}</h3>
              <span className={`flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full border ${ranking.class}`}>
                {ranking.icon} {ranking.label}
              </span>
            </div>
            <p className="text-slate-600 font-bold text-sm mb-3">{proposal.roleTitle}</p>
            <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-400">
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-teal-500" /> {proposal.location}</span>
              <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5 text-teal-500" /> {proposal.experience}</span>
            </div>
          </div>
        </div>

        {/* Skill Matrix */}
        <div className="bg-slate-50/50 rounded-2xl p-4 border border-slate-100">
          <div className="flex flex-wrap gap-2">
            {proposal.skills?.slice(0, 4).map((skill, idx) => (
              <span key={idx} className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider ${
                proposal.matchedSkills?.includes(skill) ? 'bg-white text-teal-600 border border-teal-100 shadow-sm' : 'bg-white/50 text-slate-400 border border-slate-100'
              }`}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => onViewProfile(proposal)}
            className="col-span-2 py-3.5 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10"
          >
            <Eye className="w-4 h-4" /> View Profile
          </button>
          <button 
            onClick={() => onSchedule(proposal)}
            className="py-3.5 bg-teal-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-teal-600 shadow-lg shadow-teal-500/20 transition-all"
          >
            Interview
          </button>
          <button 
            onClick={() => onHire(proposal)}
            className="py-3.5 bg-white border-2 border-slate-100 text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-slate-50 transition-all"
          >
            Hire
          </button>
        </div>

        {proposalNumber && (
          <div className="mt-2 text-center">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full">
              Proposal #{proposalNumber}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShortlistedCard;
