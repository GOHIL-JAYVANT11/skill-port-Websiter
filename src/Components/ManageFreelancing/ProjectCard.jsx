import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Clock,
  IndianRupee,
  MessageSquare,
  Bookmark,
  Zap,
  Briefcase,
  Flame
} from 'lucide-react';
import { motion } from 'framer-motion';

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={() => navigate(`/recruiter/manage-freelance/${project._id}`)}
      className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-teal-500/5 hover:border-teal-100 transition-all duration-500 group cursor-pointer relative overflow-hidden"
    >
      {/* Top Row: Title + AI Match */}
      <div className="flex justify-between items-start mb-5">
        <div style={{ flex: 1, minWidth: 0, paddingRight: '1rem' }}>
          <h3 className="text-2xl font-bold text-teal-700 leading-snug">
            {project.title}
          </h3>
          <p className="text-slate-500 text-sm mt-1">{project.companyName}</p>
        </div>
        <div className="flex items-center gap-1.5 text-teal-500 text-sm font-semibold" style={{ whiteSpace: 'nowrap' }}>
          <Flame className="w-4 h-4 fill-teal-400 text-teal-400" />
          92% AI Match
        </div>
      </div>

      {/* Middle Row: Budget / Duration / Level */}
      <div className="flex items-center gap-10 mb-6 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-teal-50 rounded-full text-teal-500">
            <IndianRupee className="w-5 h-5" />
          </div>
          <div>
            <p className="text-base font-semibold text-slate-800" style={{ whiteSpace: 'nowrap' }}>
              ₹{project.budget?.min} – ₹{project.budget?.max}
            </p>
            <p className="text-xs text-slate-400">Budget</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-full text-blue-400">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-base font-semibold text-slate-800">{project.duration}</p>
            <p className="text-xs text-slate-400">Duration</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-50 rounded-full text-purple-400">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <p className="text-base font-semibold text-slate-800">
              {project.experienceLevel || 'Expert'}
            </p>
            <p className="text-xs text-slate-400">Level</p>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(project.skillsRequired || project.skills || []).map((skill, idx) => (
          <span
            key={idx}
            className="px-4 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-full text-sm font-medium"
          >
            {typeof skill === 'string' ? skill.replace(/[.,]/g, '').trim() : skill}
          </span>
        ))}
      </div>

      {/* Bottom Row */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <MessageSquare className="w-4 h-4" />
          <span>{project.proposalsCount || 0} Proposals</span>
          <span className="mx-1">•</span>
          <span>2 HRS AGO</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={(e) => e.stopPropagation()}
            className="p-2 text-slate-300 hover:text-teal-500 transition-colors"
          >
            <Bookmark className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-full text-sm font-semibold shadow-sm transition-all active:scale-95"
            style={{ whiteSpace: 'nowrap' }}
          >
            Submit Proposal
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;