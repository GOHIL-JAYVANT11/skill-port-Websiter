import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { AuthContext } from '../../Context/AuthContext';
import RecruiterNavbar from '../../Components/Recuiters-Home/RecruiterNavbar';
import RecruiterSidebar from '../../Components/Recuiters-Home/RecruiterSidebar';
import Footer from '../../Components/Home/Footer';
import ApplicationsSummaryCards from '../../Components/RecuitersApplication/ApplicationsSummaryCards';
import ApplicationsFilterBar from '../../Components/RecuitersApplication/ApplicationsFilterBar';
import ApplicationsAIInsights from '../../Components/RecuitersApplication/ApplicationsAIInsights';
import ApplicationsList from '../../Components/RecuitersApplication/ApplicationsList';
import ApplicationsProfileDrawer from '../../Components/RecuitersApplication/ApplicationsProfileDrawer';

const Application = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Role protection – only recruiter
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

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleViewProfile = (application) => {
    setSelectedApplication(application);
    setIsDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-teal-100 selection:text-teal-900 overflow-x-hidden">
      {/* Top Navbar */}
      <RecruiterNavbar onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex pt-16 max-w-[1440px] mx-auto px-4 sm:px-6">
        {/* Left Sidebar */}
        <div className="hidden lg:block lg:w-[260px] shrink-0">
          <RecruiterSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </div>

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-3 sm:p-4 md:p-6 xl:pr-0">
          <div className="max-w-[1200px] mx-auto space-y-6">
            {/* Page Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <Sparkles className="w-5 h-5 text-teal-600" />
                  <span className="text-[10px] font-black text-teal-600 uppercase tracking-[0.25em]">
                    Applications Workspace
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tighter leading-none">
                  Job <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-400">Applications</span>
                </h1>
                <p className="text-slate-500 text-sm mt-2 font-medium tracking-tight">
                  Review, shortlist, and manage candidates who applied to your jobs.
                </p>
              </div>
            </header>

            {/* Summary */}
            <ApplicationsSummaryCards />

            {/* AI Insights */}
            <ApplicationsAIInsights />

            {/* Filters */}
            <ApplicationsFilterBar />

            {/* Applications List */}
            <ApplicationsList onViewProfile={handleViewProfile} />
          </div>
        </main>
      </div>

      <Footer />

      {/* Profile Drawer */}
      <ApplicationsProfileDrawer
        application={selectedApplication}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};

export default Application;
