import React from 'react';
import JobsHeader from '../../Components/Jobs/JobsHeader';
import JobFilterSidebar from '../../Components/Jobs/JobFilterSidebar';
import JobsListing from '../../Components/Jobs/JobsListing';
import Footer from '../../Components/Home/Footer';

const Jobs = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <JobsHeader onMenuToggle={() => {}} />
      
      <main className="pt-24 pb-12 max-w-[1280px] mx-auto px-4 sm:px-6">
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
      </main>

      <Footer />
    </div>
  );
};

export default Jobs;
