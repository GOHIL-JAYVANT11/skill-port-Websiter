import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, MessageSquare, ChevronDown, User, LogOut, Settings, Briefcase, Menu, X, CreditCard } from 'lucide-react';
import logo from '../../assets/Images/SkillPORT_logo.png';
import { AuthContext } from '../../Context/AuthContext';

const UserNavbar = ({ onMenuToggle }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 h-16 px-4 flex items-center justify-between">
      <div className="flex items-center flex-1">
        {/* Mobile Menu Toggle */}
        <button 
          className="p-2 lg:hidden text-slate-500 hover:bg-slate-100 rounded-lg transition-colors mr-2"
          onClick={onMenuToggle}
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2 mr-8 lg:mr-12 shrink-0">
          <img src={logo} alt="SkillPORT" className="h-10 w-auto" />
          <span className="text-xl font-bold text-slate-900 hidden sm:block">
            Skill<span className="text-teal-600">PORT</span>
          </span>
        </div>

        {/* Navigation Links & Search Bar Group (Centered on Left) */}
        <div className="hidden md:flex items-center gap-8 flex-1 max-w-4xl">
          <div className="flex items-center gap-6">
            <Link to="/user-home" className="text-sm font-semibold text-slate-600 hover:text-teal-600 transition-colors whitespace-nowrap">Home</Link>
            <Link to="/jobs" className="text-sm font-semibold text-slate-600 hover:text-teal-600 transition-colors whitespace-nowrap">Jobs</Link>
            <Link to="/companies" className="text-sm font-semibold text-slate-600 hover:text-teal-600 transition-colors whitespace-nowrap">Companies</Link>
            <Link to="/freelance" className="text-sm font-semibold text-slate-600 hover:text-teal-600 transition-colors whitespace-nowrap">Freelancing</Link>
          </div>

          {/* Global Search Bar */}
          <div className="flex items-center bg-slate-100 rounded-full px-4 py-2 w-full max-w-[400px] border border-transparent focus-within:border-teal-500 focus-within:bg-white transition-all ml-4">
            <Search className="text-slate-400 w-4 h-4 mr-2 shrink-0" />
            <input 
              type="text" 
              placeholder="Search jobs, skills, or companies..." 
              className="bg-transparent border-none outline-none text-sm w-full text-slate-700 placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 md:gap-4">
        {/* Mobile Search Icon */}
        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors sm:hidden">
          <Search className="w-5 h-5" />
        </button>

        {/* Open to Work Toggle */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-xs font-medium text-emerald-700 whitespace-nowrap">Open to Work</span>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-1 md:gap-2">
          <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          </button>
          <button className="hidden sm:flex p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative">
            <MessageSquare className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-teal-500 rounded-full border-2 border-white" />
          </button>
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <div 
            className="flex items-center gap-1.5 md:gap-3 pl-2 border-l border-slate-200 cursor-pointer group"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <div className="w-7 h-7 md:w-9 md:h-9 rounded-full bg-gradient-to-tr from-teal-500 to-teal-700 flex items-center justify-center text-white font-bold text-[10px] md:text-sm shadow-sm border-2 border-white overflow-hidden">
              {user?.profilePic ? (
                <img 
                  src={user.profilePic.trim().replace(/^`|`$/g, '')} 
                  alt={user.Fullname} 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = user?.Fullname?.split(' ').map(n => n[0]).join('') || 'JD';
                  }}
                />
              ) : (
                user?.Fullname?.split(' ').map(n => n[0]).join('') || 'JD'
              )}
            </div>
            <div className="hidden md:block">
              <p className="text-[11px] md:text-sm font-semibold text-slate-800 leading-none">
                {user?.Fullname || 'User'}
              </p>
              <p className="text-[9px] md:text-[10px] text-slate-500 font-medium uppercase mt-1">
                {user?.Role && user.Role.length > 0 ? user.Role[0] : 'Job Seeker'}
              </p>
            </div>
            <ChevronDown className={`w-3 h-3 md:w-4 md:h-4 text-slate-400 group-hover:text-slate-600 transition-all ${isProfileOpen ? 'rotate-180' : ''}`} />
          </div>

          {/* Dropdown Menu */}
          {isProfileOpen && (
            <>
              {/* Backdrop to close dropdown */}
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setIsProfileOpen(false)}
              ></div>
              
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-3 border-b border-slate-50">
                  <p className="text-sm font-bold text-slate-900">{user?.Fullname || 'User'}</p>
                  <p className="text-xs text-slate-500 truncate">{user?.email || ''}</p>
                </div>
                
                <div className="py-1">
                  <Link 
                    to="/profile" 
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-teal-600 transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    <span className="font-medium">View & Update Profile</span>
                  </Link>
                  <Link 
                    to="/job-postings" 
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-teal-600 transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <Briefcase className="w-4 h-4" />
                    <span className="font-medium">Job Postings Account</span>
                  </Link>
                  <Link 
                    to="/settings" 
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-teal-600 transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <Settings className="w-4 h-4" />
                    <span className="font-medium">Settings</span>
                  </Link>
                </div>
                
                <div className="mt-1 pt-1 border-t border-slate-50">
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
