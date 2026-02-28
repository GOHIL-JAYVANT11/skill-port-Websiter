import React, { useState } from 'react';
import { Camera, MapPin, Briefcase, Phone, Mail, CheckCircle, Edit3, AlertCircle } from 'lucide-react';
import EditProfileModal from './EditProfileModal';

const ProfileHeader = ({ user, completion = 68, onEditClick }) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (completion / 100) * circumference;

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
              {user?.profilePic ? (
                <img 
                  src={user.profilePic.trim().replace(/^`|`$/g, '').trim()} 
                  alt={user.Fullname} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `<span class="text-2xl font-black text-teal-600">${user?.Fullname?.charAt(0) || 'U'}</span>`;
                  }}
                />
              ) : (
                <span className="text-2xl font-black text-teal-600">
                  {user?.Fullname?.charAt(0) || 'U'}
                </span>
              )}
              
              {/* Hover overlay for editing */}
              <button className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity">
                <Camera className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-white px-2 py-0.5 rounded-full shadow-sm border border-slate-100">
            <span className="text-[10px] font-black text-slate-900">{completion}%</span>
          </div>
        </div>

        {/* Center: User Info */}
        <div className="flex-1 space-y-2 text-center lg:text-left">
          <div className="flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-3">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {user?.Fullname || 'User Name'}
            </h1>
            <button 
              onClick={onEditClick}
              className="p-1 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all mx-auto lg:mx-0"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
            <div className="flex items-center gap-2 text-slate-500 justify-center lg:justify-start">
              <MapPin className="w-3.5 h-3.5 text-teal-600" />
              <span className="text-xs font-bold">{user?.location || 'Add location'}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 justify-center lg:justify-start">
              <Phone className="w-3.5 h-3.5 text-teal-600" />
              <span className="text-xs font-bold">{user?.number || 'Add number'}</span>
              <CheckCircle className="w-3 h-3 text-emerald-500 fill-emerald-50" />
            </div>
            <div className="flex items-center gap-2 text-slate-500 justify-center lg:justify-start">
              <Briefcase className="w-3.5 h-3.5 text-teal-600" />
              <span className="text-xs font-bold">{user?.userstatus || 'Add user status'}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 justify-center lg:justify-start">
              <Mail className="w-3.5 h-3.5 text-teal-600" />
              <span className="text-xs font-bold truncate max-w-[150px]">{user?.email || 'Add email'}</span>
              <button className="text-[9px] font-black text-teal-600 hover:underline uppercase tracking-widest">Verify</button>
            </div>
          </div>
        </div>

        {/* Right: Missing Details */}
        <div className="w-full lg:w-64 bg-orange-50/50 rounded-xl p-4 border border-orange-100/50">
          <h3 className="text-[10px] font-black text-orange-800 uppercase tracking-widest mb-3 flex items-center gap-2">
            <AlertCircle className="w-3 h-3" />
            Complete Profile
          </h3>
          <div className="space-y-2">
            {[
              { label: 'Verify email', boost: '+5%' },
              { label: 'Add preferred location', boost: '+2%' },
              { label: 'Add resume', boost: '+10%' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between group/item cursor-pointer">
                <span className="text-[10px] font-bold text-slate-700 group-hover/item:text-teal-700 transition-colors">{item.label}</span>
                <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-1 py-0.5 rounded">{item.boost}</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-[10px] font-black rounded-lg shadow-md shadow-orange-500/10 transition-all active:scale-95 uppercase tracking-widest">
            ADD 12 MISSING DETAILS
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
