import React, { useContext } from 'react';
import UserLayout from '../../Components/Layout/UserLayout';
import RecruiterNavbar from '../../Components/Recuiters-Home/RecruiterNavbar';
import JobFilterSidebar from '../../Components/Jobs/JobFilterSidebar';
import JobsListing from '../../Components/Jobs/JobsListing';
import Footer from '../../Components/Home/Footer';
import { AuthContext } from '../../Context/AuthContext';

const Jobs = () => {
  const { user } = useContext(AuthContext);
  const userRole = typeof user?.role === 'string' ? user.role : (Array.isArray(user?.role) ? user.role[0] : (user?.Role?.[0] || ''));
  const isRecruiter = String(userRole || '').toLowerCase() === 'recruiter';

  if (isRecruiter) {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <RecruiterNavbar onMenuToggle={() => {}} />
        <main className="pt-24 pb-12 max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="hidden lg:block lg:w-[320px] shrink-0">
              <JobFilterSidebar />
            </aside>
            <div className="flex-1">
              <JobsListing />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <UserLayout>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar (Static Filters) */}
        <aside className="hidden lg:block lg:w-[320px] shrink-0">
          <JobFilterSidebar />
        </aside>

        {/* Right Content (Job Listing) */}
        <div className="flex-1">
          <JobsListing />
        </div>
      </div>
    </UserLayout>
  );
};

export default Jobs;
