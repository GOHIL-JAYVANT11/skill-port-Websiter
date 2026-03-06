import React, { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import RecruiterNavbar from '../../Components/Recuiters-Home/RecruiterNavbar';
import RecruiterSidebar from '../../Components/Recuiters-Home/RecruiterSidebar';
import RecruiterProfileCompletionCard from '../../Components/Recuiters-Home/RecruiterProfileCompletionCard';
import HiringOverviewCard from '../../Components/Recuiters-Home/HiringOverviewCard';
import CandidateMatches from '../../Components/Recuiters-Home/CandidateMatches';
import RecentApplications from '../../Components/Recuiters-Home/RecentApplications';
import UpcomingInterviews from '../../Components/Recuiters-Home/UpcomingInterviews';
import HiringAnalytics from '../../Components/Recuiters-Home/HiringAnalytics';
import RecruiterRightPanel from '../../Components/Recuiters-Home/RecruiterRightPanel';

const RecuitersHomePage = () => {
  const { user, loading, fetchProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isMounted = useRef(false);

  useEffect(() => {
    // Always fetch profile on mount to ensure we have full/fresh data
    if (!isMounted.current) {
      fetchProfile();
      isMounted.current = true;
    }
  }, [fetchProfile]);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/login');
      } else {
        const role = user.role || user.Role || '';
        const roleStr = (Array.isArray(role) ? role[0] : role).toLowerCase();
        if (roleStr === 'seeker') {
          navigate('/user-home');
        }
      }
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-teal-100 selection:text-teal-900 overflow-x-hidden">
      {/* Top Navbar */}
      <RecruiterNavbar onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex pt-16 max-w-[1440px] mx-auto px-4 sm:px-6">
        {/* Left Sidebar (Sticky) */}
        <div className="hidden lg:block lg:w-[260px] shrink-0">
          <RecruiterSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 p-3 sm:p-4 md:p-6 xl:pr-0">
          <div className="max-w-[1200px] mx-auto flex flex-col xl:flex-row gap-6 lg:gap-8">
            {/* Central Content */}
            <div className="flex-1 min-w-0 space-y-8 md:space-y-12 pb-10">
              {/* Profile Completion Section */}
              <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <RecruiterProfileCompletionCard />
              </section>

              {/* Hiring Overview Section */}
              <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
                <HiringOverviewCard />
              </section>

              {/* AI Candidate Matches Section */}
              <section id="candidate-matches" className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
                <CandidateMatches />
              </section>

              {/* Recent Applications Section */}
              {/* <section id="recent-applications" className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
                <RecentApplications />
              </section> */}

              {/* Upcoming Interviews Section */}
              {/* <section id="upcoming-interviews" className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-400">
                <UpcomingInterviews />
              </section> */}

              

              {/* Hiring Performance Analytics Section */}
              {/* <section id="hiring-analytics" className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-600">
                <HiringAnalytics />
              </section> */}
            </div>

            {/* Right Utility Panel */}
            <div className="hidden xl:block">
              <RecruiterRightPanel />
            </div>
          </div>
        </main>
      </div>

      

      {/* Mobile Bottom Navigation (Optional but good for UX) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-100 h-16 flex items-center justify-around px-4 z-50">
        <button className="flex flex-col items-center gap-1 text-teal-600">
          <div className="p-1.5 rounded-xl bg-teal-50">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest">Home</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <span className="text-[10px] font-bold uppercase tracking-widest">Talent</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
          <span className="text-[10px] font-bold uppercase tracking-widest">Events</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400">
          <div className="w-6 h-6 rounded-full bg-slate-200 border border-slate-300" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Account</span>
        </button>
      </div>

      {/* CSS for custom components */}
      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .mask-fade-right {
          mask-image: linear-gradient(to right, black 85%, transparent 100%);
        }
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
    </div>
  );
};

export default RecuitersHomePage;
