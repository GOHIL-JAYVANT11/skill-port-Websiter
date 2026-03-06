import React from 'react';
import { Camera, MapPin, Building2, Phone, Mail, CheckCircle, Edit3, ShieldCheck, Briefcase } from 'lucide-react';

const RecruiterProfileHeader = ({ user, completion = 65, onEditClick }) => {
  return (
    <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-sm border border-slate-100 relative overflow-hidden group">
      {/* Decorative background gradient */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:scale-110 transition-transform duration-700" />
      
      <div className="flex flex-col lg:flex-row gap-6 items-center relative z-10">
        {/* Left: Progress & Avatar */}
        <div className="relative shrink-0 mx-auto lg:mx-0">
          <svg className="w-24 h-24 transform -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="currentColor"
              strokeWidth="6"
              fill="transparent"
              className="text-slate-100"
            />
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="currentColor"
              strokeWidth="6"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 40}
              style={{ strokeDashoffset: (2 * Math.PI * 40) - (completion / 100) * (2 * Math.PI * 40) }}
              strokeLinecap="round"
              className="text-teal-500 transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-18 h-18 rounded-full bg-slate-50 border-4 border-white shadow-inner flex items-center justify-center overflow-hidden group/avatar relative">
              {user?.companyLogo ? (
                <img 
                  src={user.companyLogo.trim().replace(/^`|`$/g, '').trim()} 
                  alt={user.companyName || 'Recruiter'} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `<span class="text-2xl font-black text-teal-600">${user?.companyName?.charAt(0) || 'C'}</span>`;
                  }}
                />
              ) : (
                <span className="text-2xl font-black text-teal-600">
                  {user?.companyName?.charAt(0) || 'C'}
                </span>
              )}
              
              {/* Hover overlay for editing */}
              <button className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity">
                <Camera className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-white px-2 py-0.5 rounded-full shadow-sm border border-slate-100 flex items-center gap-1">
            <span className="text-[10px] font-black text-slate-900">{completion}%</span>
          </div>
        </div>

        {/* Center: Recruiter Info */}
        <div className="flex-1 space-y-2 text-center lg:text-left">
          <div className="flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-3">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {user?.Fullname || 'Recruiter Name'}
            </h1>
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-lg flex items-center gap-1 border border-emerald-100">
                <ShieldCheck size={12} /> VERIFIED RECRUITER
              </span>
              <button 
                onClick={onEditClick}
                className="p-1 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
            <div className="flex items-center gap-2 text-slate-500 justify-center lg:justify-start">
              <Building2 className="w-3.5 h-3.5 text-teal-600" />
              <span className="text-xs font-bold">{user?.companyName || 'Company Name'}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 justify-center lg:justify-start">
              <Briefcase className="w-3.5 h-3.5 text-teal-600" />
              <span className="text-xs font-bold">{user?.designation || 'Designation'}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 justify-center lg:justify-start">
              <MapPin className="w-3.5 h-3.5 text-teal-600" />
              <span className="text-xs font-bold">{user?.companyLocation || 'Add Location'}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 justify-center lg:justify-start">
              <Mail className="w-3.5 h-3.5 text-teal-600" />
              <span className="text-xs font-bold">{user?.email || 'Add email'}</span>
              <CheckCircle className="w-3 h-3 text-emerald-500 fill-emerald-50" />
            </div>
          </div>
        </div>

        {/* Right: CTA */}
        <div className="shrink-0 flex flex-col items-center lg:items-end gap-3 w-full lg:w-auto mt-4 lg:mt-0 p-4 bg-orange-50 rounded-2xl border border-orange-100">
          <div className="text-center lg:text-right">
            <p className="text-[10px] font-black text-orange-600 uppercase tracking-wider mb-1">Complete Profile</p>
            <div className="space-y-1">
              <div className="flex items-center justify-between lg:justify-end gap-2 text-[10px] text-orange-800 font-bold">
                <span>Add Company Logo</span>
                <span className="text-orange-600">+10%</span>
              </div>
              <div className="flex items-center justify-between lg:justify-end gap-2 text-[10px] text-orange-800 font-bold">
                <span>Verify Email</span>
                <span className="text-emerald-600">Done</span>
              </div>
              <div className="flex items-center justify-between lg:justify-end gap-2 text-[10px] text-orange-800 font-bold">
                <span>Add Description</span>
                <span className="text-orange-600">+10%</span>
              </div>
            </div>
          </div>
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white text-xs font-black py-2 px-4 rounded-xl transition-all shadow-sm shadow-orange-200">
            ADD 12 MISSING DETAILS
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecruiterProfileHeader;
