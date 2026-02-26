import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, MessageSquare, ChevronDown, Menu } from 'lucide-react';
import logo from '../../assets/Images/SkillPORT_logo.png';

const JobsHeader = ({ onMenuToggle }) => {
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

        {/* Navigation Links & Search Bar Group */}
        <div className="hidden md:flex items-center gap-8 flex-1 max-w-4xl">
          <div className="flex items-center gap-6">
            <Link to="/userhomepage" className="text-sm font-semibold text-slate-600 hover:text-teal-600 transition-colors whitespace-nowrap">Home</Link>
            <Link to="/jobs" className="text-sm font-semibold text-teal-600 border-b-2 border-teal-600 py-1 transition-colors whitespace-nowrap">Jobs</Link>
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
          <Link to="/notifications" className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative group">
            <Bell className="w-5 h-5 group-hover:text-teal-600 transition-colors" />
            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-[10px] font-bold text-white flex items-center justify-center rounded-full border-2 border-white animate-pulse">
              3
            </span>
          </Link>
          {/* <button className="hidden sm:flex p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative group">
            <MessageSquare className="w-5 h-5 group-hover:text-teal-600 transition-colors" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-teal-500 rounded-full border-2 border-white" />
          </button> */}
        </div>

        {/* Profile Dropdown */}
        <div className="flex items-center gap-1.5 md:gap-3 pl-2 border-l border-slate-200 cursor-pointer group">
          <div className="w-7 h-7 md:w-9 md:h-9 rounded-full bg-gradient-to-tr from-teal-500 to-teal-700 flex items-center justify-center text-white font-bold text-[10px] md:text-sm shadow-sm border-2 border-white">
            JD
          </div>
          <ChevronDown className="w-3 h-3 md:w-4 md:h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
        </div>
      </div>
    </nav>
  );
};

export default JobsHeader;
