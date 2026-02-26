import React from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  ChevronRight, 
  ExternalLink, 
  Sparkles, 
  BrainCircuit, 
  MoreVertical,
  Bell
} from 'lucide-react';

const InterviewCard = ({ interview }) => {
  const getStatusStyles = (status) => {
    switch (status) {
      case 'Scheduled': return 'bg-teal-50 text-teal-700 border-teal-100 shadow-[0_0_10px_rgba(20,184,166,0.1)]';
      case 'Completed': return 'bg-slate-100 text-slate-600 border-slate-200';
      case 'Cancelled': return 'bg-rose-50 text-rose-700 border-rose-100';
      case 'Rescheduled': return 'bg-orange-50 text-orange-700 border-orange-100';
      case 'Selected': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all group relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Decorative Gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-teal-500/10 transition-colors" />

      <div className="flex flex-col lg:flex-row gap-8 relative z-10">
        {/* Company & Job Info */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center p-3 shrink-0 group-hover:scale-105 transition-transform shadow-sm">
                <img src={interview.logo} alt={interview.company} className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 group-hover:text-teal-700 transition-colors leading-tight mb-1">
                  {interview.title}
                </h3>
                <p className="text-sm font-bold text-slate-500">{interview.company} • <span className="text-teal-600">{interview.round}</span></p>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${getStatusStyles(interview.status)}`}>
              {interview.status}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-3 text-slate-600 bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-100/50">
              <Calendar className="w-4 h-4 text-teal-600" />
              <span className="text-xs font-black">{interview.date}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600 bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-100/50">
              <Clock className="w-4 h-4 text-teal-600" />
              <span className="text-xs font-black">{interview.time}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600 bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-100/50 sm:col-span-2">
              {interview.mode === 'Online' ? (
                <>
                  <Video className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-black">{interview.platform} • <button className="text-blue-600 hover:underline">Link Details</button></span>
                </>
              ) : (
                <>
                  <MapPin className="w-4 h-4 text-rose-600" />
                  <span className="text-xs font-black">{interview.location}</span>
                </>
              )}
            </div>
          </div>

          {/* AI Prep Tip */}
          <div className="bg-teal-50/50 rounded-2xl p-4 border border-teal-100/50 relative overflow-hidden group/tip">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span className="text-[10px] font-black text-teal-700 uppercase tracking-widest">AI Preparation Tip</span>
            </div>
            <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
              {interview.aiTip}
            </p>
            <div className="mt-3 flex items-center gap-2">
              <BrainCircuit className="w-3.5 h-3.5 text-teal-500" />
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Matched 92% with your profile</span>
            </div>
          </div>
        </div>

        {/* Vertical Divider for Desktop */}
        <div className="hidden lg:block w-px bg-slate-100 self-stretch" />

        {/* Actions Section */}
        <div className="lg:w-64 flex flex-col justify-between gap-6">
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 group/btn">
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-teal-400" />
                <span className="text-xs font-black uppercase tracking-widest">Join Meeting</span>
              </div>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border border-slate-200 text-slate-600 font-black text-xs hover:bg-slate-50 transition-all uppercase tracking-widest">
              <Calendar className="w-4 h-4" />
              Add to Calendar
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Reminder</span>
              <button className="p-1.5 rounded-lg bg-teal-50 text-teal-600 hover:bg-teal-100 transition-all">
                <Bell className="w-3.5 h-3.5" />
              </button>
            </div>
            <button className="w-full py-2.5 text-teal-600 text-[10px] font-black uppercase tracking-widest hover:underline flex items-center justify-center gap-1.5">
              View All Details
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
