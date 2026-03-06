import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Briefcase, Calendar, Home, User, Menu } from 'lucide-react';
import UserNavbar from '../UserHomePage/UserNavbar';
import UserSidebar from '../UserHomePage/UserSidebar';
import Footer from '../Home/Footer';

const UserLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/user-home' },
    { icon: Briefcase, label: 'Jobs', path: '/jobs' },
    { icon: Calendar, label: 'Companies', path: '/companies' }, // Assuming Events/Companies map similarly for now or adjust icon
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans overflow-x-hidden flex flex-col">
      {/* Top Navbar */}
      <UserNavbar onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex flex-1 pt-16 max-w-[1440px] mx-auto px-4 sm:px-6 w-full">
        {/* Mobile Sidebar Overlay */}
        <div 
          className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
          onClick={() => setIsSidebarOpen(false)}
        />
        
        {/* Left Sidebar (Sticky) */}
        <div className={`
          fixed inset-y-0 left-0 z-50 w-[260px] bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:shadow-none lg:z-auto lg:block shrink-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <UserSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 p-3 sm:p-4 md:p-6 xl:pr-0 min-w-0">
          {children}
        </main>
      </div>

      <Footer />

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 h-16 flex items-center justify-around px-4 z-50">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`flex flex-col items-center gap-1 ${isActive ? 'text-teal-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              {isActive ? (
                <div className="p-1.5 rounded-xl bg-teal-50">
                  <item.icon className="w-5 h-5" fill="currentColor" />
                </div>
              ) : (
                <item.icon className="w-5 h-5" />
              )}
              <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Global CSS for scrollbars */}
      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .mask-fade-right { mask-image: linear-gradient(to right, black 85%, transparent 100%); }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #CBD5E1; }
      `}} />
    </div>
  );
};

export default UserLayout;
