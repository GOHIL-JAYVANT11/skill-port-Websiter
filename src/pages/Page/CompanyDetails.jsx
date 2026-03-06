import React, { useContext, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import UserNavbar from '../../Components/UserHomePage/UserNavbar';
import CompanyDetailsHeader from '../../Components/Companies/CompanyDetailsHeader';
import CompanyDetailsTabs from '../../Components/Companies/CompanyDetailsTabs';
import CompanyDetailsSidebar from '../../Components/Companies/CompanyDetailsSidebar';
import Footer from '../../Components/Home/Footer';
import { RecuitersContext } from '../../Context/RecuitersContext';

const CompanyDetails = () => {
  const { id } = useParams();
  const { companies, loading, fetchCompanies } = useContext(RecuitersContext);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const company = useMemo(() => companies.find(c => String(c.id) === String(id)), [companies, id]);

  if (loading) return null;
  if (!company) return null;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <UserNavbar onMenuToggle={() => {}} />
      
      {/* Company Profile Header */}
      <CompanyDetailsHeader company={company} />

      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left Content (Tabs) */}
          <div className="flex-1 w-full">
            <CompanyDetailsTabs company={company} />
          </div>

          {/* Right Sidebar */}
          <div className="lg:w-[320px] w-full shrink-0">
            <CompanyDetailsSidebar company={company} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CompanyDetails;
