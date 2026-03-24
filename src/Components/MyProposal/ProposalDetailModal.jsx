import React, { useState } from 'react';
import { X, Download, Clock, DollarSign, FileText } from 'lucide-react';

const ProposalDetailModal = ({ proposal, onClose }) => {
  if (!proposal) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-3xl bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-teal-100 text-teal-700 text-[10px] font-black uppercase tracking-widest rounded-lg">
                {proposal.status}
              </span>
              <span className="text-slate-400 text-xs font-bold">Applied on {proposal.date}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">{proposal.projectTitle}</h2>
            <p className="text-teal-600 font-bold mt-1">Client: {proposal.clientName}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors bg-white shadow-sm">
            <X className="w-6 h-6 text-slate-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 custom-scrollbar">
          
          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-teal-600" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Proposed Budget</span>
              </div>
              <p className="text-2xl font-black text-slate-900">₹{proposal.budget.toLocaleString()}</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-teal-600" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Delivery Time</span>
              </div>
              <p className="text-2xl font-black text-slate-900">{proposal.deliveryDays} Days</p>
            </div>
          </div>

          {/* Cover Letter */}
          <div className="mb-8">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4" /> Cover Letter
            </h3>
            <div className="bg-white border border-slate-200 rounded-2xl p-6 text-slate-600 leading-relaxed font-medium whitespace-pre-wrap">
              {proposal.coverLetter}
            </div>
          </div>

          {/* Attachments */}
          {proposal.attachmentsCount > 0 && (
            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Attachments</h3>
              <div className="flex flex-wrap gap-4">
                {[...Array(proposal.attachmentsCount)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 pr-4 bg-slate-50 border border-slate-200 rounded-xl group hover:bg-white hover:border-teal-200 transition-all cursor-pointer">
                    <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center group-hover:text-teal-600 transition-colors">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">portfolio_v{i+1}.pdf</p>
                      <p className="text-[10px] font-bold text-slate-400">2.4 MB</p>
                    </div>
                    <Download className="w-4 h-4 text-slate-400 ml-2 group-hover:text-teal-600" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
          <button onClick={onClose} className="px-8 py-3.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProposalDetailModal;
