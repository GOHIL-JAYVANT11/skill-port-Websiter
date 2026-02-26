import React from 'react';
import { Clock, DollarSign, Heart, Zap, Award } from 'lucide-react';

const SavedFreelanceCard = ({ project, onUnsave }) => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-md border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-600 transition-colors leading-tight flex-1 pr-4">
          {project.title}
        </h3>
        <button 
          onClick={() => onUnsave(project.id)}
          className="p-2 bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all bounce-on-click"
        >
          <Heart className="w-5 h-5 fill-current" />
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mb-5 text-slate-500 text-xs font-bold uppercase tracking-wider">
        <div className="flex items-center gap-1.5">
          <DollarSign className="w-3.5 h-3.5 text-teal-500" />
          {project.budget}
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-teal-500" />
          {project.duration}
        </div>
        <div className="flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5 text-teal-500" />
          {project.experienceLevel}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {project.skills.map((skill, idx) => (
          <span key={idx} className="px-2 py-1 bg-teal-50/50 text-teal-700 text-[10px] font-bold rounded-lg border border-teal-100">
            {skill}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
        <div className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
          <Zap className="w-3 h-3 fill-emerald-500" />
          {project.aiMatch}% Match
        </div>
        <button className="px-5 py-2 bg-gradient-to-r from-[#14B8A6] to-[#0F766E] text-white rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-teal-500/30 transition-all active:scale-95 hover-glow">
          Submit Proposal
        </button>
      </div>
    </div>
  );
};

export default SavedFreelanceCard;
