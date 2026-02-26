import React from 'react';
import JobsHeader from '../../Components/Jobs/JobsHeader';
import CompanyFilterSidebar from '../../Components/Companies/CompanyFilterSidebar';
import CompaniesListing from '../../Components/Companies/CompaniesListing';
import Footer from '../../Components/Home/Footer';

const Companies = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <JobsHeader onMenuToggle={() => {}} />
      
      <main className="pt-24 pb-12 max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Filter Sidebar */}
          <aside className="hidden lg:block lg:w-[320px] shrink-0">
            <CompanyFilterSidebar />
          </aside>

          {/* Main Content: Companies Grid */}
          <div className="flex-1">
            <CompaniesListing />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Companies;
