import React, { useContext, useEffect } from 'react';
import CompanyCard from './CompanyCard';
import { RecuitersContext } from '../../Context/RecuitersContext';

const CompaniesListing = () => {
  const { companies, loading, error, fetchCompanies } = useContext(RecuitersContext);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full text-center py-12 text-slate-500 font-medium">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Top Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Discover Top Companies</h1>
        <p className="text-sm text-slate-500 font-medium">Connect with industry leaders and find your next career move</p>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {companies.length > 0 ? (
          companies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-slate-400 font-medium">
            No companies found
          </div>
        )}
      </div>
    </div>
  );
};

export default CompaniesListing;
