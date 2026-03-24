import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  PlusCircle,
  Briefcase,
  Users,
  Sparkles,
  FileText,
  CheckCircle2,
  ClipboardList,
  CalendarClock,
  FolderKanban,
  Building2,
  Settings,
  LogOut,DollarSign 
} from "lucide-react";
import { AuthContext } from '../../Context/AuthContext';

const RecruiterSidebar = ({ isOpen, onClose }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/recruiter-home', color: 'text-teal-600' },
    { icon: Briefcase, label: 'Manage Jobs', path: '/manage-jobs', color: 'text-blue-500' },
    { icon: Users, label: 'Candidates', path: '/candidates', color: 'text-purple-500' },
    { icon: Sparkles, label: 'Skill Matches', path: '/skill-matches', color: 'text-amber-500' },
    { icon: PlusCircle, label: 'Freelancing Post', path: '/recruiter/post-freelance', color: 'text-emerald-500' },
    { icon: FolderKanban, label: 'Manage Freelancing Post', path: '/recruiter/manage-freelance', color: 'text-indigo-500' },
    { icon: FileText, label: 'Proposals', path: '/proposals', color: 'text-sky-500' },
    { icon: CheckCircle2, label: 'Shortlisted Proposals', path: '/shortlisted-proposals', color: 'text-green-500' },
    { icon: ClipboardList, label: 'Applications', path: '/applications', color: 'text-orange-500' },
    { icon: CalendarClock, label: 'Recuiter Interviews', path: '/recruiter-interviews', color: 'text-pink-500' },
    { icon: DollarSign, label: 'Billing & Payments', path: '/recruiter/billing', color: 'text-emerald-600' },
    { icon: Building2, label: 'Company Profile', path: '/recruiter/profile', color: 'text-cyan-500' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky lg:top-24 lg:h-[calc(100vh-120px)] lg:rounded-2xl lg:border lg:border-slate-100 lg:shadow-sm
        left-0 top-16 bottom-0 w-64 bg-white p-4 overflow-y-auto z-40 custom-scrollbar transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>

        {/* Menu */}
        <div className="space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
                ${isActive 
                  ? 'bg-gradient-to-r from-teal-50 to-emerald-50 border-l-4 border-teal-600 shadow-md scale-[1.02]' 
                  : 'hover:bg-slate-50 border-l-4 border-transparent hover:border-teal-300'}
              `}
              onClick={() => {
                if (window.innerWidth < 1024) onClose();
              }}
            >
              {/* ICON */}
              <item.icon 
                className={`
                  w-5 h-5 transition-all duration-300 
                  ${item.color}
                  group-hover:scale-110
                `}
              />

              {/* TEXT */}
              <span className={`
                text-sm font-medium transition-all duration-200
                group-hover:translate-x-1
              `}>
                {item.label}
              </span>
            </NavLink>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-slate-100 space-y-1">

          <NavLink
            to="/settings"
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
              ${isActive 
                ? 'bg-teal-50 text-teal-700 border-l-4 border-teal-600 shadow-sm' 
                : 'hover:bg-slate-50 border-l-4 border-transparent'}
            `}
          >
            <Settings className="w-5 h-5 text-gray-600 group-hover:text-teal-600" />
            <span className="text-sm font-medium">Settings</span>
          </NavLink>

          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Logout</span>
          </button>

        </div>
      </aside>

      {/* Scrollbar */}
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #CBD5E1;
          border-radius: 10px;
        }
      `}} />
    </>
  );
};

export default RecruiterSidebar;