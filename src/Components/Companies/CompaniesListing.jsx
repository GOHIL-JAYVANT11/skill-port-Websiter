import React from 'react';
import CompanyCard from './CompanyCard';

const CompaniesListing = () => {
  // Mock data for companies
  const companies = [
    {
      id: 1,
      name: 'SkillTech Pvt Ltd',
      industry: 'IT & Software',
      location: 'Ahmedabad',
      rating: 4.5,
      reviewsCount: 120,
      openPositions: 8,
      logo: ''
    },
    {
      id: 2,
      name: 'Innovate Solutions',
      industry: 'Marketing',
      location: 'Pune',
      rating: 4.2,
      reviewsCount: 85,
      openPositions: 5,
      logo: ''
    },
    {
      id: 3,
      name: 'FinNex Global',
      industry: 'Finance',
      location: 'Delhi',
      rating: 4.8,
      reviewsCount: 210,
      openPositions: 12,
      logo: ''
    },
    {
      id: 4,
      name: 'Growth hackers',
      industry: 'Startup',
      location: 'Remote',
      rating: 4.0,
      reviewsCount: 45,
      openPositions: 3,
      logo: ''
    },
    {
      id: 5,
      name: 'EduPath Academy',
      industry: 'EdTech',
      location: 'Ahmedabad',
      rating: 4.3,
      reviewsCount: 95,
      openPositions: 6,
      logo: ''
    },
    {
      id: 6,
      name: 'HealthSync',
      industry: 'Healthcare',
      location: 'Pune',
      rating: 4.6,
      reviewsCount: 150,
      openPositions: 10,
      logo: ''
    }
  ];

  return (
    <div className="w-full">
      {/* Top Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Discover Top Companies</h1>
        <p className="text-sm text-slate-500 font-medium">Connect with industry leaders and find your next career move</p>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {companies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>
    </div>
  );
};

export default CompaniesListing;
