import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserNavbar from '../../Components/UserHomePage/UserNavbar';
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
      rating: 4.8,
      reviews: 124,
      employees: '50-200',
      founded: '2018',
      about: 'SkillTech is a leading software development company based in Ahmedabad, Gujarat. We specialize in building custom web and mobile applications for global clients.',
      logo: '',
      website: 'https://skilltech.com',
      specialties: ['Web Development', 'Mobile App Development', 'UI/UX Design', 'Cloud Computing'],
      currentJobs: [
        { id: 1, title: 'Senior Frontend Developer', location: 'Ahmedabad', type: 'Full-time' },
        { id: 2, title: 'Backend Engineer (Node.js)', location: 'Remote', type: 'Full-time' }
      ]
    };

    setTimeout(() => {
      setCompany(mockCompany);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) return null;

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
