import React, { useState } from 'react';
import { X, Paperclip, IndianRupee, Clock, Send } from 'lucide-react';

const ProposalModal = ({ isOpen, onClose, project }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Submit Proposal</h2>
            <p className="text-xs font-medium text-slate-500 mt-0.5">Project: {project?.title}</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900 hover:bg-white rounded-full transition-all">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form className="p-6 overflow-y-auto max-h-[80vh] space-y-6">
          {/* Cover Letter */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-2">Cover Letter</label>
            <textarea 
              rows="4"
              placeholder="Describe why you are the best fit for this project..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-teal-500 focus:bg-white transition-all"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Proposed Budget */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">Proposed Budget</label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="e.g. 50,000"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-teal-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Estimated Delivery */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">Estimated Delivery</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="e.g. 2 Months"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-teal-500 focus:bg-white transition-all"
                />
              </div>
            </div>
          </div>

          {/* Portfolio Link */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-2">Portfolio / Previous Work Link</label>
            <input 
              type="url" 
              placeholder="https://yourportfolio.com"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-teal-500 focus:bg-white transition-all"
            />
          </div>

          {/* Attachments */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-2">Attachments</label>
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 hover:border-teal-300 transition-all cursor-pointer">
              <Paperclip className="w-8 h-8 text-slate-400 mb-2" />
              <p className="text-xs font-bold text-slate-500">Click to upload or drag and drop</p>
              <p className="text-[10px] text-slate-400 mt-1">PDF, JPG, PNG (Max 10MB)</p>
            </div>
          </div>

          {/* Milestone Breakdown */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-2">Milestone Breakdown (Optional)</label>
            <textarea 
              rows="3"
              placeholder="e.g. Phase 1: Design (25%), Phase 2: Development (50%)..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-teal-500 focus:bg-white transition-all"
            ></textarea>
          </div>
        </form>

        <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 py-3 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition-all"
          >
            Cancel
          </button>
          <button className="flex-2 py-3 px-8 text-sm font-bold text-white bg-gradient-to-r from-teal-500 to-teal-700 rounded-xl hover:shadow-lg hover:shadow-teal-500/20 transition-all active:scale-95 flex items-center justify-center gap-2">
            <Send className="w-4 h-4" />
            Submit Proposal
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProposalModal;
