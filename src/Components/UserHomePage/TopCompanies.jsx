import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Building2 } from 'lucide-react';
import CompanyCard from '../Companies/CompanyCard';
import { RecuitersContext } from '../../Context/RecuitersContext';

const TopCompanies = () => {
  const { companies: allCompanies, loading, fetchCompanies } = useContext(RecuitersContext);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  if (loading) {
    return <div className="py-10 text-center text-xs text-slate-400">Loading top companies...</div>;
  }

  const companies = allCompanies.slice(0, 6);

  if (companies.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-slate-100 rounded-lg">
            <Building2 className="w-4 h-4 text-slate-600" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Top Companies <span className="text-slate-400 font-medium">Hiring Now</span></h3>
        </div>
        <button className="text-xs font-bold text-slate-500 hover:text-teal-600 transition-colors flex items-center gap-1 group">
          <Link to="/companies" className="flex items-center gap-1">
            View All <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {companies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>
    </div>
  );
};

export default TopCompanies;
