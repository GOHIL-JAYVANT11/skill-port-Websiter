import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Briefcase, 
  Users, 
  Zap, 
  FileText, 
  Calendar, 
  MessageSquare, 
  DollarSign, 
  Building2, 
  Settings, 
  LogOut,
  X
} from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';

const RecruiterSidebar = ({ isOpen, onClose }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/recruiter-home' },
    { icon: Briefcase, label: 'Manage Jobs', path: '/manage-jobs' },
    { icon: Users, label: 'Candidates', path: '/candidates' },
    { icon: Zap, label: 'Skill Matches', path: '/skill-matches' },
    { icon: FileText, label: 'Applications', path: '/applications' },
    // { icon: Calendar, label: 'Interviews', path: '/interviews-list' },
    // { icon: MessageSquare, label: 'Messages', path: '/messages' },
    // { icon: DollarSign, label: 'Payments', path: '/payments' },
    { icon: Building2, label: 'Company Profile', path: '/recruiter/profile' },
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

      {/* Sidebar Container */}
      <aside className={`
        fixed lg:sticky lg:top-24 lg:h-[calc(100vh-120px)] lg:rounded-2xl lg:border lg:border-slate-100 lg:shadow-sm
        left-0 top-16 bottom-0 w-64 bg-white p-4 overflow-y-auto z-40 custom-scrollbar transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Navigation Items */}
        <div className="space-y-1 pt-0">
          {menuItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) => `
                flex items-center justify-between group cursor-pointer px-4 py-3 rounded-xl transition-all duration-200
                ${isActive 
                  ? 'bg-teal-50 border-l-4 border-teal-600 shadow-sm' 
                  : 'hover:bg-slate-50 border-l-4 border-transparent hover:border-teal-200'}
              `}
              onClick={() => {
                if (window.innerWidth < 1024) onClose();
              }}
            >
              <div className="flex items-center gap-3">
                <item.icon className={`w-5 h-5 transition-colors ${item.label === 'Skill Matches' ? 'text-amber-500' : 'text-slate-500 group-hover:text-teal-500'}`} />
                <span className={`text-sm font-medium transition-colors ${item.label === 'Dashboard' ? 'text-teal-700 font-bold' : 'text-slate-600 group-hover:text-slate-900'}`}>
                  {item.label}
                </span>
              </div>
            </NavLink>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t border-slate-100 space-y-1">
          <NavLink
            to="/settings"
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
              ${isActive ? 'bg-teal-50 text-teal-700 font-bold border-l-4 border-teal-600 shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-teal-600 border-l-4 border-transparent'}
            `}
          >
            <Settings className="w-5 h-5" />
            <span className="text-sm">Settings</span>
          </NavLink>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200 border-l-4 border-transparent"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E2E8F0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #CBD5E1;
        }
      `}} />
    </>
  );
};

export default RecruiterSidebar;
