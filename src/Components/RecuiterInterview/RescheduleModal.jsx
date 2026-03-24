import React, { useState } from 'react';
import { X, Calendar, Clock, MessageSquare, RefreshCw, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RescheduleModal = ({ isOpen, onClose, onSubmit, interview }) => {
  const [formData, setFormData] = useState({
    newDate: '',
    newTime: '',
    reason: '',
    otherReason: '',
    updateLink: false,
    notifyCandidate: true
  });

  if (!isOpen || !interview) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, interviewId: interview.id });
  };

  const reasons = [
    'Recruiter unavailable',
    'Candidate requested',
    'Technical issue',
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
          <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-1">
                Reschedule Interview
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
            {/* Current Date/Time (Read Only) */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 opacity-60">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Current Date</p>
                <p className="text-xs font-black text-slate-700 line-through">{interview.date}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 opacity-60">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Current Time</p>
                <p className="text-xs font-black text-slate-700 line-through">{interview.time}</p>
              </div>
            </div>

            {/* New Date/Time */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" />
                  New Date *
                </label>
                <input
                  required
                  type="date"
                  value={formData.newDate}
                  onChange={(e) => setFormData({ ...formData, newDate: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold text-slate-700 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" />
                  New Time *
                </label>
                <input
                  required
                  type="time"
                  value={formData.newTime}
                  onChange={(e) => setFormData({ ...formData, newTime: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold text-slate-700 text-sm"
                />
              </div>
            </div>

            {/* Reason */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5" />
                Reason for Rescheduling *
              </label>
              <select
                required
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold text-slate-700 text-sm appearance-none bg-white"
              >
                <option value="">Select a reason</option>
                {reasons.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            {formData.reason === 'Other' && (
              <textarea
                required
                placeholder="Please specify..."
                value={formData.otherReason}
                onChange={(e) => setFormData({ ...formData, otherReason: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-slate-700 text-sm resize-none"
                rows={3}
              />
            )}

            {/* Notification Checkbox */}
            <div className="flex items-center gap-3 p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
              <input 
                type="checkbox" 
                id="notify"
                checked={formData.notifyCandidate}
                onChange={(e) => setFormData({ ...formData, notifyCandidate: e.target.checked })}
                className="w-5 h-5 rounded-lg border-2 border-blue-200 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <label htmlFor="notify" className="text-xs font-bold text-blue-700 cursor-pointer select-none">
                Notify candidate automatically via Email & SMS
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
                className="flex-[2] px-6 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 text-white text-[11px] font-black uppercase tracking-[0.2em] hover:shadow-xl hover:shadow-blue-500/20 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Confirm Reschedule
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default RescheduleModal;
