import React from 'react';
import { 
  MapPin, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  MessageCircle, 
  Award, 
  Zap, 
  IndianRupee, 
  FileText,
  Loader2
} from 'lucide-react';

const ProposalCard = ({ 
  proposal, 
  onViewProfile, 
  onUpdateStatus, 
  onMessage,
  isUpdating 
}) => {
  const { 
    _id, 
    freelancerId, 
    projectId, 
    proposedBudget, 
    deliveryDays, 
    status, 
    coverLetter, 
    createdAt 
  } = proposal;

  const isPending = status === 'Pending';
  const isAccepted = status === 'Accepted';
  const isRejected = status === 'Rejected';

  const appliedDate = new Date(createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="bg-white rounded-[24px] border border-slate-100 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden">
      {/* Status Badge Top Right */}
      <div className="absolute top-0 right-0">
        <div className={`text-[10px] font-black uppercase tracking-widest py-1.5 px-6 rotate-45 translate-x-4 -translate-y-1 shadow-sm ${
          isAccepted ? 'bg-teal-500 text-white' : 
          isRejected ? 'bg-rose-500 text-white' : 
          'bg-amber-400 text-slate-900'
        }`}>
          {status}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Freelancer Info */}
        <div className="flex gap-4 min-w-0 flex-1">
          <div className="relative shrink-0">
            <img 
              src={freelancerId?.profilePic?.trim().replace(/^`|`$/g, '') || `https://ui-avatars.com/api/?name=${freelancerId?.Fullname}`} 
              alt={freelancerId?.Fullname}
              className="w-16 h-16 rounded-2xl object-cover ring-4 ring-slate-50 shadow-sm"
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${freelancerId?.Fullname}`;
              }}
            />
            <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center shadow-sm ${
              isAccepted ? 'bg-teal-500' : 
              isRejected ? 'bg-rose-500' : 'bg-amber-400'
            }`}>
              {isAccepted ? <CheckCircle2 className="w-3.5 h-3.5 text-white" /> : 
               isRejected ? <XCircle className="w-3.5 h-3.5 text-white" /> : 
               <Clock className="w-3.5 h-3.5 text-slate-900" />}
            </div>
          </div>
          
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-black text-slate-900 truncate hover:text-teal-600 cursor-pointer transition-colors">
                {freelancerId?.Fullname}
              </h3>
              <Award className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-slate-500 text-sm font-bold mb-2">
              Applying for: <span className="text-slate-900">{projectId?.title}</span>
            </p>
            <div className="flex flex-wrap items-center gap-4 text-[11px] font-black text-slate-400 uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-teal-500" /> {freelancerId?.location || 'Remote'}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-teal-500" /> {appliedDate}
              </span>
              <span className="flex items-center gap-1.5 bg-slate-100 px-2 py-1 rounded-lg text-slate-700">
                <IndianRupee className="w-3.5 h-3.5" /> {proposedBudget}
              </span>
              <span className="flex items-center gap-1.5 bg-slate-100 px-2 py-1 rounded-lg text-slate-700">
                <Clock className="w-3.5 h-3.5" /> {deliveryDays} Days
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="lg:w-56 shrink-0 flex flex-col gap-2 justify-center">
          <button 
            onClick={() => onViewProfile(proposal)}
            className="w-full py-3 rounded-xl bg-slate-900 text-white text-[11px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10"
          >
            <Eye className="w-4 h-4" /> View Detail
          </button>
          
          <div className="flex flex-col gap-2">
            <button 
              onClick={() => onUpdateStatus(_id, 'Accepted')}
              disabled={isUpdating === _id || isAccepted}
              className={`w-full py-2.5 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                isAccepted 
                ? 'bg-teal-500 border-teal-500 text-white shadow-lg shadow-teal-200' 
                : 'border-teal-100 bg-teal-50 text-teal-600 hover:bg-teal-100'
              }`}
            >
              {isUpdating === _id && isAccepted ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
              Accepted
            </button>

            <button 
              onClick={() => onUpdateStatus(_id, 'Pending')}
              disabled={isUpdating === _id || isPending}
              className={`w-full py-2.5 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                isPending 
                ? 'bg-amber-400 border-amber-400 text-slate-900 shadow-lg shadow-amber-100' 
                : 'border-amber-100 bg-amber-50 text-amber-600 hover:bg-amber-100'
              }`}
            >
              {isUpdating === _id && isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Clock className="w-3.5 h-3.5" />}
              Pending
            </button>

            <button 
              onClick={() => onUpdateStatus(_id, 'Rejected')}
              disabled={isUpdating === _id || isRejected}
              className={`w-full py-2.5 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                isRejected 
                ? 'bg-rose-500 border-rose-500 text-white shadow-lg shadow-rose-200' 
                : 'border-rose-100 bg-rose-50 text-rose-600 hover:bg-rose-100'
              }`}
            >
              {isUpdating === _id && isRejected ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <XCircle className="w-3.5 h-3.5" />}
              Rejected
            </button>
          </div>
        </div>
      </div>

      {/* Skills Tags */}
      <div className="mt-6 flex flex-wrap gap-2">
        {freelancerId?.skill?.map((skill, idx) => (
          <span 
            key={idx} 
            className="px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-tight bg-slate-50 text-slate-600 border border-slate-100"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Cover Letter Mini */}
      <div className="mt-4 pt-4 border-t border-dashed border-slate-100">
        <p className="text-xs text-slate-500 font-bold italic line-clamp-2">
          <FileText className="w-3.5 h-3.5 inline mr-1.5 text-teal-500" />
          "{coverLetter}"
        </p>
      </div>
    </div>
  );
};

export default ProposalCard;
