import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, CreditCard , Bell, MessageSquare, ChevronDown, User, LogOut, Settings, Briefcase, Menu, X, PlusCircle, Building2 } from 'lucide-react';
import logo from '../../assets/Images/SkillPORT_logo.png';
import { AuthContext } from '../../Context/AuthContext';

const RecruiterNavbar = ({ onMenuToggle }) => {
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
            <span className="ml-2 text-[10px] bg-teal-100 text-teal-700 px-1.5 py-0.5 rounded-full font-semibold uppercase tracking-wider">Recruiter</span>
          </span>
        </div>

        {/* Navigation Links & Search Bar Group (Centered on Left) */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 flex-1 max-w-5xl ml-4">
          {/* Recruiter Navigation Links */}
          <div className="flex items-center gap-6 shrink-0">
            <Link to="/recruiter-home" className="text-sm font-bold text-slate-600 hover:text-teal-600 transition-colors">Home</Link>
            <Link to="/manage-jobs" className="text-sm font-bold text-slate-600 hover:text-teal-600 transition-colors">Manage Jobs</Link>
            <Link to="/candidates" className="text-sm font-bold text-slate-600 hover:text-teal-600 transition-colors">Candidates</Link>
            <Link to="/applications" className="text-sm font-bold text-slate-600 hover:text-teal-600 transition-colors">Applications</Link>
          </div>

          {/* Global Candidate Search Bar */}
          <div className="flex items-center bg-slate-100 rounded-full px-4 py-2 w-full max-w-[400px] border border-transparent focus-within:border-teal-500 focus-within:bg-white transition-all ml-4">
            <Search className="text-slate-400 w-4 h-4 mr-2 shrink-0" />
            <input 
              type="text" 
              placeholder="Search candidates by skills, experience, or location..." 
              className="bg-transparent border-none outline-none text-sm w-full text-slate-700 placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Post Job Button (Primary CTA) */}
        <Link 
          to="/recruiter/post-job"
          className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-[#14B8A6] to-[#0F766E] hover:from-[#0F766E] hover:to-[#14B8A6] text-white px-3.5 py-1.5 rounded-full text-[13px] font-bold transition-all shadow-md hover:shadow-lg hover:shadow-teal-500/20 active:scale-95 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <PlusCircle className="w-3.5 h-3.5 transition-transform group-hover:rotate-90 relative z-10" />
          <span className="relative z-10">Post Job</span>
        </Link>

        {/* Icons */}
        <div className="flex items-center gap-1 md:gap-2 border-l border-slate-200 pl-2 md:pl-4 ml-2">
          <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          </button>
          <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative">
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
              {user?.companyLogo ? (
                <img 
                  src={user.companyLogo.trim().replace(/^`|`$/g, '')} 
                  alt={user?.companyName || 'Recruiter'} 
                  className="w-full h-full object-cover" 
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = (user?.companyName || user?.Fullname || 'JD').split(' ').map(n => n[0]).join('').toUpperCase();
                  }}
                />
              ) : (
                (user?.companyName || user?.Fullname || 'JD').split(' ').map(n => n[0]).join('').toUpperCase()
              )}
            </div>
            <div className="hidden lg:block">
              <p className="text-xs font-bold text-slate-900 truncate max-w-[120px]">
                {user?.companyName || user?.Fullname || 'Recruiter'}
              </p>
              <div className="flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                <Building2 className="w-2.5 h-2.5" />
                <span>Company Admin</span>
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
          </div>

          {/* Dropdown Menu */}
          {isProfileOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)} />
              <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-20 animate-in fade-in zoom-in-95 duration-200">
                <div className="px-4 py-2 border-b border-slate-100 mb-1">
                  <p className="text-sm font-bold text-slate-900">{user?.Fullname || 'Recruiter Name'}</p>
                  <p className="text-[11px] text-slate-500 truncate">{user?.email || 'recruiter@company.com'}</p>
                </div>
                <Link
                  to="/recruiter/profile"
                  className="w-full px-4 py-2 flex items-center gap-3 text-sm text-slate-600 hover:bg-slate-50 hover:text-teal-600 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>Company Profile</span>
                </Link>
                
                <button className="w-full px-4 py-2 flex items-center gap-3 text-sm text-slate-600 hover:bg-slate-50 hover:text-teal-600 transition-colors">
                  <CreditCard className="w-4 h-4" />
                  <span>Billing & Subscription</span>
                </button>
                <div className="h-px bg-slate-100 my-1 mx-2" />
                <button 
                  onClick={handleLogout}
                  className="w-full px-4 py-2 flex items-center gap-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default RecruiterNavbar;
