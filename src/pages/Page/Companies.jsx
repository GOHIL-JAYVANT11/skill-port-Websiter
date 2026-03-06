import React, { useContext } from 'react';
import UserLayout from '../../Components/Layout/UserLayout';
import RecruiterNavbar from '../../Components/Recuiters-Home/RecruiterNavbar';
import CompanyFilterSidebar from '../../Components/Companies/CompanyFilterSidebar';
import CompaniesListing from '../../Components/Companies/CompaniesListing';
import Footer from '../../Components/Home/Footer';
import { AuthContext } from '../../Context/AuthContext';

const Companies = () => {
  const { user } = useContext(AuthContext);
  const isRecruiter = user?.role?.toLowerCase() === 'recruiter' || user?.Role?.[0]?.toLowerCase() === 'recruiter';

  if (isRecruiter) {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <RecruiterNavbar onMenuToggle={() => {}} />
        <main className="pt-24 pb-12 max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="hidden lg:block lg:w-[320px] shrink-0">
              <CompanyFilterSidebar />
            </aside>
            <div className="flex-1">
              <CompaniesListing />
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
        {/* Left Filter Sidebar */}
        <aside className="hidden lg:block lg:w-[320px] shrink-0">
          <CompanyFilterSidebar />
        </aside>

        {/* Main Content: Companies Grid */}
        <div className="flex-1">
          <CompaniesListing />
        </div>
      </div>
    </UserLayout>
  );
};

export default Companies;
