import React from 'react';
import UserNavbar from '../../Components/UserHomePage/UserNavbar';
import FreelanceFilterSidebar from '../../Components/Freelancing/FreelanceFilterSidebar';
import FreelancingListing from '../../Components/Freelancing/FreelancingListing';
import Footer from '../../Components/Home/Footer';

const Freelancing = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <UserNavbar onMenuToggle={() => {}} />
      
      <main className="pt-24 pb-12 max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Filter Sidebar */}
          <aside className="hidden lg:block lg:w-[320px] shrink-0">
            <FreelanceFilterSidebar />
          </aside>

          {/* Main Content: Projects List */}
          <div className="flex-1">
            <FreelancingListing />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Freelancing;
