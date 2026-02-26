import React from 'react';
import { IndianRupee, Clock, Briefcase, Bookmark, MessageSquare, Flame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:border-teal-100 transition-all duration-300 group cursor-pointer relative overflow-hidden">
      {/* AI Match Badge */}
      {project.matchPercentage && project.matchPercentage >= 70 && (
        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-100 animate-pulse">
          <Flame className="w-3.5 h-3.5 fill-emerald-500" />
          {project.matchPercentage}% AI Match
        </div>
      )}

      <div className="flex flex-col h-full">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-600 transition-colors leading-tight mb-1 pr-32">
            {project.title}
          </h3>
          <p className="text-sm font-semibold text-slate-500">{project.clientName}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-5">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-teal-50 rounded-lg">
              <IndianRupee className="w-4 h-4 text-teal-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">{project.budget}</p>
              <p className="text-[10px] text-slate-400 font-medium">Budget</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Clock className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">{project.duration}</p>
              <p className="text-[10px] text-slate-400 font-medium">Duration</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Briefcase className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">{project.experience}</p>
              <p className="text-[10px] text-slate-400 font-medium">Level</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.skills.map((skill, index) => (
            <span 
              key={index} 
              className="px-3 py-1 bg-slate-50 text-slate-600 text-[11px] font-bold rounded-lg border border-slate-100"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between pt-5 border-t border-slate-50">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
              <MessageSquare className="w-4 h-4" />
              {project.proposalsCount} Proposals
            </div>
            <span className="text-[10px] text-slate-300 font-bold">•</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{project.postedTime}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="p-2.5 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-all">
              <Bookmark className="w-5 h-5" />
            </button>
            <button 
              onClick={() => navigate(`/freelance/${project.id}`)}
              className="px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-teal-500 to-teal-700 rounded-xl hover:shadow-lg hover:shadow-teal-500/20 transition-all active:scale-95"
            >
              Submit Proposal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
