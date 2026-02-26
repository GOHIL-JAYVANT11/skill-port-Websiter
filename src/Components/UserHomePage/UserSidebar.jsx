import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  Building2, 
  Rocket, 
  FileText, 
  Heart, 
  Calendar, 
  MessageSquare, 
  User, 
  Bell,
  Settings 
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active = false, badge, to = "#" }) => {
  return (
    <Link to={to} className={`
      flex items-center justify-between group cursor-pointer px-4 py-3 rounded-xl transition-all duration-200
      ${active 
        ? 'bg-teal-50 border-l-4 border-teal-600 shadow-sm' 
        : 'hover:bg-slate-50 border-l-4 border-transparent hover:border-teal-200'
      }
    `}>
      <div className="flex items-center gap-3">
        <Icon className={`w-5 h-5 transition-colors ${active ? 'text-teal-600' : 'text-slate-500 group-hover:text-teal-500'}`} />
        <span className={`text-sm font-medium transition-colors ${active ? 'text-teal-700 font-bold' : 'text-slate-600 group-hover:text-slate-900'}`}>
          {label}
        </span>
      </div>
      {badge && (
        <span className="bg-teal-100 text-teal-700 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
          {badge}
        </span>
      )}
    </Link>
  );
};

const UserSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const menuItems = [
    { icon: LayoutDashboard, label: 'My Dashboard', to: '/userhomepage' },
    { icon: FileText, label: 'My Applications', to: '/my-applications' },
    { icon: Heart, label: 'Saved Jobs', to: '/saved-jobs' },
    { icon: Calendar, label: 'Interviews', to: '/interviews' },
    { icon: Bell, label: 'Notifications', to: '/notifications', badge: '3' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        w-64 lg:w-full lg:sticky lg:top-24 lg:h-[calc(100vh-120px)] lg:rounded-2xl lg:border lg:border-slate-100 lg:shadow-sm fixed left-0 top-16 bottom-0 bg-white border-r border-slate-100 p-4 overflow-y-auto z-40 custom-scrollbar transition-transform duration-300 lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="space-y-1 pt-0">
          {menuItems.map((item, index) => (
            <SidebarItem 
              key={index} 
              icon={item.icon} 
              label={item.label} 
              active={location.pathname === item.to} 
              badge={item.badge}
              to={item.to}
            />
          ))}
        </div>
        
        {/* Bottom Card - Premium Upgrade
        <div className="mt-8 p-4 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-lg relative overflow-hidden group">
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-teal-500/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
          <div className="relative z-10">
            <p className="text-white text-sm font-bold mb-1">SkillPORT Gold</p>
            <p className="text-slate-400 text-[10px] mb-3 leading-tight">Get priority application visibility and direct chat with recruiters.</p>
            <button className="w-full bg-teal-500 hover:bg-teal-400 text-white text-[10px] font-bold py-2 rounded-lg transition-colors shadow-sm">
              Upgrade Now
            </button>
          </div>
        </div> */}
      </aside>
    </>
  );
};

export default UserSidebar;
