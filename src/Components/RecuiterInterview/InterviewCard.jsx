import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, MapPin, Video, Phone, Mail, User, 
  MoreVertical, RefreshCw, XCircle, CheckCircle2, Eye, ExternalLink, Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

const StatusBadge = ({ status }) => {
  const styles = {
    Scheduled: 'bg-amber-50 text-amber-600 border-amber-200',
    Rescheduled: 'bg-blue-50 text-blue-600 border-blue-200',
    Completed: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    Cancelled: 'bg-rose-50 text-rose-600 border-rose-200',
    'No Show': 'bg-slate-50 text-slate-600 border-slate-200',
  };

  return (
    <motion.span 
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${styles[status] || styles.Scheduled}`}
    >
      {status}
    </motion.span>
  );
};

const InterviewCard = ({ 
  interview, 
  onReschedule, 
  onCancel, 
  onMarkComplete, 
  onViewProfile,
  onJoinNow 
}) => {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:border-teal-100 transition-all duration-300 group relative mb-6"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full -mr-16 -mt-16 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      <div className="flex flex-col lg:flex-row items-center gap-8 relative z-10">
        {/* Left Section: Candidate Info */}
        <div className="flex items-center gap-5 lg:w-[30%] shrink-0">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-teal-500 to-teal-700 p-0.5 shadow-lg group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full rounded-2xl bg-white overflow-hidden flex items-center justify-center">
                {interview.candidatePhoto ? (
                  <img src={interview.candidatePhoto} alt={interview.candidateName} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-8 h-8 text-slate-300" />
                )}
              </div>
            </div>
            {interview.status === 'Scheduled' && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-teal-500 border-2 border-white rounded-full animate-pulse" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="text-lg font-black text-slate-900 tracking-tight truncate group-hover:text-teal-700 transition-colors">
              {interview.candidateName}
            </h4>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 truncate">
              {interview.jobTitle}
            </p>
            <div className="flex items-center gap-3 text-slate-500">
              <button className="hover:text-teal-600 transition-colors"><Mail className="w-3.5 h-3.5" /></button>
              <button className="hover:text-teal-600 transition-colors"><Phone className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        </div>

        {/* Middle Section: Interview Details */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full lg:border-x border-slate-50 lg:px-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 text-slate-600">
              <Calendar className="w-4 h-4 text-teal-500" />
              <span className="text-xs font-black">{interview.date}</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-600">
              <Clock className="w-4 h-4 text-teal-500" />
              <span className="text-xs font-black">{interview.time} ({interview.duration} min)</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2.5 text-slate-600">
              {(interview.mode === 'Online' || interview.mode === 'Video') ? <Video className="w-4 h-4 text-blue-500" /> : <MapPin className="w-4 h-4 text-orange-500" />}
              <span className="text-xs font-black">{interview.mode}</span>
            </div>
            {(interview.mode === 'Online' || interview.mode === 'Video') && interview.platform && (
              <div className="flex items-center gap-2.5 text-slate-400">
                <Sparkles className="w-3.5 h-3.5 text-teal-500" />
                <span className="text-[10px] font-bold uppercase truncate max-w-[120px]">
                  {interview.platform}
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Interviewer</p>
            <p className="text-xs font-black text-slate-700">{interview.interviewerName}</p>
            {interview.meetingLink && (interview.mode === 'Online' || interview.mode === 'Video') && (
              <a 
                href={interview.meetingLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-2 w-fit px-3 py-1.5 bg-teal-50 border border-teal-100 rounded-lg flex items-center gap-1.5 text-[9px] font-black text-teal-600 hover:bg-teal-600 hover:text-white transition-all uppercase tracking-wider"
              >
                <ExternalLink className="w-3 h-3" />
                Open Meeting
              </a>
            )}
          </div>
        </div>

        {/* Right Section: Actions */}
        <div className="flex flex-col items-center lg:items-end gap-4 lg:w-[25%] shrink-0">
          <StatusBadge status={interview.status} />
          
          <div className="flex items-center gap-2 w-full">
            {(interview.mode === 'Online' || interview.mode === 'Video') && interview.meetingLink && (
              <button 
                onClick={() => onJoinNow(interview)}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg bg-gradient-to-r from-teal-500 to-teal-700 text-white hover:shadow-teal-500/30 active:scale-95"
              >
                <Video className="w-4 h-4" />
                Join Now
              </button>
            )}
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => onViewProfile(interview)}
                className="p-2.5 bg-slate-50 text-slate-400 rounded-xl border border-slate-100 hover:bg-white hover:text-teal-600 hover:border-teal-100 transition-all group/btn"
              >
                <Eye className="w-4 h-4" />
              </button>
              
              <div className="relative group/menu">
                <button className="p-2.5 bg-slate-50 text-slate-400 rounded-xl border border-slate-100 hover:bg-white hover:text-slate-900 hover:border-slate-200 transition-all">
                  <MoreVertical className="w-4 h-4" />
                </button>
                
                {/* Hover Menu */}
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-2xl opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all z-50 p-2">
                  {interview.status !== 'Completed' && interview.status !== 'Cancelled' && (
                    <>
                      <button 
                        onClick={() => onReschedule(interview)}
                        className="w-full text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-blue-600 hover:bg-blue-50 rounded-xl transition-all flex items-center gap-3"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        Reschedule
                      </button>
                      <button 
                        onClick={() => onMarkComplete(interview)}
                        className="w-full text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all flex items-center gap-3"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Mark Complete
                      </button>
                      <button 
                        onClick={() => onCancel(interview)}
                        className="w-full text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-rose-600 hover:bg-rose-50 rounded-xl transition-all flex items-center gap-3"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        Cancel / Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notes Section */}
      {interview.notes && (
        <div className="mt-6 pt-4 border-t border-slate-50 flex items-start gap-3 relative z-10">
          <div className="p-1.5 bg-slate-50 rounded-lg shrink-0">
            <Sparkles className="w-3 h-3 text-amber-500" />
          </div>
          <div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Notes for candidate</p>
            <p className="text-[11px] text-slate-500 font-medium italic leading-relaxed">
              "{interview.notes}"
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default InterviewCard;
