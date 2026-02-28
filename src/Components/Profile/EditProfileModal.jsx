import React, { useState, useEffect } from 'react';
import { X, Check, ChevronDown } from 'lucide-react';
import { SKILLS_LIST } from '../../utils/constants';

const EditProfileModal = ({ isOpen, onClose, user, onSave }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSkillDropdownOpen, setIsSkillDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({
    Fullname: '',
    email: '',
    number: '',
    userstatus: '',
    location: '',
    resumeHeadline: '',
    skill: [],
    userimage: '',
    resume: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        Fullname: user.Fullname || '',
        email: user.email || '',
        number: user.number || '',
        userstatus: user.userstatus || 'active',
        location: user.location || '',
        resumeHeadline: user.resumeHeadline || '',
        skill: Array.isArray(user.skill) ? user.skill : [],
        userimage: user.userimage || '',
        resume: user.resume || ''
      });
    }
  }, [user, isOpen]);

  if (!isOpen) return null;

  const toggleSkill = (skill) => {
    setFormData(prev => {
      const skills = prev.skill.includes(skill)
        ? prev.skill.filter(s => s !== skill)
        : [...prev.skill, skill];
      return { ...prev, skill: skills };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const success = await onSave(formData);
    if (success) {
      onClose();
    }
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-xl font-black text-slate-900">Basic details</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Name */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Name <span className="text-rose-500">*</span></label>
            <input
              type="text"
              required
              value={formData.Fullname}
              onChange={(e) => setFormData({ ...formData, Fullname: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-medium"
              placeholder="Enter your name"
            />
          </div>

          {/* Work Status */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-700 block">Work status</label>
            <p className="text-xs text-slate-500">We will personalise your SkillPORT experience based on this</p>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="userstatus"
                  value="fresher"
                  checked={formData.userstatus === 'fresher'}
                  onChange={(e) => setFormData({ ...formData, userstatus: e.target.value })}
                  className="w-4 h-4 text-teal-600 border-slate-300 focus:ring-teal-500 cursor-pointer"
                />
                <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">Fresher</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="userstatus"
                  value="experienced"
                  checked={formData.userstatus === 'experienced'}
                  onChange={(e) => setFormData({ ...formData, userstatus: e.target.value })}
                  className="w-4 h-4 text-teal-600 border-slate-300 focus:ring-teal-500 cursor-pointer"
                />
                <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">Experienced</span>
              </label>
            </div>
          </div>

          {/* Current Location */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Current location <span className="text-rose-500">*</span></label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-medium"
              placeholder="Enter your location (e.g. New York)"
            />
          </div>

          {/* Resume Headline */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Resume Headline</label>
            <input
              type="text"
              value={formData.resumeHeadline}
              onChange={(e) => setFormData({ ...formData, resumeHeadline: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-medium"
              placeholder="e.g. Senior Full Stack Developer"
            />
          </div>

          {/* Skills */}
          <div className="space-y-2 relative">
            <label className="text-sm font-bold text-slate-700">Key Skills</label>
            <div 
              onClick={() => setIsSkillDropdownOpen(!isSkillDropdownOpen)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-500 hover:border-slate-300 transition-all cursor-pointer flex flex-wrap gap-2 items-center min-h-[50px] bg-white"
            >
              {formData.skill.length > 0 ? (
                formData.skill.map(skill => (
                  <span key={skill} className="bg-teal-50 text-teal-700 px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 group">
                    {skill}
                    <X 
                      className="w-3 h-3 cursor-pointer hover:text-teal-900" 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSkill(skill);
                      }}
                    />
                  </span>
                ))
              ) : (
                <span className="text-slate-400 text-sm">Select your skills</span>
              )}
              <ChevronDown className={`w-4 h-4 text-slate-400 ml-auto transition-transform ${isSkillDropdownOpen ? 'rotate-180' : ''}`} />
            </div>

            {isSkillDropdownOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsSkillDropdownOpen(false)}></div>
                <div className="absolute z-20 top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 max-h-60 overflow-y-auto p-2 animate-in fade-in slide-in-from-top-2">
                  <div className="grid grid-cols-1 gap-1">
                    {SKILLS_LIST.map(skill => (
                      <div 
                        key={skill}
                        onClick={() => toggleSkill(skill)}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer transition-colors ${
                          formData.skill.includes(skill) ? 'bg-teal-50 text-teal-700' : 'hover:bg-slate-50 text-slate-600'
                        }`}
                      >
                        <span className="text-sm font-medium">{skill}</span>
                        {formData.skill.includes(skill) && <Check className="w-4 h-4" />}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Mobile Number */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Mobile number <span className="text-rose-500">*</span></label>
            <input
              type="tel"
              required
              value={formData.number}
              onChange={(e) => setFormData({ ...formData, number: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-medium"
              placeholder="Enter your mobile number"
            />
          </div>

          {/* Email Address */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Email address <span className="text-rose-500">*</span></label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-medium"
              placeholder="Enter your email address"
            />
          </div>

          <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-2.5 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white text-sm font-black rounded-full shadow-lg shadow-teal-500/20 transition-all active:scale-95"
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;