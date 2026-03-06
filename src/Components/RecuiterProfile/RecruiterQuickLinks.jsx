import React, { useContext } from 'react';
import { 
  Building2, 
  User, 
  Sparkles, 
  ShieldCheck, 
  Lock, 
  Target, 
  Globe 
} from 'lucide-react';
import { AuthContext } from '../../Context/AuthContext';

const RecruiterQuickLinks = ({ user: propUser }) => {
  const { user: contextUser } = useContext(AuthContext);
  const user = propUser || contextUser;

  const links = [
    { label: 'Company Information', icon: Building2, status: user?.companyName ? 'Edit' : 'Add', id: 'company' },
    { label: 'Personal Information', icon: User, status: user?.Fullname ? 'Edit' : 'Add', id: 'personal' },
    { label: 'Company Branding', icon: Sparkles, status: user?.companyLogo ? 'Edit' : 'Add', id: 'branding' },
    { label: 'Verification', icon: ShieldCheck, status: 'Pending', id: 'verification' },
    // { label: 'Hiring Preferences', icon: Target, status: 'Edit', id: 'hiring' },
    // { label: 'Account & Security', icon: Lock, status: 'Manage', id: 'account' },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 sticky top-24">
      <h3 className="text-lg font-black text-slate-900 mb-6 px-2 tracking-tight">Quick links</h3>
      <div className="space-y-1">
        {links.map((link, idx) => (
          <button 
            key={idx}
            onClick={() => scrollToSection(link.id)}
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

export default RecruiterQuickLinks;
