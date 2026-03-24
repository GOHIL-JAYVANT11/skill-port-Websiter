import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, FileText, Send, Video, Timer, Type } from 'lucide-react';

const ScheduleInterviewModal = ({ isOpen, onClose, onSubmit, candidateName, jobTitle }) => {
  const [formData, setFormData] = useState({
    interviewTitle: 'Technical Interview',
    interviewType: 'Video',
    meetingPlatform: 'SkillPort Meet',
    interviewDate: '',
    interviewTime: '',
    duration: 30,
    notes: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-lg bg-white rounded-[32px] shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 bg-slate-50/50">
          <div>
            <p className="text-[10px] font-black text-teal-600 uppercase tracking-[0.2em] mb-1">
              Interview Scheduler
            </p>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Schedule with {candidateName}
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-1">
              For <span className="text-slate-900 font-bold">{jobTitle}</span>
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2.5 rounded-2xl bg-white border border-slate-200 text-slate-400 hover:text-rose-500 hover:border-rose-100 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* Interview Title */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Type className="w-3.5 h-3.5" />
              Interview Title
            </label>
            <input
              required
              type="text"
              placeholder="e.g. Technical Interview"
              value={formData.interviewTitle}
              onChange={(e) => setFormData({ ...formData, interviewTitle: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all font-bold text-slate-700 text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Interview Type */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Video className="w-3.5 h-3.5" />
                Interview Type
              </label>
              <select
                value={formData.interviewType}
                onChange={(e) => setFormData({ ...formData, interviewType: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all font-bold text-slate-700 text-sm appearance-none bg-white"
              >
                <option value="Video">Video Call</option>
                <option value="Offline">Offline / In-Person</option>
                <option value="Phone">Telephonic</option>
              </select>
            </div>

            {/* Meeting Platform */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" />
                Meeting Platform
              </label>
              <input
                required
                type="text"
                placeholder="e.g. SkillPort Meet"
                value={formData.meetingPlatform}
                onChange={(e) => setFormData({ ...formData, meetingPlatform: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all font-bold text-slate-700 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5" />
                Interview Date
              </label>
              <input
                required
                type="date"
                value={formData.interviewDate}
                onChange={(e) => setFormData({ ...formData, interviewDate: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all font-bold text-slate-700 text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Clock className="w-3.5 h-3.5" />
                Interview Time
              </label>
              <input
                required
                type="time"
                value={formData.interviewTime}
                onChange={(e) => setFormData({ ...formData, interviewTime: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all font-bold text-slate-700 text-sm"
              />
            </div>
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Timer className="w-3.5 h-3.5" />
              Duration (Minutes)
            </label>
            <input
              required
              type="number"
              min="15"
              step="15"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all font-bold text-slate-700 text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <FileText className="w-3.5 h-3.5" />
              Interview Notes
            </label>
            <textarea
              placeholder="e.g. Be prepared for a technical round."
              rows={2}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all font-medium text-slate-700 text-sm resize-none"
            />
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-4 rounded-2xl border border-slate-200 text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] hover:bg-slate-50 transition-all active:scale-95"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-[2] px-6 py-4 rounded-2xl bg-slate-900 text-white text-[11px] font-black uppercase tracking-[0.2em] hover:bg-teal-600 transition-all active:scale-95 shadow-xl shadow-slate-900/10 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Schedule Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleInterviewModal;
