import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ClipboardList,
  Heart, 
  CalendarClock,
  Bell,
  User,
  LogOut,
  FileText
} from 'lucide-react';
import { AuthContext } from '../../Context/AuthContext';

const SidebarItem = ({ icon: Icon, label, active = false, badge, to = "#", color }) => {
  return (
    <Link to={to} className={`
      flex items-center justify-between group cursor-pointer px-4 py-3 rounded-xl transition-all duration-300
      ${active 
        ? 'bg-gradient-to-r from-teal-50 to-emerald-50 border-l-4 border-teal-600 shadow-md scale-[1.02]' 
        : 'hover:bg-slate-50 border-l-4 border-transparent hover:border-teal-200'
      }
    `}>
      
      <div className="flex items-center gap-3">
        <Icon className={`w-5 h-5 transition-all duration-300 ${color} group-hover:scale-110`} />

        <span className={`
          text-sm font-medium transition-all duration-200
          ${active ? 'text-teal-700 font-bold' : 'text-slate-600 group-hover:text-slate-900'}
          group-hover:translate-x-1
        `}>
          {label}
        </span>
      </div>

      {badge && (
        <span className="bg-teal-100 text-teal-700 text-[10px] px-2 py-0.5 rounded-full font-bold animate-pulse">
          {badge}
        </span>
      )}
    </Link>
  );
};

const UserSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'My Dashboard', to: '/user-home', color: 'text-teal-600' },
    { icon: ClipboardList, label: 'My Applications', to: '/my-applications', color: 'text-blue-500' },
    { icon: FileText, label: 'My Proposals', to: '/my-proposals', color: 'text-indigo-500' },
    { icon: Heart, label: 'Saved Jobs', to: '/saved-jobs', color: 'text-pink-500' },
    { icon: CalendarClock, label: 'Interviews', to: '/interviews', color: 'text-purple-500' },
    { icon: Bell, label: 'Notifications', to: '/notifications', color: 'text-amber-500' },
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
        w-64 lg:w-full lg:sticky lg:top-24 lg:h-[calc(100vh-120px)] 
        lg:rounded-2xl lg:border lg:border-slate-100 lg:shadow-sm
        fixed left-0 top-16 bottom-0 bg-white border-r border-slate-100 
        p-4 overflow-y-auto z-40 custom-scrollbar transition-transform duration-300 lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        
        {/* MENU */}
        <div className="space-y-1">
          {menuItems.map((item, index) => (
            <SidebarItem 
              key={index} 
              icon={item.icon} 
              label={item.label} 
              active={location.pathname === item.to} 
              badge={item.badge}
              to={item.to}
              color={item.color}
            />
          ))}
        </div>

        {/* 🔥 BOTTOM SECTION (NEW) */}
        <div className="mt-8 pt-6 border-t border-slate-100 space-y-1">

          {/* VIEW PROFILE */}
          <Link
            to="/profile"
            className={`
              flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
              ${location.pathname === '/profile'
                ? 'bg-teal-50 text-teal-700 font-bold border-l-4 border-teal-600 shadow-sm'
                : 'text-slate-600 hover:bg-slate-50 hover:text-teal-600 border-l-4 border-transparent'}
            `}
          >
            <User className="w-5 h-5 text-cyan-500" />
            <span className="text-sm font-medium">View Profile</span>
          </Link>

          {/* LOGOUT */}
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Logout</span>
          </button>

        </div>

      </aside>

      {/* SCROLLBAR */}
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

export default UserSidebar;