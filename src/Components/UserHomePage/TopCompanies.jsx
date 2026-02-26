import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Briefcase, ExternalLink, ChevronRight, Building2 } from 'lucide-react';

const CompanyCard = ({ company }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm hover:shadow-md hover:border-teal-100 transition-all group flex flex-col items-center text-center">
      <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-2.5 mb-3 group-hover:scale-110 transition-transform shadow-sm group-hover:shadow-md">
        <img src={company.logo} alt={company.name} className="w-full h-full object-contain" />
      </div>
      
      <h4 className="font-bold text-slate-900 group-hover:text-teal-700 transition-colors mb-0.5 text-sm">{company.name}</h4>
      
      <div className="flex items-center gap-1 mb-3">
        <div className="flex items-center gap-0.5 bg-amber-50 text-amber-600 px-1.5 py-0.5 rounded-md border border-amber-100">
          <Star className="w-2.5 h-2.5 fill-current" />
          <span className="text-[9px] font-bold tracking-tighter">{company.rating}</span>
        </div>
        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{company.reviews} Reviews</span>
      </div>

      <div className="w-full bg-slate-50 rounded-lg p-2 mb-4 border border-slate-100 group-hover:bg-teal-50/50 group-hover:border-teal-100 transition-all">
        <p className="text-teal-700 font-bold text-[11px]">{company.openings} Open Positions</p>
        <p className="text-[9px] text-slate-500 font-medium mt-0.5 tracking-tight">Hiring actively</p>
      </div>

      <button className="w-full py-1.5 border border-slate-200 text-slate-600 text-[10px] font-bold rounded-lg hover:bg-slate-50 hover:border-teal-200 hover:text-teal-700 transition-all flex items-center justify-center gap-1.5">
        View Jobs
        <ExternalLink className="w-2.5 h-2.5" />
      </button>
    </div>
  );
};

const TopCompanies = () => {
  const companies = [
    {
      id: 1,
      name: 'Google',
      logo: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png',
      rating: 4.5,
      reviews: '12K+',
      openings: 45
    },
    {
      id: 2,
      name: 'Amazon',
      logo: 'https://cdn-icons-png.flaticon.com/512/5968/5968269.png',
      rating: 4.2,
      reviews: '18K+',
      openings: 120
    },
    {
      id: 3,
      name: 'Meta',
      logo: 'https://cdn-icons-png.flaticon.com/512/5968/5968264.png',
      rating: 4.4,
      reviews: '8K+',
      openings: 22
    },
    {
      id: 4,
      name: 'Microsoft',
      logo: 'https://cdn-icons-png.flaticon.com/512/732/732221.png',
      rating: 4.6,
      reviews: '15K+',
      openings: 88
    },
    {
      id: 5,
      name: 'Adobe',
      logo: 'https://cdn-icons-png.flaticon.com/512/732/732172.png',
      rating: 4.3,
      reviews: '5K+',
      openings: 14
    },
    {
      id: 6,
      name: 'TCS',
      logo: 'https://cdn-icons-png.flaticon.com/512/732/732247.png',
      rating: 4.1,
      reviews: '45K+',
      openings: 450
    }
  ];
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

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {companies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>
    </div>
  );
};

export default TopCompanies;
