import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import JobsHeader from '../../Components/Jobs/JobsHeader';
import CompanyDetailsHeader from '../../Components/Companies/CompanyDetailsHeader';
import CompanyDetailsTabs from '../../Components/Companies/CompanyDetailsTabs';
import CompanyDetailsSidebar from '../../Components/Companies/CompanyDetailsSidebar';
import Footer from '../../Components/Home/Footer';

const CompanyDetails = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data fetching
    const mockCompany = {
      id: id,
      name: 'SkillTech Pvt Ltd',
      industry: 'IT & Software',
      location: 'Ahmedabad, Gujarat',
      rating: 4.5,
      reviewsCount: 120,
      openPositions: 8,
      foundedYear: '2015',
      followersCount: '12.4k',
      logo: '',
      about: 'SkillTech is a skill-driven IT company focused on AI recruitment solutions...'
    };

    setTimeout(() => {
      setCompany(mockCompany);
      setLoading(false);
      window.scrollTo(0, 0);
    }, 300);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <JobsHeader onMenuToggle={() => {}} />
      
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
