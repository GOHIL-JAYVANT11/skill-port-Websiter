import React, { useContext } from 'react';
import { User, ChevronRight, FileText, Zap, Briefcase, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

const ProfileCompletionCard = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const completionPercentage = 68;

  const missingDetails = [
    { label: 'Resume missing', boost: '+10%', icon: FileText, color: 'text-rose-500', bg: 'bg-rose-50' },
    { label: 'Skills incomplete', boost: '+8%', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'Experience missing', boost: '+15%', icon: Briefcase, color: 'text-blue-500', bg: 'bg-blue-50' },
  ];

  return (
    <div className="bg-white rounded-2xl   p-4 sm:p-5 shadow-sm border border-slate-100 group relative overflow-hidden max-w-3xl">
      <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/5 rounded-full -mr-24 -mt-24 blur-2xl group-hover:scale-110 transition-transform duration-700" />
      
      <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6 relative z-10">
        {/* Left: Progress Circle */}
        <div className="relative shrink-0">
          <svg className="w-16 h-16 transform -rotate-90">
            <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="3" fill="transparent" className="text-slate-100" />
            <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="3" fill="transparent" strokeDasharray="175.93" strokeDashoffset={175.93 - (175.93 * completionPercentage) / 100} strokeLinecap="round" className="text-teal-500 transition-all duration-1000" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
            {user?.profilePic ? (
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-white shadow-sm bg-slate-100">
                <img 
                  src={user.profilePic.trim().replace(/^`|`$/g, '')} 
                  alt={user.Fullname} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `<span class="text-[10px] font-black text-slate-900">${completionPercentage}%</span>`;
                  }}
                />
              </div>
            ) : (
              <span className="text-sm font-black text-slate-900 leading-none">{completionPercentage}%</span>
            )}
          </div>
        </div>

        {/* Center: Details */}
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-1.5 mb-0.5">
            <Sparkles className="w-3 h-3 text-teal-600" />
            <span className="text-[8px] font-black text-teal-600 uppercase tracking-wider">Profile Strength</span>
          </div>
          <h2 className="text-base font-black text-slate-900 mb-0.5 tracking-tight">Complete Your Profile</h2>
          <p className="text-[11px] text-slate-500 font-medium mb-2">Get better matches with SkillPORT AI.</p>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-1.5">
            {missingDetails.slice(0, 2).map((item, idx) => (
              <div key={idx} className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-50 border border-slate-100 hover:border-teal-200 transition-all cursor-pointer group/item">
                <div className={`p-0.5 rounded ${item.bg} ${item.color}`}>
                  <item.icon className="w-2 h-2" />
                </div>
                <span className="text-[9px] font-bold text-slate-600">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Action */}
        <div className="shrink-0 w-full md:w-auto flex flex-col items-center md:items-end gap-2">
          <button 
            onClick={() => navigate('/profile')}
            className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl font-black text-[10px] hover:bg-slate-800 transition-all active:scale-95 group/btn"
          >
            <Briefcase className="w-3 h-3 text-teal-400 group-hover/btn:scale-110 transition-transform" />
            Complete Profile
            <ChevronRight className="w-3 h-3 text-slate-500" />
          </button>
          <button 
            onClick={() => navigate('/profile')}
            className="text-[9px] font-bold text-teal-600 hover:underline flex items-center gap-0.5"
          >
            Edit Profile <ChevronRight className="w-2 h-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCompletionCard;
