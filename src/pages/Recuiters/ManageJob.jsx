import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import RecruiterNavbar from '../../Components/Recuiters-Home/RecruiterNavbar';
import RecruiterSidebar from '../../Components/Recuiters-Home/RecruiterSidebar';
import JobStatsSummary from '../../Components/ManageJob/JobStatsSummary';
import RecruiterJobFilterSidebar from '../../Components/ManageJob/RecruiterJobFilterSidebar';
import RecruiterJobsListing from '../../Components/ManageJob/RecruiterJobsListing';
import Footer from '../../Components/Home/Footer';
import { PlusCircle, ChevronRight, Sparkles } from 'lucide-react';

const ManageJob = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Role Protection
  if (!loading && user) {
    const role = user.role || user.Role || '';
    const roleStr = (Array.isArray(role) ? role[0] : role).toLowerCase();
    if (roleStr !== 'recruiter') {
      navigate('/user-home');
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-teal-100 selection:text-teal-900 overflow-x-hidden">
      {/* Top Navbar */}
      <RecruiterNavbar onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex pt-16 max-w-[1440px] mx-auto px-4 sm:px-6">
        {/* Left Sidebar (Filters replacing Navigation Sidebar) */}
        <aside className="hidden lg:block lg:w-[280px] shrink-0">
          <RecruiterJobFilterSidebar />
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 p-3 sm:p-4 md:p-6 xl:pr-0">
          <div className="max-w-[1200px] mx-auto">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <Sparkles className="w-5 h-5 text-teal-600" />
                  <span className="text-[10px] font-black text-teal-600 uppercase tracking-[0.2em]">Management Portal</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tighter leading-none">
                  Manage <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-400">Job Listings</span>
                </h1>
                <p className="text-slate-500 text-sm mt-2 font-medium tracking-tight">Track, edit, and optimize your job posts with AI-powered candidate matching.</p>
              </div>
            </div>

            {/* Main Content Layout: Listing only since sidebar is moved */}
            <div className="flex flex-col xl:flex-row gap-8">
              {/* Jobs Listing Area */}
              <div className="flex-1 min-w-0 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                <RecruiterJobsListing />
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-100 h-16 flex items-center justify-around px-4 z-50 shadow-2xl">
        <button className="flex flex-col items-center gap-1 text-teal-600">
          <div className="p-1.5 rounded-xl bg-teal-50">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest">Jobs</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400">
          <PlusCircle className="w-5 h-5" />
          <span className="text-[10px] font-black uppercase tracking-widest">Post</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400">
          <div className="w-6 h-6 rounded-full bg-slate-200 border border-slate-300" />
          <span className="text-[10px] font-black uppercase tracking-widest">Account</span>
        </button>
      </div>
    </div>
  );
};

export default ManageJob;
