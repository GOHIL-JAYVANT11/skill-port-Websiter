import React from 'react';
import { 
  FileText, 
  Type, 
  Zap, 
  GraduationCap, 
  Monitor, 
  Briefcase, 
  User, 
  Award, 
  Target, 
  Heart 
} from 'lucide-react';

const QuickLinks = () => {
  const links = [
    { label: 'Resume', icon: FileText, status: 'Upload' },
    { label: 'Resume headline', icon: Type, status: 'Add' },
    { label: 'Key skills', icon: Zap, status: 'Add' },
    { label: 'Education', icon: GraduationCap, status: 'Add' },
    { label: 'IT skills', icon: Monitor, status: 'Add' },
    { label: 'Projects', icon: Briefcase, status: 'Add' },
    { label: 'Accomplishments', icon: Award, status: 'Add' },
    { label: 'Career profile', icon: Target, status: 'Add' },
    { label: 'Personal details', icon: Heart, status: 'Add' },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 sticky top-24">
      <h3 className="text-lg font-black text-slate-900 mb-6 px-2 tracking-tight">Quick links</h3>
      <div className="space-y-1">
        {links.map((link, idx) => (
          <button 
            key={idx}
            className="w-full flex items-center justify-between px-3 py-3 rounded-xl hover:bg-slate-50 transition-all group"
          >
            <div className="flex items-center gap-3">
              <link.icon className="w-4 h-4 text-slate-400 group-hover:text-teal-600 transition-colors" />
              <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors tracking-tight">
                {link.label}
              </span>
            </div>
            <span className="text-[10px] font-black text-teal-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
              {link.status}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickLinks;
