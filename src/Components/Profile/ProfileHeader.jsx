import React from 'react';
import { Camera, MapPin, Briefcase, Phone, Mail, CheckCircle, Edit3, AlertCircle } from 'lucide-react';

const ProfileHeader = ({ user, completion = 68 }) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (completion / 100) * circumference;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 relative overflow-hidden group">
      {/* Decorative background gradient */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:scale-110 transition-transform duration-700" />
      
      <div className="flex flex-col lg:flex-row gap-8 items-start relative z-10">
        {/* Left: Progress & Avatar */}
        <div className="relative shrink-0 mx-auto lg:mx-0">
          <svg className="w-32 h-32 transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-slate-100"
            />
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={circumference}
              style={{ strokeDashoffset: offset }}
              strokeLinecap="round"
              className="text-teal-500 transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-slate-50 border-4 border-white shadow-inner flex items-center justify-center overflow-hidden group/avatar">
              <span className="text-3xl font-black text-teal-600">
                {user?.Fullname?.charAt(0) || 'U'}
              </span>
              <button className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity">
                <Camera className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md border border-slate-100">
            <span className="text-xs font-black text-slate-900">{completion}%</span>
          </div>
        </div>

        {/* Center: User Info */}
        <div className="flex-1 space-y-4 text-center lg:text-left">
          <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {user?.Fullname || 'User Name'}
            </h1>
            <button className="p-1.5 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all mx-auto lg:mx-0">
              <Edit3 className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
            <div className="flex items-center gap-2.5 text-slate-500 justify-center lg:justify-start">
              <MapPin className="w-4 h-4 text-teal-600" />
              <span className="text-sm font-bold">{user?.location || 'Add location'}</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-500 justify-center lg:justify-start">
              <Phone className="w-4 h-4 text-teal-600" />
              <span className="text-sm font-bold">{user?.number || 'Add number'}</span>
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500 fill-emerald-50" />
            </div>
            <div className="flex items-center gap-2.5 text-slate-500 justify-center lg:justify-start">
              <Briefcase className="w-4 h-4 text-teal-600" />
              <span className="text-sm font-bold">{user?.experience || 'Fresher'}</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-500 justify-center lg:justify-start">
              <Mail className="w-4 h-4 text-teal-600" />
              <span className="text-sm font-bold truncate max-w-[180px]">{user?.email || 'Add email'}</span>
              <button className="text-[10px] font-black text-teal-600 hover:underline uppercase tracking-widest">Verify</button>
            </div>
          </div>
        </div>

        {/* Right: Missing Details */}
        <div className="w-full lg:w-72 bg-orange-50/50 rounded-2xl p-5 border border-orange-100/50">
          <h3 className="text-xs font-black text-orange-800 uppercase tracking-widest mb-4 flex items-center gap-2">
            <AlertCircle className="w-3.5 h-3.5" />
            Complete Profile
          </h3>
          <div className="space-y-3">
            {[
              { label: 'Verify email', boost: '+5%' },
              { label: 'Add preferred location', boost: '+2%' },
              { label: 'Add resume', boost: '+10%' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between group/item cursor-pointer">
                <span className="text-xs font-bold text-slate-700 group-hover/item:text-teal-700 transition-colors">{item.label}</span>
                <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">{item.boost}</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-5 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-xs font-black rounded-xl shadow-lg shadow-orange-500/20 transition-all active:scale-95 uppercase tracking-widest">
            Add 12 Missing Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
