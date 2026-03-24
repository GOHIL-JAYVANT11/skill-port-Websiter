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
  Video,
  IndianRupee
} from 'lucide-react';

const ApplicationCard = ({ application }) => {
  const steps = ['Applied', 'Reviewed', 'Shortlisted', 'Interview', 'Hired'];
  
  // Normalize status for stepper
  const getNormalizedStatus = (status) => {
    const s = status?.toLowerCase();
    if (s === 'applied') return 'Applied';
    if (s === 'under review') return 'Reviewed';
    if (s === 'shortlisted') return 'Shortlisted';
    if (s === 'interview' || s === 'interview scheduled') return 'Interview';
    if (s === 'hired') return 'Hired';
    return 'Applied';
  };

  const currentStatus = getNormalizedStatus(application.status);
  const currentStepIndex = steps.indexOf(currentStatus);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Applied': return 'bg-slate-100 text-slate-600';
      case 'Shortlisted': return 'bg-teal-50 text-teal-700 border-teal-100';
      case 'Interview': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Rejected': return 'bg-rose-50 text-rose-700 border-rose-100';
      case 'Hired': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  const appliedDate = application.createdAt ? new Date(application.createdAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }) : 'N/A';

  // Mock data for missing fields to match UI
  const companyName = application.company || 'Nexus AI';
  const companyLogo = application.logo || 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png';
  const salaryRange = application.salary || '₹12–18 LPA';
  const matchPercentage = application.match || (application.has_required_skill ? 95 : 88);
  const aiInsight = application.aiInsight || `Strong match for ${application.jobtitle} role. Your ${application.Skill?.[0] || 'skills'} match the requirements.`;
  const recruiterActivity = application.recruiterActivity || 'RECRUITER VIEWED YOUR PROFILE 2 DAYS AGO';

  return (
    <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all group relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col lg:flex-row gap-8 relative z-10">
        {/* Company & Job Info */}
        <div className="flex-1">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center p-2 shrink-0 group-hover:scale-105 transition-transform shadow-sm">
              <img src={companyLogo} alt={companyName} className="w-full h-full object-contain" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1 flex-wrap">
                <h3 className="text-xl font-black text-[#0F172A] group-hover:text-teal-700 transition-colors leading-tight">
                  {application.jobtitle}
                </h3>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${getStatusColor(currentStatus)}`}>
                  {currentStatus}
                </span>
              </div>
              <p className="text-sm font-bold text-slate-500">{companyName} • {application.location}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center gap-2 text-slate-500">
              <IndianRupee className="w-4 h-4 text-teal-600" />
              <span className="text-xs font-bold text-[#0F172A]">{salaryRange}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <Briefcase className="w-4 h-4 text-teal-600" />
              <span className="text-xs font-bold text-[#0F172A]">{application.Experience}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <Calendar className="w-4 h-4 text-teal-600" />
              <span className="text-xs font-bold text-[#0F172A]">Applied {appliedDate}</span>
            </div>
          </div>

          {/* AI Insights Section */}
          <div className="bg-[#F0FDFA] rounded-3xl p-5 border border-teal-50 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-teal-600" />
                <span className="text-[11px] font-black text-teal-700 uppercase tracking-widest">{matchPercentage}% SKILL MATCH</span>
              </div>
              <div className="h-2 w-32 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-teal-500 transition-all duration-1000" 
                  style={{ width: `${matchPercentage}%` }}
                />
              </div>
            </div>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              <span className="font-black text-teal-700">AI Insight:</span> {aiInsight}
            </p>
            <div className="flex items-center gap-2 text-[10px] text-slate-400 font-black uppercase tracking-widest">
              <Clock className="w-3.5 h-3.5" />
              {recruiterActivity}
            </div>
          </div>
        </div>

        {/* Status Stepper & Actions */}
        <div className="lg:w-80 flex flex-col justify-between gap-6">
          {/* Visual Stepper */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-2 relative">
              {steps.map((step, idx) => (
                <div key={step} className="flex flex-col items-center gap-2 relative z-10">
                  <div className={`w-3.5 h-3.5 rounded-full transition-all duration-500 ${
                    idx <= currentStepIndex ? 'bg-teal-500 scale-110 shadow-lg shadow-teal-500/30' : 'bg-slate-200'
                  }`} />
                  <span className={`text-[9px] font-black uppercase tracking-tighter ${
                    idx <= currentStepIndex ? 'text-teal-700' : 'text-slate-400'
                  }`}>
                    {step}
                  </span>
                  {idx < steps.length - 1 && (
                    <div className={`absolute top-[6px] left-[50%] w-[100%] h-[2px] -z-0 ${
                      idx < currentStepIndex ? 'bg-teal-500' : 'bg-slate-100'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {/* Interview Info (If Scheduled) */}
            {currentStatus === 'Interview' && (
              <div className="bg-[#EFF6FF] rounded-2xl p-4 border border-blue-100 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center gap-2 mb-2">
                  <Video className="w-4 h-4 text-blue-600" />
                  <span className="text-[10px] font-black text-blue-700 uppercase tracking-widest">INTERVIEW SCHEDULED</span>
                </div>
                <p className="text-[11px] font-black text-slate-700 mb-4">
                  {application.interviewDetails?.date || '15 Mar 2026'} • {application.interviewDetails?.time || '10:00 AM'}
                </p>
                <button className="w-full py-2.5 bg-[#2563EB] text-white text-[11px] font-black rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 uppercase tracking-widest">
                  Join Meeting
                </button>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button className="w-full py-3.5 bg-[#0F172A] text-white text-[11px] font-black rounded-xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center gap-2 group/btn uppercase tracking-widest">
              View Details
              <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>
            <div className="grid grid-cols-2 gap-3">
              <button className="py-3 bg-[#F0FDFA] text-teal-700 text-[10px] font-black rounded-xl hover:bg-teal-100 transition-all flex items-center justify-center gap-2 uppercase tracking-widest">
                <MessageSquare className="w-4 h-4" />
                Message
              </button>
              <button className="py-3 bg-[#FFF1F2] text-rose-600 text-[10px] font-black rounded-xl hover:bg-rose-100 transition-all flex items-center justify-center gap-2 uppercase tracking-widest">
                <Trash2 className="w-4 h-4" />
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
