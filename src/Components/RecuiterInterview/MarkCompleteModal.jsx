import React, { useState } from 'react';
import { X, Star, MessageSquare, Send, CheckCircle2, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MarkCompleteModal = ({ isOpen, onClose, onSubmit, interview }) => {
  const [formData, setFormData] = useState({
    outcome: '',
    internalNotes: '',
    newDate: '',
    newTime: '',
    rating: 0,
    notifyCandidate: true
  });

  if (!isOpen || !interview) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, interviewId: interview.id });
  };

  const outcomes = [
    { value: 'Selected', label: 'Selected', color: 'text-emerald-600 bg-emerald-50' },
    { value: 'Rejected', label: 'Rejected', color: 'text-rose-600 bg-rose-50' },
    { value: 'On Hold', label: 'On Hold', color: 'text-amber-600 bg-amber-50' },
    { value: 'Next Round', label: 'Next Round', color: 'text-blue-600 bg-blue-50' },
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
          <div className="px-8 py-6 border-b border-slate-100 bg-emerald-50/50 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-1">
                Interview Outcome
              </p>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                {interview.candidateName}
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="p-3 bg-white border border-slate-200 text-slate-400 hover:text-emerald-500 hover:border-emerald-100 transition-all rounded-2xl"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
            {/* Outcome Selection */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Interview Outcome *
              </label>
              <div className="grid grid-cols-1 gap-2">
                {outcomes.map((outcome) => (
                  <button
                    key={outcome.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, outcome: outcome.value })}
                    className={`w-full px-4 py-3 rounded-2xl border transition-all text-left text-xs font-black uppercase tracking-widest flex items-center justify-between
                      ${formData.outcome === outcome.value 
                        ? `${outcome.color} border-current ring-4 ring-emerald-500/10` 
                        : 'bg-white border-slate-100 text-slate-500 hover:bg-slate-50'}`}
                  >
                    {outcome.label}
                    {formData.outcome === outcome.value && <CheckCircle2 className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Next Round Conditional Inputs */}
            {formData.outcome === "Next Round" && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="grid grid-cols-2 gap-4 bg-blue-50/50 p-4 rounded-3xl border border-blue-100"
              >
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Calendar className="w-3 h-3 text-blue-500" />
                    Next Date
                  </label>
                  <input
                    type="date"
                    value={formData.newDate}
                    onChange={(e) => setFormData({ ...formData, newDate: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-blue-200 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-slate-700 text-xs"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Clock className="w-3 h-3 text-blue-500" />
                    Next Time
                  </label>
                  <input
                    type="time"
                    value={formData.newTime}
                    onChange={(e) => setFormData({ ...formData, newTime: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-blue-200 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-slate-700 text-xs"
                  />
                </div>
              </motion.div>
            )}

            {/* Internal Notes */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5" />
                Internal Notes (Only visible to you)
              </label>
              <textarea
                placeholder="e.g. Candidate was good in React but weak in DSA..."
                value={formData.internalNotes}
                onChange={(e) => setFormData({ ...formData, internalNotes: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium text-slate-700 text-sm resize-none"
                rows={4}
              />
            </div>

            {/* Rating */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Star className="w-3.5 h-3.5" />
                Candidate Rating
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className={`p-2 transition-all ${formData.rating >= star ? 'text-amber-500' : 'text-slate-200'}`}
                  >
                    <Star className={`w-8 h-8 ${formData.rating >= star ? 'fill-current' : ''}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Notification Checkbox */}
            <div className="flex items-center gap-3 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
              <input 
                type="checkbox" 
                id="notify-complete"
                checked={formData.notifyCandidate}
                onChange={(e) => setFormData({ ...formData, notifyCandidate: e.target.checked })}
                className="w-5 h-5 rounded-lg border-2 border-emerald-200 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
              />
              <label htmlFor="notify-complete" className="text-xs font-bold text-emerald-700 cursor-pointer select-none">
                Notify candidate automatically based on outcome
              </label>
            </div>

            {/* CTA */}
            <div className="pt-4 flex gap-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-4 rounded-2xl border border-slate-200 text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] hover:bg-slate-50 transition-all active:scale-95"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-[2] px-6 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-800 text-white text-[11px] font-black uppercase tracking-[0.2em] hover:shadow-xl hover:shadow-emerald-500/20 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Submit Outcome
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default MarkCompleteModal;
