import React from 'react';
import { Clock, DollarSign, Paperclip, Eye, Edit3, XCircle, CheckCircle2, AlertCircle } from 'lucide-react';

const ProposalCard = ({ proposal, onView, onEdit, onWithdraw }) => {
  const getStatusConfig = (status) => {
    switch (status.toLowerCase()) {
      case 'accepted':
        return { color: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: CheckCircle2, label: 'Accepted 🎉' };
      case 'rejected':
        return { color: 'bg-red-50 text-red-700 border-red-200', icon: XCircle, label: 'Rejected' };
      default:
        return { color: 'bg-slate-100 text-slate-600 border-slate-200', icon: Clock, label: 'Pending' };
    }
  };

  const statusConfig = getStatusConfig(proposal.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden">
      {/* Status Badge */}
      <div className="absolute top-6 right-6">
        <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest border ${statusConfig.color}`}>
          <StatusIcon className="w-3.5 h-3.5" />
          {statusConfig.label}
        </span>
      </div>

      <div className="pr-32 mb-6">
        <h3 className="text-xl font-black text-slate-900 mb-1 truncate">{proposal.projectTitle}</h3>
        <p className="text-sm font-bold text-teal-600">Client: {proposal.clientName}</p>
      </div>

      <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100">
        <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Your Proposal</p>
        <p className="text-sm text-slate-600 font-medium line-clamp-2 italic">"{proposal.coverLetter}"</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 flex items-center gap-1">
            <DollarSign className="w-3 h-3" /> Budget
          </p>
          <p className="text-lg font-black text-slate-900">₹{proposal.budget.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 flex items-center gap-1">
            <Clock className="w-3 h-3" /> Delivery
          </p>
          <p className="text-lg font-black text-slate-900">{proposal.deliveryDays} Days</p>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 flex items-center gap-1">
            <Paperclip className="w-3 h-3" /> Attachments
          </p>
          <p className="text-sm font-bold text-slate-600 mt-1">{proposal.attachmentsCount} Files</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 pt-6 border-t border-slate-100">
        <button 
          onClick={() => onView(proposal)}
          className="flex-1 py-3 bg-slate-900 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
        >
          <Eye className="w-4 h-4" /> View Details
        </button>
        
        {proposal.status.toLowerCase() === 'pending' && (
          <>
            <button 
              onClick={() => onEdit(proposal)}
              className="px-6 py-3 bg-teal-50 text-teal-700 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-teal-100 transition-all flex items-center justify-center gap-2"
            >
              <Edit3 className="w-4 h-4" /> Edit
            </button>
            <button 
              onClick={() => onWithdraw(proposal)}
              className="px-6 py-3 bg-white border border-slate-200 text-red-600 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-red-50 transition-all flex items-center justify-center gap-2"
            >
              <AlertCircle className="w-4 h-4" /> Withdraw
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProposalCard;
