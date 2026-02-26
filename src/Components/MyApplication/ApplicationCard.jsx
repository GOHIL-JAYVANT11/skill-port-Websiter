import React from 'react';
import { 
  MapPin, 
  DollarSign, 
  Briefcase, 
  Calendar, 
  MessageSquare, 
  Trash2, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  BrainCircuit,
  Video
} from 'lucide-react';

const ApplicationCard = ({ application }) => {
  const steps = ['Applied', 'Reviewed', 'Shortlisted', 'Interview', 'Hired'];
  const currentStepIndex = steps.indexOf(application.status);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-slate-100 text-slate-600';
      case 'Shortlisted': return 'bg-teal-50 text-teal-700 border-teal-100';
      case 'Interview': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Rejected': return 'bg-rose-50 text-rose-700 border-rose-100';
      case 'Hired': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all group relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Premium Gradient Hover Effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-teal-500/10 transition-colors" />

      <div className="flex flex-col lg:flex-row gap-8 relative z-10">
        {/* Company & Job Info */}
        <div className="flex-1">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center p-3 shrink-0 group-hover:scale-105 transition-transform shadow-sm">
              <img src={application.logo} alt={application.company} className="w-full h-full object-contain" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1 flex-wrap">
                <h3 className="text-lg font-black text-slate-900 group-hover:text-teal-700 transition-colors leading-tight">
                  {application.title}
                </h3>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${getStatusColor(application.status)}`}>
                  {application.status}
                </span>
              </div>
              <p className="text-sm font-bold text-slate-500">{application.company} • {application.location}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center gap-2 text-slate-500">
              <DollarSign className="w-4 h-4 text-teal-600" />
              <span className="text-xs font-bold">{application.salary}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <Briefcase className="w-4 h-4 text-teal-600" />
              <span className="text-xs font-bold">{application.experience}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <Calendar className="w-4 h-4 text-teal-600" />
              <span className="text-xs font-bold">Applied {application.appliedDate}</span>
            </div>
          </div>

          {/* AI Insights */}
          <div className="bg-teal-50/50 rounded-2xl p-4 border border-teal-100/50 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-teal-600" />
                <span className="text-[10px] font-black text-teal-700 uppercase tracking-widest">{application.match}% Skill Match</span>
              </div>
              <div className="h-1.5 w-24 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-teal-500 transition-all duration-1000" 
                  style={{ width: `${application.match}%` }}
                />
              </div>
            </div>
            <p className="text-[11px] text-slate-600 font-medium">
              <span className="font-bold text-teal-700">AI Insight:</span> {application.aiInsight}
            </p>
            <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
              <Clock className="w-3 h-3" />
              {application.recruiterActivity}
            </div>
          </div>
        </div>

        {/* Status Stepper & Actions */}
        <div className="lg:w-72 flex flex-col justify-between gap-6">
          {/* Visual Stepper */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              {steps.map((step, idx) => (
                <div key={step} className="flex flex-col items-center gap-1 relative">
                  <div className={`w-2.5 h-2.5 rounded-full z-10 transition-all duration-500 ${
                    idx <= currentStepIndex ? 'bg-teal-500 scale-125 shadow-lg shadow-teal-500/40' : 'bg-slate-200'
                  }`} />
                  <span className={`text-[8px] font-black uppercase tracking-tighter ${
                    idx <= currentStepIndex ? 'text-teal-700' : 'text-slate-400'
                  }`}>
                    {step}
                  </span>
                  {idx < steps.length - 1 && (
                    <div className={`absolute top-[5px] left-1/2 w-full h-[2px] transition-all duration-500 ${
                      idx < currentStepIndex ? 'bg-teal-500' : 'bg-slate-100'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {/* Interview Info (If Scheduled) */}
            {application.status === 'Interview' && application.interviewDetails && (
              <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100 animate-pulse">
                <div className="flex items-center gap-2 mb-2">
                  <Video className="w-4 h-4 text-blue-600" />
                  <span className="text-[10px] font-black text-blue-700 uppercase tracking-widest">Interview Scheduled</span>
                </div>
                <p className="text-[11px] font-bold text-slate-700">{application.interviewDetails.date} • {application.interviewDetails.time}</p>
                <button className="w-full mt-3 py-2 bg-blue-600 text-white text-[10px] font-black rounded-lg hover:bg-blue-700 transition-all shadow-md shadow-blue-600/20">
                  Join Meeting
                </button>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 gap-2">
            <button className="w-full py-3 bg-slate-900 text-white text-xs font-black rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 flex items-center justify-center gap-2 group/btn">
              View Details
              <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button className="py-2.5 bg-teal-50 text-teal-700 text-[10px] font-black rounded-xl hover:bg-teal-100 transition-all flex items-center justify-center gap-1.5 uppercase tracking-widest">
                <MessageSquare className="w-3.5 h-3.5" />
                Message
              </button>
              <button className="py-2.5 bg-rose-50 text-rose-600 text-[10px] font-black rounded-xl hover:bg-rose-100 transition-all flex items-center justify-center gap-1.5 uppercase tracking-widest">
                <Trash2 className="w-3.5 h-3.5" />
                Withdraw
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;
