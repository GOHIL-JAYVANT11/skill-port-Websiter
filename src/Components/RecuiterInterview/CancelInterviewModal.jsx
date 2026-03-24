import React, { useState } from 'react';
import { X, AlertCircle, MessageSquare, Send, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CancelInterviewModal = ({ isOpen, onClose, onSubmit, interview }) => {
  const [formData, setFormData] = useState({
    reason: '',
    otherReason: '',
    notifyCandidate: true,
    message: ''
  });

  if (!isOpen || !interview) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, interviewId: interview.id });
  };

  const reasons = [
    'Position filled',
    'Candidate not suitable',
    'Interview no-show',
    'Recruiter unavailable',
    'Other'
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-white rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden"
        >
          {/* Header */}
          <div className="px-8 py-6 border-b border-slate-100 bg-rose-50/50 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black text-rose-600 uppercase tracking-[0.2em] mb-1">
                Cancel Interview
              </p>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                {interview.candidateName}
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="p-3 bg-white border border-slate-200 text-slate-400 hover:text-rose-500 hover:border-rose-100 transition-all rounded-2xl"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
            {/* Warning Section */}
            <div className="flex items-start gap-4 p-4 bg-rose-50/50 rounded-2xl border border-rose-100">
              <div className="p-2 bg-rose-100 text-rose-600 rounded-xl">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-black text-rose-900 uppercase tracking-widest mb-1">Important Action</p>
                <p className="text-[11px] text-rose-600 font-medium leading-relaxed">
                  Cancelling an interview will notify the candidate. This action cannot be undone.
                </p>
              </div>
            </div>

            {/* Reason Select */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5" />
                Reason for Cancellation *
              </label>
              <select
                required
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition-all font-bold text-slate-700 text-sm appearance-none bg-white"
              >
                <option value="">Select a reason</option>
                {reasons.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            {/* Message to Candidate */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Send className="w-3.5 h-3.5" />
                Message to Candidate (Optional)
              </label>
              <textarea
                placeholder="e.g. Thank you for your time. We've decided to move forward with another candidate..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition-all font-medium text-slate-700 text-sm resize-none"
                rows={4}
              />
            </div>

            {/* Notification Toggle */}
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <input 
                type="checkbox" 
                id="notify-cancel"
                checked={formData.notifyCandidate}
                onChange={(e) => setFormData({ ...formData, notifyCandidate: e.target.checked })}
                className="w-5 h-5 rounded-lg border-2 border-slate-200 text-rose-600 focus:ring-rose-500 cursor-pointer"
              />
              <label htmlFor="notify-cancel" className="text-xs font-bold text-slate-600 cursor-pointer select-none">
                Send automatic rejection notification
              </label>
            </div>

            {/* CTA */}
            <div className="pt-4 flex gap-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-4 rounded-2xl border border-slate-200 text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] hover:bg-slate-50 transition-all active:scale-95"
              >
                Go Back
              </button>
              <button
                type="submit"
                className="flex-[2] px-6 py-4 rounded-2xl bg-gradient-to-r from-rose-600 to-rose-800 text-white text-[11px] font-black uppercase tracking-[0.2em] hover:shadow-xl hover:shadow-rose-500/20 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <XCircle className="w-4 h-4" />
                Confirm Cancellation
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CancelInterviewModal;
